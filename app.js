// Import Modules
builder = require('botbuilder');
restify = require('restify');
// Create a connector
//Chat Connector
// connector = new builder.ChatConnector();
// Console Connector
connector = new builder.ConsoleConnector().listen();
// The Bot !
bot = new builder.UniversalBot(connector);

// Dialogs

bot.dialog('/',[
    function(session,args,next){
        if(!session.userData.name){
            session.beginDialog("/askname");
        }
        if(!session.userData.email){
            session.beginDialog("/askEmail");
        }
        else{
            next();
        }
    },
    function(session){
        session.send("These are Your Details : "+session.userData.name);
    }
]);

bot.dialog('/askname',[
    function(session){
        builder.Prompts.text(session,"Can we Know Your Name ? ");

    },
    function(session,results){
        session.userData.name = results.response;
        session.endDialog();
    }
]);

bot.dialog('/askemail',[
    function(session){
        builder.Prompts.text(session,"Your Email ?? ");

    },
    function(session,results){
        session.userData.email = results.response;
        session.endDialog();
    }
]);

// // restify

// var server = restify.createServer();
// server.listen(process.env.port || process.env.PORT || 3978, function () {
// console.log('%s listening to %s', server.name, server.url);
// });
// server.post('/api/messages', connector.listen());