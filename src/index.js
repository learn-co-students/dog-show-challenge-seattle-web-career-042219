document.addEventListener('DOMContentLoaded', () => {

    fetchDogs();
    submitListener();

})
const URL = 'http://localhost:3000/dogs'



function submitListener(id){
  
  const form = document.getElementById('dog-form');
  console.log(form)
  form.addEventListener('submit', (ev) => {
  let name = form.name.value 
  let breed = form.breed.value 
  let sex = form.sex.value 
  let ID = id
  saveDog(name, breed, sex, ID)
  
  })
}

function saveDog(name, breed, sex, id){
  let payload = {name: name, breed: breed, sex: sex}
  let config = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  }

  fetch(URL + '/' + id, config)
  .then(res => res.json())
  .then(json => {
    console.log(json)
  })
}



function fetchDogs() {
    fetch(URL)
    .then(response => {
      return response.json()
    })
    .then(json => {
       
      addDogs(json)
    })
  }

function addDogs(json){
    json.forEach(dog => {
        addDog(dog)
    });
    }   


function addDog(dog){
    var table = document.getElementById("table-body");
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var editButton = document.createElement('button')
    editButton.addEventListener('click', editHandler)
    cell1.innerHTML = dog.name;
    cell2.innerHTML = dog.breed;
    cell3.innerHTML = dog.sex;
    editButton.textContent = 'Edit'
    editButton.classList.add(dog.id)
    cell4.appendChild(editButton)

  }
fetchDogs();

function editHandler(ev){
  //finding specific dog in database
id = event.target.classList.value
fetch(URL + '/' + id)
  .then(response => {
    return response.json()
  })
  .then(json => {
    displayDog(json)  
  })
submitListener(id)

}

function displayDog(dog){
  const dogForm = document.getElementById('dog-form')
  
  let name = dogForm.elements.name.value = dog.name

  let breed = dogForm.elements.breed.value = dog.breed
  let sex = dogForm.elements.sex.value = dog.sex
}