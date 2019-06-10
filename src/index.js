const DOG_URL = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {

  function main() {
    fetchDogs()
    addListeners()
  }

  main()


  function fetchDogs() {
    fetch(DOG_URL)
    .then(resp => resp.json())
    .then(json => {
      displayDogs(json)
    })
  }

  function fetchEditDog(name, breed, sex, dog_id, tr) {
    let payload = {name: name, breed: breed, sex: sex}
    let config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    }
    fetch(DOG_URL + `/${dog_id}`, config)
    .then(resp => resp.json())
    .then(json => {
        tr.children[0].textContent = name
        tr.children[1].textContent = breed
        tr.children[2].textContent = sex
    })
  }

  function addListeners() {
    let table = document.getElementById('table-body')
    let form = document.getElementById('dog-form')


    form.addEventListener('submit', (ev) => {
      ev.preventDefault()

      let dog_id = ev.target.attributes[2].value
      let name = ev.target.elements["name"].value
      let breed = ev.target.elements["breed"].value
      let sex = ev.target.elements["sex"].value
      fetchEditDog(name, breed, sex, ev.target.attributes[2].value, table.children[dog_id-1])
    })
  }

  function displayDog(dog) {
    let table = document.getElementById('table-body')
    let tr = document.createElement('tr')
    tr.setAttribute('table-dog_id', dog.id)
    table.appendChild(tr)
    let td1 = document.createElement('td')
    let td2 = document.createElement('td')
    let td3 = document.createElement('td')
    let td4 = document.createElement('td')
    let button = document.createElement('button')

    td1.setAttribute('name-dog_id', dog.id)
    td2.setAttribute('breed-dog-id', dog.id)
    td3.setAttribute('sex-dog-id', dog.id)

    td4.appendChild(button)

    button.textContent = "Edit Dog"
    button.addEventListener('click', () => {
      let formName = document.getElementById('edit-name')
      let formBreed = document.getElementById('edit-breed')
      let formSex = document.getElementById('edit-sex')
      

      formName.value = td1.textContent
      formBreed.value = td2.textContent
      formSex.value = td3.textContent

      let form = document.getElementById('dog-form')
      form.setAttribute('dog-id', dog.id)


    })

    td1.textContent = dog.name
    td2.textContent = dog.breed
    td3.textContent = dog.sex

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)


  }

  function displayDogs(json) {
    json.forEach((dog) => {
      displayDog(dog)
    })
  }








})
