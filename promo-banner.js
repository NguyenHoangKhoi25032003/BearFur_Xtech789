// Mảng chứa hình nền và nội dung tương ứng
const slides = [
    {
        background: 'assets/img/se1.webp',
        content: {
            h2: '#FURNITURES',
            h1: 'XU HƯỚNG NỘI THẤT',
            p: 'Đồ nội thất cao cấp được nâng niu trong từng chi tiết <br> hàng đầu Việt Nam',
            btnText: 'MUA NGAY'
        }
    },
    {
        background: 'assets/img/slider_2.webp', // Thay bằng đường dẫn hình ảnh khác
        content: {
            h2: '#DECOR TRENDS',
            h1: 'THIẾT KẾ HIỆN ĐẠI',
            p: 'Nội thất hiện đại mang phong cách độc đáo <br> từ Việt Nam',
            btnText: 'KHÁM PHÁ'
        }
    },
    {
        background: 'assets/img/se1.webp', // Thay bằng đường dẫn hình ảnh khác
        content: {
            h2: '#HOME ESSENTIALS',
            h1: 'NỘI THẤT BỀN VỮNG',
            p: 'Sản phẩm thân thiện với môi trường <br> chất lượng cao',
            btnText: 'MUA NGAY'
        }
    }
];

let currentSlide = 0;
const promoBackground = document.querySelector('.promo-background');
const promoContent = document.querySelector('.promo-content');
const promoImage = document.querySelector('.promo-image');

function updateSlide() {
    // Thêm class fade-out để bắt đầu hiệu ứng ẩn
    promoContent.classList.add('fade-out');

    // Cập nhật hình nền và hình ảnh sau khi hiệu ứng ẩn hoàn tất
    setTimeout(() => {
        promoBackground.style.backgroundImage = `url('${slides[currentSlide].background}')`;
        promoImage.style.backgroundImage = `url('${slides[currentSlide].image}')`;

        // Cập nhật nội dung
        promoContent.querySelector('h2').textContent = slides[currentSlide].content.h2;
        promoContent.querySelector('h1').textContent = slides[currentSlide].content.h1;
        promoContent.querySelector('p').innerHTML = slides[currentSlide].content.p;
        promoContent.querySelector('a').textContent = slides[currentSlide].content.btnText;

        // Loại bỏ class fade-out để hiển thị lại với hiệu ứng
        promoContent.classList.remove('fade-out');
    }, 500); // Thời gian khớp với transition (0.5s)

    // Chuyển sang slide tiếp theo
    currentSlide = (currentSlide + 1) % slides.length;
}

// Gọi ban đầu
updateSlide();

// Thay đổi slide sau mỗi 5 giây
setInterval(updateSlide, 5000);