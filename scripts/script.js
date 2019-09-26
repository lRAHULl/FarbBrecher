document.getElementById('reset').onclick = function resetChange() {

    alert("page refresh");
 }
 for(var i=0;i<5;i++)
 {
 function myMove() {
    var elem = document.getElementById("shower[i]");   
    var pos = 0;
    var id = setInterval(frame, 10);

    function frame() {
      if (pos == 350) {
        clearInterval(id);
      } else {
        pos++;
        elem.style.top = pos + 'px'; 
        elem.style.left = pos + 'px'; 
      }
    }
    
  }
}
  