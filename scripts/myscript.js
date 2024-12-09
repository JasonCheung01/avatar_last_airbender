// add your JavaScript/D3 to this file

  const w = 400;
  const h = 300;
  const margin = {top: 25, right: 10, bottom: 25,
      left: 30};
  const innerWidth = w - margin.left - margin.right;
  const innerHeight = h - margin.top - margin.bottom;

  const data = [{character: "Jan", value: 300, color:"#a1785c"},
                 {character: "Feb", value: 100, color:"#a1785c"},
                 {character: "Mar", value: 150, color:"#a1785c"},
                 {character: "Apr", value: 220, color:"#a1785c"},
                 {character: "May", value: 70, color:"#a1785c"},
                 {character: "Jun", value: 270, color:"#a1785c"}]
                 
const bardata = data

  const yScale = d3.scaleBand()
      .domain(bardata.map(d => d.character))
      .range([innerHeight, 0])
      .paddingInner(.1);

  const xScale = d3.scaleLinear()
      .domain([0, d3.max(bardata.map(d => d.value))])
      .range([0, innerWidth])

  const xAxis = d3.axisBottom()
      .scale(xScale);

  const yAxis = d3.axisLeft()
      .scale(yScale);

// add svg

  const svg = d3.select("#plot")
    .append("svg")
      .attr("width", w)
      .attr("height", h);

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
      .attr("y", d => innerHeight-yScale(d.character)-yScale.bandwidth())
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
                        