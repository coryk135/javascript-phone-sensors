var canvas2 = document.querySelector('#canvas2'),
    ctx2 = canvas2.getContext('2d');

var width = window.innerWidth - 5,
    height = window.innerHeight - 5;

canvas2.width = width;
canvas2.height = height;

var h,s,l;

for(var x = 0; x < width; x++){
    for(var y = 0; y < height; y++){
        h = (x/width)*255;
        s = (y/height)*100 + '%';
        l = '50%';
        ctx2.fillStyle = "hsl("+h+","+s+","+l+")";
        ctx2.fillRect(x, y, 1, 1 );
    }
}
