// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');


var colors="";
var actor="";
var movie="";
var hobby="";

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function miss_you(agent) {
    
    agent.add(`Ghanta miss you.... Do you even know me well to miss me? .. Acha tell me , Whats my favorite color?`);
    
    }

    function fav_color(agent) {
         const colors=agent.parameters.colors;
         this.colors=colors;
        agent.add(`yes correct my fav color is ${colors}. Nice!! But you are just lucky here....... Let me ask one more`);
      agent.add(`Whats my favorite hobby?`);
      console.log(colors);
        
        }
  function fav_hobby(agent) {
         const hobby=agent.parameters.hobby;
         this.hobby=hobby;
        agent.add(`yes correct my fav hobby is ${hobby}. Good going , Next`);
      agent.add(`Whats my favorite movie?`);
      console.log(hobby);
        
        }
  function fav_movie(agent) {
         const movie=agent.parameters.movie;
         this.movie=movie;
        agent.add(`yes I just love ${movie}. Best movie ever made!!`);
      agent.add(`What about my fav actor?`);
      console.log(movie);
        
        }
  function fav_actor(agent) {
         const actor=agent.parameters.actor;
         this.actor=actor;
        agent.add(`${actor} is bae. Ill marry him some day`);
      
      console.log(actor);
        
        }
  
  function scrapbook(agent) {
    
    agent.add(new Card({
        title: `Manisha Singla`,
        imageUrl: 'https://s3.ap-south-1.amazonaws.com/awsiconsng/manisha.jpg',
        text: `FAVORITE COLOR : ${this.colors} \n FAVORITE MOVIE : ${this.movie} \n FAVORITE HOBBY : ${this.hobby} \n FAVORITE ACTOR : ${this.actor} \n FAVORITE PROGRAMMING LANGUAGE : VISUAL BASIC`
    
      })
    );
    agent.add(new Suggestion(`Miss us`));
    agent.add(new Suggestion(`miss us more`));
   
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
 intentMap.set('HelloWorldIntent', helloworld);
 intentMap.set('miss you', miss_you);
 intentMap.set('favorite color', fav_color);
  intentMap.set('favorite hobby', fav_hobby);
  intentMap.set('favorite actor', fav_actor);
  intentMap.set('favorite movie', fav_movie);
  intentMap.set('show scrapbook', scrapbook);
  
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
