document.addEventListener("DOMContentLoaded", function () {
  // Hide the loader and show the main content
  const loader = document.getElementById("page-loader");
  const mainContent = document.getElementById("main-content");

  // Simulate a delay for demonstration (remove setTimeout in production)
  setTimeout(() => {
    loader.style.display = "none";
    mainContent.style.display = "block";
  }, 100); // Adjust the delay time as needed or remove for instant display
});
