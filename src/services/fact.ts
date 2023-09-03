const URL_FACT = 'https://catfact.ninja/fact'
export async function getRandomFact (): Promise<string> {
  return await fetch(URL_FACT)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }

      const fact = await res.json()
      const firstWord = fact.split(' ', 3).join(' ')
      console.log(firstWord)
      // setFact(firstWord)
      // getCat({ fact: firstWord })
      return fact.fact
    })
    .catch(err => {
      console.log(err)
    })
}
