

var https = require('http');
//var request = require("request-promise");
//TODO 
var uri = "184.6.255.4"; // the external IP including port number - remember you will need to port forward to your directv receiver's port 8080

//$CMD_SetZoneAOn = '<YAMAHA_AV cmd="PUT"><Main_Zone><Speaker_Preout><Speaker_AB><Speaker_A> On</Speaker_A></Speaker_AB></Speaker_Preout></Main_Zone></YAMAHA_AV>';
//$CMD_SetZoneAOff = '<YAMAHA_AV cmd="PUT"><Main_Zone><Speaker_Preout><Speaker_AB><Speaker_A> Off</Speaker_A></Speaker_AB></Speaker_Preout></Main_Zone></YAMAHA_AV>';
//$CMD_SetZoneBOn = '<YAMAHA_AV cmd="PUT"><Main_Zone><Speaker_Preout><Speaker_AB><Speaker_B> On</Speaker_B></Speaker_AB></Speaker_Preout></Main_Zone></YAMAHA_AV>';
//$CMD_SetZoneBOff = '<YAMAHA_AV cmd="PUT"><Main_Zone><Speaker_Preout><Speaker_AB><Speaker_B> Off</Speaker_B></Speaker_AB></Speaker_Preout></Main_Zone></YAMAHA_AV>';
//$CMD_SetMuteOn = '<YAMAHA_AV cmd="PUT"><Main_Zone><Volume><Mute>On</Mute></Volume></Main_Zone></YAMAHA_AV>';
//$CMD_SetMuteOff = '<YAMAHA_AV cmd="PUT"><Main_Zone><Volume><Mute>Off</Mute></Volume></Main_Zone></YAMAHA_AV>';
//$CMD_SetMuteBOn = '<YAMAHA_AV cmd="PUT"><Main_Zone><Volume><Zone_B><Mute>On</Mute></Zone_B></Volume></Main_Zone></YAMAHA_AV>';
//$CMD_SetMuteBOff = '<YAMAHA_AV cmd="PUT"><Main_Zone><Volume><Zone_B><Mute>Off</Mute></Zone_B></Volume></Main_Zone></YAMAHA_AV>';
//$CMD_SetVolumeDown = '<YAMAHA_AV cmd="PUT"><Main_Zone><Volume><Lvl><Val>Down 1 dB</Val><Exp></Exp><Unit></Unit></Lvl></Volume></Main_Zone></YAMAHA_AV>';
//$CMD_SetVolumeDown5 = '<YAMAHA_AV cmd="PUT"><Main_Zone><Volume><Lvl><Val>Down 5 dB</Val><Exp></Exp><Unit></Unit></Lvl></Volume></Main_Zone></YAMAHA_AV>';
//$CMD_SetVolumeUp = '<YAMAHA_AV cmd="PUT"><Main_Zone><Volume><Lvl><Val>Up 1 dB</Val><Exp></Exp><Unit></Unit></Lvl></Volume></Main_Zone></YAMAHA_AV>';
//$CMD_SetVolumeUp5 = '<YAMAHA_AV cmd="PUT"><Main_Zone><Volume><Lvl><Val>Up 5 dB</Val><Exp></Exp><Unit></Unit></Lvl></Volume></Main_Zone></YAMAHA_AV>';
//$CMD_SetVolumeBDown = '<YAMAHA_AV cmd="PUT"><Main_Zone><Volume><Zone_B><Lvl><Val>Down 1 dB</Val><Exp></Exp><Unit></Unit></Lvl></Zone_B></Volume></Main_Zone></YAMAHA_AV>';
//$CMD_SetVolumeBDown5 = '<YAMAHA_AV cmd="PUT"><Main_Zone><Volume><Zone_B><Lvl><Val>Down 5 dB</Val><Exp></Exp><Unit></Unit></Lvl></Zone_B></Volume></Main_Zone></YAMAHA_AV>';
//$CMD_SetVolumeBUp = '<YAMAHA_AV cmd="PUT"><Main_Zone><Volume><Zone_B><Lvl><Val>Up 1 dB</Val><Exp></Exp><Unit></Unit></Lvl></Zone_B></Volume></Main_Zone></YAMAHA_AV>';
//$CMD_SetVolumeBUp5 = '<YAMAHA_AV cmd="PUT"><Main_Zone><Volume><Zone_B><Lvl><Val>Up 5 dB</Val><Exp></Exp><Unit></Unit></Lvl></Zone_B></Volume></Main_Zone></YAMAHA_AV>';
//$CMD_SetServer = '<YAMAHA_AV cmd="PUT"><Main_Zone><Input><Input_Sel>SERVER</Input_Sel></Input></Main_Zone></YAMAHA_AV>';
//$CMD_SetTuner = '<YAMAHA_AV cmd="PUT"><Main_Zone><Input><Input_Sel>TUNER</Input_Sel></Input></Main_Zone></YAMAHA_AV>';
//$CMD_SetUSB = '<YAMAHA_AV cmd="PUT"><Main_Zone><Input><Input_Sel>USB</Input_Sel></Input></Main_Zone></YAMAHA_AV>';
//$CMD_SetPowerOn = '<YAMAHA_AV cmd="PUT"><Main_Zone><Power_Control><Power>On</Power></Power_Control></Main_Zone></YAMAHA_AV>';
//$CMD_SetPowerStandby = '<YAMAHA_AV cmd="PUT"><Main_Zone><Power_Control><Power>Standby</Power></Power_Control></Main_Zone></YAMAHA_AV>';

