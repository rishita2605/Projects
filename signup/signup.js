//variables
const but=document.querySelector(".circle");
console.log(but);
//event listener
but.addEventListener('click',changeStyle);
//functions
function changeStyle(e){
event.preventDefault();
  console.log(e.target);
  var b=e.target;
  console.log(b.style.backgroundColor);
  if(b.style.backgroundColor=='rgb(88, 36, 40)'){
    b.style.backgroundColor="transparent";
    b.style.transform="scale(1.1)";
  }
  else{
    b.style.backgroundColor="rgb(88, 36, 40)";
    b.style.transform="scale(0.9)";
  }
  
}
