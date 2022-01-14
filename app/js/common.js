let sliderOptions  = {
    slidesPerView: 1,
    spaceBetween: 10,
    direction:"horizontal",
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    // Responsive breakpoints
    breakpoints: {

        // when window width is >= 640px
        640: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        // when window width is >= 640px
        768: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        991: {
            slidesPerView: 4,
            spaceBetween: 20
        }
    }
}