var cross_fader = document.getElementById("cross_fader");
var lastkey = null;

document.onkeydown = (event) => {
  event.preventDefault();
  // console.log(event.key + " " + event.code + " " + event.keyCode);
  lastkey = event.key;

  if(event.key == "c") {
    cross_fader.value = 0;
  }
  else if(event.key == "v") {
    cross_fader.value = 32;
  }
  else if(event.key == "b") {
    cross_fader.value = 64;
  }
  else if(event.key == "n") {
    cross_fader.value = 96;
  }
  else if(event.key == "m") {
    cross_fader.value = 127;
  }
};

document.onwheel = (event) => {
  // event.preventDefault();
  // console.log(event.deltaY);
  if(lastkey == "c") {
    event.deltaY>0 ? cross_fader.value+=5 : cross_fader.value-=5;
  }
};
