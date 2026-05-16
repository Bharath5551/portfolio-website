const observer = new IntersectionObserver((entries)=>{

entries.forEach((entry)=>{

if(entry.isIntersecting){
entry.target.classList.add("show");
}

});

});

const hiddenElements=document.querySelectorAll(".section");

hiddenElements.forEach((el)=>observer.observe(el));

const glow=document.querySelector(".cursor-glow");

document.addEventListener("mousemove",(e)=>{

glow.style.left=e.clientX+"px";
glow.style.top=e.clientY+"px";

});
