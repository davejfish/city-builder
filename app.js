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
const [nameDisplay, sloganDisplay] = displaySection.querySelectorAll('span');
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
    sloganDisplay.textContent = city.slogan;
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
    displayGrid.classList.add(climateInput.value, archInput.value);
}

function defaultInputs() {
    nameInput.value = '';
    climateInput.value = 'cold';
    archInput.value = 'hotspring';
    sloganInput.value = '';

    city.slogan = [];
    cities = [];
}

function displaySlogans() {
    sloganDisplay.innerHTML = '';

    for (let i of city.slogan) {
        let newList = document.createElement('li');
        newList.textContent = i;
        sloganDisplay.append(newList);
    }
}

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

    defaultInputs();
    updateState();
    updateDisplay();
}

const cityList = document.getElementById('road-map');

function displayCity() {
    for (let i of cities) {
        let container = document.createElement('section');
        container.classList.add('road-map-grid');
       
        let pOne = document.createElement('p');
        pOne.textContent = i.name;
        
        let pTwo = document.createElement('p');
        pTwo.textContent = i.climate;
        
        let pThree = document.createElement('p');
        pThree.textContent = i.arch;
        
        let pFour = document.createElement('p');
        pFour.textContent = i.slogan.length;

        container.append(pOne, pTwo, pThree, pFour);
        cityList.append(container);

    }
}

// page load actions
updateState();
updateDisplay();