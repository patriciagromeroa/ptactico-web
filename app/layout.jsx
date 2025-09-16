import './globals.css'

export const metadata = {
  title: 'Punto Táctico — Catálogo',
  description: 'Catálogo por categorías: Pesca, Caza, Defensa personal, Camping, Outdoor, Navajas, Cuchillos, Encendedores, Otros y ver todo.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
