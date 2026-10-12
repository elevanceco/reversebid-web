export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    DRAFT: "bg-slate-100 text-slate-700 border-slate-200",
    SCHEDULED: "bg-blue-50 text-blue-700 border-blue-200",
    OPEN: "bg-emerald-50 text-emerald-700 border-emerald-200",
    CLOSED: "bg-amber-50 text-amber-700 border-amber-200",
    AWARDED: "bg-purple-50 text-purple-700 border-purple-200",
    CANCELLED: "bg-red-50 text-red-700 border-red-200",
  };

  const style = styles[status] || styles.DRAFT;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style}`}
    >
      {status}
    </span>
  );
}
