var socket = io.connect('http://localhost:3000');
 
 function isMobile() {
   const isAndroid = /Android/i.test(navigator.userAgent);
   const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
   return isAndroid || isiOS;
 }

 const mobile = isMobile();

 socket.on('letter', function(data, firstLetter) {
  document.querySelector('#letter').innerHTML = data;
  if (firstLetter === true) {
    document.querySelector('#word').innerHTML = " ";
  }
});

 socket.on('translation', function(word) {
  document.querySelector('#word').innerHTML = word;
  
  if ('speechSynthesis' in window) {
    // Speech Synthesis supported 🎉
    var msg = new SpeechSynthesisUtterance();
    console.log(word);
    msg.text = word;
    window.speechSynthesis.speak(msg);
  }else{
    // Speech Synthesis Not Supported 😣
    alert("Sorry, your browser doesn't support text to speech!");
  }
});

function show() {
  var x = document.getElementById('image');
  if (x.style.display === "none"){
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function toggleDemoMode () {
  var isChecked = document.getElementById("toggle1").checked;
  socket.emit('demoMode',isChecked);
}
