const URL_IMAGE_CAT = 'https://cataas.com'

interface Fact {
  fact: string
}
export async function getCat ({ fact }: Fact): Promise<string> {
  return await fetch(`${URL_IMAGE_CAT}/cat/says/${fact}?json=true`)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }

      return await res.json()
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
