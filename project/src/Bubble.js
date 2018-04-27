import * as d3 from 'd3';
// import Button from './Button'


function Bubble(_){

  let _w;
  let _h;

  let nodes;
  let _forceX, _forceY, _forceSimulation;

  let _map;


  function exports(deaths){

    _w = _.clientWidth;
    _h = _.clientHeight;


    nodes = deaths.map(d => {
      return{
        radius: 3,
        x: Math.random() * _w,
        y: Math.random() * _h,
        ...d
      }
    });

    console.log(nodes);
    // _forceSimulation.nodes(nodes);
    //return nodes;


    const root = d3.select(_);

    let svg = root
      .selectAll('.bubbleChart')
      .data([1]);

    svg = svg.enter().append('svg')
      .attr('class','.bubbleChart')
      .merge(svg)
      .attr('width',_w)
			.attr('height',_h)
			.style('top',0)
			.style('left',0);

    const myNodes = svg.selectAll('.dots')
			.data(nodes);
		const nodesEnter = myNodes.enter()
			.append('g')
			.attr('class','dots');
    myNodes.exit().remove();
		nodesEnter
      .append('circle')
      .attr('r', d => d.radius)
      .style('fill','#80B3DF');
		const bubbles = nodesEnter
			.merge(myNodes)
			.attr('transform', d => `translate(${d.x}, ${d.y})`);



    const stateData = ['AK','AL','AR','AZ','CA','CO','CT','DC','DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA','MA','MD','ME','MI','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VA','VT','WA','WI','WV','WY']

    const center = { x: _w / 2, y: _h / 3 };
    _forceX = d3.forceX().strength(1).x(center.x);
    _forceY = d3.forceY().strength(1).y(center.y);


  const forceStrength = 0.3;

 // const simulation = _forceSimulation
  _forceSimulation = d3.forceSimulation()
    .force("collide",d3.forceCollide(3).radius(function(d) { return d.radius + 2; }).strength(0.7) )
    .force("charge", d3.forceManyBody().strength(0.5))
    // .restart()
    .alpha(0.06)
    .force('x', _forceX)
    .force('y', _forceY)
    .nodes(nodes)
    .on('tick', ticked);


      function ticked() {
        bubbles
          .attr('transform', d => `translate(${d.x}, ${d.y})`);
      }


      


}

exports.forceX = function (_) {
  if(typeof _ === 'undefined') return _forceX;
  _forceX =_;
  return this;
}
exports.forceY = function (_) {
  if(typeof _ === 'undefined') return _forceY;
  _forceY =_;
  return this;
}
// exports.forceSimulation = function (_) {
//   if(typeof _ ==='undefined') return _forceSimulation;
//   _forceSimulation =_;
//   return this;
// }

exports.restart = function (_) {
  _forceSimulation
    .stop()
    .force('x',_forceX)
    .force('y',_forceY)
    .alpha(0.06)
    .restart();
  return this;
}




  return exports;
}

export default Bubble;
