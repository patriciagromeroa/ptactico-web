"use client";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { CATEGORIES, PRODUCTS } from "./data";

export default function Storefront() {
  const [category, setCategory] = useState("ver todo");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    let list = PRODUCTS.slice();

    // Filtro por categoría (incluye Novedades)
    if (category && category !== "ver todo") {
      if (category.toLowerCase() === "novedades") {
        list = list.filter((p) => (p.badge || "").toLowerCase() === "nuevo");
      } else {
        list = list.filter((p) => p.category === category);
      }
    }

    // Búsqueda por texto
    const query = q.trim().toLowerCase();
    if (query) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        (p.desc || "").toLowerCase().includes(query)
      );
    }
    return list;
  }, [category, q]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* TOPBAR (similar a Andesgear: info breve) */}
      <div className="hidden md:block bg-slate-950 border-b border-slate-800 text-[12px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <div className="text-slate-300">
            Envío a todo Chile • Cambios y garantías conforme a la Ley del Consumidor
          </div>
          <div className="text-slate-400">
            WhatsApp soporte: <span className="text-slate-200 font-medium">+56 9 0000 0000</span>
          </div>
        </div>
      </div>

      {/* HEADER principal (logo izq, búsqueda centro, acciones der) */}
      <header className="bg-slate-900/95 backdrop-blur border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
          {/* LOGO */}
          <a href="/" className="flex items-center gap-2 shrink-0" aria-label="Inicio Punto Táctico">
            <img
              src="/Logo%20ptactico%20web.png"
              alt="Logo Punto Táctico"
              className="h-9 md:h-10 w-auto"
            />
          </a>

          {/* BUSCADOR grande */}
          <div className="flex-1">
            <div className="relative">
              <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7" strokeWidth="2" /><line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" /></svg>
              <input
                value={q}
                onChange={(e)=>setQ(e.target.value)}
                placeholder="Buscar productos, marcas…"
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-800/70 border border-slate-700 outline-none focus:ring-2 ring-lime-400/40 text-sm"
              />
            </div>
          </div>

          {/* Acciones (placeholders visuales) */}
          <div className="hidden md:flex items-center gap-2">
            <button className="px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700 text-sm">Ingresar</button>
            <button className="px-3 py-2 rounded-lg bg-emerald-500 text-slate-900 font-semibold">Carrito</button>
          </div>
        </div>

        {/* NAV de categorías tipo chips (incluye Novedades) */}
        <nav className="border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 overflow-x-auto no-scrollbar">
            <div className="flex gap-2">
              {CATEGORIES.map((c) => {
                const active = category === c;
                return (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={[
                      "px-3 py-1.5 rounded-full text-[13px] border transition",
                      active
                        ? "bg-emerald-500 text-slate-900 border-emerald-400"
                        : "bg-slate-800/60 border-slate-700 text-slate-200 hover:bg-slate-800"
                    ].join(" ")}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      </header>

      {/* BANNER / HERO (si subes las imágenes a /public/ se mostrará) */}
      <section className="relative">
        <picture>
          {/* Desktop */}
          <source srcSet="/banner-ptactico-desktop.webp" media="(min-width: 768px)" type="image/webp" />
          <source srcSet="/banner-ptactico-desktop.jpg"  media="(min-width: 768px)" />
          {/* Mobile */}
          <source srcSet="/banner-ptactico-mobile.webp" type="image/webp" />
          <img
            src="/banner-ptactico-mobile.jpg"
            alt="Punto Táctico — Outdoor, caza, pesca y camping"
            className="w-full h-[280px] md:h-[520px] object-cover"
            loading="eager"
            fetchpriority="high"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-6">
            <h1 className="text-2xl md:text-4xl font-extrabold leading-tight">Punto Táctico</h1>
            <p className="text-sm md:text-base text-slate-200/90">Donde la aventura y la calidad se encuentran</p>
          </div>
        </div>
      </section>

      {/* LISTADO */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-6">
          <div className="text-slate-400 text-sm">
            {category === "ver todo" ? "Mostrando todas las categorías" : `Filtrando por: ${category}`} • {filtered.length} productos
          </div>
        </section>

        <section className="pb-10">
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
      <footer className="border-t border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-6 text-sm">
          <div>
            <div className="text-lg font-extrabold">Punto Táctico</div>
            <p className="text-slate-400 mt-2">Outdoor, caza, pesca, camping y táctico.</p>
          </div>
          <div>
            <div className="font-bold">Categorías</div>
            <ul className="mt-2 text-slate-400 space-y-1">
              {CATEGORIES.filter(c => c !== "ver todo").map((c) => <li key={c}>{c}</li>)}
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
