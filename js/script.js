var canvas    = document.createElement('canvas');
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
var context   = canvas.getContext('2d');

document.body.appendChild(canvas);

//set speed functions for the class, and instances //add curves

// for(var i = 0; i<10; i++){
// 	lines.push( new Linework() );
// }
//
// lines.forEach(function(line){
//   //pick a random coordinate to animate to and start to.
//   line.setPosition(random(0,windowWidth), random(0,windowHeight))
//   line.drawLineTo(random(0,windowWidth), random(0,windowHeight))
//   //Start drawing in that direction, with a callback to make the next one
// })

var line = new Linework.Linework({
  speed: 5,
  context: context
});
line.setPosition(100, 100)
    .drawLine(0, 50)
    .drawLine(45, 50)
    .drawLine(90, 50)
    .drawLine(135,50)
    .drawLine(180,50)
    .drawLine(225,50)
    .drawLine(270,50)
    .drawLine(315,50)
