"use client";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { CATEGORIES, PRODUCTS } from "./data";

export default function Storefront() {
  const [category, setCategory] = useState("ver todo");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    let list = PRODUCTS.slice();
    if (category && category !== "ver todo") {
      if (category.toLowerCase() === "novedades") {
        list = list.filter((p) => (p.badge || "").toLowerCase() === "nuevo");
      } else {
        list = list.filter((p) => p.category === category);
      }
    }
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
    <div className="min-h-screen bg-white text-slate-900">
      {/* TOPBAR: dirección + envío (izq) / WhatsApp + RRSS (der) */}
      <div className="bg-white border-b border-slate-200 text-[12px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between">
          <div className="text-slate-600">
            Av. Aníbal Pinto 615, Local B • Envío a todo Chile
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <span>WhatsApp soporte: <span className="text-slate-900 font-medium">+56 9 9214 0250</span></span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:flex items-center gap-2">
              <strong className="font-semibold">Síguenos en nuestras redes sociales:</strong>
              <a className="underline hover:text-emerald-700" href="https://www.facebook.com/PuntoTacticoSpA" target="_blank" rel="noreferrer">Facebook: Punto Táctico SpA</a>
              <span>•</span>
              <a className="underline hover:text-emerald-700" href="https://www.instagram.com/puntotactico.spa" target="_blank" rel="noreferrer">Instagram: @puntotactico.spa</a>
            </span>
          </div>
        </div>
      </div>

      {/* HEADER principal: logo izq / búsqueda centro / acciones der */}
      <header className="bg-white backdrop-blur border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
          {/* LOGO (usa tu archivo en /public/) */}
          <a href="/" className="flex items-center gap-2 shrink-0" aria-label="Inicio Punto Táctico">
            <img
              src="/Logo%20ptactico%20web.png"
              alt="Logo Punto Táctico"
              className="h-10 md:h-12 w-auto" /* alto visible sugerido */
            />
          </a>

          {/* BUSCADOR central */}
          <div className="flex-1">
            <div className="relative">
              <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7" strokeWidth="2" /><line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" /></svg>
              <input
                value={q}
                onChange={(e)=>setQ(e.target.value)}
                placeholder="Buscar productos, marcas…"
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-300 outline-none focus:ring-2 ring-emerald-300 text-sm"
              />
            </div>
          </div>

          {/* acciones (placeholders) */}
          <div className="hidden md:flex items-center gap-2">
            <button className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm">Ingresar</button>
            <button className="px-3 py-2 rounded-lg bg-emerald-600 text-white font-semibold">Carrito</button>
          </div>
        </div>

        {/* NAV categorías tipo chips (incluye Novedades) */}
        <nav className="border-t border-slate-200">
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
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-slate-100 text-slate-900 border-slate-200 hover:bg-slate-200"
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

      {/* BANNER / HERO (opcional; si subes archivos se muestra) */}
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
            className="w-full h-[260px] md:h-[500px] object-cover"
            loading="eager"
            fetchpriority="high"
          />
        </picture>
        {/* velo suave para texto en fotos claras */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/60 via-white/0 to-white/0" />
      </section>

      {/* LISTADO */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-6">
          <div className="text-slate-600 text-sm">
            {category === "ver todo" ? "Mostrando todas las categorías" : `Filtrando por: ${category}`} • {filtered.length} productos
          </div>
        </section>

        <section className="pb-10">
          {filtered.length === 0 ? (
            <div className="text-slate-600 py-16 text-center">No hay resultados para tu búsqueda.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          )}
        </section>
      </main>

      {/* FOOTER con dirección y RRSS */}
      <footer className="border-t border-slate-200 py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-6 text-sm">
          <div>
            <div className="text-lg font-extrabold">Punto Táctico</div>
            <p className="text-slate-600 mt-2">Outdoor, caza, pesca, camping y táctico.</p>
          </div>
          <div>
            <div className="font-bold">Categorías</div>
            <ul className="mt-2 text-slate-600 space-y-1">
              {CATEGORIES.filter(c => c !== "ver todo").map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
          <div>
            <div className="font-bold">Contacto</div>
            <ul className="mt-2 text-slate-600 space-y-1">
              <li>Dirección: Av. Aníbal Pinto 615, Local B</li>
              <li>WhatsApp: +56 9 9214 0250</li>
              <li>Email: puntotacticospa@gmail.com</li>
            </ul>
          </div>
          <div>
            <div className="font-bold">Síguenos en nuestras redes sociales</div>
            <ul className="mt-2 text-slate-600 space-y-1">
              <li><a className="underline hover:text-emerald-700" href="https://www.facebook.com/PuntoTacticoSpA" target="_blank" rel="noreferrer">Facebook: Punto Táctico SpA</a></li>
              <li><a className="underline hover:text-emerald-700" href="https://www.instagram.com/puntotactico.spa" target="_blank" rel="noreferrer">Instagram: @puntotactico.spa</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-slate-500 mt-8">© {new Date().getFullYear()} Punto Táctico. Todos los derechos reservados.</div>
      </footer>
    </div>
  );
}
