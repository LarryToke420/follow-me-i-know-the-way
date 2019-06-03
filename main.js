// Initialize Firebase (ADD YOUR OWN DATA)
var hide =false;
var toMadi;
var toMitchell;
function validate() {
    if (document.getElementById('hidden').checked) {
        hide = true;
    }
    else {
        hide = false;
    }
}
function isToMadi() {

    if (document.getElementById('madi').checked) {
        toMadi = true;
        console.log(toMadi);
    }
    else {
        toMadi = false;
        console.log(toMadi);
    }
}
function isToMitchell() {
    if (document.getElementById('mitchell').checked) {
        toMitchell = true;
        console.log(toMitchell);
    }
    else {
        toMitchell = false;
        console.log(toMitchell);
    }
}
var config = {
    apiKey: "AIzaSyCb9yYooVjjp3ho_uSithY8r3pm2KOmlK0",
    authDomain: "stored-letters.firebaseapp.com",
    databaseURL: "https://stored-letters.firebaseio.com",
    projectId: "stored-letters",
    storageBucket: "stored-letters.appspot.com",
    messagingSenderId: "913201424027",
  };
  firebase.initializeApp(config);
  
  // Reference messages collection
  var messagesRef = firebase.database().ref('messages');
  var hiddenMessagesRef = firebase.database().ref('hiddenMessages');

  // Listen for form submit
  document.getElementById('newMessage').addEventListener('submit', submitForm);

  // Submit form
  function submitForm(e){
    e.preventDefault();
  
    // Get values
    var title = getInputVal('title');
    var message = getInputVal('message');
    var date = getInputVal('date');


    if(hide === true) {
        if(toMadi === true){
            saveHiddenMessage(title, message, date, 'madi');
        }
        if(toMitchell === true){
            saveHiddenMessage(title, message, data, 'mitchell');
        }
    }
    if (hide === false) {
        if(toMadi === true){
            saveMessage(title, message, date, 'madi');
        }
        if(toMitchell === true){
            saveMessage(title, message, date, 'mitchell');
        }
    }
  
    // Show alert
    document.querySelector('.alert').style.display = 'block';
  
    // Hide alert after 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').style.display = 'none';
    },3000);
  
    // Clear form
    document.getElementById('newMessage').reset();
  }
  
  // Function to get get form values
  function getInputVal(id){
    return document.getElementById(id).value;
  }
  
  // Save message to firebase
  function saveMessage(title, message, date, person){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      title: title,
      message:message,
      date:date,
      src: src,
      person:person
    });
}
    function saveHiddenMessage(title, message, date, person){
        var newMessageRef = hiddenMessagesRef.push();
        newMessageRef.set({
          title: title,
          message:message,
          date:date,
          src: src,
          person:person
        });
  }

  var database = firebase.database();
  database.ref('messages').once('value', function(snapshot) {
      if (snapshot.exists()) {
            var content = '';
            var now = new Date();
            var dd = now.getDate();
            var mm = now.getMonth()+1;
            var yyyy = now.getFullYear();
            if(dd<10){
                dd='0'+dd;
            }
            if(mm<10)
            {
                mm='0'+mm;
            }
            now = yyyy+'-'+mm+'-'+dd;
            snapshot.forEach(function(data) {
                var val = data.val();
                if(val.person === 'madi') {
                content += '<section>'
                content += '<div class="row align-items-center">'
                content +='<div class="col-lg-6 order-lg-1">'
                content +='<div class="p-5">'
                content +='<h2 class="display-4"> Message to Madi</h2>'
                content +='<p> '+ val.title + '</p>';
                content +='<p> '+ val.message + '</p>';
                if (val.date < now) {
                    content +='<p> '+ val.date + '</p>'
                }
                content +='</div>'
                content +='</div>'
                content +='<div class="col-lg-6 order-lg-2">'
                content +='<div class="p-5">'
                content +='</div>'
                content +='</div>'
                content += '</div>'
                content += '</div>'
                content += '</section>'
            } 
            if(val.person === 'mitchell') {
                content += '<section>'
                content += '<div class="row align-items-center">'
                content +='<div class="col-lg-6 order-lg-1">'
                content +='<div class="p-5">'
                content +='<h2 class="display-4"> Message to Mitchell</h2>'
                content +='<p> '+ val.title + '</p>';
                content +='<p> '+ val.message + '</p>';
                if (val.date < now) {
                    content +='<p> '+ val.date + '</p>'
                }
                content +='</div>'
                content +='</div>'
                content +='<div class="col-lg-6 order-lg-2">'
                content +='<div class="p-5">'
                content +='</div>'
                content +='</div>'
                content += '</div>'
                content += '</div>'
                content += '</section>'
            } 
            });
          $('#startHere').append(content);
      }
  });

