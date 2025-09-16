/* eslint-disable @next/next/no-img-element */
export default function ProductCard({ p }) {
  const CLP = new Intl.NumberFormat('es-CL',{ style:'currency', currency:'CLP', maximumFractionDigits:0 });
  return (
    <article className="group rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden hover:border-emerald-500/50 transition">
      <div className="relative">
        <span className="absolute right-2 top-2 text-[10px] bg-slate-900/80 border border-slate-700 text-slate-300 px-2 py-0.5 rounded">{p.category}</span>
        <img src={p.image} alt={p.name} className="h-44 w-full object-cover" loading="lazy" />
      </div>
      <div className="p-4">
        <div className="text-[11px] text-slate-400">{p.brand}</div>
        <h3 className="mt-1 font-semibold leading-snug group-hover:text-emerald-300">{p.name}</h3>
        <div className="mt-2 text-lg font-extrabold text-emerald-300">{CLP.format(p.price)}</div>
      </div>
    </article>
  )
}
