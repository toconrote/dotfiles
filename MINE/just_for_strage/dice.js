function randomInt(num){
  return Math.floor(Math.random()*num)+1;
}

function dice(str){
  if(typeof str != "string") return false;
  var strs = str.match(/(\d*)[dD](\d*)/);
  var diceNo = parseInt(strs[1]);
  var diceType = parseInt(strs[2]);
  if (diceNo <= 0) return false;
  if (diceType <= 0) return false;
  var ret = 0;
  for(i=0;i<diceNo;i++){
    ret += randomInt(diceType);
  }
  return ret;
}

