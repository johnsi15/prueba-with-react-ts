import { useState, useEffect } from 'react'
import { getImageCat } from '../services/cat'
import type { WordFact } from './useFact'

const URL_IMAGE_CAT = 'https://cataas.com'

interface CatImage {
  urlImage: string | null
}

export function useCat ({ fact }: WordFact): CatImage {
  const [urlImage, setUrlImage] = useState<null | string>(null)

  useEffect(() => {
    if (fact == null) return

    getImageCat({ fact })
      .then(urlCat => {
        setUrlImage(`${URL_IMAGE_CAT}/${urlCat}`)
      }).catch(err => { console.log(err) })
  }, [fact])

  return { urlImage }
}
