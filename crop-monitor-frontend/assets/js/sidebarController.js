document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.getElementById("menu-icon");
  const sidebar = document.getElementById("sidebar");
  const content = document.querySelector(".content");

  menuIcon.addEventListener("click", function () {
    console.log("Menu icon clicked");
    sidebar.classList.toggle("collapsed");

    const isExpanded = menuIcon.getAttribute("aria-expanded") === "true";
    menuIcon.setAttribute("aria-expanded", !isExpanded);

    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-times");

    if (content) {
      if (sidebar.classList.contains("collapsed")) {
        content.style.marginLeft = "80px";
      } else {
        content.style.marginLeft = "250px";
      }
    }
  });
});

function loadSidebar() {
  fetch("/pages/sidebar.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById("sidebar-container").innerHTML = data;
      initializeSidebar();
    })
    .catch((error) => {
      console.error("Error loading sidebar:", error);
    });
}

function initializeSidebar() {
  const menuIcon = document.getElementById("menu-icon");
  const sidebar = document.getElementById("sidebar");
  const content = document.querySelector(".content");

  menuIcon.addEventListener("click", function () {
    sidebar.classList.toggle("collapsed");
    const isExpanded = menuIcon.getAttribute("aria-expanded") === "true";
    menuIcon.setAttribute("aria-expanded", !isExpanded);
    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-times");

    if (content) {
      if (sidebar.classList.contains("collapsed")) {
        content.style.marginLeft = "80px";
      } else {
        content.style.marginLeft = "250px";
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", loadSidebar);

function loadContent(section) {
  const url = `${section}.html`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById("content").innerHTML = data;
    })
    .catch((error) => {
      console.error("Error loading content:", error);
    });
}

// Use event delegation to handle click events on dynamically loaded content
document.addEventListener("click", function (e) {
  if (e.target.closest("#sign-out-btn")) {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign out!",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/index.html";
      }
    });
  }
});

