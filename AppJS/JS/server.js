var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var osc = require('osc-min');
var dgram = require('dgram');
 
// Autocorrection
var path = '/Users/balpaula/Documents/CSIM/1r-trim/AdvInterface/Project/Pipeline/4.AppJS/JS/words.txt';
var autocorrect = require('autocorrect')();
var autocorrectDemo = require('autocorrect')({dictionary: path});
var isCheckedDict = true;

var serverPort = 3000; // use default p5js server port
 
server.listen(serverPort);
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
 
app.get('/:filename', function (req, res) {
  res.sendFile(__dirname + '/' + req.params.filename);
});
 
io.on('connection', function (socket) {
  socket.on('demoMode', function(isChecked) {
    isCheckedDict = isChecked;
    //console.log("io demomode");
  });
});

function sendWord(word) {
  var correctedWord;
  if (isCheckedDict) {
    correctedWord = autocorrectDemo(word.toLowerCase());
  } else {
    correctedWord = autocorrect(word.toLowerCase());
  }
  console.log(correctedWord);
  io.emit("translation",correctedWord);
}

function sendLetter(letter,firstLetter) {
  io.emit("letter",letter,firstLetter);
}

var word = '';
var firstLetter = true;

socketWekOut = dgram.createSocket("udp4", function(msg, rinfo) {
  var error, error1;
  let alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","stop"]
  try {
    classif = osc.fromBuffer(msg).args[0].value;
    letter = alphabet[classif-1];
    if (letter !== "stop") {
      word += letter;
      sendLetter(word, firstLetter);
      firstLetter = false;
    } 
    if (letter === "stop") {
      if (word.length > 0){
        sendWord(word);
        console.log("stop");
        word = '';
        firstLetter = true;
      }
    }
    return;
  } catch (error1) {
    error = error1;
    return console.log(error);
  }
}); 
socketWekOut.bind(12000);
 
console.log("Open http://localhost:" + serverPort);
 