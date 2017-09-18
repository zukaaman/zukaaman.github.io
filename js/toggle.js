var toggleClick = document.querySelector(".toggle");

toggleClick.addEventListener("click", function (evt) {
  evt.preventDefault();
  toggleClick.classList.toggle("active");
});
