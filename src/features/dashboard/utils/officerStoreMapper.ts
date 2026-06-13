import type {
  CreateOfficerStoreProductResponse,
  OfficerStoreDashboardResponse,
  OfficerStoreProductsResponse,
} from "@/src/features/dashboard/api/officerStoreApi";
import type {
  StoreDashboardStats,
  StoreMutationFilter,
  StoreProductDraft,
  StoreProductItem,
  StoreProductSuccess,
} from "@/src/features/dashboard/storeTypes";
import type { DashboardTransaction } from "@/src/features/dashboard/types";

function formatCurrency(amount: number) {
  return `Rp ${new Intl.NumberFormat("id-ID").format(amount)}`;
}

function getInitials(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("") || "ST";
}

function mapMovementTypeToFilter(movementType: string): Exclude<StoreMutationFilter, "all"> {
  const normalized = movementType.toUpperCase();

  if (normalized.includes("ADJUST")) {
    return "adjustment";
  }

  if (
    normalized.includes("SALE") ||
    normalized.includes("OUT") ||
    normalized.includes("REDUCE")
  ) {
    return "outgoing";
  }

  return "incoming";
}

function mapSyncStatus(syncStatus: string): Pick<
  DashboardTransaction,
  "status" | "statusTone"
> {
  return syncStatus === "SYNCED"
    ? { status: "Sinkron", statusTone: "success" }
    : { status: "Pending", statusTone: "warning" };
}

export function mapOfficerStoreDashboardToStats(
  data: OfficerStoreDashboardResponse["data"],
): StoreDashboardStats {
  return {
    totalCount: data.total_products,
    safeCount: data.safe_products,
    lowStockCount: data.low_stock_products,
  };
}

export function mapOfficerStoreDashboardToAlertLabel(
  data: OfficerStoreDashboardResponse["data"],
) {
  return data.low_stock_products > 0
    ? `${data.low_stock_products} Stok Produk Menipis!`
    : "Semua stok produk dalam kondisi aman";
}

export function mapOfficerStoreDashboardToMutations(
  data: OfficerStoreDashboardResponse["data"],
) {
  return (data.latest_movements ?? []).map((movement) => {
    const quantityPrefix = movement.quantity_delta >= 0 ? "+" : "";
    const mutationType = mapMovementTypeToFilter(movement.movement_type);
    const statusMeta = mapSyncStatus(movement.sync_status);

    return {
      id: movement.stock_movement_id,
      href: "/dashboard/officer/store",
      initials: getInitials(movement.officer_name),
      name: movement.officer_name,
      description:
        `${movement.movement_type_label} ${movement.product_name}` +
        (movement.description ? ` - ${movement.description}` : ""),
      amount: `${quantityPrefix}${movement.quantity_delta} ${movement.unit}`,
      avatarTone: "blue" as const,
      mutationType,
      ...statusMeta,
    };
  });
}

export function mapOfficerStoreProductsToItems(
  data: OfficerStoreProductsResponse["data"],
): StoreProductItem[] {
  return (data.items ?? []).map((product) => ({
    id: product.product_id,
    initials: getInitials(product.name),
    name: product.name,
    sku: product.product_code,
    unit: product.unit,
    category: product.category,
    stockLabel: `Stok: ${product.stock_quantity} ${product.unit}`,
    minimumStockLabel: `Min. stok: ${product.min_stock_quantity} ${product.unit}`,
    costPrice: formatCurrency(product.cost_price),
    rawCostPrice: product.cost_price,
    sellPrice: formatCurrency(product.sale_price),
    rawSalePrice: product.sale_price,
    rawStockQuantity: product.stock_quantity,
    rawMinimumStockQuantity: product.min_stock_quantity,
    marginLabel: `${product.margin_percent}%`,
    statusLabel: product.stock_status === "AMAN" ? "Stok aman" : "Menipis",
    statusTone: product.stock_status === "AMAN" ? "safe" : "low",
  }));
}

export function buildStoreProductDraft(input: {
  name: string;
  unit: string;
  category: string;
  costPrice: number;
  salePrice: number;
  minimumStock: number;
  initialStockQuantity: number;
}) : StoreProductDraft {
  return {
    name: input.name,
    unit: input.unit,
    category: input.category,
    costPrice: formatCurrency(input.costPrice),
    salePrice: formatCurrency(input.salePrice),
    minimumStock: `${input.minimumStock} ${input.unit}`,
    initialStockQuantity: `${input.initialStockQuantity} ${input.unit}`,
    recordedBy: "Petugas koperasi",
    createdAtLabel: new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    })
      .format(new Date())
      .replace(".", ":"),
    hashPreview: "Akan dibuat setelah disimpan",
    payload: {
      name: input.name,
      unit: input.unit,
      category: input.category,
      costPrice: input.costPrice,
      salePrice: input.salePrice,
      minimumStock: input.minimumStock,
      initialStockQuantity: input.initialStockQuantity,
    },
  };
}

export function mapCreatedStoreProductToSuccess(
  data: CreateOfficerStoreProductResponse["data"],
): StoreProductSuccess {
  return {
    name: data.name,
    code: data.product_code,
    hashPreview: data.hash_preview,
  };
}
