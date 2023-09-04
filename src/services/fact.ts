const URL_FACT = 'https://catfact.ninja/fact'
export async function getRandomFact (): Promise<string | unknown> {
  try {
    const res = await fetch(URL_FACT)
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    const { fact } = await res.json()
    return fact
  } catch (err) {
    console.log(err)
    return err
  }
}
