async function consultPlanetData() {
  const linkAllPlanets = "https://swapi.dev/api/planets/?format=json"
  const request = await fetch(linkAllPlanets)
  if(request.ok){
    const jsonResponse = (await request.json()).results
    console.log (jsonResponse)
  }else{
    console.log (`Erro na requisição, código: ${request.status}`)
  }
}

consultPlanetData()