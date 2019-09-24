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
  console.log('random' + random);
  return random;
}





function renderGeneral() {

  leftImage = generateRandom();
  middleImage = generateRandom();
  rightImage = generateRandom();
}





var memory = [];

function render() {

  renderGeneral();

  if (memory.includes(leftImage) || memory.includes(middleImage) || memory.includes(rightImage)) {

    // renderGeneral();
    render();
  }

  else if (leftImage === middleImage || leftImage === rightImage || middleImage === rightImage) {
    // renderGeneral();
    render();
  }


  else {

    memory = [];
    left.src = Mall.all[leftImage].image;
    memory.push(leftImage);


    middle.src = Mall.all[middleImage].image;
    memory.push(middleImage);


    right.src = Mall.all[rightImage].image;
    memory.push(rightImage);




    Mall.all[leftImage].views++;
    Mall.all[rightImage].views++;
    Mall.all[middleImage].views++;

  }
}



var clickOnImage = function (event) {

  var imageClicked = event.target.id;


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


    if (totalVotes === 25) {

      sectionTag.removeEventListener('click', clickOnImage);
      alert("You completed the voting");

      for (var i = 0; i < Mall.all.length; i++) {
        var shop = Mall.all[i];
        console.log(`${shop.name} received ${shop.clicked} votes and was seen ${shop.views} times`);
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
new Mall('unicorn', '/images/unicorn.jpg');
new Mall('usb', '/images/usb.gif');
new Mall('water-can', '/images/water-can.jpg');
new Mall('wine-glass', '/images/wine-glass.jpg');

render();


sectionTag.addEventListener('click', clickOnImage);
