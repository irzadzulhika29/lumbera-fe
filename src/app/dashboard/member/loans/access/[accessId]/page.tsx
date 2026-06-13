import MemberCreditAccessDetailScreen from "@/src/features/dashboard/components/screens/MemberCreditAccessDetailScreen";

export default async function MemberCreditAccessDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ accessId: string }>;
  searchParams: Promise<{ state?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const initialState =
    resolvedSearchParams.state === "active" ? "active" : "pending";

  return (
    <MemberCreditAccessDetailScreen
      accessId={resolvedParams.accessId}
      initialState={initialState}
    />
  );
}
