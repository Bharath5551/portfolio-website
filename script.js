const sections = document.querySelectorAll(".fade");

window.addEventListener("scroll", () => {

sections.forEach(sec => {

const top = window.scrollY;
const offset = sec.offsetTop - 500;

if(top > offset){
sec.classList.add("show");
}

});

});
