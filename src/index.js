document.addEventListener('DOMContentLoaded', () => {

  const DOG_URL = 'http://localhost:3000/dogs'

  loadDogs();
  submitForm();

  function loadDogs() {
    fetch(DOG_URL)
    .then(response => {
      return response.json()
    })
    .then(json => {
      console.log(json)
      addDogs(json);
    })
  }

  // {
  //   "id": 1,
  //   "name": "Baby",
  //   "breed": "Scottish Deerhound",
  //   "sex": "male"
  // }

  function addDogs(dogs) {
    dogs.forEach(dog => addDog(dog));
  }

  //<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>

  function addDog(dog) {
    let tr = document.createElement('tr');
    let dogTd = document.createElement('td');
    let breedTd = document.createElement('td');
    let sexTd = document.createElement('td');
    let btnTd = document.createElement('td');
    let editBtn = document.createElement('button')

    dogTd.textContent = dog.name;
    breedTd.textContent = dog.breed;
    sexTd.textContent = dog.sex;
    editBtn.textContent = 'edit dog';

    btnTd.appendChild(editBtn);

    tr.appendChild(dogTd);
    tr.appendChild(breedTd);
    tr.appendChild(sexTd);
    tr.appendChild(btnTd);

    let tableBody = document.getElementById('table-body');

    tableBody.appendChild(tr);

    let dogForm = document.getElementById('dog-form');

    editBtn.addEventListener('click', () => {
      dogForm.name.value = dog.name;
      dogForm.breed.value = dog.breed;
      dogForm.sex.value = dog.sex;
      dogForm.value = dog.id;
    })
  }

  function submitForm() {
    let dogForm = document.getElementById('dog-form')

    dogForm.addEventListener('submit', (ev) => {

      if (dogForm.value != undefined) {
        updateDog(dogForm.value, dogForm.name.value, dogForm.breed.value, dogForm.sex.value)
      } else {
        ev.preventDefault();
      }
    })
  }

  function updateDog(id, name, breed, sex) {

    let payload = {name: name, breed: breed, sex: sex}

    fetch(DOG_URL + '/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(json => {
    })

  }
})
