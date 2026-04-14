import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Alexis Villy - Développeur Full-Stack",
  description: "Portfolio D'Alexis Villy, développeur full-stack basé sur la Gironde",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <nav className="navbar">
          <Link href="/">
            <img src={"/Logo_Blanc.png"} className="nav-logo" alt="Logo de Alexis Villy et AlexVillex" />
          </Link>
          <div className="nav-links">
            <Link href="/experiences">Expériences</Link>
            <Link href="/projets">Projets</Link>
            <Link href="/contact" className="btn-primary">Contact</Link>
          </div>
        </nav>
        {children}
        <footer className="footer">
          <div className="footer-content">
            <span className="footer-logo">Alexis Villy</span>
            <p className="footer-copy">© 2026 — Développé avec Next.js & Three.js</p>
            <div className="footer-links">
              <a href="https://github.com/Alexvillex" target="_blank">GitHub</a>
              <a href="https://www.linkedin.com/in/alexis-villy/" target="_blank">LinkedIn</a>
              <a href="mailto:alexisvilly.work@gmail.com">Email</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
