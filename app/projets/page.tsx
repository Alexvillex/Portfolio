'use client'

// --------------------------- Page Projets ---------------------------
// Affiche toutes les réalisations depuis data/projets.json
// Filtre Dev / Design · Grille responsive · Liens GitHub + Demo
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
  image?:      string         // chemin optionnel vers un visuel (projets design)
}

// --------------------------- Filtres ---------------------------
const FILTRES = [
  { label: 'Tout',   value: 'all'    },
  { label: 'Dev',    value: 'dev'    },
  { label: 'Design', value: 'design' },
]

// --------------------------- Composant ---------------------------
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
                {/* Image de preview pour les projets design */}
                {projet.image && (
                  <img
                    src={projet.image}
                    alt={`Aperçu ${projet.titre}`}
                    className={styles.cardImage}
                  />
                )}

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

                {/* Liens — GitHub pour dev, Demo/aperçu pour design */}
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