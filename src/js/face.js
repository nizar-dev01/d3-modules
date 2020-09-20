import '@/style/global.scss';
import { arc, select } from 'd3';

const svg = select('svg');

const h = +svg.attr('height');
const w = +svg.attr('width');
const g =
    svg.append('g')
    .attr('transform',`translate(${w/2},${h/2 + 10})`)

const face =
    g.append('circle')
        .attr('r', 150)
        .attr('fill','yellow')
        .attr('stroke','black')
        .attr('stroke-width',5);

const
    yOffset = -45,
    xOffset = 60,
    eyeRadius = 25,
    eyesG = g.append('g')
        .attr('transform', `translate(0,${yOffset})`);

const leftEye =
    eyesG.append('circle')
        .attr('r',eyeRadius)
        .attr('cx', -xOffset);

const rightEye =
    eyesG.append('circle')
        .attr('r',eyeRadius)
        .attr('cx', xOffset);

const
    ebx = 60,
    eby = 0,
    ebgy = yOffset-5,
    eyebrowG =  g.append('g')
        .attr('transform', `translate(0,${ebgy})`)
    
eyebrowG
    .transition().duration(500)
        .attr('transform',`translate(0,${ebgy-10})`)
    .transition().duration(500)
        .attr('transform',`translate(0,${ebgy})`);

const ebl =
    eyebrowG.append('path')
        .attr('d',arc()({
            innerRadius: 35,
            outerRadius: 45,
            startAngle: Math.PI * 3/2 + 0.5,
            endAngle: Math.PI * 5/2 - 0.5
        }))
        .attr('transform',`translate(${ebx},${eby})`)

const ebr =
    eyebrowG.append('path')
        .attr('d',arc()({
            innerRadius: 35,
            outerRadius: 45,
            startAngle: Math.PI * 3/2 + 0.5,
            endAngle: Math.PI * 5/2 - 0.5
        }))
        .attr('transform',`translate(${-ebx},${eby})`)

const mouth =
    g.append('path')
        .attr('d',arc()({
            outerRadius: 100,
            innerRadius: 0,
            startAngle: Math.PI/2,
            endAngle: Math.PI * 3/2
        }))
        .attr('fill','#fff')
        .attr('stroke','#000')
        .attr('stroke-width',5)