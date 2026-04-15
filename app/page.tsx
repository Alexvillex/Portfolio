'use client'

// ============================================================
// Page d'accueil — Landing principale du portfolio
// Stack : Next.js · TypeScript · Three.js · CSS Modules
// ============================================================

import styles from './page.module.css'
import dynamic from 'next/dynamic'
import projectsData from '../data/projets.json'

// Chargement dynamique de la scène Three.js (pas de SSR — WebGL côté client uniquement)
const HeroScene = dynamic(() => import('./components/HeroScene'), { ssr: false })

// --------------- Types ---------------------------// 
interface Project {
  titre: string
  description: string
  tags?: string[]
  categorie?: string
  statut?: string
  github?: string
  demo?: string
}

// ---------------- Données statiques --------------------------- //

// Compétences organisées par catégorie pour la section À propos
const SKILLS = {
  backend: ['Python', 'FastAPI', 'Django', 'PHP', 'Symfony', 'SQL'],
  frontend: ['Angular', 'React', 'TypeScript', 'Three.js', 'CSS'],
  outils: ['Docker', 'Git', 'API Claude', 'Figma', 'Unity'],
}

// Tags affichés dans la section Compétences
const TAGS = ['Python', 'JavaScript', 'TypeScript', 'Angular', 'React', 'C#', 'PHP', 'SQL', 'Docker', 'Git', 'Unity', 'Figma']
// Calcul dynamique des projets terminés depuis le JSON
const projetsTermines = (projectsData as Project[]).filter(p => p).length
// Stats affichées sous le hero
const STATS = [
  { num: '2+', label: "Années d'expérience" },
  { num: String(projetsTermines),  label: 'Projets' },
  { num: '8',  label: 'Technologies' },
  { num: 'Bac+5', label: 'MPWD · CESI' },
]

// ---------------- Composant principal --------------------------- //

