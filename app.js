// import needed modules

// state
const city = {
    name: '',
    climate: '',
    arch: '',
    slogan: '',
};
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

// display dom elements
const displaySection = document.getElementById('display-section');
const [nameDisplay, sloganDisplay] = displaySection.querySelectorAll('span');
const [climateDisplay, archDisplay] = displaySection.querySelectorAll('img');
const displayGrid = displaySection.querySelector('section');

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
});

sloganInput.addEventListener('input', () => {
    city.slogan = sloganInput.value;
    sloganDisplay.textContent = sloganInput.value;
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
    city.slogan = sloganInput.value;
}

function updateClasses() {
    displayGrid.classList.value = 'display-grid';
    displayGrid.classList.add(`${climateInput.value}`);
}
// page load actions
updateState();
updateDisplay();