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
  console.log( (await (links.map(async (link) => {
    const request = await fetch(link+"?format=json")
    if(request.ok){
      const jsonResponse = await request.json()
      return(jsonResponse)
    }else{
      console.log (`Erro na requisição, código: ${request.status}`)
      return (false)
    }
  }) )));
}

function listPlanet(planet) {
  const ul = document.createElement('ul')

  ul.innerHTML = 
    `
    <li>Nome: ${planet.name}</li>
    <li>Clima: ${planet.climate}</li>
    <li>População: ${planet.population}</li>
    <li>Terreno: ${planet.terrain}</li>
    `
  consultResident(planet.residents)
  return ul
}

async function generatePlanetsButton (){
  const planets = await planetData()
  if (!planets) return;

  planets.forEach(planet => {
    const button = document.createElement('button')
    button.innerText = planet.name
    const div = document.createElement('div')
    const br = document.createElement('br')
    const br2 = document.createElement('br')

    button.onclick = () => {
      if(div.innerHTML==""){
        const ul = listPlanet(planet)
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
    const ul = listPlanet(resultSearch)
    divResultSearch.append(ul)
  }
  
}

generatePlanetsButton()

