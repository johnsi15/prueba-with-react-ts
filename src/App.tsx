import { useEffect, useState } from 'react'
import type { MouseEventHandler } from 'react'
import './App.css'

const URL_FACT = 'https://catfact.ninja/fact'
const URL_IMAGE_CAT = 'https://cataas.com'

function App (): JSX.Element {
  const [fact, setFact] = useState<null | string>(null)
  const [urlImage, setUrlImage] = useState<null | string>(fact)

  const getFact = (): void => {
    fetch(URL_FACT)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }

        return await res.json()
      })
      .then(({ fact }: { fact: string }) => {
        // console.log({ fact })
        const firstWord = fact.split(' ', 3).join(' ')
        console.log(firstWord)
        // setFact(firstWord)
        getCat({ fact: firstWord })
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getCat = ({ fact }: { fact: string }): void => {
    fetch(`${URL_IMAGE_CAT}/cat/says/${fact}?json=true`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }

        return await res.json()
      })
      .then(({ url }) => {
        console.log({ url })
        setUrlImage(url)
        setFact(fact)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (fact == null) return

    getFact()
    // console.log('load...')
  }, [])

  const getNewCat: MouseEventHandler<HTMLButtonElement> = () => {
    getFact()
  }

  return (
    <main>
      {fact != null && <h2 className='fact'>This is a cat fact: {fact}</h2>}
      {urlImage != null && <img src={`${URL_IMAGE_CAT}/${urlImage}`} alt={urlImage} />}

      <button onClick={getNewCat} className='getCat'>Get New Cat</button>
    </main>
  )
}

export default App
