"use client";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { CATEGORIES, PRODUCTS } from "./data";

const WA_LINK = "https://wa.me/56992140250?text=Hola%20Punto%20T%C3%A1ctico%2C%20tengo%20una%20consulta";

function IconWhatsApp(props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path fill="#25D366" d="M19.11 16.94c-.27-.14-1.55-.76-1.79-.85-.24-.09-.41-.14-.58.14-.17.27-.67.85-.82 1.03-.15.18-.3.2-.57.07-.27-.14-1.13-.42-2.15-1.35-.79-.7-1.32-1.56-1.47-1.82-.15-.27-.02-.42.12-.55.12-.12.27-.32.4-.49.13-.16.17-.27.25-.45.08-.18.04-.34-.02-.48-.06-.14-.58-1.39-.8-1.92-.21-.51-.42-.44-.58-.45l-.5-.01c-.17 0-.45.06-.69.33-.24.27-.9.88-.9 2.15 0 1.26.92 2.48 1.05 2.65.13.18 1.82 2.8 4.41 3.93.62.27 1.11.43 1.49.55.63.2 1.2.17 1.65.1.5-.07 1.55-.63 1.77-1.24.22-.61.22-1.13.15-1.24-.06-.1-.24-.17-.5-.31z"/>
      <path fill="#25D366" d="M26.74 5.26A13.43 13.43 0 0 0 16 1C8.83 1 3 6.83 3 14c0 2.2.57 4.29 1.6 6.11L3 31l11.14-1.56A12.96 12.96 0 0 0 16 27c7.17 0 13-5.83 13-13 0-3.46-1.35-6.72-3.26-8.74zM16 25.67c-1.94 0-3.74-.5-5.3-1.38l-.38-.22-6.31.88.89-6.14-.25-.4A10.66 10.66 0 0 1 5.33 14C5.33 8.6 9.93 4 15.33 4c2.86 0 5.46 1.12 7.4 3.07A10.4 10.4 0 0 1 26.67 14c0 5.4-4.6 9.99-10.67 11.67z"/>
    </svg>
  );
}

function IconFacebook(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.34 2 1.86 6.48 1.86 12.07c0 4.98 3.64 9.11 8.4 9.94v-7.03H7.9v-2.9h2.36V9.86c0-2.34 1.4-3.63 3.54-3.63 1.03 0 2.1.18 2.1.18v2.3h-1.18c-1.16 0-1.52.72-1.52 1.46v1.76h2.59l-.41 2.9h-2.18V22c4.76-.83 8.4-4.96 8.4-9.93z"/>
    </svg>
  );
}

function IconInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0-5c2 0 2.25.01 3.04.04.78.03 1.32.16 1.79.34.49.19.9.44 1.31.85.41.41.66.82.85 1.31.18.47.31 1.01.34 1.79.03.79.04 1.04.04 3.04s-.01 2.25-.04 3.04c-.03.78-.16 1.32-.34 1.79-.19.49-.44.9-.85 1.31-.41.41-.82.66-1.31.85-.47.18-1.01.31-1.79.34-.79.03-1.04.04-3.04.04s-2.25-.01-3.04-.04c-.78-.03-1.32-.16-1.79-.34a3.77 3.77 0 0 1-1.31-.85 3.77 3.77 0 0 1-.85-1.31c-.18-.47-.31-1.01-.34-1.79C4.01 14.25 4 14 4 12s.01-2.25.04-3.04c.03-.78.16-1.32.34-1.79.19-.49.44-.9.85-1.31.41-.41.82-.66 1.31-.85.47-.18 1.01-.31 1.79-.34C9.75 2.01 10 2 12 2zm0 2c-1.97 0-2.21.01-2.99.04-.72.03-1.12.15-1.38.25-.35.14-.6.3-.86.56-.26.26-.42.51-.56.86-.1.26-.22.66-.25 1.38C5.01 8.79 5 9.03 5 11s.01 2.21.04 2.99c.03.72.15 1.12.25 1.38.14.35.3.6.56.86.26.26.51.42.86.56.26.1.66.22 1.38.25.78.03 1.02.04 2.99.04s2.21-.01 2.99-.04c.72-.03 1.12-.15 1.38-.25.35-.14.6-.3.86-.56.26-.26.42-.51.56-.86.1-.26.22-.66.25-1.38.03-.78.04-1.02.04-2.99s-.01-2.21-.04-2.99c-.03-.72-.15-1.12-.25-1.38a2.5 2.5 0 0 0-.56-.86 2.5 2.5 0 0 0-.86-.56c-.26-.1-.66-.22-1.38-.25C14.21 4.01 13.97 4 12 4zm5.5 1.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"/>
    </svg>
  );
}

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
      {/* TOPBAR: SOLO WhatsApp */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-end">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 text-[12px] font-medium text-emerald-700 hover:text-emerald-800"
            aria-label="Chatear por WhatsApp con Punto Táctico"
          >
            <IconWhatsApp className="w-5 h-5" />
            <span>+56 9 9214 0250</span>
          </a>
        </div>
      </div>

      {/* HEADER principal: logo izq / búsqueda centro / acciones der */}
      <header className="bg-white backdrop-blur border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
          {/* LOGO */}
          <a href="/" className="flex items-center gap-2 shrink-0" aria-label="Inicio Punto Táctico">
            <img
              src="/Logo%20ptactico%20web.png"
              alt="Logo Punto Táctico"
              className="h-10 md:h-12 w-auto"
            />
          </a>

          {/* BUSCADOR */}
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

          {/* Acciones (opcional) */}
          <div className="hidden md:flex items-center gap-2">
            <button className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm">Ingresar</button>
            <button className="px-3 py-2 rounded-lg bg-emerald-600 text-white font-semibold">Carrito</button>
          </div>
        </div>

        {/* NAV categorías (incluye Novedades) */}
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

      {/* BANNER opcional (si subes imágenes a /public/) */}
      <section className="relative">
 <picture>
  {/* Desktop */}
  <source srcSet="/banner-ptactico-desktop-final.webp" media="(min-width: 768px)" type="image/webp" />
  <source srcSet="/banner-ptactico-desktop-final.jpg"  media="(min-width: 768px)" />
  {/* Mobile */}
  <source srcSet="/banner-ptactico-mobile-final.webp" type="image/webp" />
  <img
  src="/banner-ptactico-mobile-final.jpg"
  alt="Punto Táctico — Marcas oficiales y tu aliado estratégico"
  className="w-full h-[220px] md:h-[400px] object-contain bg-white"
  loading="eager"
  fetchpriority="high"
/>
</picture>
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

      {/* FOOTER con dirección y RRSS (con logos) */}
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
              <li><strong>Dirección:</strong> Avenida Aníbal Pinto 615, Local B. Parral.</li>
              <li><strong>WhatsApp:</strong> <a className="underline hover:text-emerald-700" href={WA_LINK} target="_blank" rel="noreferrer noopener">+56 9 9214 0250</a></li>
              <li><strong>Email:</strong> puntotacticospa@gmail.com</li>
            </ul>
          </div>

          <div>
            <div className="font-bold">Síguenos en nuestras redes sociales</div>
            <div className="mt-3 flex items-center gap-3">
              <a href="https://www.facebook.com/PuntoTacticoSpA" target="_blank" rel="noreferrer noopener" aria-label="Facebook Punto Táctico" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-100">
                <IconFacebook className="w-4 h-4 text-slate-900" />
                <span className="text-slate-700">Punto Táctico SpA</span>
              </a>
              <a href="https://www.instagram.com/puntotactico.spa" target="_blank" rel="noreferrer noopener" aria-label="Instagram Punto Táctico" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-100">
                <IconInstagram className="w-4 h-4 text-slate-900" />
                <span className="text-slate-700">@puntotactico.spa</span>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500 mt-8">
          © {new Date().getFullYear()} Punto Táctico. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

