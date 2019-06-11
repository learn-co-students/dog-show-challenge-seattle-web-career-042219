document.addEventListener('DOMContentLoaded', () => {
main()
})
 const URL = "http://localhost:3000/dogs"

 function main() {
   loadDogs()
 }

function loadDogs() {
  fetch(URL)
  .then(res => res.json())
  .then(dogs => {
    displayDogs(dogs)
    console.log(dogs)
  })
  .catch(err => {
    console.log('Error: ', err)
  })
}

function displayDogs(dogs) {
  dogs.forEach(dog => {
    displayDog(dog)
  })
}

function displayNewDogs(dogs, newDog) {
  let dogId = newDog.id
  dogs[dogId] = newDog
  dogs.forEach(dog => {
    displayDog(dog)
  })
}

function displayDog(dog) {

  let tr = document.createElement('tr')
  let name = document.createElement('td')
  let breed = document.createElement('td')
  let sex = document.createElement('td')
  let td = document.createElement('td')
  let editButton = document.createElement('button')
  let table = document.getElementById('table-body')

  editButton.textContent= "Edit Dog"
  name.textContent = dog.name
  breed.textContent = dog.breed
  sex.textContent = dog.sex

  tr.appendChild(name)
  tr.appendChild(breed)
  tr.appendChild(sex)
  td.appendChild(editButton)
  tr.appendChild(td)
  table.appendChild(tr)

  editButton.addEventListener('click', (ev) => {
    populateDog(ev.target.parentElement.parentElement, dog)
  })
}

function populateDog(row, dog) {

  let form = document.getElementById('dog-form')
  let dogName = document.querySelector('[name= "name"]')
  let dogBreed = document.querySelector('[name= "breed"]')
  let dSex = document.querySelector('[name= "sex"]')
  let submitButton = document.querySelector('input[type= submit]')

  dogName.value = dog.name
  dogBreed.value = dog.breed
  dSex.value = dog.sex

  submitButton.addEventListener('click', (ev) => {
    ev.preventDefault()
    updateDog(row, dog)
  })
}

function updateDog(row, dog) {

  let values = {name: document.querySelector('[name= "name"]').value, breed: document.querySelector('[name= "breed"]').value, sex: document.querySelector('[name= "sex"]').value}
  console.log(document.querySelector('[name= "name"]').value)
  let config = {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(values)
  }
  fetch(URL + '/' + dog.id, config)
  .then(res => res.json())
  .then(json => {
    row.children[0].textContent = json.name
    row.children[1].textContent = json.breed
    row.children[2].textContent = json.sex

  })
  .catch(err => {
    console.log('Update Error: ', err)
  })
}
