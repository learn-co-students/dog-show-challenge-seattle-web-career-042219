const BASE_URL ='http://localhost:3000/dogs'
var editCalled = false

document.addEventListener('DOMContentLoaded', () => {
	main()
})

function main() {
	loadDogs()
}

function loadDogs() {
	fetch(BASE_URL)
	.then(resp => resp.json())
	.then(json => displayDogs(json));
}

function displayDogs(dogs) {
	for(let i = 0; i < dogs.length; i++) {
		displayDog(dogs[i]);
	}
}

function displayDog(dog) {
	let tableContainer = document.getElementById('table-body')
	let tr = document.createElement('tr')
	let tdName = document.createElement('td')
	let tdBreed = document.createElement('td')
	let tdSex = document.createElement('td')
	let tdEdit = document.createElement('td')
	let button = document.createElement('button')

	tdName.textContent = dog.name
	tdBreed.textContent = dog.breed
	tdSex.textContent = dog.sex
	button.textContent = 'Edit Dog'

	tr.appendChild(tdName)
	tr.appendChild(tdBreed)
	tr.appendChild(tdSex)
	addEditListeners(button, dog)
	tdEdit.appendChild(button)
	tr.appendChild(tdEdit)
	tableContainer.appendChild(tr)
}

function addEditListeners(parent, dog) {
	parent.addEventListener('click', (ev) => {
		if(editCalled === false) {
			editCalled = true
			populateSearch(dog)
			addSubmitListener(parent.parentElement.parentElement, dog)
		}
	})
}

function populateSearch(dog) {
	let form = document.getElementById('dog-form')
	form.elements[name="name"].value = dog.name
	form[1].value = dog.breed
	form[2].value = dog.sex
	console.log(form)
}

function addSubmitListener(target, dog) {
	let form = document.getElementById('dog-form')
	form.addEventListener('submit', (ev) => {
		ev.preventDefault()
		let name = ev.target.name.value
		let breed = ev.target.breed.value
		let sex = ev.target.sex.value
		let data = {
			name: name, 
			breed: breed, 
			sex: sex 
		}
		
		params = {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data) 
		}
		fetch(`${BASE_URL}/${dog.id}`, params)
		.then(resp => resp.json())
		.then(json => {
			updateDog(target, json)
		})
	})
}

function updateDog(dogRow, dogObj) {
	dogRow.children[0].textContent = dogObj.name;
	dogRow.children[1].textContent = dogObj.breed;
	dogRow.children[2].textContent = dogObj.sex;
}
