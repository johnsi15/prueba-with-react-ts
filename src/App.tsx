import { useEffect, useState } from 'react'
import './App.css'

const URL_FACT = 'https://catfact.ninja/fact'
const URL_IMAGE_CAT = 'https://cataas.com'

function App (): JSX.Element {
  const [fact, setFact] = useState<null | string>(null)
  const [urlImage, setUrlImage] = useState<null | string>(null)

  const getFact = async (): Promise<void> => {
    fetch(URL_FACT)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }

        return await res.json()
      })
      .then(({ fact }: { fact: string }) => {
        // console.log({ fact })
        const firstWord = fact.split(' ').slice(0, 3).join(' ')
        console.log(firstWord)
        setFact(firstWord)
        getCat({ fact: firstWord })
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getCat = ({ fact }: { fact: string }): void => {
    console.log(fact)

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
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getFact().catch(err => { console.log(err) })
  }, [])
  return (
    <main>
      <h2>La palabra es: {fact}</h2>
      {urlImage != null && <img src={`${URL_IMAGE_CAT}/${urlImage}`} alt={urlImage} />}
    </main>
  )
}

export default App
