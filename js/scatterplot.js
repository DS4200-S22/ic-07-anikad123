/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 



// NEW CODE FOR SCATTERPLOT
const svg3 = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height-margin.top - margin.bottom)
  .attr("viewBox", [0,0,width,height]);


// NEW CODE FOR SCATTERPLOT DATA FROM CSV
const data3 = d3.csv("data/scatter.csv").then((data) => {

// NEW CODE FOR SCATTERPLOT find max score
let maxY3 = d3.max(data, function(d) { return d.score; });


// NEW CODE FOR SCATTERPLOT set y scale
let yScale3 = d3.scaleLinear()
              .domain([0,maxY3])
              .range([height-margin.bottom, margin.top]);

// NEW CODE FOR SCATTERPLOT set x scale
let xScale3 = d3.scaleBand()
              .domain(d3.range(data.length))
              .range([margin.left, width - margin.right])
              .padding(0.1);


// NEW CODE FOR CSV SCATTERPLOT adds y axis to svg3
svg3.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale3))
    .attr("font-size", `20px`);

// NEW CODE FOR CSV SCATTERPLOT adds x axis to svg3
svg3.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale3)
      .tickFormat(i => data[i].day))
    .attr("font-size", '20px');


// NEW CODE FOR CSV SCATTERPLOT creates tooltip
const tooltip3 = d3.select("#csv-scatter")
                  .append("div")
                  .attr('id', "tooltip3")
                  .style("opacity", 0)
                  .attr("class", "tooltip");

// NEW CODE FOR CSV SCATTERPLOT event handler for mousing 
const mouseover3 = function(event, d){
  tooltip3.html("Day: " + d.day + "<br> Score: " + d.score + "<br>")
          .style("opacity", 1);
}

// NEW CODE FOR CSV SCATTERPLOT set position of tooltip
const mousemove3 = function(event, d){
  tooltip3.style("left", (event.x)+"px")
          .style("top", (event.y + yTooltipOffset) + "px");
}


// NEW CODE FOR CSV SCATTER move mouse off bar
const mouseleave3 = function(event, d){
  tooltip3.style("opacity", 0);
}


//NEW CODE FOR CSV SCATTER sets everything to svg3
svg3.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
      .attr("class", "bar")
      .attr("x", (d,i) => {console.log(d); return xScale3(i);})
      .attr("y", (d) => yScale3(d.score))
      .attr("height", (d) => (height - margin.bottom) - yScale3(d.score))
      .attr("width", xScale3.bandwidth())
      .on("mouseover", mouseover3)
      .on("mousemove", mousemove3)
      .on("mouseleave", mouseleave3);

});