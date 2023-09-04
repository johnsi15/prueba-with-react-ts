import { useEffect, useState } from 'react'
import type { MouseEventHandler } from 'react'
import './App.css'
import { getRandomFact } from './services/fact'
import { getImageCat } from './services/cat'
const URL_IMAGE_CAT = 'https://cataas.com'

interface WordFact {
  fact: string | null
  refreshFact?: () => void
}

interface CatImage {
  urlImage: string | null
}

function useFact (): WordFact {
  const [fact, setFact] = useState<null | string>(null)

  const refreshFact = (): void => {
    getRandomFact()
      .then(fact => {
        const firstWord = fact.split(' ', 3).join(' ')
        console.log(firstWord)
        setFact(firstWord)
      }).catch(err => { console.log(err) })
  }

  useEffect(refreshFact, [])

  return { fact, refreshFact }
}

function useCat ({ fact }: WordFact): CatImage {
  const [urlImage, setUrlImage] = useState<null | string>(null)

  useEffect(() => {
    if (fact == null) return

    getImageCat({ fact })
      .then(urlImage => {
        setUrlImage(urlImage)
      }).catch(err => { console.log(err) })
  }, [fact])

  return { urlImage }
}
function App (): JSX.Element {
  const { fact, refreshFact } = useFact()
  const { urlImage } = useCat({ fact })

  const getNewCat: MouseEventHandler<HTMLButtonElement> = () => {
    if (typeof refreshFact === 'function') {
      refreshFact()
    }
  }

  return (
    <main>
      {fact != null && <h2 className='fact'>This is a cat fact: {fact}</h2>}
      <button onClick={getNewCat} className='getCat'>Get New Cat</button>
      {urlImage != null && <img src={`${URL_IMAGE_CAT}/${urlImage}`} alt={urlImage} />}
    </main>
  )
}

export default App
