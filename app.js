// import needed modules

/*
TODO
- add thumbnails to climate and arch in the cities display at the bottom
- add load button to reload any city and update the states to match it
*/

// state
const city = {
    name: '',
    climate: '',
    arch: '',
    slogan: [],
};

let cities = [];
let savedCities = [];
// components
    // component
    // define and grab DOM elements
    // display functions
    // optional: subscribe to events
        // event handlers - what needs to happen?
        // logic and calculations
        // state update
        // re-display components (which ones?)
    // optional: handle functions for shared event handler logic

// input dom elements
const inputSection = document.getElementById('input-section');
const nameInput = inputSection.querySelector('input');
const [climateInput, archInput] = inputSection.querySelectorAll('select');
const sloganInput = inputSection.querySelector('textarea');
const addSloganButton = inputSection.querySelector('button');

// display dom elements
const displaySection = document.getElementById('display-section');
const nameDisplay = displaySection.querySelector('span');
const sloganDisplay = displaySection.querySelector('ul');
const [climateDisplay, archDisplay] = displaySection.querySelectorAll('img');
const displayGrid = displaySection.querySelector('section');
const addCity = displaySection.querySelector('button');

// event handlers
nameInput.addEventListener('input', () => {
    city.name = nameInput.value;
    nameDisplay.textContent = nameInput.value;
});

climateInput.addEventListener('change', () => {
    city.climate = climateInput.value;
    climateDisplay.src = 'assets/' + climateInput.value + '.png';
    updateClasses();
});

archInput.addEventListener('change', () => {
    city.arch = archInput.value;
    archDisplay.src = 'assets/' + archInput.value + '.png';
    updateClasses();
});

sloganInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleAddSlogan();
    }
});

addSloganButton.addEventListener('click', () => {
    handleAddSlogan();
});

addCity.addEventListener('click', () => {
    handleAddCity();
});

// update functions
function updateDisplay() {
    nameDisplay.textContent = city.name;
    climateDisplay.src = 'assets/' + city.climate + '.png';
    archDisplay.src = 'assets/' + city.arch + '.png';
    updateClasses();
}

function updateState() {
    city.name = nameInput.value;
    city.climate = climateInput.value;
    city.arch = archInput.value;
    if (sloganInput.value.trim()) {
        city.slogan.push(sloganInput.value);
    }
}

function updateClasses() {
    displayGrid.classList.value = 'display-grid';
    displayGrid.classList.add(city.climate, city.arch);
}

function updateSavedCities() {
    let newCity = {
        name: nameInput.value,
        climate: climateInput.value,
        arch: archInput.value,
        slogan: city.slogan,
    };
    savedCities.push(newCity);
}

function defaultInputs() {
    sloganDisplay.innerHTML = '';
    nameInput.value = '';
    climateInput.value = 'cold';
    archInput.value = 'hotspring';
    sloganInput.value = '';

    city.slogan = [];
    cities = [];
}

function updateInputs() {
    nameInput.value = nameDisplay.textContent;
    climateInput.selected = climateDisplay.value;
    archInput.selected = archDisplay.value;
}

function displaySlogans() {
    sloganDisplay.innerHTML = '';

    for (let i of city.slogan) {
        let newList = document.createElement('li');
        newList.textContent = i;
        sloganDisplay.append(newList);
    }
}

// handlers
function handleAddSlogan() {

    if (sloganInput.value.trim()) {
        city.slogan.push(sloganInput.value);
        displaySlogans();
        sloganInput.value = '';
    }
}

function handleAddCity() {
    cities.push(city);
    displayCity();

    updateSavedCities();

    defaultInputs();
    updateState();
    updateDisplay();
}

const cityList = document.getElementById('road-map');

function displayCity() {
    for (let i of cities) {

        let container = document.createElement('section');
        container.classList.add('road-map-grid', 'box');
       
        let pOne = document.createElement('p');
        pOne.textContent = i.name;
        
        let pTwo = document.createElement('p');
        pTwo.textContent = i.climate;
        let climateImage = document.createElement('img');
        climateImage.src = 'assets/' + climateInput.value + '.png';
        pTwo.append(climateImage);
        
        let pThree = document.createElement('p');
        pThree.textContent = i.arch;
        let archImage = document.createElement('img');
        archImage.src = 'assets/' + archInput.value + '.png';
        pThree.append(archImage);
        
        let pFour = document.createElement('p');
        if ((city.slogan.length === 0) || (city.slogan.length >= 2)) {
            pFour.textContent = `${i.slogan.length} slogans`;
        }
        else {
            pFour.textContent = '1 slogan';
        }

        let loadCity = document.createElement('button');
        loadCity.innerHTML = 'load';
        
        

        container.append(pOne, pTwo, pThree, pFour, loadCity);
        cityList.append(container);
    }
    
    
    let loadButtons = cityList.querySelectorAll('button');
    for (let i = 0; i < loadButtons.length; i++) {
        loadButtons[i].addEventListener('click', () => {
            city.name = savedCities[i].name;
            city.climate = savedCities[i].climate;
            city.arch = savedCities[i].arch;
            for (let j of savedCities[i].slogan) {
                city.slogan.push(j);
            }
            displaySlogans();
            updateClasses();

            updateInputs();
            updateDisplay();

            city.slogan = [];
        });
    }
}

// page load actions
updateState();
updateDisplay();