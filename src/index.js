document.addEventListener("DOMContentLoaded", () => {
  getDogs();
});

const dogsUrl = "http://localhost:3000/dogs";

function getDogs() {
  fetch(dogsUrl)
    .then(result => result.json())
    .then(dogs => renderDogs(dogs))
    .catch(err => console.log("Error=", err));
}

function renderDogs(dogs) {
  let tBody = document.getElementById("table-body");
  tBody.innerHTML = "";
  dogs.forEach(dog => renderDog(dog));
}

function renderDog(dog) {
  let tBody = document.getElementById("table-body");
  let row = document.createElement("tr");
  let name = document.createElement("td");
  name.innerText = dog.name;
  name.classList.add("name");
  let sex = document.createElement("td");
  sex.innerText = dog.sex;
  sex.classList.add("sex");
  let breed = document.createElement("td");
  breed.innerText = dog.breed;
  breed.classList.add("breed");
  let edit = document.createElement("td");
  let editButton = document.createElement("button");
  editButton.innerText = "Edit Dog";
  editButton.setAttribute("id", `${dog.id}`);
  editButton.addEventListener("click", e => {
    e.preventDefault();
    submitEdit(dog);
  });
  edit.append(editButton);
  row.append(name, breed, sex, edit);
  tBody.appendChild(row);
}

function submitEdit(dog) {
  let submitForm = document.getElementById("dog-form");
  submitForm.name.value = dog.name;
  submitForm.breed.value = dog.breed;
  submitForm.sex.value = dog.sex;
  submitForm.addEventListener("submit", e => {
    e.preventDefault();
    patchDog(dog, e);
  });
}

function patchDog(dog, e) {
  let dogName = e.target[0].value;
  let dogBreed = e.target[1].value;
  let dogSex = e.target[2].value;
  e.target[0].value = "";
  e.target[1].value = "";
  e.target[2].value = "";
  fetch(dogsUrl + "/" + dog.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ name: dogName, breed: dogBreed, sex: dogSex })
  })
    .then(result => result.json())
    .then(json => console.log("json=", json))
    .then(getDogs)
    .catch(err => console.log(err));
}
