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
const nameDisplay = document.getElementById('name-display');
const climateDisplay = document.getElementById('climate-display');
const archDisplay = document.getElementById('arch-display');
const sloganDisplay = document.getElementById('slogan-display');

// event handlers
nameInput.addEventListener('input', () => {
    city.name = nameInput.value;
    nameDisplay.textContent = nameInput.value;
});

climateInput.addEventListener('change', () => {
    city.climate = climateInput.value;
    climateDisplay.src = 'assets/' + climateInput.value + '.png';
});

archInput.addEventListener('change', () => {
    city.arch = archInput.value;
    archDisplay.src = 'assets/' + archInput.value + '.png';
});

sloganInput.addEventListener('input', () => {
    city.slogan = sloganInput.value;
    sloganDisplay.textContent = sloganInput.value;
});

function updateDisplay() {
    nameDisplay.textContent = city.name;
    climateDisplay.src = 'assets/' + city.climate + '.png';
    archDisplay.src = 'assets/' + city.arch + '.png';
    sloganDisplay.textContent = city.slogan;
}

function updateState() {
    city.name = nameInput.value;
    city.climate = climateInput.value;
    city.arch = archInput.value;
    city.slogan = sloganInput.value;
}
// page load actions
updateState();
updateDisplay();