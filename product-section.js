document.addEventListener("DOMContentLoaded", function () {
  const xemThemButtons = document.querySelectorAll(".xem-them");

  xemThemButtons.forEach(button => {
    button.addEventListener("click", function () {
      alert("Chức năng 'Xem thêm' đang được phát triển!");
    });
  });
});
