document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });
});

// Toggle modal khi nhấn nút ☰ trên mobile
document.querySelector('.mobile-nav-toggle').addEventListener('click', () => {
    if (window.innerWidth <= 768) {
        const modal = document.querySelector('#mobile-nav-modal');
        modal.classList.toggle('active');
    }
});

// Đóng modal khi nhấn nút close
document.querySelector('#modal-close').addEventListener('click', () => {
    const modal = document.querySelector('#mobile-nav-modal');
    modal.classList.remove('active');
});

// Đóng modal khi nhấn vào overlay
document.querySelector('.modal-overlay').addEventListener('click', (e) => {
    if (e.target === document.querySelector('.modal-overlay')) {
        const modal = document.querySelector('#mobile-nav-modal');
        modal.classList.remove('active');
    }
});

// Toggle sub-menu for Sản Phẩm
document.querySelector('.modal-product-toggle').addEventListener('click', (e) => {
    e.preventDefault();
    const dropdown = e.currentTarget.closest('.modal-dropdown');
    const subMenu = dropdown.querySelector('.modal-sub-menu');
    const toggleIcon = dropdown.querySelector('.toggle-icon');
    const isActive = dropdown.classList.contains('active');

    if (!isActive) {
        // Show sub-menu
        subMenu.innerHTML = `
            <li><a href="product.html?category=Đèn trang trí">Đèn trang trí</a></li
            <li><a  href="product.html?category=Đồ trang trí">Đồ trang trí</a></li>
            <li><a  href="product.html?category=Đồ trang trí">Đồ nội thất</a></li>
            <li><a  href="product.html?category=Đồ trang trí">Thiết bị vệ sinh</a></li>
        `;
        dropdown.classList.add('active');
        toggleIcon.textContent = '-';
    } else {
        // Hide sub-menu
        subMenu.innerHTML = '';
        dropdown.classList.remove('active');
        toggleIcon.textContent = '+';
    }
});