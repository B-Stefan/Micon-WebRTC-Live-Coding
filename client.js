

var local ={};
local.$section = $('#localVideoSection');
local.$btnStart =  local.$section.find('.btn-start');
local.$btnStop =  local.$section.find('.btn-stop');
local.$video = local.$section.find("video")
function localVideoSuccessCallback(stream){
    console.log(local.$video[0])
    attachMediaStream(local.$video[0],stream);
    local.$video[0].play();
    local.$video[0] = stream;

}

function  localVideoErrorCallback(){
    alert("localVideoErrorCallback")
}


function startLocalCam(){
    local.$btnStart.attr('disabled',true);
    local.$btnStop.removeAttr('disabled');
    console.log(local.$section);
    console.log(local.$btnStart)
    if(navigator.getUserMedia){
        navigator.getUserMedia({
            video:{
                mandatory: {
                    maxHeight: 320,
                    maxWidth: 320
                }
            }
        },localVideoSuccessCallback,localVideoErrorCallback)
    }else{
        throw new Error("No getUserMedia")
    }
}

function stopLocalCam(){
    local.$btnStart.removeAttr('disabled');
    local.$btnStop.attr('disabled',true);
    local.$video[0].stop()
}