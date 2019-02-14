let outputObj = {
  days:[],
  dates:[],
  ranks:[],
  incidents:[],
}
//Loading Data from local csv file
var LoadingData = function(){
convertRow = function(row, index){
  let out = {};
  for (let col in row){
    switch (col) {
      case "Day":
       out[col] = row[col];
       outputObj.days.push(row[col]);
       break;
      case "Date":
    //  out[col] = parseInt(row[col]);
      outputObj.dates.push(row[col]);
      break;
      case "Rank":
      out[col] = parseInt(row[col]);
      outputObj.ranks.push(row[col]);
      break;
      case "Incidents":
      out[col] = +(row[col]);
      outputObj.incidents.push((out[col]));
      break;
    }
  }
  return out;
}
 d3.csv("TableauOutPut\\Part1-NumberOfIncidents.csv", convertRow)
 .then(() => {
   DrawBarChart();
 })
}
var DrawBarChart = function(){
  let countMin = 0;
  //Maximum number of incidents
  let countMax = d3.max(outputObj.incidents);
  let svg = d3.select("body").select("section:nth-child(2)").select("div").select("svg");
  let margin = {
    top:    15,
    right:  35,
    bottom: 30,
    left:   40
  };
    let bounds = svg.node().getBoundingClientRect();
    let plotWidth = bounds.width - margin.right - margin.left;
    let plotHeight = bounds.height - margin.top - margin.bottom;
    //Scalling the number of incidents as yAxis
    let incidentScale = d3.scaleLinear()
        .domain([countMin, countMax])
        .range([plotHeight, 0])
        .nice();
    let monthScale = d3.scaleBand()
        .domain(outputObj.dates.reverse()) // all letters (not using the count here)
        .rangeRound([0, plotWidth])
        .paddingInner(0.1); // space between bars

    let plot = svg.select("g#plot");

    if (plot.size() < 1) {
        plot = svg.append("g").attr("id", "plot");
        plot.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      }

    let xAxis = d3.axisBottom(monthScale);
    let yAxis = d3.axisLeft(incidentScale);

    if (plot.select("g#y-axis").size() < 1) {
    let xGroup = plot.append("g").attr("id", "x-axis");

    xGroup.call(xAxis);
    xGroup.attr("transform", "translate(0," + plotHeight + ")")

    let yGroup = plot.append("g").attr("id", "y-axis");
    yGroup.call(yAxis);
  }
  else {
    plot.select("g#y-axis").call(yAxis);
}
  var color = d3.scaleLinear()
  .domain([259, 453])
  .range(["#FFAAB3", "#ae1c25"]);
    plot.selectAll("rect")
    .data(outputObj.incidents.reverse())
    .enter().append("rect")

        .attr("class", "bar")
        .attr("width", monthScale.bandwidth())
        .attr("x", function(d, i) {
          return monthScale(outputObj.dates[i]);
        })
        .attr("y", function(d, i) {
          return incidentScale(outputObj.incidents[i]);
        })
        .attr("height", function(d, i) {
          return plotHeight - incidentScale(outputObj.incidents[i]);
        })
        .attr("fill",function(d, i) {return color(outputObj.incidents[i]);
        })
        outputObj.days = outputObj.days.reverse();
        for(let j = 0; j < 31; j++){
        svg.append("text")
        .text(outputObj.days[j])
        .style('fill', 'black')
        .attr("x", 42+ monthScale(outputObj.dates[j]))
        .attr("y", incidentScale(outputObj.incidents[j]))
        .style("font-size", "8px")
        .style('font-weight', 'bold')
        .style('font-style', 'italic')
      }
      svg.append("line")
      .attr('x1', 40)
      .attr('y1', incidentScale(395.193))
      .attr('x2', plotWidth + 40)
      .attr('y2', incidentScale(395.193))
      .attr("stroke-width", 1)
      .attr("stroke", "#A9A9A9");


};
LoadingData();
