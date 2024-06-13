// Enter Fullscreen
var enterFullScreen = {
    type: jsPsychFullscreen,
    message: "<p>The experiment will switch to full screen mode when you click 'Continue'.</p>"
};

var NivturkMotivationalState = {
    type: jsPsychSurveyMultiChoice,
    questions: [
      {
        prompt: "How tired are you right now?", 
        name: 'Tiredness', 
        options: ['Very tired', 'Somewhat tired', 'Neither tired nor energetic', 'Somewhat energetic', 'Very energetic'], 
        required: true
      }, 
      {
        prompt: "How motivated are you about participating in this experiment?", 
        name: 'Motivation', 
        options: ['Very motivated', 'Somewhat motivated', 'Neither motivated nor unmotivated', 'Somewhat unmotivated', 'Very unmotivated'], 
        required: true
      }
    ],
  };


// explain terms of emotion 
var instructionsEmotion1 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <p>To begin this experiment, we will ask you to rate your current emotional state.</p>
        

        <p>Once you have a sense of how you're feeling, press any key to continue.</p>
        `,
    post_trial_gap: 500
};

// explain terms of emotion 
var instructionsEmotion2 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <p>We will ask you to rate your emotions on two dimensions: VALENCE and AROUSAL.</p>

        <p>Valence means: how good or bad do you feel?</p>

        <p>Arousal means: how activated (energized, tense, etc.) do you feel?</p>

        <p>Press any key to continue.</p>
        `,
    post_trial_gap: 500
};

// explain terms of emotion 
var instructionsEmotion3 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <p>One important thing to note is that valence and arousal are independent of each other.</p>
        
        <p>For example, you can feel high arousal that's pleasant (e.g. excitement) or unpleasant (e.g. anxiety).</p>

        <p>When you're ready to place yourself on a valence-arousal grid, press any key to continue</p>
        `,
    post_trial_gap: 500
};

// Affect Grid Rating: baseline
var affectGridBaseline = {
    type: jsPsychAffectGrid,
    prompt: "Please rate how you feel right now:",
    explanation: "As a reminder, valence = pleasant/unpleasant and arousal = activation/no activation",
    lowArousalPrompt: "Low arousal",
    highArousalPrompt: "High arousal",
    lowValencePrompt: "Negative valence",
    highValencePrompt: "Positive valence",
    on_finish: function (data) {
      data.emotion = 'self-report';
      data.trial_type = 'self_report_affect_ratings';
    }
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
        <p>Now, you will watch a short clip from a video game.<p>
        <p>Please pay close attention to the emotional tone of the clip, and   
        consider how it makes you feel. After the clip, we will again ask you to assess your emotional state.</p>

        <p>Press any key to begin.</p>
        `,
    post_trial_gap: 500
};

// Define video trial.
var video = {
    type: jsPsychVideoKeyboardResponse,
    stimulus: ['../static/lib/jspsych-7.2.1/movies_audio/Madison.mp4'],
    choices: "ALL_KEYS",
    trial_ends_after_video: true,
    response_allowed_while_playing: false,
    response_ends_trial: false
};

// Affect Grid Rating
var affectGrid = {
    type: jsPsychAffectGrid,
    prompt: "Please rate how you feel right now:",
    explanation: "As a reminder, valence = pleasant/unpleasant and arousal = activation/no activation",
    lowArousalPrompt: "Low arousal",
    highArousalPrompt: "High arousal",
    lowValencePrompt: "Negative valence",
    highValencePrompt: "Positive valence",
    on_finish: function (data) {
      data.emotion = 'self-report';
      data.trial_type = 'self_report_affect_ratings';
    }
};

// Survey introduction 
var surveyIntro = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <p>Now we will ask a few qualitative questions about your experience during the video.</p>
    <p>Your answers will not affect your payment or bonus, but they will help us to improve the experiment and better answer our scientific question.<p>
    <p>Press any key to begin.</p>
        `,
    post_trial_gap: 500
}

// survey
var survey = {
    type: jsPsychSurveyText,
    questions: [
            {prompt: 'Please list the emotions you felt during the course of the video', name: 'Emotions', rows: 5},
            {prompt: 'Did these emotions fluctuate, or did they remain consistent throughout?', name: 'Fluctuation', rows: 5},
            {prompt: 'To what extent did you believe the video changed your emotional state?', name: 'Impact', rows: 5},
            {prompt: 'Please list any physical sensations you experienced (pounding heart, tense muscles, etc.)', name: 'Sensations', rows: 5},
            {prompt: 'Please comment on how frequently you watch horror movies or play horror video games', name: 'Experience', rows: 5},
            {prompt: 'How did you interpret valence and arousal, and can we better explain the terms for future experiments?', name: 'Input', rows: 5},
          ]
};

// explain terms of emotion 
var thankYou = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <p>Thank you for participating in this pilot! If you feel any distress, the next page contains mental health resources.</p>
        <p>Afterwards, you will be redirected back to prolific.</p>

        <p>Press any key to continue.</p>
        `,
    post_trial_gap: 500
};

