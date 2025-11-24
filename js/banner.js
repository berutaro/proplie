document.addEventListener("DOMContentLoaded", () => {
    const bannerSlider = new Swiper(".banner-slider", {
        slidesPerView: 1,
        spaceBetween: 20,

        autoplay: {
            delay: 3000, 
            disableOnInteraction: false, 
        },

        loop: true, 

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        breakpoints: {
            768: {
                slidesPerView: 1,
                spaceBetween: 24,
            },
            1024: {
                slidesPerView: 1,
                spaceBetween: 28,
            },
        },
    });
});