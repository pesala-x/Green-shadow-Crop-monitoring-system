// Load the sidebar template into the container
$("#sidebar-container").load("/sidebar.html");

// Function to load content dynamically
function loadContent(section) {
  let url = section + ".html"; // Define content URL based on section
  $("#content").load(url); // Load content into #content div
}
