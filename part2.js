let outputObj2 = {
  incidents:[],
  times:[],
};
var LoadingData2 = function(){
convertRow = function(row, index){
  let out = {};
  for (let col in row){
    switch (col) {
      case "Times":
      out[col] = parseInt(row[col]);
      outputObj2.times.push(row[col]);
      break;
      case "Incidents":
      out[col] = +(row[col]);
      outputObj2.incidents.push((out[col]));
      break;
    }
  }
  return out;
}
d3.csv("TableauOutPut\\Part2-NumberOfIncidentsIn24Hrs.csv", convertRow)
.then(() => {
DrawBarChart2();
});
}
var DrawBarChart2 = function(){
  // console.log("csv obj is: " + csvObj);
  // let day = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  let countMin = 0;
  //Maximum number of incidents
  let countMax = d3.max(outputObj2.incidents);
  //console.log("Count bounds: " +[countMin, countMax]);
  let svg = d3.select("body").select("section:nth-child(3)").select("div").select("svg");
  let margin = {
    top:    15,
    right:  35, // leave space for y-axis
    bottom: 30, // leave space for x-axis
    left:   70
  };
    let bounds = svg.node().getBoundingClientRect();
    let plotWidth = bounds.width - margin.right - margin.left;
    let plotHeight = bounds.height - margin.top - margin.bottom;
    //Scalling the number of incidents as yAxis
    let incidentScale = d3.scaleLinear()
        .domain([countMin, countMax])
        .range([0, plotWidth])
        .nice();

    //Scalling number of days of a month as xAxis
    let timeScale = d3.scaleBand()
        .domain(outputObj2.times) // all letters (not using the count here)
        .rangeRound([plotHeight, 0])
        .paddingInner(0.1); // space between bars

    let plot = svg.select("g#plot2");

    if (plot.size() < 1) {
        // this is the first time we called this function
        // we need to steup the plot area
        plot = svg.append("g").attr("id", "plot2");

        // notice in the "elements" view we now have a g element!

        // shift the plot area over by our margins to leave room
        // for the x- and y-axis
        plot.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      }

    let xAxis = d3.axisBottom(incidentScale);
    let yAxis = d3.axisLeft(timeScale);

    if (plot.select("g#y-axis2").size() < 1) {
    let xGroup = plot.append("g").attr("id", "x-axis2");

    // the drawing is triggered by call()
    xGroup.call(xAxis);

    // notice it is at the top of our svg
    // we need to translate/shift it down to the bottom
    xGroup.attr("transform", "translate(0," + plotHeight + ")")

    // do the same for our y axix
    let yGroup = plot.append("g").attr("id", "y-axis2");
    yGroup.call(yAxis);
    //yGroup.attr("transform", "translate(" + plotWidth + ",0)");
  }
  else {
    // we need to do this so our chart updates
    // as we type new letters in our box
    plot.select("g#y-axis2").call(yAxis);
}
// incidents = [391,343,417,396,415,376,449,410,410,369,353,402,383,410,390,306,408,430
//   ,447,453,395,420,429,374,259,387,416,432,408,380,393];
  var color = d3.scaleLinear()
  .domain([d3.min(outputObj2.incidents), d3.max(outputObj2.incidents)])
  .range(["#caffec", "#2c5985"]);
// console.log("incidents: "+ incidents);
// console.log("out: "+  " - "  + outputObj.incidents);
outputObj2.incidents = outputObj2.incidents.reverse();
    plot.selectAll("rect")
    .data(outputObj2.incidents)
    .enter().append("rect")
        // we will style using css
        .attr("class", "bar")
        // the width of our bar is determined by our band scale
        .attr("width", function(d, i) {
          return incidentScale(outputObj2.incidents[i]);
        })
        // we must now map our letter to an x pixel position
        .attr("x", function(d, i) {
          return timeScale(outputObj2.incidents[i]);
        })
        // and do something similar for our y pixel position
        .attr("y", function(d, i) {
          return plotHeight - (13+ timeScale(outputObj2.times[i]));
        })
        // here it gets weird again, how do we set the bar height?
        .attr("height", function(d, i) {
          return timeScale.bandwidth();
        })
        .attr("fill",function(d, i) {return color(outputObj2.incidents[i]);
        })
for (let i =0; i < 45; i++){
        svg.append("line")
        .attr('x1',function(d){
          return 28 + margin.left + i * incidentScale(20);
        })
        .attr('y1', 0)
        .attr('x2', function(d){
          return 28 + margin.left +i * incidentScale(20)
        })
        .attr('y2', plotHeight + margin.top )
        .attr("stroke-width", 0.5)
        .attr("stroke", "#A9A9A9")
        .style("stroke-dasharray", "2,2,2")
      }
          // .each(function(d, i, nodes) {
          //   console.log("Added bar for:", d);
          // });

  };
LoadingData2();
