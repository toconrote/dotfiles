$(function(){
  appendGallery();
});

function appendGallery() {
  var tar = $("#gallery");
  var len = data.length;
  for(var i=0;i<len;i++){
    tar.append('<div class="pictbox page'+(i/10+1)+'"></div>').children(":last")
      .append('<img src="img/'+data[i]["id"]+'.png"><p>'+data[i]["odai"]+'</p>');
  }
}
