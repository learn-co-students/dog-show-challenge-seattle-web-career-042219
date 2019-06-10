const URL = "http://localhost:3000/dogs";

document.addEventListener('DOMContentLoaded', () => {
  main();
})

function main() {
  loadDogs();
  const dogForm = document.getElementById("dog-form");
}

function loadDogs() {
  fetch(URL)
  .then(resp => resp.json())
  .then(json => displayDogs(json))
}

function displayDogs(dogs) {
  dogs.forEach(dog => displayDog(dog));
}

function displayDog(dog) {
  const table = document.querySelector("table");
  const row = document.createElement("tr");
  const name = document.createElement("td");
  name.textContent = dog.name;
  const breed = document.createElement("td");
  breed.textContent = dog.breed;
  const sex = document.createElement("td");
  sex.textContent = dog.sex;
  const edit = document.createElement("td");
  const editButton = document.createElement("button");
  editButton.textContent = "Edit Dog";
  editButton.addEventListener('click', function(event) {
    editDog(event, dog);
  });
  edit.appendChild(editButton);
  row.appendChild(name);
  row.appendChild(breed);
  row.appendChild(sex);
  row.appendChild(edit);
  table.appendChild(row);
}

function editDog(event, dog) {
  event.preventDefault();
  const dogForm = document.getElementById("dog-form");
  const nameInput = dogForm.querySelector("input[name='name']");
  nameInput.value = dog.name;
  const breedInput = dogForm.querySelector("input[name='breed']");
  breedInput.value = dog.breed;
  const sexInput = dogForm.querySelector("input[name='sex']");
  sexInput.value = dog.sex;
  dogForm.addEventListener('submit', function(ev) {
    updateDog(ev, dog);
  });
}

function updateDog(event, dog) {
  console.log(event.target[0].value);
  console.log(event.target[1].value);
  console.log(event.target[2].value);
  console.log(URL + `/${dog.id}`);
  fetch(URL + `/${dog.id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({name: event.target[0].value, breed: event.target[1].value, sex: event.target[2].value})
  })
  .then(resp => resp.json())
  .then(json => loadDogs())
}
