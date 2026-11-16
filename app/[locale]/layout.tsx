import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "../globals.css";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { resume } from "@/data/resume";
import { profileContent } from "@/data/profile";
import { locales } from "@/data/ui";
import type { Locale } from "@/data/types";

const SITE = process.env.PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0e131a" },
  ],
};

// 언어별 메타 태그, hreflang, Open Graph (PRD P-06)
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const l = locale as Locale;
  const p = resume.profile;
  const name = l === "ko" ? p.nameKo : p.nameEn;
  const tg = profileContent.tagline[l];
  const title = `${name} · ${l === "ko" ? "AI 에이전트 개발자" : "AI Agent Developer"}`;
  const description = `${tg.before}${tg.mark}${tg.after} ${profileContent.intro[l] ?? ""}`.slice(0, 160);
  return {
    title,
    description,
    metadataBase: new URL(SITE),
    alternates: {
      canonical: `/${l}`,
      languages: { ko: "/ko", en: "/en", "x-default": "/ko" },
    },
    openGraph: { title, description, locale: l, type: "profile", url: `/${l}` },
    robots: { index: true, follow: true },
  };
}

// 저장해 둔 테마(밝게/어둡게)를 화면이 그려지기 전에 적용해 깜빡임을 막습니다.
const themeInit = `try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}catch(e){}`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
