'use client'
import styles from './page.module.css'
import dynamic from 'next/dynamic'
import projectsData from '../data/projets.json'

const HeroScene = dynamic(() => import('./components/HeroScene'), { ssr: false })

interface Project {
  titre: string
  description: string
  tags?: string[]
  categorie?: string
  statut?: string
  github?: string
  demo?: string
}

export default function Home() {
  const featuredProjects = projectsData.slice(0, 3)

  return (
    <main>
      <HeroScene />

      {/* ========== HERO ========== */}
      <section id="hero" className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.label}>Salut, Moi c&apos;est</p>
          <h1 className={styles.h1}>Alexis Villy</h1>
          <p className={styles.heroTitre}>Développeur Full-Stack</p>
          <p className={styles.accroche}>
            Basé à Bordeaux, je conçois des applications web complètes — du backend Python
            à l&apos;interface Angular — avec une sensibilité design héritée de mon profil hybride dev/graphiste.
          </p>
          <div className={styles.liens}>
            <a href="https://github.com/Alexvillex" target="_blank" className={styles.btnSecondary}>GitHub</a>
            <a href="https://www.linkedin.com/in/alexis-villy/" target="_blank" className={styles.btnSecondary}>LinkedIn</a>
            <a href="mailto:alexisvilly.work@gmail.com" className={styles.btnPrimary}>Me contacter</a>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img src="/NZ6_2709.png" alt="Alexis Villy" />
          <div className={styles.heroBadge}>
            <span className={styles.badgeDot}></span>
            <div>
              <div className={styles.badgeText}>Disponible</div>
              <div className={styles.badgeSub}>Alternance · 2026</div>
            </div>
          </div>
        </div>
        <div className={styles.shape1}></div>
        <div className={styles.shape2}></div>
        <div className={styles.shape3}></div>
        <div className={styles.shape4}></div>
      </section>

      {/* ========== STATS ========== */}
      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <span className={styles.statNum}>2+</span>
          <span className={styles.statLabel}>Années d&apos;expérience</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>5</span>
          <span className={styles.statLabel}>Projets livrés</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>8</span>
          <span className={styles.statLabel}>Technologies</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>Bac+5</span>
          <span className={styles.statLabel}>MPWD · CESI</span>
        </div>
      </div>

      {/* ========== COMPÉTENCES ========== */}
      <section id="competences" className={styles.section}>
        <p className={styles.label}>CE QUE JE MAÎTRISE</p>
        <h2 className={styles.sectionTitre}>Compétences</h2>
        <div className={styles.tagsGrid}>
          <span className={styles.tag}>Python</span>
          <span className={styles.tag}>JavaScript</span>
          <span className={styles.tag}>TypeScript</span>
          <span className={styles.tag}>Angular</span>
          <span className={styles.tag}>React</span>
          <span className={styles.tag}>C#</span>
          <span className={styles.tag}>PHP</span>
          <span className={styles.tag}>SQL</span>
          <span className={styles.tag}>Docker</span>
          <span className={styles.tag}>Git</span>
          <span className={styles.tag}>Unity</span>
          <span className={styles.tag}>Figma</span>
        </div>
      </section>

      {/* ========== À PROPOS ========== */}
      <section id="apropos" className={styles.section}>
        <p className={styles.label}>PROFIL</p>
        <h2 className={styles.sectionTitre}>À propos</h2>
        <div className={styles.aboutGrid}>
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
          <div className={styles.aboutSkills}>
            <div className={styles.skillRow}>
              <div className={styles.skillRowLabel}>{'// Backend'}</div>
              <div className={styles.skillTags}>
                {['Python', 'FastAPI', 'Django', 'PHP', 'Symfony', 'SQL'].map(s => (
                  <span key={s} className={styles.skillTag}>{s}</span>
                ))}
              </div>
            </div>
            <div className={styles.skillRow}>
              <div className={styles.skillRowLabel}>{'// Frontend'}</div>
              <div className={styles.skillTags}>
                {['Angular', 'React', 'TypeScript', 'Three.js', 'CSS'].map(s => (
                  <span key={s} className={`${styles.skillTag} ${styles.skillTagRose}`}>{s}</span>
                ))}
              </div>
            </div>
            <div className={styles.skillRow}>
              <div className={styles.skillRowLabel}>{'// Outils & IA'}</div>
              <div className={styles.skillTags}>
                {['Docker', 'Git', 'API Claude', 'Figma', 'Unity'].map(s => (
                  <span key={s} className={`${styles.skillTag} ${styles.skillTagIndigo}`}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROJETS MIS EN AVANT ========== */}
      <section id="projets-featured" className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.projectsHeader}>
          <div>
            <p className={styles.label}>RÉALISATIONS</p>
            <h2 className={styles.sectionTitre}>Projets récents</h2>
          </div>
          <a href="/projets" className={styles.btnSecondary}>Voir tout →</a>
        </div>
        <div className={styles.projectsGrid}>
          {featuredProjects.map((project: Project, i: number) => (
            <div key={project.titre} className={`${styles.projectCard} ${i === 0 ? styles.projectCardFeatured : ''}`}>
              {i === 0 && <span className={styles.featuredBadge}>Featured</span>}
              <div className={styles.projectTag}>{project.categorie ?? 'Projet'}</div>
              <h3 className={styles.projectTitle}>{project.titre}</h3>
              <p className={styles.projectDesc}>{project.description}</p>
              <div className={styles.projectStack}>
                {(project.tags ?? []).map((t: string) => (
                  <span key={t} className={styles.stackBadge}>{t}</span>
                ))}
              </div>
              <div className={styles.projectLinks}>
                {project.github && (
                  <a href={project.github} target="_blank" className={styles.projectLink}>
                    GitHub →
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" className={styles.projectLink}>
                    Demo →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== CTA CONTACT ========== */}
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
            <a href="/cv-alexis-villy.pdf" download className={styles.btnSecondary}>
              Télécharger mon CV
            </a>
          </div>
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