async function draw() {
  // Data
  const dataset = [
    { name: "<5", value: "19912018" },
    { name: "5-9", value: "20501982" },
    { name: "10-14", value: "20679786" },
    { name: "15-19", value: "21354481" },
    { name: "20-24", value: "22604232" },
    { name: "25-29", value: "21698010" },
  ];
  // await d3.csv("data.csv");
  // console.log(dataset);
  // console.log(JSON.stringify(dataset));
  // Dimensions
  let dimensions = {
    width: 600,
    height: 600,
    margins: 10,
  };

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 2;
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 2;
  const radius = dimensions.ctrWidth / 2;
  // Draw Image
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const ctr = svg
    .append("g") // <g>
    .attr(
      "transform",
      `translate(${dimensions.margins}, ${dimensions.margins})`
    );

  // Scales
  const populationPie = d3.pie().value((d) => d.value);

  const slices = populationPie(dataset);

  const arc = d3.arc().outerRadius(radius).innerRadius(0);

  const colors = d3.quantize(d3.interpolateSpectral, dataset.length);
  const colorScale = d3
    .scaleOrdinal()
    .domain(dataset.map((element) => element.name))
    .range(["#ef66ef", "#00766d", "#909090", "#00ffd2", "#fff"]);
  //Draw Shape
  const arcGroup = ctr
    .append("g")
    .attr(
      "transform",
      `translate(${dimensions.ctrHeight / 2}, ${dimensions.ctrWidth / 2})`
    );
  arcGroup
    .selectAll("path")
    .data(slices)
    .join("path")
    .attr("d", arc)
    .attr("fill", (d) => colorScale(d.data.name));
}

draw();
