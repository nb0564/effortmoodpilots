/*
* Affect Slider
*
* Author(s): Jamie Chiu
*
* Betella, A., & Verschure, P. F. (2016). The affective slider: A digital self-
* assessment scale for the measurement of human emotions. PloS one, 11(2), e0148037.
*/

jsPsychAffectSlider = (function(jspsych) {

  const info = {
    name: "affect-slider",
    parameters: {
      iconLowPleasure: {
        type: jspsych.ParameterType.IMAGE,
        default: "../static/lib/img/AS_unhappy.png",
        description: "Emoticon for the left value, for the scale on top."
      },
      iconHighPleasure: {
        type: jspsych.ParameterType.IMAGE,
        default: "../static/lib/img/AS_happy.png",
        description: "Emoticon for the right value, for the scale on top."
      },
      iconLowArousal: {
        type: jspsych.ParameterType.IMAGE,
        default: "../static/lib/img/AS_sleepy.png",
        description: "Emoticon for the left value, for the scale on top."
      },
      iconHighArousal: {
        type: jspsych.ParameterType.IMAGE,
        default: "../static/lib/img/AS_wideawake.png",
        description: "Emoticon for the right value, for the scale on top."
      },
      promptPleasure: {
        type: jspsych.ParameterType.IMAGE,
        default: "What is your current level of <b>pleasure</b> (from unhappy to happy)?",
        description: "HTML text prompt for pleasure scale."
      },
      promptArousal: {
        type: jspsych.ParameterType.IMAGE,
        default: "What is your current level of <b>arousal</b> (from low energy to very alert)?",
        description: "HTML text prompt for pleasure scale."
      },
      generalPrompt: {
        type: jspsych.ParameterType.IMAGE,
        default: "Please move the sliders to express how you are feeling right now.",
        description: "General prompt that shows on top of page."
      }
    }
  };

  class AffectSliderPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
  }
  trial(display_element, trial, on_load) {
    //-------------------------------------------//
    // Display + Presentation
    //-------------------------------------------//

    let newHTML = "";

    // insert CSS
    const style = `
      <style>
        .jspsych-content-wrapper {
          background: white;
          padding-bottom: 50px;
        }
        p {
          margin-block-start: 0px;
          margin-block-end: 0px;
        }
        button[type="trial"] {
          width: 200px;
          border-radius: 4px;
          text-align: center;
          margin: auto;
          background: lightgray;
          color: black;
          border: black 1px solid;
          opacity: 0.8;
          transition: 0.3s;
        }
        button[type="trial"]:hover {
          opacity: 1;
        }
        button[type="trial"]:active {
          background-color: gray;
          transform: translateY(2px);
        }
      </style>
    `;

    newHTML += style;

    let startValOne = Math.floor(Math.random() * 100);
    let startValTwo = Math.floor(Math.random() * 100);

    let pleasureHTML = `
      <div class="page-container" style="row-gap: 2px">
        <p>${trial.promptPleasure}</p>
        <div class="trial-container">  
          <div class="left-icon">
            <img src=${trial.iconLowPleasure} style="padding-bottom:35px">
          </div>
          <div class="slidecontainer">
            <input type="range" min="0" max="100" value="${startValOne}" class="slider" id="pleasure">
          </div>
          <div class="right-icon">
            <img src=${trial.iconHighPleasure} style="padding-bottom:35px">
          </div>
        </div>
        <br>
      </div>
    `;

    let arousalHTML = `
      <div class="page-container" style="row-gap: 2px">
        <p>${trial.promptArousal}</p>
        <div class="trial-container">  
          <div class="left-icon">
            <img src=${trial.iconLowArousal} style="padding-bottom:35px">
          </div>
          <div class="slidecontainer">
            <input type="range" min="0" max="100" value="${startValTwo}" class="slider" id="arousal">
          </div>
          <div class="right-icon">
            <img src=${trial.iconHighArousal} style="padding-bottom:35px">
          </div>
        </div>
        <br>
      </div>
    `;

    let containerHTML = `
      <h3 style="font-size: 20px; padding-bottom: 10px">${trial.generalPrompt}</h3>
      ${pleasureHTML}
      ${arousalHTML}
      <h3><br></h3>
      <button type="trial" id="submit">Submit</button>
    `;

    newHTML += containerHTML;
    display_element.innerHTML = newHTML;

    //-------------------------------------------//
    // Response Handling
    //-------------------------------------------//

    // declare variables
    const submit = document.querySelector('#submit');
    const pleasure = document.querySelector('#pleasure');
    const arousal = document.querySelector('#arousal');
    let end_time;
    let response;
    let rt;
    let trial_data;

    submit.addEventListener('click', submitClick);

    function submitClick(e) {
      end_time = performance.now();
      rt = end_time - start_time;
      response = {
        pleasure: pleasure.value,
        arousal: arousal.value
      };
      endTrial();
    }

    function endTrial() {
      // data saving
      trial_data = {
        rt: rt,
        response: response
      };
      // add tiny delay before finishing trial
      setTimeout(function() {
        jsPsych.finishTrial(trial_data);
      }, 200);
    }

    // start timing
    let start_time = performance.now();
  };
}
AffectSliderPlugin.info = info; 
return AffectSliderPlugin; 
})(jsPsychModule);

