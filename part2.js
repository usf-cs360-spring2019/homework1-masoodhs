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
  let countMin = 0;
  let countMax = d3.max(outputObj2.incidents);
  let svg = d3.select("body").select("section:nth-child(3)").select("div").select("svg");
  let margin = {
    top:    15,
    right:  35,
    bottom: 30,
    left:   70
  };
    let bounds = svg.node().getBoundingClientRect();
    let plotWidth = bounds.width - margin.right - margin.left;
    let plotHeight = bounds.height - margin.top - margin.bottom;
    let incidentScale = d3.scaleLinear()
        .domain([countMin, countMax])
        .range([0, plotWidth])
        .nice();

    let timeScale = d3.scaleBand()
        .domain(outputObj2.times)
        .rangeRound([plotHeight, 0])
        .paddingInner(0.1);

    let plot = svg.select("g#plot2");

    if (plot.size() < 1) {
        plot = svg.append("g").attr("id", "plot2");
        plot.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      }

    let xAxis = d3.axisBottom(incidentScale);
    let yAxis = d3.axisLeft(timeScale);

    if (plot.select("g#y-axis2").size() < 1) {
    let xGroup = plot.append("g").attr("id", "x-axis2");
    xGroup.call(xAxis);
    xGroup.attr("transform", "translate(0," + plotHeight + ")")
    let yGroup = plot.append("g").attr("id", "y-axis2");
    yGroup.call(yAxis);
  }
  else {
    plot.select("g#y-axis2").call(yAxis);
}
  var color = d3.scaleLinear()
  .domain([d3.min(outputObj2.incidents), d3.max(outputObj2.incidents)])
  .range(["#caffec", "#2c5985"]);
outputObj2.incidents = outputObj2.incidents.reverse();
    plot.selectAll("rect")
    .data(outputObj2.incidents)
    .enter().append("rect")
        .attr("class", "bar")
        .attr("width", function(d, i) {
          return incidentScale(outputObj2.incidents[i]);
        })
        .attr("x", function(d, i) {
          return timeScale(outputObj2.incidents[i]);
        })
        .attr("y", function(d, i) {
          return plotHeight - (13+ timeScale(outputObj2.times[i]));
        })
        .attr("height", function(d, i) {
          return timeScale.bandwidth();
        })
        .attr("fill",function(d, i) {return color(outputObj2.incidents[i]);
        }).on("mouseover", function(d, i) {
        svg.append("text")
          .attr("dy", ".5em")
          .style('font-familly', 'Arial')
          .attr('x', 900)
          .attr('y', 100)
          .style('font-size', 22)
          .attr("class","label")
          .style("fill", "purple")
          .text("Incidents: " +outputObj2.incidents[i]);
    })
    .on("mouseout", function(d) {
      svg.select(".label").remove();
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
  };
LoadingData2();
