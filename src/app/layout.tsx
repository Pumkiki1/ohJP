import type { Metadata, Viewport } from "next";
import { Klee_One, Mali, Noto_Sans_JP, Noto_Sans_Thai, Sriracha } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import { STORAGE_KEY } from "@/lib/progress/constants";
import "./globals.css";

const thai = Noto_Sans_Thai({ variable: "--nf-thai", subsets: ["thai", "latin"], weight: ["400", "500", "600", "700"] });
const jp = Noto_Sans_JP({ variable: "--nf-jp", weight: ["400", "500", "700"], preload: false });
const kana = Klee_One({ variable: "--nf-kana", weight: ["400", "600"], preload: false });
/** Cute rounded display face for headings (supports Thai) */
const display = Mali({ variable: "--nf-display", subsets: ["thai", "latin"], weight: ["500", "600", "700"] });
/** Handwritten pencil-note face for annotations */
const hand = Sriracha({ variable: "--nf-hand", subsets: ["thai", "latin"], weight: "400" });

export const metadata: Metadata = {
  title: { default: "にほんご Tochigi — เรียนญี่ปุ่นวันละ 20 นาที", template: "%s · にほんご Tochigi" },
  description: "เรียนภาษาญี่ปุ่นจากศูนย์ วันละ 20 นาที เพื่อเที่ยวโทจิงิ ตุลาคม 2027",
};

export const viewport: Viewport = {
  themeColor: "#FFF9F0",
};

/** Applies the saved theme before first paint to avoid a light/dark flash. */
const themeScript = `(function(){try{var s=JSON.parse(localStorage.getItem(${JSON.stringify(
  STORAGE_KEY,
)})||"null");var t=s&&s.settings&&s.settings.themeChosen?s.settings.theme:"light";var d=t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);if(d)document.documentElement.classList.add("dark");}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${thai.variable} ${jp.variable} ${kana.variable} ${display.variable} ${hand.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
