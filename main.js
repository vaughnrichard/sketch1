// The magic behind RansomText

/*
- Workflow:
-- Detect character pressed
-- Generate components
-- Create character with these components
-- append to displayDiv (make sure dispayDiv has the correct props in CSS)
*/

/*** ------ Global Vars ----- ***/
const componentLen = 4;

const fontSizeIndex = 0;
const textColorIndex = 1;
const rotationIndex = 2;
const backgroundColorIndex = 3;
// add padding variable
// maybe something to not make the div a square? instead a trapezoid?
/*** ------------------------ ***/

/** This function shalle generate the modifiers of the character to
 *  appear on the webpage. It shall take nothing and return an array
 *  of length (??), corresponding to the generated features. The 
 *  return array will be of the form []. The components are randomly
 *  generated.
 * @returns Array of Components
 */
function generateComponents() {

  /**
   * This function generates a random integer between 1 and 20
   */
  function generateRandomFontSize() {
    return Math.round( (Math.random() * 25) + 20 );
    // return Math.round( (Math.random() * 3) + 15 );

  }


  /**
   * This function generates a random color from a pre-determined list
   * and returns it.
   */
  function generateRandomColor() {

    // pulled these colors from the 16 basic CSS colors
    // https://www.w3.org/wiki/CSS3/Color/Basic_color_keywords#:~:text=The%20list%20of%20basic%20color,teal%2C%20white%2C%20and%20yellow.
    const colorArray = [
      'aqua', 'black', 'blue', 'fuchsia',
      'gray', 'green', 'lime', 'maroon',
      'navy', 'olive', 'purple', 'red',
      'silver', 'teal', 'white', 'yellow'
    ];

    // generate a random color index
    const colorIndex = Math.round( Math.random() * 15 );

    return colorArray[colorIndex];

  }


  /**
   * This function will generate a random rotation value between [-12.5, 12.5].
   */
  function generateRandomRotation() {
    const val = (Math.random() - 0.5) * 25;
    return (val < 0) ? val + 360 : val;
  }

  // return array
  const components = new Array(componentLen);

  // setting the properties to their spot
  components[fontSizeIndex] = generateRandomFontSize();
  components[textColorIndex] = generateRandomColor();
  components[rotationIndex] = generateRandomRotation();
  components[backgroundColorIndex] = generateRandomColor();
  return components;
}

/** This function shall take a component array, containing all
 *  desired component values, and a character, and create a new div
 *  with a text content of the character, and the component properties
 *  applied.
 * @param {Array} componentArray 
 * @param {string} character 
 * @returns character div element
 */
function createCharacterDiv(componentArray, character) {
  const characterDiv = document.createElement('div');

  /* --- begining - give the div desired artistic / practical components --- */
  // set the height / width to the fontSize
  characterDiv.style.height = componentArray[fontSizeIndex] + 'px';
  characterDiv.style.width = componentArray[fontSizeIndex] + 'px'; 

  // center the text inside the div
  characterDiv.style.textAlign = 'center';
  characterDiv.style.lineHeight = componentArray[fontSizeIndex] + 'px';

  // check if the character is a space. if it is, make the background white
  if (character === ' ') { componentArray[backgroundColorIndex] = 'none'; }

  // similarly, if the input character is a tab still allow background color but
  // remove the text component
  if (character === 'Tab') { character = ' '; }
  /* --- end div set up --- */

  /* --- begin setting up properties --- */
  characterDiv.style.fontSize = componentArray[fontSizeIndex] + 'px'; // set the font size

  characterDiv.style.color = componentArray[textColorIndex];  // Set the text color

  characterDiv.style.transform = 'rotate(' + componentArray[rotationIndex] + 'deg)';  // Set the rotation

  characterDiv.style.backgroundColor = componentArray[backgroundColorIndex];
  /* --- end adding properties --- */

  // set the character to the correct one!
  characterDiv.textContent = character;

  return characterDiv;
}

/** This function shall append a div, promised to be a character
 *  div from createCharacterDiv, to the displayDiv in the HTML file.
 * @param {HTMLDivElement} characterDiv
 */
function appendToDiv(characterDiv) {
  const displayDiv = document.getElementById('displayDiv');
  displayDiv.append(characterDiv);
  return;
}

/** This function takes a character input, intended from the detect
 *  character function, and runs through the other functions to append
 *  it to the display div. This is basically just used to make the code
 *  look nicer.
 * @param {string} character 
 */
function inputToAppend(character) {

  // generate the css styling components
  const components = generateComponents();

  // make the specialized div
  const charDiv = createCharacterDiv(components, character);

  appendToDiv(charDiv); // append the chararacter div to the display div
}

/*** ----- Character Detection ---- ***/
// disallowed key events
const bannedKeyEvents = [
  'Meta', 'Shift'
];

/**
 * This function event listener deals with detecting a pressed key, and either
 * ignoring it if invalid or passing it along to be drawn if valid. 
 */
document.addEventListener('keydown', function (event) {
  
  console.log(event.key);
  if (bannedKeyEvents.includes(event.key)) {
    return;
  }

  if (event.key === 'Backspace') {
    const displayDiv = document.getElementById('displayDiv');
    
    if (displayDiv.children.length > 0) {
      displayDiv.removeChild( displayDiv.children[ displayDiv.children.length - 1] );
    }
    return;
  }

  if (event.key === 'Tab') { event.preventDefault(); }

  inputToAppend(event.key);
});
/*** ---- End Character Detection ---- ***/

/*** ----- Init Function ----- ***/

/**
 * This function adds some are to the web page by generating
 * 
 */
// function initWebPage() {

// }

/*** ----- End Init Function ----- ***/