var resources = {
    type: jsPsychHtmlKeyboardResponse, 
    stimulus: `
        <p>If you are interested in learning more about mental health or in speaking to a professional, we have provided some resources below.</p>
        <b>For resources in the US:</b>
        <ul>
        <li>To learn more about mental health conditions, treatment, research, and warning signs, you can visit the <a href="https://www.nami.org/">NAMI site</a>.</li>
        <li>If you find that the experiment you participated in troubles you, we urge you to arrange a timely appointment with your physician, clinical psychologist or psychiatrist. For help finding a mental health professional, you can visit the NAMI <a href="https://www.nami.org/Find-Support">resources page</a>, and/or email <a href="mailto:info@nami.org">info@nami.org</a> for more specific or personal concerns.</li>
        <li>A number of organizations offer support during difficult times. Below we have listed some examples of these free and confidential support networks:</li>
        <ul>
        <li>The Lifeline Crisis chat</li>
        <li>The National Suicide Prevention Hotline (or call: 1-800-273-8255)</li>
        </ul>
        </ul>
        <b>For resources in Canada:</b>
        <ul>
        <li>To learn more about mental health conditions, treatment, research, and warning signs, you can visit the <a href="https://cmha.ca/">CMHA site</a>.</li>
        <li>If you find that the experiment you participated in troubles you, we urge you to arrange a timely appointment with your physician, clinical psychologist or psychiatrist.</li>
        <li>For help finding mental health services, you can visit the <a href="https://www.camh.ca/">CAMH page on looking for mental health services</a>, and/or the <a href="https://cmha.ca/find-help">CMHA page on how to get help</a>.</li>
        <li>A number of organizations offer support during difficult times. For example, for free support network in Canada, you can visit <a href="https://talksuicide.ca/">talksuicide.ca</a> or call 1-833-456-4566 (1-866-277-3553 in Quebec).</li>
        </ul>
        <b>For resources in Australia:</b>
        <ul>
        <li>To learn more about mental health conditions, treatment, research, and warning signs, you can visit the <a href="https://www.healthdirect.gov.au/">healthdirect site</a>.</li>
        <li>If the questions you answered trouble you in any way, we urge you to arrange a timely appointment with your physician, clinical psychologist or psychiatrist.</li>
        <li>For help finding mental health services, you can visit <a href="https://headtohealth.gov.au/services">Head to Health Services</a>, and/or chat with their online chatbot.</li>
        <li>A number of organizations offer support during difficult times. Below we have listed some examples of these free and confidential support networks:</li>                   
        <ul>
        <li>The Lifeline crisis support (or call 13 11 14)</li>
        <li>The Suicide Call Back Service (or call 1300 659 467)</li>
        </ul>
        </ul>
        <p>
        For any other country not listed above, please search "(name of your country) mental health support/services" in Google to find resources close to you.
        <p> 
        <p>Press any key to continue.</p>
        `,
    post_trial_gap: 500
};



// Initialize timeline.
var timeline = [];

// add everything to timeline. 
timeline = timeline.concat(enterFullScreen); 
timeline = timeline.concat(NivturkMotivationalState); 
timeline = timeline.concat(instructionsEmotion1); 
timeline = timeline.concat(instructionsEmotion2); 
timeline = timeline.concat(instructionsEmotion3); 
timeline = timeline.concat(affectGridBaseline); 
timeline = timeline.concat(audioPreTest); 
timeline = timeline.concat(videoInstructions); 
timeline = timeline.concat(video); 
timeline = timeline.concat(affectGrid); 
timeline = timeline.concat(surveyIntro); 
timeline = timeline.concat(survey); 
timeline = timeline.concat(thankYou); 
timeline = timeline.concat(resources); 