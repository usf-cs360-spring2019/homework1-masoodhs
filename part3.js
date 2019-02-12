let output3 = {
  incident:[],
  percent:[],
};
var LoadingData3 = function(){
convertRow = function(row, index){
  let out = {};
  for (let col in row){
    switch (col) {
      case "Incident":
      out[col] = parseInt(row[col]);
      output3.incident.push(row[col]);
      break;
      case "Percent":
      out[col] = +(row[col]);
      output3.percent.push((out[col]));
      break;
    }
  }
  return out;
}
d3.csv("TableauOutPut\\Part3-TopCriminalIncidents.csv", convertRow)
.then(() => {
DrawBarChart3();
});
}
DrawBarChart3 = function(){
let margin = {
  top:    15,
  right:  35, // leave space for y-axis
  bottom: 30, // leave space for x-axis
  left:   40
};
let svg = d3.select("body").select("section:nth-child(4)").select("div").select("svg");
let bounds = svg.node().getBoundingClientRect();
let plotWidth = bounds.width - margin.right - margin.left;
let plotHeight = bounds.height - margin.top - margin.bottom;
let radius = plotWidth/2;



var arc = d3.arc()
    .outerRadius(radius - 470)
    .innerRadius(0)

var labelArc = d3.arc()
    .outerRadius(radius - 50)
    .innerRadius(radius - 50)


let g1 =  svg.attr("width", plotWidth)
    .attr("height", plotHeight)
    .append("g")
    .attr('transform', 'translate(' + plotWidth/2  + ',' + plotHeight/2 + ')');

var arcData = d3.pie().sort(null).value(function(d){
  return d;
})(output3.percent);


var colorScale = d3.scaleOrdinal()
    .domain(0, arcData)
    .range(["#E1222B", "#F87033", "#FCA229", "#FAD23C", "#378A3E", "#5CD1C9", "#BAC8E5" ]);
names = output3.incident;


          g1.selectAll("path")
          .data(arcData)
          .enter()
          .append('g')
          .attr('class', 'label1')
          .append("path")
          .attr('d', arc)
          .attr("fill", function(d, i){return colorScale(i)} )
          .attr("stroke", "black")
          .attr("stroke-width", 0.1)
          .on("mouseover", function(d, i) {
          svg.append("text")
            .attr("dy", ".5em")
            .style('font-familly', 'Arial')
            .attr('x', 900)
            .attr('y', 100)
            .attr('font-size', 14)
            .attr("class","label")
            .style("fill", "darkOrange")
            .text(output3.incident[i] + " " + output3.percent[i] + "%");
      })
      .on("mouseout", function(d) {
        svg.select(".label").remove();
      })



         g1.selectAll('.label1').append("text")
         .attr("transform", function(d, i) {
     var d = arc.centroid(d);
     d[0] *= 1.4;	//multiply by a constant factor
     d[1] *= 1.4;	//multiply by a constant factor
     return "translate(" + d + ")";
   })
            .attr('text-anchor', 'middle')
            .style('font-familly', 'Arial')
            .style('font-size', 10)
            .style("fill", "black")
            .text(function(d, i){return output3.incident[i] + " " + output3.percent[i] + "%";});
function handleMouseOver(d, i) {
               d3.select(this).attr({
                 fill: "black",
                 radius: radius * 2
               });
             }

}
LoadingData3();
