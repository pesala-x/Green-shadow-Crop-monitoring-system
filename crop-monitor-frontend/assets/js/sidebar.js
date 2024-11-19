document.getElementById("menu-icon").addEventListener("click", function () {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("collapsed");
  const isCollapsed = sidebar.classList.contains("collapsed");
  this.setAttribute("aria-expanded", !isCollapsed);
  this.classList.toggle("fa-bars");
  this.classList.toggle("fa-times");
});
