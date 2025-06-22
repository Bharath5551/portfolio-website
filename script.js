window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section");
  sections.forEach(sec => {
    if (window.scrollY + window.innerHeight > sec.offsetTop + 100) {
      sec.style.opacity = 1;
      sec.style.transform = "translateY(0)";
    }
  });
});
