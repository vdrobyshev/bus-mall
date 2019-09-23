'use strict'

var leftImage = null;
var middleImage = null;
var rightImage = null;

var totalVotes = 0;

var sectionTag = document.getElementById('images');
var left = document.getElementById('left');
var middle = document.getElementById('middle');
var right = document.getElementById('right');



function Mall(name, image) {
  this.name = name;
  this.image = image;
  this.clicked = 0;
  this.views = 0;
  Mall.all.push(this);
}

Mall.all = [];

function generateRandom() {
  var random = Math.floor(Math.random() * Mall.all.length);
  console.log("random" +random);
  return random;
}





function renderGeneral() {

  leftImage = generateRandom();
  middleImage = generateRandom();
  rightImage = generateRandom();
}





//var memory = [];

function render() {
  
  renderGeneral();

  switch (true) {


    case (leftImage === middleImage):
      renderGeneral();
      break;


    case (leftImage === rightImage):
      renderGeneral();
      break;

    case (middleImage === rightImage):
      renderGeneral();
      break;

    default:

      left.src = Mall.all[leftImage].image;
      //console.log("Left" +left.src);

      middle.src = Mall.all[middleImage].image;

      right.src = Mall.all[rightImage].image;




      Mall.all[leftImage].views++;
      Mall.all[rightImage].views++;
      Mall.all[middleImage].views++;


  }
}





//////////////////////////////////////////////////
var clickOnImage = function (event) {

  var imageClicked = event.target.id;
  console.log("Here" + imageClicked);

  if (imageClicked === 'left' || imageClicked === 'right' || imageClicked === 'middle') {

    totalVotes++;

    if (imageClicked === 'left') {
      Mall.all[leftImage].clicked++;
    } else if (imageClicked === 'right') {
      Mall.all[rightImage].clicked++;
    } else if (imageClicked === 'middle') {
      Mall.all[middleImage].clicked++;
    } else {
      alert('PLease click on an image');
    }

    console.log(Mall.all[leftImage].clicked);
    console.log(Mall.all[middleImage].clicked);
    console.log(Mall.all[rightImage].clicked);


    if (totalVotes === 5) {

      sectionTag.removeEventListener('click', clickOnImage);
      alert("You completed the voting");

      for (var i = 0; i < Mall.all.length; i++) {
        var shop = Mall.all[i];
        console.log(`${shop.name} received ${shop.clicked} votes with ${shop.views} views`);
      }
    } else {
      render();
    }

  }
};








new Mall('bag', '/images/bag.jpg');
new Mall('banana', '/images/banana.jpg');
new Mall('bathroom', '/images/bathroom.jpg');
new Mall('boots', '/images/boots.jpg');
new Mall('breakfast', '/images/breakfast.jpg');
new Mall('bubblegum', '/images/bubblegum.jpg');
new Mall('chair', '/images/chair.jpg');
new Mall('cthulhu', '/images/cthulhu.jpg');
new Mall('dog-duck', '/images/dog-duck.jpg');
new Mall('dragon', '/images/dragon.jpg');
new Mall('pen', '/images/pen.jpg');
new Mall('pet-sweep', '/images/pet-sweep.jpg');
new Mall('scissors', '/images/scissors.jpg');
new Mall('shark', '/images/shark.jpg');
new Mall('sweep', '/images/sweep.png');
new Mall('tauntaun', '/images/tauntaun.jpg');
new Mall('unicorn', '/images/usb.gif');
new Mall('usb', '/images/bag.jpg');
new Mall('water-can', '/images/water-can.jpg');
new Mall('wine-glass', '/images/wine-glass.jpg');

render();

console.log(Mall.all);

sectionTag.addEventListener('click', clickOnImage);
