var remote ={};
remote.$section = $('#remoteVideoSection');
remote.$btnStart =  remote.$section.find('.btn-start');
remote.$btnStop =  remote.$section.find('.btn-stop');
remote.$video = remote.$section.find("video");
remote.servers = null;
remote.peerConnection = new RTCPeerConnection(remote.servers);

var local = window.local;

function call (){

    window.test = local.$video[0];
    if(local.$video[0].getVideoTracks().length > 0 ){
        console.log("Using Video deveses")
    }

    remote.peerConnection.onicecandidate = gotRemoteIceCandidate;
    remote.peerConnection.onaddstream = gotRemoteStream;

    local.peerConnection.onicecandidate = gotLocalIceCandidate;


    local.peerConnection.addStream(local.$video[0]);
    local.peerConnection.createOffer(gotLocalDescription, handleError)

}

function hangup (){

}

function gotLocalDescription(desc){
    local.peerConnection.setLocalDescription(desc);
    remote.peerConnection.setRemoteDescription(desc);
    remote.peerConnection.createAnswer(gotRemoteDescription,handleError)
}

function gotRemoteDescription (des){
    remote.peerConnection.setLocalDescription(des);
    local.peerConnection.setRemoteDescription(des);

}

function gotLocalIceCandidate(event){
    if(event.candidate){
        remote.peerConnection.addIceCandidate(event.candidate)
    }
}
function gotRemoteIceCandidate(event){
    if(event.candidate){
        local.peerConnection.addIceCandidate(event.candidate)
    }
}
function gotRemoteStream(event){
    attachMediaStream(remote.$video[0],event.stream);
    remote.$video[0].play();
    remote.$video[0]  = event.stream;
    console.log("yeeea", arguments)
}

function handleError (){
    console.log("error", arguments)
}