/**
 * |============================================================================================|
 * |██████╗  █████╗ ███╗   ██╗███████╗ ██████╗ ███╗   ███╗    ████████╗██╗   ██╗██████╗ ███████╗|
 * |██╔══██╗██╔══██╗████╗  ██║██╔════╝██╔═══██╗████╗ ████║    ╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝|
 * |██████╔╝███████║██╔██╗ ██║███████╗██║   ██║██╔████╔██║       ██║    ╚████╔╝ ██████╔╝█████╗  |
 * |██╔══██╗██╔══██║██║╚██╗██║╚════██║██║   ██║██║╚██╔╝██║       ██║     ╚██╔╝  ██╔═══╝ ██╔══╝  |
 * |██║  ██║██║  ██║██║ ╚████║███████║╚██████╔╝██║ ╚═╝ ██║       ██║      ██║   ██║     ███████╗|
 * |╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝     ╚═╝       ╚═╝      ╚═╝   ╚═╝     ╚══════╝|
 * |============================================================================================|
 * 
 * This project was developed for MAAD 23632, aka Internet Art II, as an algorithmic text based
 * art work. The vision was to model an old school "ransom note" you would see on tv - one that
 * was constructed imperfectly from cut outs from a newspaper / magazine. To achieve this, for each 
 * character pressed 5 attributes are selected randomly and applied to style said character.
 * 
 * This was developed by me (@VaughnRichard). My professor Nicholas Briz provided heavy inspiration
 * through his teaching in the aforementioned class. Also, of course, ChatGPT, StackOverflow,
 * and the general internet helped make this a reality.
 * 
 * TODO: Implement saving features, about page
 */


/*
- Workflow:
-- Detect character pressed
-- Generate components
-- Create character with these components
-- append to displayDiv (make sure dispayDiv has the correct props in CSS)
*/

/*** ------ Global Vars ----- ***/ // all of these are self explanatory
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
 *  of length component length, corresponding to the generated features. The 
 *  return array can be infered from the global vars. The components are randomly
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

  // these next steps are done to make sure the character is readable,
  // i.e. the text color and background color are not too similar
  const style = window.getComputedStyle(charDiv); // get the style - AFTER APPENDING
  const newColors = setAppropriateColors(style.color, style.backgroundColor); // - find valid colors

  //set the new colors
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
  
  // don't allow these keys to be added
  if (bannedKeyEvents.includes(event.key)) {
    return;
  }

  // backspace means a div should be deleted
  if (event.key === 'Backspace') {
    const displayDiv = document.getElementById('displayDiv');
    
    // remove iff there exists one to remove
    if (displayDiv.children.length > 0) {
      displayDiv.removeChild( displayDiv.children[ displayDiv.children.length - 1] );
    }
    return; // terminate early so a 'backspace' char isnt added
  }

  // this is added for UX. prevents the tab from jumping around the page. GPT helped out
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

  // if not mobile, then hide this input field
  if (!isMobileDevice()) {
    mobileInput.style.visibility = 'hidden';
    return;
  }

  // otherwise event listener time
  const mobilInstr = document.getElementById('instr');
  mobilInstr.textContent = 'Instructions: Simply start typing. (Tap the textbox)'
  mobileInput.addEventListener('focus', () => {
    mobileInput.style.opacity = '0%'; // make invisible, but able to be typed in
    mobilInstr.textContent = 'Instructions: Simply start typing. Tap the screen to display the text box.'; // update intructions for UX

    mobileInput.addEventListener('focusout', () => {
      mobileInput.value = ''; // reset value - no reason to have whatever the typed in there
      mobileInput.style.opacity = '100%'; // make visible again
      mobilInstr.textContent = 'Instructions: Simply start typing.'; // update instructions
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
  const rDiff = rgb1.R - rgb2.R; // pretty self explanatory
  const gDiff = rgb1.G - rgb2.G;
  const bDiff = rgb1.B - rgb2.B;

  const diff =  Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
  return (diff === NaN) ? 0 : diff; // me own line. NaN's were being generated
}


/**
 * This function takes a color represented as an rgb string (see params)
 * and parses it into a JSON object with int in the R,G,B components.
 * @param {string} color - of the form 'rgb(r,b,g)'
 * @returns 
 */
function convertCSSColorToRGB(color) {
  // Extract RGB components from the "rgb()" string. Props to GPT on this one
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
 * This function takes two colors, the color of the text and the background color of the div
 * and ensures they are different enough for people to see them.
 * NOTE: needs some improvement in the difference algorithm.
 * @param {string} textColor - of the form 'rgb(R1,G1,B1)'
 * @param {string} backgroundColor - of the form 'rgb(R2,G2,B2)'
 * @returns array of two elements of the form [newTextColor, backgroundColor]
 */
function setAppropriateColors(textColor, backgroundColor) {
  // convert to numerical forms {R,G,B}
  const textRGB = convertCSSColorToRGB(textColor);
  const backgroundRGB = convertCSSColorToRGB(backgroundColor);

  // error handling. ensure the above function returned a valid result.
  if (textRGB === null || backgroundRGB === null) {
    console.log("setAppropriateColors: Error converting CSS color to RGB array.");
    return [textColor, backgroundColor];
  }

  // if different enough, keep the original colors
  if ( colorDifference(textRGB, backgroundRGB) > 180) { return [textColor, backgroundColor]; }

  else { // need to change the colors
    // try negating one of the colors
    const negatedTextRGB = { R: 255 - textRGB.R, G: 255 - textRGB.G, B: 255 - textRGB.B};

    // if they are not different enough, they must be very similar on each R,G,B component. Thus
    // making them an extreme {black, white} should suffice to make them viewable.
    if ( colorDifference(negatedTextRGB, backgroundRGB)  < 180) {
      
      const black = 'rgb(0,0,0)';
      const white = 'rgb(255, 255, 255)';

      // flip a coin to see what is picked.
      if (Math.random() < 0.5) { return [black, backgroundColor]; }
      else { return [white, backgroundColor]; }

    } else { // they were different enough! return the new colors.
      const returnTextRGB = 'rgb(' + negatedTextRGB.R + ',' + negatedTextRGB.G + ',' + negatedTextRGB.B + ')';
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