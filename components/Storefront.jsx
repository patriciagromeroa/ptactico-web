"use client";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { CATEGORIES, PRODUCTS } from "./data";

export default function Storefront() {
  const [category, setCategory] = useState("ver todo");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    let list = PRODUCTS.slice();
    if (category && category !== "ver todo") list = list.filter(p => p.category === category);
    const query = q.trim().toLowerCase();
    if (query) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        (p.desc || "").toLowerCase().includes(query)
      );
    }
    return list;
  }, [category, q]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-50">
      {/* HEADER */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-slate-900/70 bg-slate-900/90 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <div className="flex items-center gap-3">
            {/* Logo real (usa tu archivo en /public/Logo ptactico web.png) */}
            <div className="h-10 w-10 rounded-xl overflow-hidden border border-slate-700 bg-white/90">
              <img
                src="/Logo%20ptactico%20web.png"
                alt="Logo Punto Táctico"
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div>
              <div className="text-lg font-extrabold tracking-tight">Punto Táctico</div>
              <div className="text-[11px] text-slate-400">Catálogo por categorías</div>
            </div>
          </div>

          <div className="relative ml-auto w-full max-w-xl">
            <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7" strokeWidth="2" /><line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" /></svg>
            <input
              value={q}
              onChange={(e)=>setQ(e.target.value)}
              placeholder="Buscar por nombre o marca…"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-800/60 border border-slate-700 outline-none focus:ring-2 ring-lime-400/40 text-sm"
            />
          </div>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-6">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={()=>setCategory(c)}
                className={`px-3 py-1 rounded-full text-sm border ${category===c ? "bg-emerald-500 text-slate-900 border-emerald-400" : "bg-slate-800/60 border-slate-700 text-slate-200 hover:bg-slate-800"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-3 text-slate-400 text-sm">
            {category==="ver todo" ? "Mostrando todas las categorías" : `Filtrando por: ${category}`} • {filtered.length} productos
          </div>
        </section>

        <section className="py-4">
          {filtered.length === 0 ? (
            <div className="text-slate-400 py-16 text-center">No hay resultados para tu búsqueda.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-6 text-sm">
          <div>
            <div className="text-lg font-extrabold">Punto Táctico</div>
            <p className="text-slate-400 mt-2">Catálogo de outdoor, pesca, caza y camping.</p>
          </div>
          <div>
            <div className="font-bold">Categorías</div>
            <ul className="mt-2 text-slate-400 space-y-1">
              {CATEGORIES.filter(c=>c!=="ver todo").map(c => <li key={c}>{c}</li>)}
            </ul>
          </div>
          <div>
            <div className="font-bold">Atención</div>
            <ul className="mt-2 text-slate-400 space-y-1">
              <li>Despachos a todo Chile</li>
              <li>Pagos habituales (próximamente)</li>
            </ul>
          </div>
          <div>
            <div className="font-bold">Contacto</div>
            <ul className="mt-2 text-slate-400 space-y-1">
              <li>Parral, Chile</li>
              <li>puntotacticospa@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-slate-500 mt-8">© {new Date().getFullYear()} Punto Táctico. Todos los derechos reservados.</div>
      </footer>
    </div>
  );
}
