// --------------------------- Page Veille Technologique ---------------------------
// Consomme l'API FastAPI pour afficher les articles scorés par Mistral
// Filtrables par catégorie · Triés par pertinence
// ---------------------------------------------------------------------------------

'use client'

import { useEffect, useState } from 'react'
import styles from './veille.module.css'

// --------------------------- Types ---------------------------

interface Article {
  id:        number
  titre:     string
  lien:      string
  source:    string
  categorie: string
  resume:    string
  score:     number
  date:      string
}

// --------------------------- Constantes ---------------------------

const CATEGORIES = ['Tout', 'Dev', 'IA', 'Cybersécurité', 'Actus Tech']

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

// --------------------------- Composant ---------------------------

export default function Veille() {
  const [articles, setArticles]       = useState<Article[]>([])
  const [loading, setLoading]         = useState(true)
  const [erreur, setErreur]           = useState(false)
  const [categorie, setCategorie]     = useState('Tout')

useEffect(() => {
  const controller = new AbortController()

  setLoading(true)
  setErreur(false)

  const url = categorie === 'Tout'
    ? `${API_URL}/articles?limit=20&score_min=6`
    : `${API_URL}/articles?limit=20&score_min=6&categorie=${encodeURIComponent(categorie)}`

  fetch(url, { signal: controller.signal })
    .then(res => res.json())
    .then(data => {
      setArticles(data)
      setLoading(false)
    })
    .catch(err => {
      if (err.name === 'AbortError') return
      setErreur(true)
      setLoading(false)
    })

  return () => controller.abort()
}, [categorie])

  return (
    <main>
      <section className={styles.section}>
        <p className={styles.label}>VEILLE TECHNOLOGIQUE</p>
        <h1 className={styles.titre}>Articles du moment</h1>
        <p className={styles.intro}>
          Articles tech scorés par Mistral — triés par pertinence pour un développeur full-stack.
        </p>

        {/* --------------------------- Filtres --------------------------- */}
        <div className={styles.filtres}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategorie(cat)}
              className={`${styles.filtre} ${categorie === cat ? styles.filtreActif : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --------------------------- États --------------------------- */}
        {loading && <p className={styles.state}>Chargement des articles...</p>}
        {erreur  && (
          <p className={styles.stateError}>
            L&apos;API de veille est hors ligne. Lance le backend FastAPI.
          </p>
        )}

        {/* --------------------------- Grille d'articles --------------------------- */}
        {!loading && !erreur && (
          <>
            <p className={styles.count}>{articles.length} article{articles.length > 1 ? 's' : ''}</p>
            <div className={styles.grid}>
              {articles.map(article => (
                <div key={article.id} className={styles.card}>

                  {/* En-tête — source + score */}
                  <div className={styles.cardHeader}>
                    <span className={styles.source}>{article.source}</span>
                    <span className={styles.score}>{article.score}/10</span>
                  </div>

                  {/* Titre */}
                  <h2 className={styles.cardTitre}>{article.titre}</h2>

                  {/* Résumé généré par Mistral */}
                  <p className={styles.resume}>{article.resume}</p>

                  {/* Footer — date + lien */}
                  <div className={styles.cardFooter}>
                    <span className={styles.date}>
                      {new Date(article.date).toLocaleDateString('fr-FR')}
                    </span>
                    <a
                      href={article.lien}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.lire}
                    >
                      Lire l&apos;article →
                    </a>
                  </div>

                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  )
}