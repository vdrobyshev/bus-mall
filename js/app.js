'use strict';

var leftImage = null;
var middleImage = null;
var rightImage = null;

var totalVotes = 0;

var sectionTag = document.getElementById('images');
var left = document.getElementById('left');
var middle = document.getElementById('middle');
var right = document.getElementById('right');




//////Object Constructor
function Mall(name, image) {
  this.name = name;
  this.image = image;
  this.clicked = 0;
  this.views = 0;
  Mall.all.push(this);


}

Mall.all = [];

/////////generate random numbers

function generateRandom() {
  var random = Math.floor(Math.random() * Mall.all.length);
  //console.log('random' + random);
  return random;
}


function renderGeneral() {

  leftImage = generateRandom();
  middleImage = generateRandom();
  rightImage = generateRandom();
}



//////////render to the screen

var memory = [];

function render() {

  renderGeneral();

  if (memory.includes(leftImage) || memory.includes(middleImage) || memory.includes(rightImage)) { ///check for repetition of previous 3 images

    render();
  }

  else if (leftImage === middleImage || leftImage === rightImage || middleImage === rightImage) { //checks for repetition of current 3 images

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


/////eventListener

var clickOnImage = function (event) {
  //retrieveStorage();
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


    //////////////////////////////////////////////////
    if (totalVotes === 25) {

      updateStorage();
      // retrieveStorage();
      getData();//chart array

      populateChart();
      barChart.update();




      sectionTag.removeEventListener('click', clickOnImage);

      alert('You completed the voting');

      var ulElement = document.createElement('ul');

      for (var i = 0; i < Mall.all.length; i++) {
        var shop = Mall.all[i];
        var listElement = document.createElement('li');
        listElement.textContent = `${shop.name} received ${shop.clicked} vote(s) and was seen ${shop.views} times`;
        ulElement.appendChild(listElement);
        sectionTag.appendChild(ulElement);

      }
    } else {
      render();


    }

  }
};


///populate object Mall

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
console.log(Mall.all);
//updateStorage();
console.log(localStorage)
//render();
sectionTag.addEventListener('click', clickOnImage);




var nameData = [];
var clickData = [];
var viewsData = [];

//////generates data for the chart
function getData() {
  for (var i = 0; i < Mall.all.length; i++) {
    nameData.push(Mall.all[i].name);
    //console.log(Mall.all[i].name);
    clickData.push(Mall.all[i].clicked);
    //console.log(Mall.all[i].clicked);
    viewsData.push(Mall.all[i].views);
  }

}



var ctx = document.getElementById('myChart').getContext('2d');

var barChart;
function populateChart() {


  //////////The design and approach was borrowed from https://codepen.io/Shokeen/pen/NpgbKg
  var chartClicks = {
    label: 'Number of clicks',
    data: clickData,
    backgroundColor: 'rgb(50, 58, 168)',
    yAxisID: 'y',
  };



  var chartViews = {
    label: 'Number of views',
    data: viewsData,
    backgroundColor: 'rgb(50, 168, 50)',

  };

  var chartNames = {
    labels: nameData,
    datasets: [chartClicks, chartViews],
  };

  var chartOptions = {
    scales: {
      xAxes: [{
        barPercentage: 1,
        categoryPercentage: 0.6,
      }],
      yAxes: [{
        id: 'y',
      }

      ],
    },
  };


  barChart = new Chart(ctx, {
    type: 'bar',
    data: chartNames,
    options: chartOptions,
  });

}

function updateStorage() {

  var jsonString = JSON.stringify(Mall.all);
  localStorage.setItem('mall', jsonString);

}

//116
function retrieveStorage() {
  if (localStorage.mall) {
    console.log(localStorage.mall)
    var data = localStorage.getItem('mall');
    //console.log(data);

    var parsedData = JSON.parse(data);
    //console.log(parsedData);

    Mall.all = parsedData;


    // for (var i = 0; i < parsedData.length; i++) {
    //   new Mall(parsedData[i].name, parsedData[i].image, parsedData[i].clicked, parsedData[i].views);
    // }
    //console.log(Mall.all);

    // render();
  }
  render();
}
//localStorage.clear();
//

retrieveStorage();


