// Get baseline valence.
var initialFeeling = {
    type: jsPsychHtmlSliderResponse,
    stimulus: `<div style="width:500px;">
        <p>How are you feeling right now?</p>
      `,
    require_movement: true,
    labels: ['really unhappy', 'neutral', 'really happy']
};

// explain experiment 
var instructionsOverview = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <p>In this experiment, you will watch a short clip from a movie.</p>
        <p>Please pay close attention to the emotional tone of the clip, and   
        consider how it makes you feel.</p>

        <p>Press any key to continue.</p>
        `,
    post_trial_gap: 500
};

const audioWord = "../static/lib/jspsych-7.2.1/movies_audio/leftChannelGirl.mp3"
const audioLoudness = "../static/lib/jspsych-7.2.1/movies_audio/loudnessCheck.wav"

// audio pretest
var audioPreTest = {
	type: jsPsychComprehensionCheck,
	instruction_pages: [
	    `<h3>Before we continue, let's do an audio check.</h3>
	    <br><p style="padding: 0 200px">There are two audio clips below to help calibrate your volume.
        <br><br>With the first clip, adjust your volume so that you can just hear someone speaking but NOT make out what is being said:
         <br>
	    <div id="player"><audio controls><source src=${audioLoudness} type="audio/mpeg"></audio></div>
        <br><br>Now use this second clip to check that you are able to hear the word being said, and make sure you can hear it CLEARLY. If not, increase your volume until you do:
        <br>
        <div id="player"><audio controls><source src=${audioWord} type="audio/mpeg"></audio></div>
        <br><br>Please try to maintain your volume for the duration of the study.
	    <br><br>When you are ready, you can proceed.
        <br><br></p>`
 	 ],
	// Here are the questions for the above audio pretest
	questions: [
    {
        prompt: `<p style="padding: 0 200px">Which word did you hear in the second audio clip?`,
        options: ["furl ", "girl ", "house ", "mouse "],
        correct_answer: "girl ",
        required: true,
        horizontal: false
        },
    {
        prompt: `<p style="padding: 0 200px">In one of the audio clips, the sound was only coming from one side. Which audio channel was the sound coming from (i.e. did you hear the sound in your left or right ear)?`,
        options: ["right ", "left "],
        correct_answer: "left ",
        required: true,
        horizontal: false
    },
	],
	    show_clickable_nav: true,
	    show_page_number: false,
	    randomize_question_order: false,
        button_label: "Continue",
        button_label_next: "Continue",
	    failure_text: "Unfortunately, you didn't answer the question correctly. Please review the instructions and then try again.",
	    data: {
	  	    test_type: "comprehension-check-audio-channel",
	    },
  	on_finish(data){
	    data.comp_check_response = jsPsych.data.getLastTrialData().select("responses").values;
	    }
};


// explain mood induction video 
var videoInstructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <p>Ok, now it's time to watch the video.<p>
        <p>After the clip, we will ask you to assess your emotions according to their
        valence (how positive the emotion feels) and arousal (how activated in your 
        body it feels).</p>

        <p>Press any key to begin.</p>
        `,
    post_trial_gap: 500
};

// Enter Fullscreen
var enterFullScreen = {
    type: jsPsychFullscreen,
    message: "<p>The experiment will switch to full screen mode when you click 'Continue'.</p>"
};

// Define video trial.
var video = {
    type: jsPsychVideoKeyboardResponse,
    stimulus: ['../static/lib/jspsych-7.2.1/movies_audio/Madison.mp4'],
    choices: "ALL_KEYS",
    trial_ends_after_video: true,
    response_allowed_while_playing: true,
    response_ends_trial: true
};

// Affect Grid Rating
var affectGrid = {
    type: jsPsychAffectGrid,
    prompt: "Please rate how you feel right now:",
    explanation: "Valence refers to how positive or negative the emotion feels. Arousal refers to how activated in your body the emotion feels. Click on the grid to express how you are feeling right now.",
    lowArousalPrompt: "Low arousal",
    highArousalPrompt: "High arousal",
    lowValencePrompt: "Negative valence",
    highValencePrompt: "Positive valence",
    on_finish: function (data) {
      data.emotion = 'self-report';
      data.trial_type = 'self_report_affect_ratings';
    }
};
 
// Affect Slider Rating
var affectSlider = {
    type:jsPsychAffectSlider,
    iconLowPleasure: "../static/lib/jspsych-7.2.1/img/AS_unhappy.png",
    iconHighPleasure: "../static/lib/jspsych-7.2.1/img/AS_happy.png",
    iconLowArousal: "../static/lib/jspsych-7.2.1/img/AS_sleepy.png",
    iconHighArousal: "../static/lib/jspsych-7.2.1/img/AS_wideawake.png",
    promptPleasure: "What is your current level of <b>pleasure</b> (from unhappy to happy)?",
    promptArousal: "What is your current level of <b>arousal</b> (from low energy to very alert)?",
    generalPrompt: "Please move the sliders to express how you are feeling right now.",
    trial_duration: 10000,
};

// Survey introduction 
var surveyIntro = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <p>Now we will ask a few qualitative questions about your experience during the video.</p>

        <p>Press any key to begin.</p>
        `,
    post_trial_gap: 500
};

// Survey: emotions list 
var surveyEmotions = {
    type: jsPsychSurveyText,
    questions: [
    {prompt: 'Please list the emotions you felt during the course of the video', rows: 10}
    ]
}

// Survey: emotions consistency 
var surveyFluctuation = {
    type: jsPsychSurveyText,
    questions: [
    {prompt: 'Did these emotions fluctuate, or did they remain consistent throughout?', rows: 10}
    ]
}

// Survey: emotions impact
var surveyImpact = {
    type: jsPsychSurveyText,
    questions: [
    {prompt: 'To what extent did you believe the video changed your emotional state?', rows: 10}
    ]
}

// Survey: emotion sensations 
var surveySensations = {
    type: jsPsychSurveyText,
    questions: [
    {prompt: 'Please list any physical sensations you experienced, like a pounding heart or tense muscles', rows: 10}
    ]
}   

// Survey: experience with video games
var surveyExperience = {
    type: jsPsychSurveyText,
    questions: [
    {prompt: 'Please comment on how frequently you watch horror movies or play horror video games', rows: 10}
    ]
}


// Initialize timeline.
var timeline = [];

// add everything to timeline. 
timeline = timeline.concat(initialFeeling); 
timeline = timeline.concat(instructionsOverview); 
timeline = timeline.concat(audioPreTest); 
timeline = timeline.concat(videoInstructions); 
timeline = timeline.concat(enterFullScreen); 
timeline = timeline.concat(video); 
timeline = timeline.concat(affectGrid); 
timeline = timeline.concat(affectSlider); 
timeline = timeline.concat(surveyIntro); 
timeline = timeline.concat(surveyEmotions); 
timeline = timeline.concat(surveyFluctuation); 
timeline = timeline.concat(surveyImpact); 
timeline = timeline.concat(surveySensations); 
timeline = timeline.concat(surveyExperience); 