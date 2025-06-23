const ntProductList = [
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

let ntCurrentIndex = 0;

function formatPrice(price) {
    return price.toLocaleString("vi-VN") + "đ";
}

function renderNtProduct(index) {
    const product = ntProductList[index];
    const wrapper = document.getElementById("nt-product-wrapper");
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
    const dotContainer = document.getElementById("nt-pagination-dots");
    const carouselWrapper = document.getElementById("nt-product-wrapper");

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
                ntCurrentIndex = (ntCurrentIndex + 1) % ntProductList.length;
            } else {
                ntCurrentIndex = (ntCurrentIndex - 1 + ntProductList.length) % ntProductList.length;
            }
            renderNtProduct(ntCurrentIndex);
            renderDots();
            resetAutoSlide();
        }
    });

    function renderDots() {
        dotContainer.innerHTML = "";
        ntProductList.forEach((_, i) => {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            if (i === ntCurrentIndex) dot.classList.add("active");
            dot.addEventListener("click", () => {
                ntCurrentIndex = i;
                renderNtProduct(ntCurrentIndex);
                renderDots();
                resetAutoSlide();
            });
            dotContainer.appendChild(dot);
        });
    }

    let autoSlide = setInterval(() => {
        ntCurrentIndex = (ntCurrentIndex + 1) % ntProductList.length;
        renderNtProduct(ntCurrentIndex);
        renderDots();
    }, 5000);

    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => {
            ntCurrentIndex = (ntCurrentIndex + 1) % ntProductList.length;
            renderNtProduct(ntCurrentIndex);
            renderDots();
        }, 5000);
    }

    const ntImageWrapper = document.querySelector('.decor-section:nth-child(3) .decor-image-wrapper');
    if (ntImageWrapper) {
        const hotspots = ntImageWrapper.querySelectorAll('.hotspot');
        const popup = document.getElementById('nt-product-popup');
        const popupImage = document.getElementById('nt-popup-image');
        const popupName = document.getElementById('nt-popup-name');
        const popupPrice = document.getElementById('nt-popup-price');

        hotspots.forEach((hotspot) => {
            const productIndex = parseInt(hotspot.dataset.productIndex);
            const product = ntProductList[productIndex];

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

    renderNtProduct(ntCurrentIndex);
    renderDots();
});