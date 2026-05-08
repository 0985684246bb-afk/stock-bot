export function AllocationWarningCard({ warnings }: { warnings: string[] }) {
  return <section className="card p-5"><h3 className="font-black">Portfolio Risk Alerts</h3><div className="mt-4 grid gap-3 md:grid-cols-2">{warnings.map((w) => <div key={w} className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">{w}</div>)}</div></section>;
}
