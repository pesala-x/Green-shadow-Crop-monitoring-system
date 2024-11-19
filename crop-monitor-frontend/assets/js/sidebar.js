document.getElementById("menu-icon").addEventListener("click", function () {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("collapsed");

  const content = document.getElementById("content");
  if (sidebar.classList.contains("collapsed")) {
    content.style.marginLeft = "70px";
  } else {
    content.style.marginLeft = "260px";
  }

  const isCollapsed = sidebar.classList.contains("collapsed");
  this.setAttribute("aria-expanded", !isCollapsed);
  this.classList.toggle("fa-bars");
  this.classList.toggle("fa-times");
});
