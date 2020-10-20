var socketScript = "<script src='http://119.196.166.86:8084/socket.io/socket.io.js'></script>";
var localValue = true;
/*
localValue = true;
*/
//console.log("socket");
var htmlEl = document.getElementsByTagName("head")[0];
$(htmlEl).append(socketScript);
//
var logEl = document.createElement("div");
logEl.setAttribute("class", "log-view");
document.getElementById("root").appendChild(logEl);
//document.getElementById("root").insertAdjacentHTML("afterbegin", logEl);

function initLocal(){
    socket = io.connect('http://119.196.166.86:8084');
    socket.on('io', function ($data) {
        if(localValue){
            console.log($data);
            var log = $data.msg.log;
            var link = $data.msg.link == null ? "" : $data.msg.link;
            if($data.msg.link != null) location.href = "http://119.196.166.86:8050/" + link + "?data=" + Math.floor(Math.random()*100000);

            if(log){
                $(".log-view").show();
            }else{
                $(".log-view").hide();
            }
        }
    });
    
    var v = " <br/> " + AgentDetect.searchBrowserVersion() + " <br/>";
    for(var str in AgentDetect.searchBrowserVersion()){
        v += str +" <br/>";
    }
    logEl.innerHTML = 
    "device_type : " + _kglobal.device_type + " <br/> " + 
    "Browser : " + v + "<br/> " + 
    "os_type : " +AgentDetect.searchOS() + "<br/> " + 
    "os_version : " + AgentDetect.searchOSVersion();

}

setTimeout(function (){
    initLocal();
}, 1000);