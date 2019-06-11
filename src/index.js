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
  console.log("dog=", dog);
  let submitForm = document.getElementById("dog-form");
  submitForm[3].addEventListener("submit", patchDog(dog));
  submitForm.name.value = dog.name;
  submitForm.breed.value = dog.breed;
  submitForm.sex.value = dog.sex;
}

function patchDog(dog) {
  fetch(dogsUrl + "/" + dog.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ name: dog.name, breed: dog.breed, sex: dog.sex })
  })
    .then(result => result.json())
    .catch(err => console.log(err));
}
