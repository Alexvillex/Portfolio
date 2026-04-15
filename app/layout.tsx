// --------------------------- Layout principal ---------------------------
// Structure commune à toutes les pages : Navbar + Footer
// Métadonnées SEO définies ici pour tout le site
// -----------------------------------------------------------------------

import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

// --------------------------- SEO ---------------------------

export const metadata: Metadata = {
  title:       'Alexis Villy — Développeur Full-Stack',
  description: 'Portfolio d\'Alexis Villy, développeur full-stack basé à Bordeaux. Python, Angular, React, TypeScript.',
}

// --------------------------- Composant ---------------------------

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>

        {/* --------------------------- Navbar --------------------------- */}
        <nav className="navbar">
          <Link href="/">
            <img src="/Logo_Blanc.png" className="nav-logo" alt="Logo Alexis Villy" />
          </Link>
          <div className="nav-links">
            <Link href="/experiences">Expériences</Link>
            <Link href="/projets">Projets</Link>
            <Link href="/contact" className="btn-primary">Contact</Link>
          </div>
        </nav>

        {/* Contenu de la page courante */}
        {children}

        {/* --------------------------- Footer --------------------------- */}
        <footer className="footer">
          <div className="footer-content">
            <span className="footer-logo">Alexis Villy</span>
            <p className="footer-copy">© 2026 — Développé avec Next.js &amp; Three.js</p>
            <div className="footer-links">
              <a href="https://github.com/Alexvillex" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/alexis-villy/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="mailto:alexisvilly.work@gmail.com">Email</a>
            </div>
          </div>
        </footer>

      </body>
    </html>
  )
}