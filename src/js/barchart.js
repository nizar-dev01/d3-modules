import '@/style/global.scss';
import {
    axisBottom,
    axisLeft,
    csv,
    max,
    scaleBand,
    scaleLinear,
    select
} from 'd3';

const svg = select('svg'),
      height = +svg.attr('height'),
      width = +svg.attr('width'),
      margin = {
        top: 20,
        left: 100,
        bottom: 20,
        right: 10
      },
      innerHeight = height - margin.top - margin.bottom,
      innerWidth = width - margin.left - margin.right;
const render = (data) => {
    const
        xValue = d => d.population,
        yValue = d => d.country,
          
        xScale = scaleLinear()
            .domain([0, max(data,xValue)])
            .range([0,innerWidth]),
        
        yScale = scaleBand()
            .domain(data.map(yValue))
            .range([0,innerHeight])
            .padding(0.1),
    
        g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        
        g.append('g').call(axisLeft(yScale));
        g.append('g').call(axisBottom(xScale))
         .attr('transform',`translate(0,${innerHeight})`);

    g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
            .attr('y', d=> yScale(yValue(d)))
            .attr('height', yScale.bandwidth())
            .attr('width', d => xScale(xValue(d)) )
}

// load the csv file and start rendering
csv('src/data/population.csv')
.then(data=>{
    data.forEach(d=>d.population = +d.population * 1000);
    render(data);
})
.catch(e=>console.log('catched',e));