//EVERYTHING BELOW THIS LINE NEEDS NO CHANGES TO WORK
var DSPName = "";
var endpoint = "";
var channel = "";
var command = "";
var path = "";
var post_data = '';
var commandMessage = '';

exports.handler = (event, context) => {
    try {
        DSPName = "";
        endpoint = "";
        channel = "";
        command = "";
        path = "";
        if (event.session.new) {
            // New Session
            console.log("NEW SESSION");
        }
        switch (event.request.type) {
            case "LaunchRequest":
                // Launch Request
                console.log(`LAUNCH REQUEST`);
                context.succeed(generateResponse(buildSpeechletResponse("Ask me to do something with your reciever", true), {}));
                break;
            case "IntentRequest":
                if (event.request.intent.slots.dspName) detectDSP(event.request.intent.slots.dspName.value);
                //if (event.request.intent.slots.ChannelNumber) channel = event.request.intent.slots.ChannelNumber.value;
                if (event.request.intent.slots.command) command = event.request.intent.slots.command.value;

                // Intent Request
                console.log(`INTENT REQUEST`);
                switch (event.request.intent.name) {
                    case "GetCommand":
                        switch (command) {
                            case "volume up":
                                commandMessage = 'I turned the volume up';
                                console.log('up');
                                post_data = '<YAMAHA_AV cmd="PUT"><Main_Zone><Volume><Lvl><Val>Up 5 dB</Val><Exp></Exp><Unit></Unit></Lvl></Volume></Main_Zone></YAMAHA_AV>';
                                break;
                            case "volume down":
                                commandMessage = 'I turned the volume down';
                                console.log('down');
                                post_data = '<YAMAHA_AV cmd="PUT"><Main_Zone><Volume><Lvl><Val>Down 5 dB</Val><Exp></Exp><Unit></Unit></Lvl></Volume></Main_Zone></YAMAHA_AV>';
                                break;
                            case "volume up small":
                                commandMessage = 'I turned the volume up';
                                console.log('up');
                                post_data = '<YAMAHA_AV cmd="PUT"><Main_Zone><Volume><Lvl><Val>Up 1 dB</Val><Exp></Exp><Unit></Unit></Lvl></Volume></Main_Zone></YAMAHA_AV>';
                                break;
                            case "volume down small":
                                commandMessage = 'I turned the volume down';
                                console.log('down');
                                post_data = '<YAMAHA_AV cmd="PUT"><Main_Zone><Volume><Lvl><Val>Down 1 dB</Val><Exp></Exp><Unit></Unit></Lvl></Volume></Main_Zone></YAMAHA_AV>';
                                break;
                           
                            case "mute":
                                commandMessage = 'mute is on';
                                post_data = '<YAMAHA_AV cmd="PUT"><Main_Zone><Volume><Mute>On</Mute></Volume></Main_Zone></YAMAHA_AV>';
                                break;
                            case "mute off":
                                commandMessage = 'mute is off';
                                post_data = '<YAMAHA_AV cmd="PUT"><Main_Zone><Volume><Mute>Off</Mute></Volume></Main_Zone></YAMAHA_AV>';
                                break;
                            case "surround":
                                
                                if (DSPName !== '') {
                                    commandMessage = 'DSP is set to ' + DSPName;
                                    post_data = '<YAMAHA_AV cmd="PUT"><Main_Zone><Surround><Program_Sel><Current><Sound_Program>' + DSPName + '</Sound_Program></Current></Program_Sel></Surround></Main_Zone></YAMAHA_AV>';
                                } else {
                                    commandMessage = "Sorry I didn't catch the surround setting";
                                    post_data = '';
                                }
                                
                                break;
                               
                            case "list commands":
                                commandMessage = 'You can say, mute, mute off, volume up, volume up small, volume up large, and the same for down.';
                                break;
                            //$CMD_SetPowerOn = '<YAMAHA_AV cmd="PUT"><Main_Zone><Power_Control><Power>On</Power></Power_Control></Main_Zone></YAMAHA_AV>';
                            //$CMD_SetPowerStandby = '<YAMAHA_AV cmd="PUT"><Main_Zone><Power_Control><Power>Standby</Power></Power_Control></Main_Zone></YAMAHA_AV>';
                            //$CMD_SetScene = '<YAMAHA_AV cmd="PUT"><Main_Zone><Scene><Scene_Sel>Direct</Scene_Sel></Scene></Main_Zone></YAMAHA_AV>';
                            //$CMD_SetScene = '<YAMAHA_AV cmd="PUT"><Main_Zone><Surround><Program_Sel><Sound_Program>Direct</Sound_Program></Program_Sel></Surround></Setup></Main_Zone></YAMAHA_AV>';
                            default:
                                break;
                        }

                        break;
                    case "GetRecieverCommands":

                        break;


                    default:
                        context.fail(`INVALID REQUEST TYPE: ${event.request.type}`);
                }

                if (post_data !== '') {
                    //console.log(command);
                    var post_options = {
                        hostname: uri,
                        port: '9981',
                        path: '/YamahaRemoteControl/ctrl',
                        method: 'POST',
                        headers: {
                            //'Content-Type': 'application/xml',
                            'Content-Length': post_data.length
                        }
                    };

                    var post_request = https.request(post_options, function (res) {
                        var body = '';
                        console.log('Success, with: ' + res.statusCode);
                        res.on('data', function (chunk) {
                            body += chunk;
                            console.log(body);
                        });

                        res.on('end', function () {
                            console.log('After End');
                            context.succeed(generateResponse(

                                buildSpeechletResponse(commandMessage, true), {}));
                        });

                        res.on('error', function (e) {
                            console.log('After Error');
                            context.fail('error:' + e.message);
                        });
                    });

                    //console.log('After Request');
                    // post the data
                    post_request.write(post_data);
                    //console.log('After Write');

                    //generateResponse(buildSpeechletResponse(`I turned it up`, false), {});
                    post_request.end();
                } else {
                    context.succeed(generateResponse(buildSpeechletResponse(commandMessage, true), {}));
                }

                break;

        }
    } catch (error) {
        context.fail(`Exception: ${error}`);
    }
};



// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {
    return {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
    };
};
generateResponse = (speechletResponse, sessionAttributes) => {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
};

detectDSP = function (dsp) {
    switch (dsp) {
        case "7 channel":
            DSPName = "7ch Stereo";
            break;
        case "munich":
            DSPName = "Hall in Munich";
            break;
        case "vienna":
            DSPName = "Hall in Vienna";
            break;
        case "chamber":
            DSPName = "Chamber";
            break;
        case "cellar club":
            DSPName = "Cellar Club";
            break;
        case "roxy":
            DSPName = "The Roxy Theatre";
            break;
        case "the bottom line":
            DSPName = "The Bottom Line";
            break;
        case "sports":
            DSPName = "Sports";
            break;
        case "action game":
            DSPName = "Action Game";
            break;
        case "roleplaying":
            DSPName = "Roleplaying Game";
            break;
        case "music video":
            DSPName = "Music Video";
            break;
        case "standard":
            DSPName = "Standard";
            break;
        case "spectacle":
            DSPName = "Spectacle";
            break;
        case "sci-fi":
            DSPName = "Sci-Fi";
            break;
        case "adventure":
            DSPName = "Adventure";
            break;
        case "drama":
            DSPName = "Drama";
            break;
        case "mono":
            DSPName = "Mono Movie";
            break;
        case "surround decoder":
            DSPName = "Surround Decoder";
            break;
        case "2 channel":
            DSPName = "2ch Stereo";
            break;
        default:
            DSPName = "";

    }
    return;
    
}
