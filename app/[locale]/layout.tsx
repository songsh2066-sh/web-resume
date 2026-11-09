import "../globals.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resume } from "@/data/resume";
import { locales, ui } from "@/data/ui";
import type { Locale } from "@/data/types";
import TopBar from "@/components/TopBar";

const SITE = process.env.PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 언어별 메타 태그, hreflang, Open Graph (PRD P-06)
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const l = locale as Locale;
  const p = resume.profile;
  const name = l === "ko" ? p.nameKo : p.nameEn;
  const headline = p.headline[l] ?? p.headline.ko;
  const description = (p.summary[l] ?? p.summary.ko).slice(0, 150);
  return {
    title: `${name} · ${headline}`,
    description,
    metadataBase: new URL(SITE),
    alternates: {
      canonical: `/${l}`,
      languages: { ko: "/ko", en: "/en", "x-default": "/ko" },
    },
    openGraph: { title: `${name} · ${headline}`, description, locale: l, type: "profile", url: `/${l}` },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const l = locale as Locale;
  return (
    <html lang={l}>
      <body>
        <TopBar locale={l} t={ui[l]} />
        {children}
      </body>
    </html>
  );
}
