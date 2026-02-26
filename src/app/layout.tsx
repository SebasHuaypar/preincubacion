import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070b18",
};

export const metadata: Metadata = {
  title: "Pre-incubación START Lima | Programa de Emprendimiento para Jóvenes del Perú",
  description:
    "Programa intensivo de 1 mes, 100% virtual y gratuito. Aprende a identificar problemas reales, diseñar soluciones innovadoras y construir tu primer MVP junto a un equipo. Para jóvenes de 18 a 25 años de provincias del Perú.",
  keywords: [
    "emprendimiento jóvenes Perú",
    "pre-incubación",
    "START Lima",
    "programa de innovación",
    "MVP",
    "bootcamp emprendimiento",
    "emprendimiento provincias",
    "startups Perú",
    "programa gratuito emprendimiento",
  ],
  authors: [{ name: "START Lima", url: "https://startlima.org" }],
  creator: "START Lima",
  publisher: "START Lima",
  metadataBase: new URL("https://preincubacion.startlima.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pre-incubación START Lima | Construye tu primer MVP en 1 mes",
    description:
      "Programa intensivo, virtual y gratuito de emprendimiento para jóvenes de 18-25 años de provincias del Perú. Mentorías reales, trabajo en equipo y Demo Day.",
    url: "https://preincubacion.startlima.org",
    siteName: "START Lima",
    type: "website",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pre-incubación START Lima",
    description:
      "Construye tu primer MVP en 1 mes. Programa gratuito y 100% virtual para jóvenes emprendedores del Perú.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "START Lima",
              url: "https://startlima.org",
              description:
                "Programa de pre-incubación para jóvenes emprendedores de provincias del Perú",
              areaServed: {
                "@type": "Country",
                name: "Perú",
              },
              event: {
                "@type": "EducationEvent",
                name: "Pre-incubación START Lima 2026",
                description:
                  "Programa intensivo de 1 mes para construir tu primer MVP",
                eventAttendanceMode:
                  "https://schema.org/OnlineEventAttendanceMode",
                startDate: "2026-03-01",
                endDate: "2026-04-11",
                isAccessibleForFree: true,
                organizer: {
                  "@type": "Organization",
                  name: "START Lima",
                  url: "https://startlima.org",
                },
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
