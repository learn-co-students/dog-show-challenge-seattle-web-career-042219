document.addEventListener('DOMContentLoaded', () => {
    main()
})

function main() {
loadDogs()
handleSubmit()
}

function loadDogs () {
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(json => displayDogs(json))
}

function displayDogs(json) {
    console.log(json)
    json.forEach(dog => displayDog(dog));
   
}

function displayDog(dog) {
    let body = document.getElementById('table-body')
    let tr = document.createElement('tr')
    tr.id = dog.id
    let td1 = document.createElement('td')
    let td2 = document.createElement('td')
    let td3 = document.createElement('td')
    let tdBtn = document.createElement('td')
    let button = document.createElement('button')

    tdBtn.appendChild(button)
    button.textContent = "Edit"
    button.addEventListener('click', () => {
        handleEdit(dog)
    })

    td1.textContent = dog.name
    td2.textContent = dog.breed
    td3.textContent = dog.sex

    body.appendChild(tr)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(tdBtn)
}

function handleEdit(dog) {
    form = document.getElementById('dog-form')
   form.elements['name'].value = dog.name
    form.elements['name'].classList = dog.id
    form.elements['breed'].value = dog.breed
    form.elements['sex'].value = dog.sex

}

function handleSubmit() {
    form = document.getElementById('dog-form')
    form.addEventListener('submit', (ev) => {
        ev.preventDefault()
        name = ev.target.elements['name'].value
        breed = ev.target.elements['breed'].value
        sex = ev.target.elements['sex'].value
        id = ev.target.elements['name'].classList.value
        tr = document.getElementById(id)

        fetch(`http://localhost:3000/dogs` + '/' + id, {
            method: 'PATCH',
            headers: {'Content-type': 'application/json'
        }, 
        body: JSON.stringify({name: name, breed: breed, sex: sex})
        })
        .then(resp => resp.json())
        .then(json =>{
            tr.childNodes[0].textContent = name
            tr.childNodes[1].textContent = breed
            tr.childNodes[2].textContent = sex

        })
    })
}


