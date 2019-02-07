var data = d3.csv('TableauOutPut\\Part1-NumberOfIncidents.csv', function(data){
  let days = +data.Date;
  //console.log(days);
  let incidents = +data.Incidents;
  let countMin = 0;
  //Maximum number of incidents
  let countMax = 453;
  //console.log("Count bounds: " +[countMin, countMax]);
  let svg = d3.select("body").select("section.sections").select("div").select("svg");
  let margin = {
    top:    15,
    right:  35, // leave space for y-axis
    bottom: 30, // leave space for x-axis
    left:   10
  };
    let bounds = svg.node().getBoundingClientRect();
    let plotWidth = bounds.width - margin.right - margin.left;
    let plotHeight = bounds.height - margin.top - margin.bottom;
    let countScale = d3.scaleLinear()
        .domain([countMin, countMax])
        .range([plotHeight, 0])
        .nice();
    let monthScale = d3.scaleBand()
        .domain(days) // all letters (not using the count here)
        .rangeRound([0, plotWidth])
        .paddingInner(0.1); // space between bars

    let plot = svg.select("g#plot");

    if (plot.size() < 1) {
        // this is the first time we called this function
        // we need to steup the plot area
        plot = svg.append("g").attr("id", "plot");

        // notice in the "elements" view we now have a g element!

        // shift the plot area over by our margins to leave room
        // for the x- and y-axis
        plot.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      }

 });
 // var maxData = d3.max(data.incidents.values());
 // console.log("MAx: " + maxData);
//.row(function(d) { return {date:Number(d.date1), day:d.day1, rank:Number(d.rank1), incident:Number(d.incidents1) };})
//.get(function(error, data){

 // var newDate = d3.csv('TableauOutPut\\Part1-NumberOfIncidents.csv')
 // .then((data) => {
 //   data.forEach(d => {
 //     console.log("the data object is: " + d)
 //   })
 //   return data;
 // });
 //
 // var day="Day of Incident Date";
 // console.log("data is " + data);
 // d3.csv("TableauOutPut\\Part1-NumberOfIncidents.csv", function(d) {
 //   return {
 //     Date: +d.Date, // convert "Date" column to Date
 //     Day: d.Day,
 //     Rank: +d.Rank,
 //     Incidents: +d.Incidents // convert "Incidents" column to number
 //   }
 // }, function(data) {
 //   console.log(data.Day);
 // });
