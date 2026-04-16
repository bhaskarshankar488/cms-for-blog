export default function StatusBadge({ status }: { status: string }) {
  const styles = {
    draft: "bg-gray-200 text-gray-700",
    published: "bg-green-100 text-green-700",
    unpublished: "bg-yellow-100 text-yellow-700",
  }

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${styles[status as keyof typeof styles]}`}>
      {status}
    </span>
  )
}