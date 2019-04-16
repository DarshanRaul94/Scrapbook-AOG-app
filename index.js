// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
const functions = require('firebase-functions');
const {
    WebhookClient
} = require('dialogflow-fulfillment');
const {
    Card,
    Suggestion,Image,Text
} = require('dialogflow-fulfillment');


var colors = "";
var actor = "";
var movie = "";
var hobby = "";
var gift = "";
var vacation = "";

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({
        request,
        response
    });
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

        agent.add(`Ghanta miss you.... Do you even know me well to miss me?... Acha tell me , Whats my favorite color?`);

    }

    function fav_color(agent) {
        const colors = agent.parameters.colors;
        this.colors = colors;
        agent.add(`yes correct my favorite color is ${colors}. Nice!! But you are just lucky here....... Let me ask one more`);
        agent.add(`Whats my favorite hobby?`);
        console.log(colors);

    }

    function fav_hobby(agent) {
        const hobby = agent.parameters.hobby;
        this.hobby = hobby;
        agent.add(`yes correct my favorite hobby is ${hobby}. Good going , Next`);
        agent.add(`Whats my favorite movie?`);
        console.log(hobby);

    }

    function fav_movie(agent) {
        const movie = agent.parameters.movie;
        this.movie = movie;
        agent.add(`yes I just love ${movie}. Best movie ever made!!`);
        agent.add(`What about my favorite actor?`);
        console.log(movie);

    }

    function fav_actor(agent) {
      const actor = agent.parameters.actor;
        this.actor = actor;
       agent.add(`wo Sab buddhe makeup lagake aate hai .Minion's are my first love `);
      let text = new Text("So cute!!"); 
      text.setSsml('<speak> <audio src="https://s3.ap-south-1.amazonaws.com/awsiconsng/%E2%80%8Cminion.mp3"></audio></speak>');
        
       
        agent.add(new Image('https://upload.wikimedia.org/wikipedia/en/7/7d/Minions_characters.png'));
       	agent.add(text);
        agent.add(`What's my favorite vacation place?`);
        console.log(actor);

    }

    function fav_vacation(agent) {
        const vacation = agent.parameters.vacation;
        this.vacation = vacation;
        agent.add(`Visiting ${vacation} with minions. That is couple goals!`);
        agent.add(`What's my favorite gift ?`);
        console.log(vacation);

    }

    function fav_gift(agent) {
        const gift = agent.parameters.gift;
        this.gift = gift;
        agent.add(` Koi to mujhe ${gift} dedo. Iphone exchange kar dungi `);
        agent.add(`Iam a machine but I have to say iam not a machine and Iam tired! Lets create a Scrapbook`);

        console.log(gift);

    }


    function scrapbook(agent) {

        agent.add(new Card({
            title: `Manisha Singla`,
            imageUrl: 'https://s3.ap-south-1.amazonaws.com/awsiconsng/manisha.jpg',
            text: `FAVORITE COLOR : ${this.colors} \n FAVORITE MOVIE : ${this.movie} \n FAVORITE HOBBY : ${this.hobby} \n FAVORITE ACTOR : ${this.actor} \n FAVORITE VACATION : ${this.vacation} \n FAVORITE GIFT: ${this.gift} \n FAVORITE PROGRAMMING LANGUAGE : VISUAL BASIC`

        }));
        agent.add(new Suggestion(`Miss us`));
        agent.add(new Suggestion(`miss us more`));

    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);

    intentMap.set('miss you', miss_you);
    intentMap.set('favorite color', fav_color);
    intentMap.set('favorite hobby', fav_hobby);
    intentMap.set('favorite actor', fav_actor);
    intentMap.set('favorite movie', fav_movie);
    intentMap.set('favorite vacation', fav_vacation);
    intentMap.set('favorite gift', fav_gift);

    intentMap.set('show scrapbook', scrapbook);

    // intentMap.set('your intent name here', googleAssistantHandler);
    agent.handleRequest(intentMap);
});
