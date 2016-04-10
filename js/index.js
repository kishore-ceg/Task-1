
var socket = io();
var person;
var $messages = $('.messages-content'),
    d, h, m,
    i = 0;


$(window).load(function() {
  
  $messages.mCustomScrollbar();
  person="Welcome "+ person;
  fakeMessage(person);

});


function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage(){
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }

  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();


  $('.message-input').val(null);
  updateScrollbar(); 


  Message(msg);
     
}

function Message(msg){
  socket.emit('chatMessage',msg);
  return false;
}

socket.on('chatMessage', function(msg){
   fakeMessage(msg);
});

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

function typing(){
  $('<div class="message loading new"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();  
}


function fakeMessage(msg) {
  if ($('.message-input').val() != '') {
    //return false;
  }

    typing();

    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="https://4.bp.blogspot.com/-Nyfdpymc_Lo/VkQw-nJ79mI/AAAAAAAARYg/6o9VeoTvu-I/s1600-r/logo_chrome.png" /></figure>' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
 
  for( var i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

$(document).ready(function(){
  
  person = prompt("Please enter your name");
  document.getElementById('usr-name').value = person;

  var name = person;
  $('#usr-name').val(name);
  socket.emit('chatMessage', '<b>' + name + '</b> has joined the discussion','System');
});