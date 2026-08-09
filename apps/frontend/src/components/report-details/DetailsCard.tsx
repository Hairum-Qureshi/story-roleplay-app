export default function DetailsCard({ details }: { details: string }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5">
      <h2 className="text-lg font-semibold">Details</h2>

      <p className="mt-3 text-sm leading-7 text-slate-300">{details}</p>
    </div>
  );
}
