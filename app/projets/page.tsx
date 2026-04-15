// --------------------------- Page Projets ---------------------------
// Affiche toutes les réalisations depuis data/projets.json
// Grille 2 colonnes · Liens GitHub + Demo conditionnels
// --------------------------------------------------------------------

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
  statut:      string
  github:      string
  demo:        string
}

// --------------------------- Composant ---------------------------

export default function Projets() {
  const projets = projetsData as Projet[]

  return (
    <main>
      <section className={styles.section}>
        <p className={styles.label}>MES RÉALISATIONS</p>
        <h1 className={styles.titre}>Projets</h1>

        <div className={styles.grid}>
          {projets.map((projet) => (
            <div key={projet.id} className={styles.card}>

              {/* En-tête — catégorie + statut */}
              <div className={styles.cardHeader}>
                <span className={styles.type}>{projet.categorie}</span>
                <span className={styles.statut}>{projet.statut}</span>
              </div>

              {/* Contenu principal */}
              <h2 className={styles.cardTitre}>{projet.titre}</h2>
              <p className={styles.tagline}>{projet.tagline}</p>
              <p className={styles.description}>{projet.description}</p>

              {/* Stack technique */}
              <div className={styles.tags}>
                {projet.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>

              {/* Liens — GitHub toujours présent, Demo conditionnel */}
              <div className={styles.liens}>
                <a href={projet.github} target="_blank" rel="noreferrer" className={styles.btnGithub}>
                  GitHub
                </a>
                {projet.demo && (
                  <a href={projet.demo} target="_blank" rel="noreferrer" className={styles.btnDemo}>
                    Demo
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>
      </section>
    </main>
  )
}