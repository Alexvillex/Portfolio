'use client'

// --------------------------- Page Projets ---------------------------
// Affiche toutes les réalisations depuis data/projets.json
// Filtre Dev / Design · Carrousel intégré · Liens GitHub + Demo
// --------------------------------------------------------------------

import { useState } from 'react'
import styles from './projets.module.css'
import projetsData from '../../data/projets.json'

// --------------------------- Types ---------------------------
interface Projet {
  id:          number
  titre:       string
  tagline:     string
  description: string
  tags:        string[]
  categorie:   string
  type:        string
  filtre:      string   // 'dev' | 'design'
  statut:      string
  github?:     string
  demo?:       string
  image?:      string    // image unique
  images?:     string[]  // tableau pour le carrousel
}

// --------------------------- Filtres ---------------------------
const FILTRES = [
  { label: 'Tout',   value: 'all'    },
  { label: 'Dev',    value: 'dev'    },
  { label: 'Design', value: 'design' },
]

// --------------------------- Sous-composant Carrousel ---------------------------
function CardCarousel({ projet }: { projet: Projet }) {
  const allImages: string[] = projet.images
    ? projet.images
    : projet.image
      ? [projet.image]
      : []

  const [current, setCurrent] = useState(0)
  const hasCarousel = allImages.length > 1

  if (allImages.length === 0) return null

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrent(i => (i - 1 + allImages.length) % allImages.length)
  }

  const next = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrent(i => (i + 1) % allImages.length)
  }

  return (
    <div className={styles.carousel}>
      <img
        src={allImages[current]}
        alt={`${projet.titre} — visuel ${current + 1}`}
        className={styles.carouselImg}
      />

      {hasCarousel && (
        <>
          <button className={`${styles.carouselBtn} ${styles.carouselBtnPrev}`} onClick={prev}>‹</button>
          <button className={`${styles.carouselBtn} ${styles.carouselBtnNext}`} onClick={next}>›</button>

          <div className={styles.dots}>
            {allImages.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
              />
            ))}
          </div>

          <span className={styles.counter}>{current + 1} / {allImages.length}</span>
        </>
      )}
    </div>
  )
}

// --------------------------- Composant principal ---------------------------
export default function Projets() {
  const projets = projetsData as Projet[]
  const [filtre, setFiltre] = useState<string>('all')

  const projetsFiltres = filtre === 'all'
    ? projets
    : projets.filter(p => p.filtre === filtre)

  return (
    <main>
      <section className={styles.section}>
        <p className={styles.label}>MES RÉALISATIONS</p>
        <h1 className={styles.titre}>Projets</h1>

        {/* Filtres */}
        <div className={styles.filters}>
          {FILTRES.map(f => (
            <button
              key={f.value}
              className={`${styles.filterBtn} ${filtre === f.value ? styles.filterBtnActive : ''}`}
              onClick={() => setFiltre(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {projetsFiltres.map((projet) => {
            const isDesign = projet.filtre === 'design'
            return (
              <div
                key={projet.id}
                className={`${styles.card} ${isDesign ? styles.cardDesign : ''}`}
              >
                {/* Carrousel ou image unique */}
                <CardCarousel projet={projet} />

                {/* En-tête — catégorie + statut */}
                <div className={styles.cardHeader}>
                  <span className={`${styles.type} ${isDesign ? styles.typeDesign : ''}`}>
                    {projet.categorie}
                  </span>
                  <span className={styles.statut}>{projet.statut}</span>
                </div>

                {/* Contenu principal */}
                <h2 className={styles.cardTitre}>{projet.titre}</h2>
                <p className={styles.tagline}>{projet.tagline}</p>
                <p className={styles.description}>{projet.description}</p>

                {/* Stack / outils */}
                <div className={styles.tags}>
                  {projet.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>

                {/* Liens */}
                <div className={styles.liens}>
                  {projet.github && (
                    <a href={projet.github} target="_blank" rel="noreferrer" className={styles.btnGithub}>
                      GitHub
                    </a>
                  )}
                  {projet.demo && (
                    <a href={projet.demo} target="_blank" rel="noreferrer" className={styles.btnDemo}>
                      {isDesign ? 'Voir le projet' : 'Demo'}
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}