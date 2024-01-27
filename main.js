// The magic behind RansomText

/*
- Workflow:
-- Detect character pressed
-- Generate components
-- Create character with these components
-- append to displayDiv (make sure dispayDiv has the correct props in CSS)
*/

/*** ------ Global Vars ----- ***/
const componentLen = 5;

const fontSizeIndex = 0;
const textColorIndex = 1;
const rotationIndex = 2;
const backgroundColorIndex = 3;
const marginIndex = 4;
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


  /**
   * This function generates a random margin value between 0 and 4.
   * @returns integer between 0 and 4
   */
  function generateRandomMarginNum() {
    const randomMargin = Math.round( clamp(-2, gaussianRandom() * 2, 2) );
    return randomMargin;
  }

  // return array
  const components = new Array(componentLen);

  // setting the properties to their spot
  components[fontSizeIndex] = generateRandomFontSize();
  components[textColorIndex] = generateRandomColor();
  components[rotationIndex] = generateRandomRotation();
  components[backgroundColorIndex] = generateRandomColor();
  components[marginIndex] = generateRandomMarginNum();

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

  characterDiv.style.marginRight = componentArray[marginIndex] + 'px';
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

  const style = window.getComputedStyle(charDiv);
  const newColors = setAppropriateColors(style.color, style.backgroundColor);
  charDiv.style.color = newColors[0];
  charDiv.style.backgroundColor = newColors[1];
}

/*** ----- Character Detection ---- ***/
// disallowed key events
const bannedKeyEvents = [
  'Meta', 'Shift', 'Control', 'Alt', 'CapsLock', 'Escape',
  'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10',
  'F11', 'F12', 'F13', 'F14', 'F15'
];

/**
 * This function event listener deals with detecting a pressed key, and either
 * ignoring it if invalid or passing it along to be drawn if valid. 
 */
document.addEventListener('keydown', function (event) {
  
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
 * This function would add some are to the web page by generating
 * text at the top. Don't know if I want to develop it
 */
// function initWebPage() {
// }


/**
 * This function immediately puts the focus onto an input element.
 * This allows mobile users to use the website.
 */
function initMobileKeyboard() {
  // Detect if user is on mobile device. Copied from ChatGPT
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  const mobileInput = document.getElementById('mobileInput');

  if (!isMobileDevice()) {
    mobileInput.style.visibility = 'hidden';
    return;
  }

  mobileInput.addEventListener('focus', () => {
    mobileInput.style.opacity = '0%';

    mobileInput.addEventListener('focusout', () => {
      mobileInput.value = '';
      mobileInput.style.opacity = '100%';
    });
  });
}

// call the init function
initMobileKeyboard();

/*** ----- End Init Function ----- ***/

/*** ---- Other Functions ----- ***/
/**
 * This function returns a value clamped between min and max.
 * @param {number} min 
 * @param {number} val 
 * @param {number} max 
 * @returns value clamped to [min, max]
 */
function clamp(min, val, max) {
  return (val < min) ? min : (val > max) ? max : val;
}

// sources:
// https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
// https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
/**
 * This function uses Math.random and the box-muller transform
 * to generate a random number sampled from a gaussian distribution.
 * @returns pseudorandom number from a normal distribution
 */
function gaussianRandom() {
  const u1 = Math.random();
  const u2 = Math.random();

  const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return z0;
}


// Got this function from ChatGPT vvvv
/**
 * This function takes two colors and returns the euclidian distance between them
 * @param {number} rgb1 - array of 3 numbers denoting the [R,G,B] components of a color
 * @param {number} rgb2 
 * @returns euclidian distance between two RGB vectors (number)
 */
function colorDifference(rgb1, rgb2) {
  const rDiff = rgb1.R - rgb2.R;
  const gDiff = rgb1.G - rgb2.G;
  const bDiff = rgb1.B - rgb2.B;

  const diff =  Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
  return (diff === NaN) ? 0 : diff;
}


// GPT vvvvv
function convertCSSColorToRGB(color) {
  // Extract RGB components from the "rgb()" string
  const matches = color.match(/\d+/g);
  if (matches) {
      return {
          R: parseInt(matches[0]),
          G: parseInt(matches[1]),
          B: parseInt(matches[2])
      };
  }

  return null;
}


/**
 * This funcion takes two colors, the color of the text and the background color of the div
 * and ensures they are different enough to 
 * @param {*} textColor 
 * @param {*} backgroundColor 
 * @returns array of two elements of the form [newTextColor, backgroundColor]
 */
function setAppropriateColors(textColor, backgroundColor) {
  const textRGB = convertCSSColorToRGB(textColor);
  const backgroundRGB = convertCSSColorToRGB(backgroundColor);

  if (textRGB === null || backgroundRGB === null) {
    console.log("setAppropriateColors: Error converting CSS color to RGB array.");
    return [textColor, backgroundColor];
  }

  if ( colorDifference(textRGB, backgroundRGB) > 180) { return [textColor, backgroundColor]; }

  else {
    const negatedTextRGB = { R: 255 - textRGB.R, G: 255 - textRGB.G, B: 255 - textRGB.B};

    if ( colorDifference(negatedTextRGB, backgroundRGB)  < 180) {
      
      const black = 'rgb(0,0,0)';
      const white = 'rgb(255, 255, 255)';

      if (Math.random() < 0.5) { return [black, backgroundColor]; }
      else { return [white, backgroundColor]; }

    } else {
      const returnTextRGB = 'rgb(' + negatedTextRGB.R + ',' + negatedTextRGB.G + ',' + negatedTextRGB.B + ')';
      // const returnBackgroundRGB = 'rgb(' + backgroundRGB.R + ',' + backgroundRGB.G + ',' + backgroundRGB.B + ')';
      return [returnTextRGB, backgroundColor];
    }
  }
}

// sanity check
// const TEST_THRESHOLD = 1000;
// function testGaussRandom() {
//   const testArr = new Array(TEST_THRESHOLD);

//   for (let i = 0; i < TEST_THRESHOLD; i++ ) {
//     testArr[i] = gaussianRandom();
//   }

//   // GPT gave me these two
//   function calculateMean(numbers) {
//       const sum = numbers.reduce((acc, num) => acc + num, 0);
//       return sum / numbers.length;
//   }

//   function calculateStandardDeviation(numbers) {
//       const mean = calculateMean(numbers);
//       const squaredDifferences = numbers.map(num => Math.pow(num - mean, 2));
//       const meanSquaredDifferences = calculateMean(squaredDifferences);
//       return Math.sqrt(meanSquaredDifferences);
//   }

//   console.log(calculateMean(testArr));
//   console.log(calculateStandardDeviation(testArr));
// }
// testGaussRandom();
/*** ----- End Other Functions ----- ***/