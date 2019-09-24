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

/////////generate random numbers

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



    if (totalVotes === 25) {
      getData();
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

render();
sectionTag.addEventListener('click', clickOnImage);




var nameData = [];
var clickData = [];
var viewsData = [];


function getData() {
  for (var i = 0; i < Mall.all.length; i++) {
    nameData.push(Mall.all[i].name);
    console.log(Mall.all[i].name);
    clickData.push(Mall.all[i].clicked);
    console.log(Mall.all[i].clicked);
    viewsData.push(Mall.all[i].views);
  }

};



var ctx = document.getElementById('myChart').getContext('2d');

var chartClicks = {
  label: 'Number of clicks',
  data: clickData,
  backgroundColor: 'rgb(50, 58, 168)',
  borderWidth: 0,
  yAxisID: 'y-axis-clicks',
};



var chartViews = {
  label: 'Number of views',
  data: viewsData,
  backgroundColor: 'rgb(50, 168, 50)',
  borderWidth: 0,
 //yAxisID: 'y-axis-views'

};

var chartNames = {
  labels: nameData,
  datasets: [chartClicks, chartViews],
};

var chartOptions = {
  scales: {
    xAxes: [{
      barPercentage: 1,
      categoryPercentage: 0.6
    }],
    yAxes: [{
      id: 'y-axis-clicks'
    },
     //{
      //id: 'y-axis-views'
    //}
  ]
  }
};


var barChart = new Chart(ctx, {
  type: 'bar',
  data: chartNames,
  options: chartOptions,
});







// var ctx = document.getElementById('myChart').getContext('2d');
// var myChart = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [{
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)'
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)'
//       ],
//       borderWidth: 1
//     }]
//   },
//   options: {
//     scales: {
//       yAxes: [{
//         ticks: {
//           beginAtZero: true,
//         }
//       }],
//     },
//   },
// });