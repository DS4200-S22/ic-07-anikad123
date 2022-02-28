/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 

console.log("hello world")
// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// TODO: What does this code do? --> ADDS AN SVG in hard coded bar within dimentions 
// finds element on page with ID hardcoded bar, adds svg to that element, sets width height, viewbox
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// NEW CODE FOR CSV BARCHART
const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height-margin.top - margin.bottom)
  .attr("viewBox", [0,0,width,height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

// NEW CODE FOR CSV BARCHART DATA FROM CSV
const data2 = d3.csv("data/barchart.csv").then((data) => {

  //console.log(data);

// NEW CODE FOR CSV BARCHART find max score
let maxY2 = d3.max(data, function(d) { return d.score; });

console.log(maxY2);

// NEW CODE FOR CSV BARCHART set y scale
let yScale2 = d3.scaleLinear()
              .domain([0,maxY2])
              .range([height-margin.bottom, margin.top]);

// NEW CODE FOR CSV BARCHART set x scale
let xScale2 = d3.scaleBand()
              .domain(d3.range(data.length))
              .range([margin.left, width - margin.right])
              .padding(0.1);


console.log(xScale2("A"));

// NEW CODE FOR CSV BARCHART adds y axis to svg2
svg2.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale2))
    .attr("font-size", `20px`);

// NEW CODE FOR CSV BARCHART adds x axis to svg2
svg2.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale2)
      .tickFormat(i => data[i].name))
    .attr("font-size", '20px');


// NEW CODE FOR CSV BARCHART creates tooltip
const tooltip2 = d3.select("#csv-bar")
                  .append("div")
                  .attr('id', "tooltip2")
                  .style("opacity", 0)
                  .attr("class", "tooltip");

// NEW CODE FOR CSV BARCHART event handler for mousing 
const mouseover2 = function(event, d){
  tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>")
          .style("opacity", 1);
}

// NEW CODE FOR CSV BARCHART set position of tooltip
const mousemove2 = function(event, d){
  tooltip2.style("left", (event.x)+"px")
          .style("top", (event.y + yTooltipOffset) + "px");
}


// NEW CODE FOR CSV BARCHART move mouse off bar
const mouseleave2 = function(event, d){
  tooltip2.style("opacity", 0);
}


//NEW CODE FOR CSV BARCHART sets everything to svg2
svg2.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
      .attr("class", "bar")
      .attr("x", (d,i) => {console.log(d); return xScale2(i);})
      .attr("y", (d) => yScale2(d.score))
      .attr("height", (d) => (height - margin.bottom) - yScale2(d.score))
      .attr("width", xScale2.bandwidth())
      .on("mouseover", mouseover2)
      .on("mousemove", mousemove2)
      .on("mouseleave", mouseleave2);


});

/*

  Axes

*/ 

// TODO: What does this code do? --> finds the max score from data1
// takes data1 defined above, looks at score column, pulls out max
let maxY1 = d3.max(data1, function(d) { return d.score; });


// TODO: What does each line of this code do?  --> define scale functions that map
// data values to pixel values. 1st line - define function, 2nd line - sets domain, 3rd line - sets range 
// sets up scaling function for y axis
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 


// TODO: What does each line of this code do? --> splits the range into bands.
// takes data values and maps them to pixel values for the x axis 
// use scaleband bc not number values 
let xScale1 = d3.scaleBand()
          //sets domain as array of values in data1 (# of points on x axis = categories in data)
            .domain(d3.range(data1.length))
            // sets range as minimum and maximum extents of bands
            .range([margin.left, width - margin.right])
            // sets padding to bands, adds extra space between points on x
            .padding(0.1); 


// TODO: What does each line of this code do? --> adds y axis to svg1
// add axis left to page
svg1.append("g") // g is a placeholder svg, append generic svg to svg1
  //moves axis inside of left margin
   .attr("transform", `translate(${margin.left}, 0)`) 
   // built in function for left axis given a scale function, makes axis for us
   .call(d3.axisLeft(yScale1)) 
   // set font size 
   .attr("font-size", '20px'); 


// TODO: What does each line of this code do? --> adds x axis to svg1
// g is a placeholder svg, append generic svg to svg1
svg1.append("g")
    //moves axis to bottom of svg
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    // built in function for bottom axis given a scale function, 
    // tick format controls which ticks are labelled
    .call(d3.axisBottom(xScale1) 
          // name of whichever row of data - use this to label bar
            .tickFormat(i => data1[i].name))  
    //sets font size
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// TODO: What does each line of this code do? --> selects div that has hard coded bar as id
// appending another div with id tool tip 1, 0 opacity, class tooltip
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 



// TODO: What does each line of this code do? --> defines event handler for mousing over 
// displays name and score 
// sets inner html of tooltip to name and score 
// changes opacity of tooltip from 0 to 1
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}



// TODO: What does each line of this code do? 
// set the position to be equal to event x (x value of where mouse is), y event (y value of mouse) + a little offset
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}


// TODO: What does this code do? 
// when the mouse leaves a bar, set opacity of tooltip1 back to 0, it dissapears from page
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}




/* 

  Bars 

*/

// TODO: What does each line of this code do? 
// look at svg1 and select anything with the class bar 
svg1.selectAll(".bar") 
  // binds data to empty selection
   .data(data1) 
   // place holder svg for every row in data1
   .enter()  
   // appends a rectangle to svg1 for each row in data1
   .append("rect") 
   // add attribute class and set it to bar
     .attr("class", "bar") 
     // setting x position for rectangles 
     .attr("x", (d,i) => xScale1(i)) 
     // setting y position for rectangles, y postion is yscale of score, mapping score values to pixel values 
     .attr("y", (d) => yScale1(d.score)) 
     // set height for bars, top of chart - pixel value for score
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     // set width for bars, build in function bandwidth does math for you, divides space into number of bars 
     .attr("width", xScale1.bandwidth()) 
     // add event listeners to bar and link to appropriate event handlers
     .on("mouseover", mouseover1) // mouseover listener
     .on("mousemove", mousemove1) // mousemove listener
     .on("mouseleave", mouseleave1); // mouseleave listener 












