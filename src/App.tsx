import { useEffect, useState } from 'react'
import type { MouseEventHandler } from 'react'
import './App.css'
import { getRandomFact } from './services/fact'
import { getCat } from './services/cat'
const URL_IMAGE_CAT = 'https://cataas.com'

function App (): JSX.Element {
  const [fact, setFact] = useState<null | string>(null)
  const [urlImage, setUrlImage] = useState<null | string>(null)

  const getFact = (): void => {
    getRandomFact()
      .then(newFact => {
        setFact(newFact)
        getCat({ fact: newFact })
          .then(data => {
            console.log(data)
            setUrlImage(data)
          }).catch(err => { console.log(err) })
      }).catch(err => { console.log(err) })
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
