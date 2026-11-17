import type { Metadata, Viewport } from "next";
import { Klee_One, Noto_Sans_JP, Noto_Sans_Thai } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import { STORAGE_KEY } from "@/lib/progress/constants";
import "./globals.css";

const thai = Noto_Sans_Thai({ variable: "--nf-thai", subsets: ["thai", "latin"], weight: ["400", "500", "600", "700"] });
const jp = Noto_Sans_JP({ variable: "--nf-jp", weight: ["400", "500", "700"], preload: false });
const kana = Klee_One({ variable: "--nf-kana", weight: ["400", "600"], preload: false });

export const metadata: Metadata = {
  title: { default: "にほんご Tochigi — เรียนญี่ปุ่นวันละ 20 นาที", template: "%s · にほんご Tochigi" },
  description: "เรียนภาษาญี่ปุ่นจากศูนย์ วันละ 20 นาที เพื่อเที่ยวโทจิงิ ตุลาคม 2027",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFF9F0" },
    { media: "(prefers-color-scheme: dark)", color: "#1d1a19" },
  ],
};

/** Applies the saved theme before first paint to avoid a light/dark flash. */
const themeScript = `(function(){try{var s=JSON.parse(localStorage.getItem(${JSON.stringify(
  STORAGE_KEY,
)})||"null");var t=s&&s.settings&&s.settings.theme||"system";var d=t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);if(d)document.documentElement.classList.add("dark");}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${thai.variable} ${jp.variable} ${kana.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
