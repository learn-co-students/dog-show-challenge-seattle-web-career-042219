document.addEventListener("DOMContentLoaded", () => {
  getDogs();
});

const dogsUrl = "http://localhost:3000/dogs";

function getDogs() {
  fetch(dogsUrl)
    .then(result => result.json())
    .then(dogs => renderDogs(dogs))
    .catch(err => console.log(err));
}

function renderDogs(dogs) {
  dogs.forEach(dog => renderDog(dog));
}

function renderDog(dog) {
  let tBody = document.getElementById("table-body");
  let row = tBody.insertRow(0);
  let cell0 = row.insertCell(0);
  let cell1 = row.insertCell(1);
  let cell2 = row.insertCell(2);
  let button = document.createElement("button");
  button = row.insertCell(3);

  cell0.textContent = dog.name;
  cell1.textContent = dog.breed;
  cell2.textContent = dog.sex;
  button.textContent = "Edit Dog";
  button.addEventListener("click", () => editBook(book));
}

function editBook() {}
