import { useState, useEffect } from 'react'
import { getRandomFact } from '../services/fact'

export interface WordFact {
  fact: string | null
  refreshFact?: () => void
}

export function useFact (): WordFact {
  const [fact, setFact] = useState<null | string>(null)

  const refreshFact = (): void => {
    getRandomFact()
      .then(fact => {
        if (typeof fact === 'string') {
          const firstWord = fact.split(' ', 3).join(' ')
          console.log(firstWord)
          setFact(firstWord)
        }
      }).catch(err => { console.log(err) })
  }

  useEffect(refreshFact, [])

  return { fact, refreshFact }
}
