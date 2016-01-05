var EventSource = window.EventSource || window.MozEventSource;
$(function(){
  initial();
});

function initial() {
  if (!EventSource) {
    alert("EventSourceが利用できません。");
    return;
  }
  var source = new EventSource('ssmainloop.php');
  source.onmessage = function(event) {
    var tar = $("#main");
    msgstr = JSON.parse(event.data);
    var datahtml = '';
    for (key in msgstr) {
      //TASK
    }
  };
}
function addServer(){
  var serverNo = $("#server").val();
  if(serverCheck(serverNo)){
    alert("その鯖はもう追加されてるようです");
    return;
  }
}
function serverCheck(no){
  var dupflg = false;
  $("#main").children().each(function(){
    if($(this).attr("id") == no){
      dupflg = true;
    }
  });
  return dupflg;
}
