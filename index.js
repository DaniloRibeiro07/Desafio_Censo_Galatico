async function planetData() {
  const linkAllPlanets = "https://swapi.dev/api/planets/?format=json"
  const request = await fetch(linkAllPlanets)

  if(request.ok){
    const jsonResponse = (await request.json()).results
    console.log(jsonResponse)
    return (jsonResponse)
  }else{
    console.log (`Erro na requisição, código: ${request.status}`)
    return (false)
  }
}

async function consultResident(links){
  const list = document.createElement('dl')
  list.innerHTML = "<dt>Habitantes Famosos:</dt>"

  await new Promise((resolve, reject) => {
    let counter = links.length

    if(counter == 0 ){
      const listComponent = document.createElement('dd')
        listComponent.innerText = "Não Há"
        list.appendChild(listComponent)
        resolve()
    }

    links.forEach(async (link) => {
      const request = await fetch(link+"?format=json")
      if(request.ok){
        const jsonResponse = await request.json()
        const listComponent = document.createElement('dd')
        listComponent.innerText = `${jsonResponse.name}, ${jsonResponse.birth_year}`
        list.appendChild(listComponent)
        counter--
        if(counter == 0){
          resolve()
        }
      }else{
        console.log (`Erro na requisição, código: ${request.status}`)
        resolve()
        return (false)
      }

    });
  })
  
  return list.outerHTML

}

async function listPlanet(planet) {
  const ul = document.createElement('ul')

  ul.innerHTML = 
    `
    <li>Nome: ${planet.name}</li>
    <li>Clima: ${planet.climate}</li>
    <li>População: ${planet.population}</li>
    <li>Terreno: ${planet.terrain}</li>
    <li>
      ${await consultResident(planet.residents)}
    </li>
    `
  return ul
}

async function generatePlanetsButton (){
  const planets = await planetData()
  if (!planets) return;
  await planets.forEach(async (planet) => {
    const button = document.createElement('button')
    button.innerText = planet.name
    const div = document.createElement('div')
    const br = document.createElement('br')
    const br2 = document.createElement('br')

    button.onclick = async () => {
      if(div.innerHTML==""){
        const ul = await listPlanet(planet)
        div.append(ul)
      }else{
        div.innerHTML = ""
      }
    }

    Array(button, br, div, br2).forEach(elemnt => {
      document.body.appendChild(elemnt)
    })
  });
}

async function searchPlanet(){
  const planets = await planetData()
  const planetToSearch = document.getElementById("searchInput").value.toUpperCase()
  const divResultSearch = document.getElementById('resultSearch')

  const resultSearch = (planets.find(planet => (planet.name.toUpperCase() == planetToSearch)))

  divResultSearch.innerHTML = ""
  if(resultSearch){
    const ul = await listPlanet(resultSearch)
    divResultSearch.append(ul)
  }
  
}

generatePlanetsButton()

