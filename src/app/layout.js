
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "HanaFlow - Manga Reader",
  description: "Browse and read manga from different sources",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <div className="flex-grow">
          {children}
        </div>
        
        <footer className="border-t border-[var(--slate-blue)] border-opacity-10 mt-8">
          <div className="container py-5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
              <div>
                <h2 className="text-base font-medium text-[var(--tropical-indigo)]">HanaFlow</h2>
                <p className="text-xs text-gray-500 mt-0.5">Manga browser</p>
              </div>
              
              <div className="flex flex-col items-center md:items-end">
                <p className="text-xs text-gray-500">© {new Date().getFullYear()} HanaFlow</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
