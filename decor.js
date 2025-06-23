const decorProducts = [
    {
        name: "Đèn cây đứng trang trí nội thất phòng",
        description: "",
        price: 2399000,
        originalPrice: 2600000,
        discount: 8,
        image: "assets/img/pro_3.webp",
        hoverImage: "assets/img/pro_4.webp"
    },
    {
        name: "Gối tựa lưng hiện đại cho sofa",
        description: "",
        price: 310000,
        originalPrice: 350000,
        discount: 11,
        image: "assets/img/pro_2.webp",
        hoverImage: "assets/img/pro_3.webp"
    },
    {
        name: "Cây xanh trang trí chậu gỗ",
        description: "",
        price: 260000,
        originalPrice: 290000,
        discount: 10,
        image: "assets/img/pro_4.webp",
        hoverImage: "assets/img/pro_2.webp"
    }
];

let decorCurrentIndex = 0;

function formatPrice(price) {
    return price.toLocaleString("vi-VN") + "đ";
}

function renderDecorProduct(index) {
    const product = decorProducts[index];
    const wrapper = document.getElementById("decor-product-wrapper");
    const discountPercentage = product.discount ? `-${product.discount}%` : '';
    const originalPrice = product.originalPrice ? `<span class="original-price text-decoration-line-through text-muted">${formatPrice(product.originalPrice)}</span>` : '';

    wrapper.innerHTML = `
        <div class="card_product_decor h-100 position-relative">
            ${discountPercentage ? `<div class="discount">${discountPercentage}</div>` : ''}
            <img src="${product.image}" class="card-img-top" alt="${product.name}" data-hover="${product.hoverImage}">
            <div class="product-icons_decor">
                <button class="icon-btn_decor more-btn"><i class="bi bi-cart"></i></button>
                <button class="icon-btn_decor zoom-btn"><i class="bi bi-search"></i></button>
            </div>
            <div class="product-info p-2 bg-light rounded">
                <h5 class="product-name mb-1">${product.name}</h5>
                <p class="price text-danger fw-bold mb-0">${formatPrice(product.price)} ${originalPrice}</p>
            </div>
        </div>
    `;

    const card = wrapper.querySelector('.card_product_decor');
    const img = card.querySelector('.card-img-top');
    card.addEventListener('mouseover', () => {
        img.src = product.hoverImage;
    });
    card.addEventListener('mouseout', () => {
        img.src = product.image;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const dotContainer = document.getElementById("decor-pagination-dots");
    const carouselWrapper = document.getElementById("decor-product-wrapper");

    let touchStartX = 0;
    let touchEndX = 0;

    carouselWrapper.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carouselWrapper.addEventListener("touchmove", (e) => {
        e.preventDefault();
    });

    carouselWrapper.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeDistance = touchStartX - touchEndX;
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0) {
                decorCurrentIndex = (decorCurrentIndex + 1) % decorProducts.length;
            } else {
                decorCurrentIndex = (decorCurrentIndex - 1 + decorProducts.length) % decorProducts.length;
            }
            renderDecorProduct(decorCurrentIndex);
            renderDots();
            resetAutoSlide();
        }
    });

    function renderDots() {
        dotContainer.innerHTML = "";
        decorProducts.forEach((_, i) => {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            if (i === decorCurrentIndex) dot.classList.add("active");
            dot.addEventListener("click", () => {
                decorCurrentIndex = i;
                renderDecorProduct(decorCurrentIndex);
                renderDots();
                resetAutoSlide();
            });
            dotContainer.appendChild(dot);
        });
    }

    let autoSlide = setInterval(() => {
        decorCurrentIndex = (decorCurrentIndex + 1) % decorProducts.length;
        renderDecorProduct(decorCurrentIndex);
        renderDots();
    }, 5000);

    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => {
            decorCurrentIndex = (decorCurrentIndex + 1) % decorProducts.length;
            renderDecorProduct(decorCurrentIndex);
            renderDots();
        }, 5000);
    }

    const decorImageWrapper = document.querySelector('.decor-section:nth-child(1) .decor-image-wrapper');
    if (decorImageWrapper) {
        const hotspots = decorImageWrapper.querySelectorAll('.hotspot');
        const popup = document.getElementById('decor-product-popup');
        const popupImage = document.getElementById('decor-popup-image');
        const popupName = document.getElementById('decor-popup-name');
        const popupPrice = document.getElementById('decor-popup-price');

        hotspots.forEach((hotspot) => {
            const productIndex = parseInt(hotspot.dataset.productIndex);
            const product = decorProducts[productIndex];

            hotspot.addEventListener('mouseover', () => {
                if (popup && product) {
                    popupImage.src = product.image;
                    popupName.textContent = product.name;
                    popupPrice.textContent = formatPrice(product.price);
                    popup.style.display = 'block';
                    const rect = hotspot.getBoundingClientRect();
                    popup.style.left = `${rect.left + window.scrollX}px`;
                    popup.style.top = `${rect.top + window.scrollY - popup.offsetHeight - 10}px`;
                }
            });

            hotspot.addEventListener('mouseout', () => {
                if (popup) {
                    popup.style.display = 'none';
                }
            });
        });
    }

    // Render danh sách sản phẩm cho Đèn trang trí
    const productList = document.getElementById("product-list-decor");
    productList.innerHTML = decorProducts.map(product => `
        <div class="col-12 col-sm-6 col-md-4">
            <div class="card_product_decor h-100 position-relative">
                ${product.discount ? `<div class="discount">-${product.discount}%</div>` : ''}
                <img src="${product.image}" class="card-img-top" alt="${product.name}" data-hover="${product.hoverImage}">
                <div class="product-icons_decor">
                    <button class="icon-btn_decor more-btn"><i class="bi bi-cart"></i></button>
                    <button class="icon-btn_decor zoom-btn"><i class="bi bi-search"></i></button>
                </div>
                <div class="product-info p-2 bg-light rounded">
                    <h5 class="product-name mb-1">${product.name}</h5>
                    <p class="price text-danger fw-bold mb-0">${formatPrice(product.price)}
                        ${product.originalPrice ? `<span class="original-price text-decoration-line-through text-muted">${formatPrice(product.originalPrice)}</span>` : ''}
                    </p>
                </div>
            </div>
        </div>
    `).join('');

    productList.querySelectorAll('.card_product_decor').forEach(card => {
        const img = card.querySelector('.card-img-top');
        const hoverSrc = img.dataset.hover;
        card.addEventListener('mouseover', () => {
            img.src = hoverSrc;
        });
        card.addEventListener('mouseout', () => {
            img.src = img.dataset.src || decorProducts.find(p => p.name === img.alt).image;
        });
    });

    // Xử lý nút điều hướng cho Đèn trang trí
    let decorListIndex = 0;
    const prevBtn = document.querySelector('.decor-nav-btn.prev-btn');
    const nextBtn = document.querySelector('.decor-nav-btn.next-btn');
    prevBtn.addEventListener('click', () => {
        decorListIndex = (decorListIndex - 1 + decorProducts.length) % decorProducts.length;
        renderDecorProduct(decorListIndex); // Cập nhật carousel Đồ trang trí (tùy chọn)
    });
    nextBtn.addEventListener('click', () => {
        decorListIndex = (decorListIndex + 1) % decorProducts.length;
        renderDecorProduct(decorListIndex); // Cập nhật carousel Đồ trang trí (tùy chọn)
    });

    renderDecorProduct(decorCurrentIndex);
    renderDots();
});