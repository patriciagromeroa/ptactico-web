"use client";
import HeroCarousel from "./doite/HeroCarousel";
import CategoryTiles from "./doite/CategoryTiles";
import ProductRow from "./doite/ProductRow";
import BrandStrip from "./doite/BrandStrip";
import NewsletterBar from "./doite/NewsletterBar";
import { PRODUCTS } from "../components/data";

export default function HomeDoite() {
  // “Novedades” = productos con badge: "Nuevo"
  const novedades = PRODUCTS.filter(p => (p.badge || "").toLowerCase() === "nuevo").slice(0, 12);
  // “Destacados” – hoy sacamos 12 cualquiera; luego puedes marcarlos con badge: "Destacado"
  const destacados = PRODUCTS.slice(0, 12);

  return (
    <main className="bg-white text-slate-900">
      <HeroCarousel
        slides={[
          { src: "/banner-ptactico-desktop-final.jpg", mobile: "/banner-ptactico-mobile-final.jpg", alt: "Punto Táctico — Tu aliado estratégico", cta: { label: "Ver catálogo", href: "#catalogo" } },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl font-extrabold mb-5">Compra por categoría</h2>
        <CategoryTiles
          tiles={[
            { title: "Pesca", href: "#catalogo?c=Pesca", img: "/tiles/pesca.jpg" },
            { title: "Caza", href: "#catalogo?c=Caza", img: "/tiles/caza.jpg" },
            { title: "Defensa personal", href: "#catalogo?c=Defensa%20personal", img: "/tiles/defensa.jpg" },
            { title: "Camping", href: "#catalogo?c=Camping", img: "/tiles/camping.jpg" },
            { title: "Outdoor", href: "#catalogo?c=Outdoor", img: "/tiles/outdoor.jpg" },
            { title: "Navajas", href: "#catalogo?c=Navajas", img: "/tiles/navajas.jpg" },
            { title: "Cuchillos", href: "#catalogo?c=Cuchillos", img: "/tiles/cuchillos.jpg" },
            { title: "Encendedores", href: "#catalogo?c=Encendedores", img: "/tiles/encendedores.jpg" },
          ]}
        />
      </section>

      <ProductRow id="novedades" title="Novedades" items={novedades} />
      <ProductRow id="destacados" title="Destacados" items={destacados} />

      <BrandStrip
        brands={[
          "/brands/andesgear.svg","/brands/doite.svg","/brands/marmot.svg","/brands/mammut.svg",
          "/brands/victorinox.svg","/brands/zippo.svg","/brands/wileyx.svg","/brands/fenix.svg",
          "/brands/rapala.svg","/brands/shimano.svg","/brands/okuma.svg","/brands/penn.svg",
          "/brands/daiwa.svg","/brands/salmo.svg","/brands/falcon-claw.svg","/brands/remington.svg",
          "/brands/umarex.svg","/brands/walther.svg","/brands/bushnell.svg","/brands/coleman.svg"
        ]}
      />

      <NewsletterBar />
    </main>
  );
}
