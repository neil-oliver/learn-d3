// Optional async function wrapper to allow for async/await data fetching
(async () => {

    ////////////////////////////////////
    ////////////// data ////////////////
    ////////////////////////////////////

    // example dataset based of global gdp, life expectancy and population
    let data = [
        { gdpPercap: 5, lifeExp: 5, pop: 7, continent: 'Asia' },
        { gdpPercap: 1, lifeExp: 4, pop: 1, continent: 'Europe' },
        { gdpPercap: 4, lifeExp: 6, pop: 6, continent: 'Africa' },
        { gdpPercap: 6, lifeExp: 8, pop: 5, continent: 'Americas' },
        { gdpPercap: 3, lifeExp: 2, pop: 3, continent: 'Oceania' }
    ]

    // optional: fetch external data with d3 or another fetch library. d3.autoType is useful for auto casting data types
    // data = await d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv", d3.autoType)

    ////////////////////////////////////
    //////////// SVG Setup /////////////
    ////////////////////////////////////

    // SVG side in pixels
    const svgWidth = 500
    const svgHeight = 500

    // margins for the SVG group (tht will contain all of the elements). This is important to stop elements from being cut off
    const margin = {
        left: 50,
        right: 50,
        top: 50,
        bottom: 50
    }

    // helper calculated variables for inner width & height of group
    const height = svgHeight - margin.top - margin.bottom
    const width = svgWidth - margin.left - margin.right


    // add SVG & inner group. The group is translated from the top left edge of the SVG as SVG groups do not have an X or Y position.
    const svg = d3.select('#example')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    ////////////////////////////////////
    //////////////globals///////////////
    ////////////////////////////////////

    const radius = 5
    const color = "rgb(86, 173, 174)"
    const strokeColor = 'black'

    ////////////////////////////////////
    //////////////scales////////////////
    ////////////////////////////////////

    // X & Y scales are created to translate the range of data into a pixel based value. 
    // There are many different types of scales with linear scales being the most popular.
    // Linear scales have a starting range (for instance data ranging from 0-10) called the domain, and an output range (for example a pixel value from 0-1000) called the range.

    const xScale = d3.scaleLinear() // type of scale
        .domain(d3.extent(data, d => d.gdpPercap)) // d3 extent gets the max and min value of the data
        .range([0, width]) // the range of the output

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.lifeExp))
        .range([height, 0])

    // optional scales
    const sizeScale = d3.scaleSequential()
        .domain(d3.extent(data, d => d.pop))
        .range([1, 20])

    const colorScale = d3.scaleOrdinal()
        .domain(['Asia', 'Europe', 'Africa', 'Americas', 'Oceania'])
        .range(['#fdae61', '#ffffbf', '#d7191c', '#abdda4', '#2b83ba']);

    ////////////////////////////////////
    ///////////////axis/////////////////
    ////////////////////////////////////

    // creating an axis from scratch is difficult as there are many components, such as the text values & ticks (small lines) 
    // Each of these components can have many different variables, such as the freqency of ticks and animations on changing data
    // d3 has created a series of functions to abstract this process and create axis with a few simple calls.

    // create an axis with the correct alginment using the scale we have created above
    const xAxis = d3.axisBottom(xScale)

    // add the axis to the svg in its own group. For a bottom axis or right axis, the group will need to be transformed to the correct position.
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)

    const yAxis = d3.axisLeft(yScale)

    svg.append("g").call(yAxis)

    ////////////////////////////////////
    ////////////// DOM /////////////////
    ////////////////////////////////////   

    // Creating an SVG element such as a circle or rect is relatively easy, as they require very few parameters (with many additional optional paramters).
    // Creating mutliple elements from data is also not a great jump in complixity as this could be done without d3 using a map for loop.
    // The complexity lies in keeping track of which data is realted to which SVG element, especially during updates to the data selection / SVG.

    // d3 join functions work (on its most basic level) by 'joining' a series of SVG elements to a given dataset. 
    // It is worth noting that d3 could be used to join data other non SVG elements such as creating a drop down menu.

    let points = svg.selectAll('.points') // Select all elements with the points class in the SVG
        .data(data) // for each element in the dataset
        .join('circle') // join an SVG element (in this case a cirlce)
        .attr('cx', d => xScale(d.gdpPercap)) // SVG element property for X position. For each row of the data, we pass the value to our xScale to transform the value into a pixel value.
        .attr('cy', d => yScale(d.lifeExp)) // SVG element property for Y position.
        .attr('r', radius) // Radius of the circle, this could be fixed or be scaled to represent another value in the data.
        .attr('fill', color) // fill colour
        .attr('stroke', strokeColor) // stroke color
        // .attr('r', d => sizeScale(d.pop)) // optional: example of repesenting a variable through radius size.
        // .attr('fill', d => colorScale(d.continent)) // optional: grouping data through categorical color.
        .attr('class', 'points') // add class to objects so that mutliple different d3.select statements can be used in the same visualization.

})()