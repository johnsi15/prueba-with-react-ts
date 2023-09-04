const URL_FACT = 'https://catfact.ninja/fact'
export function getRandomFact (): Promise<string> {
  return fetch(URL_FACT)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }

      return res.json()
    })
    .then(({ fact }) => {
      return fact
    })
    .catch(err => {
      console.log(err)
    })
}
