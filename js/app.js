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

  return random;
}

function renderGeneral() {
  leftImage = generateRandom();
  middleImage = generateRandom();
  rightImage = generateRandom();
}

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
      middle.src = Mall.all[middleImage].image;
      right.src = Mall.all[rightImage].image;

  }


}

//////////////////////////////////////////////////
var clickOnImage = function (event) {

  var imageClicked = event.target.id;

  if (imageClicked === 'left' || imageClicked === 'right' || imageClicked === 'middle') {

    totalVotes++;
    // need to incrament goat clicked by one
    if (imageClicked === 'left') {
      // do logic to incrament the number
      Mall.all[leftImage].clicked++;
    } else if (imageClicked === 'right') {
      Mall.all[rightImage].clicked++;
    }
  } else {
    alert('you didn\'t select an image');
  }

  console.log(Mall.all[leftImage]);
  console.log(Mall.all[rightImage]);

  // check the goat votes
  // if (goatVote === 5) {
  //   // remove
  //   goatImagesTag.removeEventListener('click', handleClickOnGoat);
  //   console.log("you completed the voting")
  //   // output to the browser the results
  //   // "Sassy Goat received 4 votes with 5 views"
  //   for (var i = 0; i < Goat.allImages.length; i++) {
  //     var goat = Goat.allImages[i];
  //     console.log(`${goat.name} received ${goat.clicked} votes with ${goat.views} views`);
  //   }
  // } else {
  //   renderGoats();
  // }

}








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