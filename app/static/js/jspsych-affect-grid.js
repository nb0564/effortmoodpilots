/*
 * Affect Grid (Russell et al., 1987)
 *
 * Created by Jamie Chiu, 2023
 * @jamie-chiu
 */

var jsPsychAffectGrid = (function (jspsych) {
  

  const info = {
    name: "affect-grid",
    parameters: {
      prompt: {
        type: jspsych.ParameterType.HTML_STRING,
        default: "Please rate how you feel right now:"
      },
      explanation: {
        type: jspsych.ParameterType.HTML_STRING,
        default: "Valence refers to how positive or negative the emotion feels.<br>Arousal refers to how activated in your body the emotion feels.<br>Click on the grid to express how you are feeling right now.",
        description: "sub prompt at top of page"
      },
      lowArousalPrompt: {
        type: jspsych.ParameterType.HTML_STRING,
        default: "Low arousal"
      },
      highArousalPrompt: {
        type: jspsych.ParameterType.HTML_STRING,
        default: "High arousal"
      },
      lowValencePrompt: {
        type: jspsych.ParameterType.HTML_STRING,
        default: "Negative valence"
      },
      highValencePrompt: {
        type: jspsych.ParameterType.HTML_STRING,
        default: "Positive valence"
      },
    }
  };

  class AffectGridPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
  }
  trial(display_element, trial, on_load) {

    let newHTML = "";

    // css style
    const style = `
    <style>
      .left {
        padding: 0 0 0 0;
      }
      .right {
        padding: 0 0 0 0;
      }
      .cell {
        width: 50px;
        height: 50px;
        border: 2px solid;
        box-shadow: 0 0 0 2px;
        line-height: 50px;
        font-size: 30px;
        font-family: marker felt, sans-serif;
        cursor: pointer;
        border-color: #808080; /* grey */
      }
      #gridContainer {
        font-family: sans-serif;
        text-align: center;
        width: 600px;
      }
      #cellContainer {
        display: grid;
        grid-template-columns: repeat(9, 50px);
        justify-content: center;
        border-color: #808080; /* grey */
      }
      h3 {
        margin-bottom: 0px;
      }
    </style>
    `;
    newHTML += style;

    // create div elements for affect grid
    let gridHTML = `
      <h3 style="font-size: 20px; padding-bottom: 20px">${trial.prompt}</h3>
      <p style="font-size: 16px; padding-bottom: 5px; text-align: center">${trial.explanation}</p>
      <div class="trial-container">  
        <div class="left">
          <p style="font-size:16px">${trial.lowValencePrompt}</p>
        </div>
        <div id="gridContainer">
          <p style="font-size:16px; text-align: center">${trial.highArousalPrompt}</p>
          <div id="cellContainer"></div>
          <p style="font-size:16px; text-align: center; padding-top: 20px">${trial.lowArousalPrompt}</p>
        </div>
        <div class="right">
          <p style="font-size:16px">${trial.highValencePrompt}</p>
        </div>
      </div>
      <h3><br></h3>
      <button id="submit">Submit</button>
    `;

    newHTML += gridHTML;
    display_element.innerHTML = newHTML;

    // loop to create grid cells
    for (var i = 1; i <= 81; i++) {
      document.getElementById('cellContainer').insertAdjacentHTML('beforeend', `<div cellIndex=${i} class="cell"></div>`);
    }

    // declare variables
    const cells = document.querySelectorAll('.cell');
    const submit = document.querySelector('#submit');
    let selectedCellIndex = 0; // the latest selected cell
    let selectedCells = []; // list of all selected cells during trial

    // add event listeners
    cells.forEach(cell => cell.addEventListener('click', cellClick));
    submit.addEventListener('click', submitClick);

    // cell click function
    function cellClick(e) {
      // if previously selected a cell, remove the X first
      if (selectedCells.length > 0) {
        cells.forEach(cell => cell.innerHTML = '');
      }
      const cellIndex = this.getAttribute("cellIndex");
      // update selectedCellIndex
      selectedCellIndex = cellIndex;
      // add to list of selectedCells
      selectedCells.push(cellIndex);
      updateCell(this);
    }

    // add X to selected cell
    function updateCell(cell) {
      cell.innerHTML = 'X';
    }

    function submitClick(e) {
      // if selectedCells is empty:
      if (selectedCells.length == 0) {
        // display error message
        alert("Please select a cell");
      } else {
        // end trial
        endTrial();
      }
    }

    function endTrial() {
      // data saving
      var trial_data = {
        selectedCellIndex: selectedCellIndex,
        selectedCells: selectedCells,
        valence: selectedCellIndex % 9 == 0 ? 9 : selectedCellIndex % 9,
        arousal: 10 - (Math.ceil(selectedCellIndex / 9)),
      };
      // add tiny delay before finishing trial
      setTimeout(function() {
        this.jsPsych.finishTrial(trial_data);
      }, 200);
    }
  };
}
  AffectGridPlugin.info = info; 
  return AffectGridPlugin;
})(jsPsychModule);
