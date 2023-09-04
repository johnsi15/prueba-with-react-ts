import type { MouseEventHandler } from 'react'
import './App.css'
import { useFact } from './hooks/useFact'
import { useCat } from './hooks/useCat'

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
      {urlImage != null && <img src={urlImage} alt={urlImage} />}
    </main>
  )
}

export default App
