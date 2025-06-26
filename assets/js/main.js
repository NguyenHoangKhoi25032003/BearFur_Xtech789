document.addEventListener('DOMContentLoaded', () => {
  // Toggle dropdown sản phẩm desktop
  document.querySelectorAll('.dropdown').forEach((dropdown) => {
    dropdown.addEventListener('click', (e) => {
      e.preventDefault();
      dropdown.classList.toggle('active');
    });
  });

  // Mở modal khi click ☰
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const modal = document.querySelector('#mobile-nav-modal');
  if (toggleBtn && modal) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // ngăn click lan ra ngoài
      modal.classList.toggle('active');
    });
  }

  // Đóng modal khi bấm nút X
  const closeBtn = document.querySelector('#modal-close');
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Đóng khi click ngoài
  document.addEventListener('click', (e) => {
    if (
      modal.classList.contains('active') &&
      !modal.querySelector('.modal-content').contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      modal.classList.remove('active');
    }
  });

  // Toggle danh mục sản phẩm trong modal mobile
  const productToggle = document.querySelector('.modal-product-toggle');
  if (productToggle) {
    productToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const dropdown = productToggle.closest('.modal-dropdown');
      const subMenu = dropdown.querySelector('.modal-sub-menu');
      const toggleIcon = dropdown.querySelector('.toggle-icon');

      if (!dropdown.classList.contains('active')) {
        subMenu.innerHTML = `
                    <li><a href="product.html?category=Đèn trang trí">Đèn trang trí</a></li>

                    <li><a href="product.html?category=Đồ trang trí">Đồ trang trí</a></li>
                    <li><a href="product.html?category=Đồ nội thất">Đồ nội thất</a></li>
                    <li><a href="product.html?category=Thiết bị vệ sinh">Thiết bị vệ sinh</a></li>
                `;
        dropdown.classList.add('active');
        toggleIcon.textContent = '-';
      } else {
        subMenu.innerHTML = '';
        dropdown.classList.remove('active');
        toggleIcon.textContent = '+';
      }
    });
  }
});
// Toggle dropdown user
document.querySelector('.user-icon').addEventListener('click', (e) => {
  e.preventDefault();
  const dropdown = document.querySelector('.user-dropdown');
  dropdown.style.display =
    dropdown.style.display === 'block' ? 'none' : 'block';
});

// Tự động đóng dropdown khi click ra ngoài
document.addEventListener('click', (e) => {
  const icon = e.target.closest('.user-icon');
  const dropdown = document.querySelector('.user-dropdown');

  if (!icon && !e.target.closest('.user-dropdown')) {
    dropdown.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const searchIcon = document.querySelector('.search-icon');
  const searchModal = document.getElementById('searchModal');
  const closeSearch = document.getElementById('closeSearch');

  searchIcon.addEventListener('click', (e) => {
    e.preventDefault();
    searchModal.classList.add('show');
  });

  closeSearch.addEventListener('click', () => {
    searchModal.classList.remove('show');
  });

  // Đóng modal nếu click ngoài vùng modal
  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      searchModal.classList.remove('show');
    }
  });
});
