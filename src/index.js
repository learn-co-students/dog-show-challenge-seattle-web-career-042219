const url = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {
    main()

    document.querySelector("#dog-form").addEventListener("submit", (ev)=>{
        handleEditSubmit(ev)
    })
})

function main(){
    fetchDoggos();
};

function fetchDoggos() {

    fetch(url)
    .then(response => {
        return response.json()
    })
    .then(json => {
        loadDoggos(json);
    })
}

function loadDoggos(json) {

    json.forEach((dog)=>{
        loadDoggo(dog);
    })
}

function loadDoggo(dog){
    let row = document.createElement("tr");
    let name = document.createElement("td");
        name.textContent = dog.name;
    let breed = document.createElement("td");
        breed.textContent = dog.breed;
    let sex = document.createElement("td");
        sex.textContent = dog.sex;
    let edit = document.createElement("td");
    let editButton = document.createElement("button")
        editButton.textContent = "Edit Dog"
        editButton.style.width = "100px";
        addListenerToButton(editButton, dog);
        edit.appendChild(editButton);

    row.appendChild(name);
    row.appendChild(breed);
    row.appendChild(sex);
    row.appendChild(edit);

    document.querySelector("table").appendChild(row);
}

function addListenerToButton(button, dog) {
    button.addEventListener("click", ()=>{
        let form = document.querySelector("#dog-form")
            form.dataset.id = dog.id
            form.name.value = dog.name
            form.breed.value = dog.breed
            form.sex.value = dog.sex
    })
}

function handleEditSubmit(ev) {
    ev.preventDefault();
    let id = ev.target.dataset.id
    let name = ev.target.name.value
    let breed = ev.target.breed.value
    let sex = ev.target.sex.value
    saveDoggo(id, name, breed, sex)
}

function saveDoggo(id, name, breed, sex) {
    let payload = {name: name, breed: breed, sex: sex}
    let config = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    }
  
    fetch(url + '/' + id, config)
    .then(res => res.json())
    .then(json => {
        clearDoggos()
        fetchDoggos()
    })
}


function clearDoggos(){
    table = document.querySelector("table")
    while (table.lastChild.nodeName == "TR") {
        table.removeChild(table.lastChild);
    }
}