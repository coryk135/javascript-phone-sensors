var canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext('2d'),
    first = true,
    oa,
    ob,
    og;

function handleOrientation(ev){
    //console.log(ev);
    var a = ev.alpha,canvas
        b = ev.beta,
        g = ev.gamma;
    if(!first){
    var an = document.querySelector('#alpha'),
        bn = document.querySelector('#beta'),
        gn = document.querySelector('#gamma');
        an.textContent = ((a - oa + 360) % 360).toFixed(5);
        bn.textContent = ((b - ob + 360) % 360).toFixed(5);
        gn.textContent = ((g - og + 360) % 360).toFixed(5);
    } else {
        oa = a;
        ob = b;
        og = g;
        first = false;
    }
}
setTimeout(function(){
    window.addEventListener("deviceorientation", handleOrientation, true);
}, 1000);



var globals = {};
window.onload = function() {
    //"use strict";

    // lets do some fun
    var video = document.getElementById('webcam');
    globals.video = video;
    var canvas = document.getElementById('canvas');
    try {
        var attempts = 0;
        var readyListener = function(event) {
            findVideoSize();
        };
        var findVideoSize = function() {
            if(video.videoWidth > 0 && video.videoHeight > 0) {
                video.removeEventListener('loadeddata', readyListener);
                onDimensionsReady(video.videoWidth, video.videoHeight);
            } else {
                if(attempts < 10) {
                    attempts++;
                    setTimeout(findVideoSize, 200);
                } else {
                    onDimensionsReady(640, 480);
                }
            }
        };
        var onDimensionsReady = function(width, height) {
            demo_app(width, height);
            compatibility.requestAnimationFrame(tick);
        };

        video.addEventListener('loadeddata', readyListener);

        MediaStreamTrack.getSources(function(sourceInfos) {
            var audioSource = null;
            var videoSource = null;

            for (var i = 0; i != sourceInfos.length; ++i) {
                var sourceInfo = sourceInfos[i];
                if (sourceInfo.kind === 'video' && sourceInfo.facing === 'environment') {
                    console.log(sourceInfo.id, sourceInfo.label || 'camera');

                    videoSource = sourceInfo.id;
                } else {
                    console.log('Some other kind of source: ', sourceInfo);
                }
            }

            sourceSelected(videoSource);
        });

        var sourceSelected = function(videoSource) {
            compatibility.getUserMedia({video: {optional: [{sourceId: videoSource}]}}, function(stream) {
                try {
                    video.src = compatibility.URL.createObjectURL(stream);
                } catch (error) {
                    video.src = stream;
                }
                setTimeout(function() {
                        video.play();
                        demo_app();
                    
                        //compatibility.requestAnimationFrame(tick);
                    }, 500);
            }, function (error) {
                console.log('Error!', error);
            });
        }
    } catch (error) {
        console.log('Error!', error);
    }

    var stat = new profiler();

    var gui,ctx,canvasWidth,canvasHeight;
    var img_u8;

    function demo_app(videoWidth, videoHeight) {
        canvasWidth  = canvas.width;
        canvasHeight = canvas.height;
        ctx = canvas.getContext('2d');

        ctx.fillStyle = "rgb(0,255,0)";
        ctx.strokeStyle = "rgb(0,255,0)";

        img_u8 = new jsfeat.matrix_t(640, 480, jsfeat.U8_t | jsfeat.C1_t);

        stat.add("grayscale");
    }

    function tick() {
        compatibility.requestAnimationFrame(tick);
        stat.new_frame();
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            ctx.drawImage(video, 0, 0, 640, 480);
            var imageData = ctx.getImageData(0, 0, 640, 480);

            stat.start("grayscale");
            jsfeat.imgproc.grayscale(imageData.data, 640, 480, img_u8);
            stat.stop("grayscale");

            // render result back to canvas
            var data_u32 = new Uint32Array(imageData.data.buffer);
            var alpha = (0xff << 24);
            var i = img_u8.cols*img_u8.rows, pix = 0;
            while(--i >= 0) {
                pix = img_u8.data[i];
                data_u32[i] = alpha | (pix << 16) | (pix << 8) | pix;
            }
            
            ctx.putImageData(imageData, 0, 0);

            document.querySelector('#log').innerHTML = stat.log();
        } else {
            console.log(video.readyState)
        }
    }

    window.onunload = function() {
        video.pause();
        video.src=null;
    };
}
        