export default function Home() {
  // On affiche uniquement les 3 premiers projets en featured
  const featuredProjects = projectsData.slice(0, 3) as Project[]

  return (
    <main>
      {/* Scène Three.js en fond fixe — particules + constellation */}
      <HeroScene />

      {/* ---------------- HERO --------------------------- */}
      <section id="hero" className={styles.hero}>

        {/* Contenu textuel gauche */}
        <div className={styles.heroContent}>
          <p className={styles.label}>Salut, Moi c&apos;est</p>
          <h1 className={styles.h1}>Alexis Villy</h1>
          <p className={styles.heroTitre}>Développeur Full-Stack</p>
          <p className={styles.accroche}>
            Basé à Bordeaux, je conçois des applications web complètes — du backend Python
            à l&apos;interface Angular — avec une sensibilité design héritée de mon profil hybride dev/graphiste.
          </p>
          <div className={styles.liens}>
            <a href="https://github.com/Alexvillex" target="_blank" rel="noreferrer" className={styles.btnSecondary}>GitHub</a>
            <a href="https://www.linkedin.com/in/alexis-villy/" target="_blank" rel="noreferrer" className={styles.btnSecondary}>LinkedIn</a>
            <a href="mailto:alexisvilly.work@gmail.com" className={styles.btnPrimary}>Me contacter</a>
          </div>
        </div>

        {/* Photo + badge disponibilité */}
        <div className={styles.heroImage}>
          <img src="/NZ6_2709.png" alt="Photo d'Alexis Villy" />
          <div className={styles.heroBadge}>
            <span className={styles.badgeDot} />
            <div>
              <div className={styles.badgeText}>Disponible</div>
              <div className={styles.badgeSub}>Alternance · 2026</div>
            </div>
          </div>
        </div>

        {/* Formes décoratives animées */}
        <div className={styles.shape1} />
        <div className={styles.shape3} />
        <div className={styles.shape4} />
      </section>

      {/* --------------------------- STATS --------------------------- */}
      <div className={styles.statsBar}>
        {STATS.map(({ num, label }) => (
          <div key={label} className={styles.statItem}>
            <span className={styles.statNum}>{num}</span>
            <span className={styles.statLabel}>{label}</span>
          </div>
        ))}
      </div>

      {/* --------------------------- COMPÉTENCES --------------------------- */}
      <section id="competences" className={styles.section}>
        <p className={styles.label}>CE QUE JE MAÎTRISE</p>
        <h2 className={styles.sectionTitre}>Compétences</h2>
        <div className={styles.tagsGrid}>
          {TAGS.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </section>

      {/* --------------------------- À PROPOS --------------------------- */}
      <section id="apropos" className={styles.section}>
        <p className={styles.label}>PROFIL</p>
        <h2 className={styles.sectionTitre}>À propos</h2>
        <div className={styles.aboutGrid}>

          {/* Texte narratif */}
          <div className={styles.aboutText}>
            <p>
              Je suis <strong>développeur full-stack</strong> avec un double profil : technique et créatif.
              Formé au CESI en Management de Projet Web Digital (Bac+5), j&apos;ai consolidé mes compétences
              à travers des expériences en entreprise, des projets personnels ambitieux et une activité
              freelance en design graphique.
            </p>
            <p>
              Aujourd&apos;hui je cherche une <strong>alternance développeur</strong> pour intégrer une équipe
              technique sur des projets concrets. Mon approche : apprendre par le code, pas par les cours.
            </p>
            <blockquote className={styles.aboutQuote}>
              &ldquo;Je construis des projets réels pour apprendre — un portfolio, un outil de veille IA,
              un dashboard de monitoring réseau.&rdquo;
            </blockquote>
            <p>
              En dehors du code, je travaille en <strong>micro-entrepreneur</strong> sur des missions de
              design graphique : chartes visuelles, mémoires techniques, identité de marque. Cette double
              casquette me permet d&apos;avoir une vision produit rare chez un développeur junior.
            </p>
          </div>

          {/* Compétences catégorisées */}
          <div className={styles.aboutSkills}>
            <div className={styles.skillRow}>
              <div className={styles.skillRowLabel}>{'// Backend'}</div>
              <div className={styles.skillTags}>
                {SKILLS.backend.map(s => (
                  <span key={s} className={styles.skillTag}>{s}</span>
                ))}
              </div>
            </div>
            <div className={styles.skillRow}>
              <div className={styles.skillRowLabel}>{'// Frontend'}</div>
              <div className={styles.skillTags}>
                {SKILLS.frontend.map(s => (
                  <span key={s} className={`${styles.skillTag} ${styles.skillTagRose}`}>{s}</span>
                ))}
              </div>
            </div>
            <div className={styles.skillRow}>
              <div className={styles.skillRowLabel}>{'// Outils & IA'}</div>
              <div className={styles.skillTags}>
                {SKILLS.outils.map(s => (
                  <span key={s} className={`${styles.skillTag} ${styles.skillTagIndigo}`}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- PROJETS FEATURED --------------------------- */}
      <section id="projets-featured" className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.projectsHeader}>
          <div>
            <p className={styles.label}>RÉALISATIONS</p>
            <h2 className={styles.sectionTitre}>Projets récents</h2>
          </div>
          <a href="/projets" className={styles.btnSecondary}>Voir tout →</a>
        </div>

        <div className={styles.projectsGrid}>
          {featuredProjects.map((project, i) => (
            <div
              key={project.titre}
              className={`${styles.projectCard} ${i === 0 ? styles.projectCardFeatured : ''}`}
            >
              {/* Badge "Featured" sur la première carte uniquement */}
              {i === 0 && <span className={styles.featuredBadge}>Featured</span>}

              <div className={styles.projectTag}>{project.categorie ?? 'Projet'}</div>
              <h3 className={styles.projectTitle}>{project.titre}</h3>
              <p className={styles.projectDesc}>{project.description}</p>

              {/* Stack technique */}
              <div className={styles.projectStack}>
                {(project.tags ?? []).map(t => (
                  <span key={t} className={styles.stackBadge}>{t}</span>
                ))}
              </div>

              {/* Liens — GitHub et/ou Demo si disponibles */}
              <div className={styles.projectLinks}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className={styles.projectLink}>
                    GitHub →
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer" className={styles.projectLink}>
                    Demo →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --------------------------- CTA CONTACT --------------------------- */}
      <section id="contact" className={`${styles.section} ${styles.ctaSection}`}>
        <div className={styles.ctaInner}>
          <p className={styles.label} style={{ justifyContent: 'center', display: 'flex' }}>CONTACT</p>
          <h2 className={styles.ctaTitle}>
            Construisons quelque chose<br />
            <span className={styles.ctaTitleAccent}>ensemble</span>
          </h2>
          <p className={styles.ctaDesc}>
            Je recherche une alternance développeur à partir de septembre 2026.
            Vous avez un projet, une équipe, une mission ? Discutons-en.
          </p>

          <div className={styles.ctaRow}>
            <a href="mailto:alexisvilly.work@gmail.com" className={styles.btnPrimary}>
              M&apos;envoyer un message
            </a>
            {/* TODO : remplacer le href par le vrai chemin du CV une fois uploadé dans /public */}
            <a href="/cv-alexis-villy.pdf" download className={styles.btnSecondary}>
              Télécharger mon CV
            </a>
          </div>

          {/* Infos de contact rapides */}
          <div className={styles.contactInfoRow}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Email</span>
              <span className={styles.contactValue}>alexisvilly.work@gmail.com</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Localisation</span>
              <span className={styles.contactValue}>Bordeaux, France</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Disponibilité</span>
              <span className={styles.contactValue}>Sept. 2026</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Statut</span>
              <span className={`${styles.contactValue} ${styles.contactValueGreen}`}>Ouvert aux offres</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}