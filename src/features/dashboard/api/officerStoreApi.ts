"use client";

import { getAuthSession } from "@/src/features/auth/utils/authSessionStorage";
import { ApiError } from "@/src/shared/api";

const STORE_DASHBOARD_API_ROUTE = "/api/dashboard/officer/store/dashboard";
const STORE_PRODUCTS_LIST_API_ROUTE = "/api/dashboard/officer/store/products/list";
const STORE_PRODUCTS_API_ROUTE = "/api/dashboard/officer/store/products";
const STORE_SALES_API_ROUTE = "/api/dashboard/officer/store/sales";

const getRequiredAccessToken = () => {
  const session = getAuthSession();

  if (!session?.accessToken) {
    throw new Error("Sesi login tidak ditemukan. Silakan masuk kembali.");
  }

  return session.accessToken;
};

export type OfficerStoreDashboardResponse = {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: {
    total_products: number;
    safe_products: number;
    low_stock_products: number;
    latest_movements: Array<{
      stock_movement_id: string;
      product_code: string;
      product_name: string;
      unit: string;
      officer_name: string;
      movement_type: string;
      movement_type_label: string;
      quantity_delta: number;
      resulting_stock_quantity: number;
      description: string;
      recorded_at: string;
      hash_preview: string;
      sync_status: string;
    }> | null;
  };
};

export type OfficerStoreProductsResponse = {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: {
    items: Array<{
      product_id: string;
      product_code: string;
      name: string;
      unit: string;
      category: string;
      cost_price: number;
      sale_price: number;
      stock_quantity: number;
      min_stock_quantity: number;
      margin_percent: number;
      stock_status: string;
    }> | null;
    page: number;
    limit: number;
    total: number;
  };
};

export type CreateOfficerStoreProductResponse = {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: {
    product_id: string;
    product_code: string;
    name: string;
    unit: string;
    category: string;
    cost_price: number;
    sale_price: number;
    stock_quantity: number;
    min_stock_quantity: number;
    margin_percent: number;
    stock_status: string;
    hash_preview: string;
  };
};

export type CreateOfficerStoreSaleResponse = {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: {
    store_sale_id: string;
    officer_name?: string;
    sale_number?: string;
    total_amount?: number;
    cash_received?: number;
    change_amount?: number;
    recorded_at?: string;
    current_hash?: string;
    hash_preview?: string;
  };
};

export type CreateOfficerStoreStockInResponse = {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: {
    stock_movement_id: string;
    product_id: string;
    product_code: string;
    product_name: string;
    unit: string;
    officer_name: string;
    quantity_delta: number;
    resulting_stock_quantity: number;
    unit_cost: number;
    sale_price: number;
    description: string;
    recorded_at: string;
    current_hash: string;
    hash_preview: string;
  };
};

export type CreateOfficerStoreAdjustmentResponse = {
  status: {
    code: number;
    isSuccess: boolean;
  };
  message: string;
  data: {
    stock_movement_id: string;
    product_id: string;
    product_code: string;
    product_name: string;
    unit: string;
    officer_name: string;
    quantity_delta: number;
    resulting_stock_quantity: number;
    description: string;
    recorded_at: string;
    current_hash: string;
    hash_preview: string;
  };
};

async function parseError(response: Response, fallbackMessage: string) {
  const errorPayload = (await response.json().catch(() => null)) as {
    message?: string;
  } | null;

  throw new ApiError({
    message: errorPayload?.message || fallbackMessage,
    status: response.status,
  });
}

export async function getOfficerStoreDashboard(): Promise<OfficerStoreDashboardResponse> {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(STORE_DASHBOARD_API_ROUTE, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessToken }),
    cache: "no-store",
  });

  if (!response.ok) {
    await parseError(response, "Gagal mengambil dashboard toko.");
  }

  return (await response.json()) as OfficerStoreDashboardResponse;
}

export async function getOfficerStoreProducts(input?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<OfficerStoreProductsResponse> {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(STORE_PRODUCTS_LIST_API_ROUTE, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessToken,
      page: input?.page ?? 1,
      limit: input?.limit ?? 10,
      search: input?.search ?? "",
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    await parseError(response, "Gagal mengambil katalog produk.");
  }

  return (await response.json()) as OfficerStoreProductsResponse;
}

export async function createOfficerStoreProduct(input: {
  name: string;
  unit: string;
  category: string;
  costPrice: number;
  salePrice: number;
  minStockQuantity: number;
  initialStockQuantity: number;
  isOfflineCreated?: boolean;
  clientReferenceId: string;
}): Promise<CreateOfficerStoreProductResponse> {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(STORE_PRODUCTS_API_ROUTE, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessToken,
      name: input.name,
      unit: input.unit.toLowerCase(),
      category: input.category,
      cost_price: input.costPrice,
      sale_price: input.salePrice,
      min_stock_quantity: input.minStockQuantity,
      initial_stock_quantity: input.initialStockQuantity,
      is_offline_created: input.isOfflineCreated ?? false,
      client_reference_id: input.clientReferenceId,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    await parseError(response, "Gagal menambahkan produk baru.");
  }

  return (await response.json()) as CreateOfficerStoreProductResponse;
}

export async function createOfficerStoreSale(input: {
  clientSaleId: string;
  cashReceived: number;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}): Promise<CreateOfficerStoreSaleResponse> {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(STORE_SALES_API_ROUTE, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessToken,
      client_sale_id: input.clientSaleId,
      cash_received: input.cashReceived,
      items: input.items.map((item) => ({
        product_id: item.productId,
        quantity: item.quantity,
      })),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    await parseError(response, "Gagal memproses penjualan.");
  }

  return (await response.json()) as CreateOfficerStoreSaleResponse;
}

export async function createOfficerStoreStockIn(input: {
  productId: string;
  quantity: number;
  unitCost: number;
  salePrice: number;
  description: string;
  isOfflineCreated?: boolean;
  clientReferenceId?: string;
}): Promise<CreateOfficerStoreStockInResponse> {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(
    `/api/dashboard/officer/store/products/${input.productId}/stock-in`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken,
        quantity: input.quantity,
        unit_cost: input.unitCost,
        sale_price: input.salePrice,
        description: input.description,
        is_offline_created: input.isOfflineCreated ?? false,
        client_reference_id: input.clientReferenceId,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    await parseError(response, "Gagal menambah stok produk.");
  }

  return (await response.json()) as CreateOfficerStoreStockInResponse;
}

export async function createOfficerStoreAdjustment(input: {
  productId: string;
  quantityDelta: number;
  description: string;
  isOfflineCreated?: boolean;
  clientReferenceId?: string;
}): Promise<CreateOfficerStoreAdjustmentResponse> {
  const accessToken = getRequiredAccessToken();
  const response = await fetch(
    `/api/dashboard/officer/store/products/${input.productId}/adjustments`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken,
        quantity_delta: input.quantityDelta,
        description: input.description,
        is_offline_created: input.isOfflineCreated ?? false,
        client_reference_id: input.clientReferenceId,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    await parseError(response, "Gagal menyesuaikan stok produk.");
  }

  return (await response.json()) as CreateOfficerStoreAdjustmentResponse;
}
