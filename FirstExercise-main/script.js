document.getElementById("actionButton").addEventListener("click", function () {
  alert("Button clicked!");
});
document.addEventListener("DOMContentLoaded", function () {
  // Wait for the DOM to be fully loaded

  // Get the button and paragraph elements
  var actionButton = document.getElementById("actionButton");
  var descriptionParagraph = document.getElementById("description");

  // Add a click event listener to the button
  actionButton.addEventListener("click", function () {
    // Toggle the visibility of the paragraph
    if (
      descriptionParagraph.style.display === "none" ||
      descriptionParagraph.style.display === ""
    ) {
      descriptionParagraph.style.display = "block";
    } else {
      descriptionParagraph.style.display = "none";
    }
  });
});
