var timeStamp = 0.0;
var cityMap = new Map();
var noOfCities = 0;

const socket = new WebSocket('ws://city-ws.herokuapp.com');
socket.addEventListener('message', function (event) {
    timeStamp = event.timeStamp;
    data = JSON.parse(event.data);
    data.forEach(handleUpdateMessage);
});

function handleUpdateMessage(data) {
	if(cityMap[data["city"]]) {
		cityMap[data["city"]] = [ cityMap[data["city"]][0], parseFloat(data["aqi"]).toFixed(2), timeStamp, cityMap[data["city"]][2] ];
	}
	else {
		cityMap[data["city"]] = [noOfCities, parseFloat(data["aqi"]).toFixed(2), timeStamp, 0.0 ];
	  noOfCities = noOfCities + 1;
	}
	buildTable();
	buildGraph();
}

function buildTable() {
	for (var city in cityMap) {
		var arr = cityMap[city];
		var cell = document.getElementById("aqiTable").rows[arr[0]+1].cells;
		cell[0].innerHTML = city;
		cell[1].innerHTML = arr[1];
		cell[1].setAttribute('data', handleColor(arr[1]));
		cell[2].innerHTML = handleLastUpdated(arr[2], arr[3]);
	}
}

function handleLastUpdated(curTime, lastTime) {
  if ((curTime - lastTime) < 60000.0)
  	return "A few seconds ago";
  else if((curTime - lastTime) < 120000.0)
    return "A minute ago";
  else return "A few minutes ago";
}

function handleColor(aqi) {
	if (aqi<=50.0) return 'green';
	else if (aqi<=100.0) return 'lightgreen';
	else if (aqi<=200.0) return 'yellow';
	else if (aqi<=300.0) return 'orange';
	else if (aqi<=400.0) return 'red';
	else return 'darkred';
}

function buildGraph() {
	var cities = Object.keys(cityMap);
	var aqis = Object.values(cityMap).map(function(arr) {return arr[1];});
	var trace = {
	  type: 'scatter',
	  name: 'Live AQI',
	  x: aqis,
	  y: cities,
	  mode: 'markers',
	  marker: {
	    color: 'rgb(0, 0, 160, 1)',
	    symbol: 'circle',
	    size: 10
	  }
	};
	var data = [trace];
	var layout = {
	  title: 'Live AQI Graph of Cities',
	  xaxis: {
	    showgrid: true,
	    showline: true,
	    linecolor: 'rgb(102, 102, 102)',
	    titlefont: {
	      font: {
	        color: 'rgb(204, 204, 204)'
	      }
	    },
	    tickfont: {
	      font: {
	        color: 'rgb(102, 102, 102)',
	        size: 15
	      }
	    },
	    autotick: true,
	    dtick: 15,
	    ticks: 'outside',
	    tickcolor: 'rgb(102, 102, 102)'
	  },
	  margin: {
	    l: 140,
	    r: 40,
	    b: 50,
	    t: 80
	  },
	  legend: {
	    font: {
	      size: 15,
	    },
	    yanchor: 'middle',
	    xanchor: 'right'
	  },
	  width: 1000,
	  height: 600,
	  paper_bgcolor: 'rgb(254, 247, 234)',
	  plot_bgcolor: 'rgb(254, 247, 234)',
	  hovermode: 'closest'
	};
	Plotly.newPlot('myPlot', data, layout);
}