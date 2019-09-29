'use strict';

var leftImage = null;
var middleImage = null;
var rightImage = null;

var totalVotes = 0;


//assign variables to id tags from index.html file
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
    //assign the image to image ids left, right, middle from index.html display the image on the sceen
    memory = [];
    left.src = Mall.all[leftImage].image;
    memory.push(leftImage);


    middle.src = Mall.all[middleImage].image;
    memory.push(middleImage);


    right.src = Mall.all[rightImage].image;
    memory.push(rightImage);

    //Count the number of views for each image
    Mall.all[leftImage].views++;
    Mall.all[rightImage].views++;
    Mall.all[middleImage].views++;

  }
}


/////eventListener Click

var clickOnImage = function (event) {

  var imageClicked = event.target.id;


  if (imageClicked === 'left' || imageClicked === 'right' || imageClicked === 'middle') {

    //increase the number of votes for the selected image
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


    // checks if the total number is 25
    if (totalVotes === 25) {

      updateStorage();

      //create the chart
      getData();

      populateChart();
      barChart.update();


      sectionTag.removeEventListener('click', clickOnImage);

      //Inform that the voting is complete
      alert('Thank you. You completed the voting.');

      //Display the results in H1 in index.html
      var res = document.getElementById('h2');
      res.textContent = 'Here are the results:';


      //create the list with the stats of the voting with name, number of clicks and views
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

//call Click event listener
sectionTag.addEventListener('click', clickOnImage);




var nameData = [];
var clickData = [];
var viewsData = [];

//////generates data for the chart
function getData() {
  for (var i = 0; i < Mall.all.length; i++) {
    nameData.push(Mall.all[i].name);
    clickData.push(Mall.all[i].clicked);
    viewsData.push(Mall.all[i].views);
  }

}



var ctx = document.getElementById('myChart').getContext('2d');

var barChart;
//Generate the chart with the results of the voting
//////////The design and approach was borrowed from https://codepen.io/Shokeen/pen/NpgbKg
function populateChart() {
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

//sends data to local storage
function updateStorage() {

  var jsonString = JSON.stringify(Mall.all);
  localStorage.setItem('mall', jsonString);

}

//retrieves data from local storage
function retrieveStorage() {
  if (localStorage.mall) {
    var data = localStorage.getItem('mall');
    var parsedData = JSON.parse(data);

    Mall.all = parsedData;

  }
  render();
}


retrieveStorage();


