import '@/style/global.scss';

import {
    axisBottom,
    axisLeft,
    csv, max, scaleBand, scaleLinear, select
} from 'd3'
const svgEl = document.getElementById('barchartSvg')
csv('src/data/population.csv')
    .then(data=>{
        data.forEach(d=>d.population = +d.population)
        render(data,svgEl) 
    })
    .catch(e=>console.log('error loading the data',e))

const render = (data,svg) => {
    const width = 900, height = 500;
    svg =
        select(svg)
            .attr('width',width)
            .attr('height',height);
    const
        margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 100
        },
        innerWidth = width - margin.left - margin.right,
        innerHeight = height - margin.top - margin.bottom,
        xValue = d => d.population,
        yValue = d => d.country,

        valScale =
            scaleLinear()
            .domain([0, max(data,xValue)])
            .range([0,innerWidth]),

        titleScale =
            scaleBand()
            .domain(data.map(yValue))
            .range([0,innerHeight])
            .padding(0.1),
            
        /* START RENDERING THE GRAPH */
        g =
            svg.append('g')
                .attr('transform',`translate(${margin.left},${margin.top})`),
        
        bars = g.selectAll()
            .data(data)
            .enter()
            .append('rect')
                .attr('y', d => titleScale( yValue(d) ) )
                .attr('height', titleScale.bandwidth() )
                .attr('width', d => valScale( xValue(d) ) ),
        
        yAxisFactory = axisLeft( titleScale ),
        axl = // axis left
            g.append('g')
                .call( yAxisFactory ),
        
        xAxisFactory = axisBottom( valScale ),
        axb = // axis botom
            g.append('g')
                .attr('transform',`translate(0,${innerHeight})`)
                .call( xAxisFactory );
}