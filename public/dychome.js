function openNav() {
  document.getElementById("mySidenav").style.width = "200px";
  main.style.marginRight  = "200px";
  document.getElementsByTagName("body").style.background = "rgba(0,0,0,0.4)";
}

const nav =document.getElementById("mySidenav")
const main=document.getElementById("main")
function closeNav() {
  nav.style.width = "0";
  main.style.marginRight = "0";
  document.getElementsByTagName("body").style.background = "rgba(0,0,0,0)";
}

const section = document.getElementById('sec1');
const section2 = document.getElementById('sec2');
function moh (){
    section.style.display = 'block';
    section2.style.display = 'none';
}
function moh2 (){
  section2.style.display = 'block';
  section.style.display = 'none';
}
window.onclick = function(event) {
  if (event.target == section ||event.target == section2) {
    section.style.display = "none";
    section2.style.display = "none";
    
  }else if(event.target == main)
    closeNav();
}





