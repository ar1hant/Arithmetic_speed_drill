var p = document.querySelectorAll('p');
var input = document.querySelector('input');
var button = document.querySelectorAll('button');
var score = 0;

function difficulty(a,b,c){
  d=Math.pow(10,(a-1));
  button[a].style.color='lightgreen';
  button[b].style.color= 'green';
  button[c].style.color = 'darkgreen';
  restart();
  values();
}

function values() {
  a = p[0].innerText = Math.trunc(Math.random() * d);

  b = p[2].innerText = Math.trunc(Math.random() * d);
  operation = ['+', '-', '*', '/'];
  opindex = Math.trunc(Math.random() * 4);
  p[1].innerText = operation[opindex];
}

input.oninput = function() {
  switch (opindex) {
    case 0:
      res = a + b;
      break;
    case 1:
      res = a - b;
      break;
    case 2:
      res = a * b;
      break;
    case 3:
      res = a / b;
      break;
  }
  if (input.value == res) {
    input.value = '';
    score++;
    document.querySelectorAll('b')[0].innerText = score;
    values();
  }
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

var time = document.querySelectorAll('b')[1];
var timeleft = 60;
var downloadTimer = setInterval(function() {
  if (timeleft <= 0) {
    time.style.display =
    input.style.display = 'none';
    if(timeleft == 0){
      var name = prompt("Please enter your name", "");
      setCookie(name,((score) > 0 ? score : 0),0.0007); // 0.0007 -> approx 1 min lifetime.
      getCookie(name);
    }
  }

  time.innerText = timeleft;
  timeleft -= 1;
}, 1000);

function restart() {
  document.querySelector('b').innerText = 0;
  input.style.display = 'block';
  time.style.display = 'inline';
  timeleft = 60;
}
difficulty(2,3,4);