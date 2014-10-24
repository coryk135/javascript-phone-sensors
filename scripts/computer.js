var canvas2 = document.querySelector('#canvas2'),
    ctx2 = canvas2.getContext('2d');

var width = 800,
    height = 600;

canvas2.width = width;
canvas2.height = height;

ctx2.rect(0, 0, canvas2.width, canvas2.height);
// // create radial gradient
// var grd = ctx2.createRadialGradient(238, 50, 10, 238, 50, 300);
// // light blue
// grd.addColorStop(0, '#8ED6FF');
// // dark blue
// grd.addColorStop(1, '#004CB3');

// ctx2.fillStyle = grd;
// ctx2.fill();




ctx2.globalAlpha = 0.5;
var x1 = 800,
    y1 = 0,
    radius1 = 50,
    x2 = 800,
    y2 = 0,
    radius2 = 1000;

var grd = ctx2.createRadialGradient(x1, y1, radius1, x2, y2, radius2);
grd.addColorStop(0, 'red');
grd.addColorStop(1, 'green');
// grd.addColorStop(0, 'red');
// grd.addColorStop(1, 'green');
ctx2.fillStyle = grd;
ctx2.fill();
var x1 = 0,
    y1 = 600,
    radius1 = 50,
    x2 = 0,
    y2 = 600,
    radius2 = 1000;

var grd = ctx2.createRadialGradient(x1, y1, radius1, x2, y2, radius2);
grd.addColorStop(0, 'green');
grd.addColorStop(1, 'red');
// grd.addColorStop(0, 'green');
// grd.addColorStop(1, 'red');
ctx2.fillStyle = grd;
ctx2.fill();
// ctx2.globalCompositeOperation = "multiply";
var x1 = 0,
    y1 = 0,
    radius1 = 50,
    x2 = 0,
    y2 = 0,
    radius2 = 1000;

// var grd = ctx2.createRadialGradient(x1, y1, radius1, x2, y2, radius2);
// grd.addColorStop(0, 'blue');
// grd.addColorStop(1, 'yellow');
// // grd.addColorStop(0, 'green');
// // grd.addColorStop(1, 'red');
// ctx2.fillStyle = grd;
// ctx2.fill();

var x1 = 800,
    y1 = 600,
    radius1 = 50,
    x2 = 800,
    y2 = 600,
    radius2 = 1000;

var grd = ctx2.createRadialGradient(x1, y1, radius1, x2, y2, radius2);
grd.addColorStop(0, 'yellow');
grd.addColorStop(1, 'blue');
// grd.addColorStop(0, 'green');
// grd.addColorStop(1, 'red');
ctx2.fillStyle = grd;
ctx2.fill();

// for(var x = 0; x < width; x++){
//     for(var y = 0; y < height; y++){
//         h = (x/width)*255;
//         s = (y/height)*100 + '%';
//         l = '50%';
//         ctx2.fillStyle = "hsl("+h+","+s+","+l+")";
//         ctx2.fillRect(x, y, 1, 1 );
//     }
// }
