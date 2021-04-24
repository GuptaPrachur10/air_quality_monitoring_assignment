# air_quality_monitoring_assignment

I have built following features:
1. Live AQI city-wise Chart, with AQI highlighted with different colours based on reference level chart given. 
2. One of the features asked for was some subtle change in the chart when AQI changes from 'Good' to 'Poor', but this is not handld, as based on the given data, no value changes beyond a range of + or - 10, whereas the gap between 'Poor' and 'Good' is of 150. Such a direct change isn't possible. Such a change will happen gradually over a period of years or decades, hence I felt that's not a use case to handle. 
3. Using a graphing library Plotly.js a graph is plotted between Cities and their Live AQI which gives a good comparision amongst the cities also. The question asked was to graph the Live AQI of individual city, but Live AQI is just a value, a plot of just one value would look odd, so I plotted all the cities together. 
