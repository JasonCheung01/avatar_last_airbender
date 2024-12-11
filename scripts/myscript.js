// add your JavaScript/D3 to this file

  const w = 400;
  const h = 300;
  const margin = {top: 25, right: 10, bottom: 25,
      left: 80};
  const innerWidth = w - margin.left - margin.right;
  const innerHeight = h - margin.top - margin.bottom;
  
  
  // add svg

  const svg = d3.select("#plot")
    .append("svg")
      .attr("width", w)
      .attr("height", h);

  // getting the data

  const data_test = [{character: "Jan", value: 300, color:"#a1785c"},
                 {character: "Feb", value: 100, color:"#a1785c"},
                 {character: "Mar", value: 150, color:"#a1785c"},
                 {character: "Apr", value: 220, color:"#a1785c"},
                 {character: "May", value: 70, color:"#a1785c"},
                 {character: "Jun", value: 270, color:"#a1785c"}]
                 
const rowConverter = function (d) {
  return {
    character: d.character,
    value: +d.value,
    color: d.color
    }
};  
                 
// Extract branch name from the URL or use "main" as the default
let branchName = "main"; // Default branch

// Base URL for the repository
const baseURL = `https://raw.githubusercontent.com/JasonCheung01/avatar_last_airbender/refs/heads/${branchName}/data/`;

// Character data files
const characters = ["Aang", "Katara", "Sokka", "Toph", "Zuko"];

// Object to store all datasets
const datasets = {};

// Function to load data for each character
characters.forEach(character => {
  d3.csv(`${baseURL}${character}.csv`, rowConverter)
    .then(function(data) {
      datasets[character.toLowerCase()] = data; // Store the data using character name as key
      console.log(`Data loaded for ${character}:`, data);
    })
    .catch(function(error) {
      console.error(`Error loading data for ${character}:`, error);
    });
});

// datasets will hold the loaded data for all characters
                 
      
      
// Input                  
                 
d3.selectAll('input[name="character"]')
  .on("click", function(event) {
    var character = event.currentTarget.value;
                 

                 
let bardata = data_test;

if(character=='Aang'){
  bardata = datasets.aang;
} else if(character=='Katara'){
  bardata = datasets.katara;
}else if(character=='Sokka'){
  bardata = datasets.sokka;
}else if(character=='Toph'){
  bardata = datasets.toph;
}else if(character=='Zuko'){
  bardata = datasets.zuko;
}


  const yScale = d3.scaleBand()
      .domain(bardata.map(d => d.character))
      .range([0, innerHeight])
      .paddingInner(.1);

  const xScale = d3.scaleLinear()
      .domain([0, d3.max(bardata.map(d => d.value))])
      .range([0, innerWidth])

  const xAxis = d3.axisBottom()
      .scale(xScale);

  const yAxis = d3.axisLeft()
      .scale(yScale);


// add background rectangle

  svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", w)
      .attr("height", h)
      .attr("fill", "#ECE5D3");

// add bars as a group

  const bars = svg.append("g")
      .attr("id", "plot")
      .attr("transform", `translate (${margin.left}, ${margin.top})`)
    .selectAll("rect")
      .data(bardata);

  bars.enter().append("rect")
      .attr("x", d => 0)
      .attr("y", d => yScale(d.character))
      .attr("y", d => yScale(d.character))
      .attr("height", yScale.bandwidth())
      .attr("width", d => xScale(d.value))
      .attr("fill", d => d.color);

// add axes

  svg.append("g")
      .attr("class", "xAxis")
      .attr("transform", `translate (${margin.left}, ${h - margin.bottom})`)
      .call(xAxis);

  svg.append("g")
      .attr("class", "yAxis")
      .attr("transform", `translate (${margin.left}, ${margin.top})`)
      .call(yAxis);
      
});

                        