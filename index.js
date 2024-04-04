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
        const ul = document.createElement('ul')

        ul.innerHTML= 
          `
          <li>Nome: ${planet.name}</li>
          <li>Clima: ${planet.climate}</li>
          <li>População: ${planet.population}</li>
          <li>Terreno: ${planet.terrain}</li>
          `
          
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

generatePlanetsButton()