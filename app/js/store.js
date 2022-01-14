/*
* Declaration
* */

new Swiper(".new-swiper", {
    ...sliderOptions,navigation: {
        nextEl: "#swiper-button-next-1",
        prevEl: "#swiper-button-prev-1",
    }
});
new Swiper(".popular-swiper", {
    ...sliderOptions,navigation: {
        nextEl: "#swiper-button-next-2",
        prevEl: "#swiper-button-prev-2",
    }
});

/*
* Nodes
* */
let navigation = document.querySelector('.navigation__active');

/*
* Event listeners
* */
navigation.addEventListener("click",()=>{
    let navBody = document.querySelector(".navigation__body");

    let hider = new Hider(".navigation__active",()=>{
        $(".navigation__body").removeClass("active");
    });

    if(navBody.classList.contains("active")){
        navBody.classList.remove("active");
        document.removeEventListener('mouseup',hider.hide);
    }else{
        navBody.classList.add("active");
        document.addEventListener('mouseup',hider.hide);
    }
})