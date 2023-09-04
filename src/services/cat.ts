const URL_IMAGE_CAT = 'https://cataas.com'

interface Fact { fact: string | null }

export function getImageCat ({ fact }: Fact): Promise<string> {
  return fetch(`${URL_IMAGE_CAT}/cat/says/${fact}?json=true`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }

      return res.json()
    })
    .then(({ url }) => {
      console.log({ url })
      // setUrlImage(url)
      // setFact(fact)
      return url
    })
    .catch(err => {
      console.log(err)
    })
}
