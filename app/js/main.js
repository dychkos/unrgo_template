//Global variables
const isMobile = getComputedStyle(document.querySelector('.header-mobile')).display === 'block';

//Nodes
let btnBurger = document.querySelector('.burger');
let search = isMobile
	? document.querySelector('.search[data-mobile]')
	: document.querySelector('.search[data-desktop]')  ;
let searchWrapper = document.querySelector('.search__wrapper');
let searchInput = search.querySelector('.search__input');
let searchResults = search.querySelector('.search__results');
let userDropdown = document.querySelector('.user-dropdown');
let up = document.querySelector('.up');
let sort = document.querySelector('.sort');
let navigation = document.querySelector('.navigation__active');
let blogNav = document.querySelectorAll('.blog-nav__category');

//Declaration
new Swiper(".swiper", {
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

});

//Listeners

window.addEventListener("load",()=>{
	let chosenNav = document.querySelector(".chosen");
	$([chosenNav.parentElement]).animate({ scrollTop: ($(".chosen").offset().top - 400)}, 500);
	chosenNav.parentElement.parentElement.classList.add("open");
})

btnBurger.addEventListener('click',function (e){
	toggleMobileMenu(btnBurger);
})

window.onscroll = () =>{
	if(window.scrollY > 60){
		up.classList.add("active");
	}else {
		up.classList.remove("active");
	}
}

blogNav.forEach(nav=>{
	nav.addEventListener("click",()=>{
		hideSidebarNav();
		nav.classList.toggle("open");
	})
})

sort.addEventListener('click',()=>{
	let sortBody = sort.querySelector('.sort__body');

	let hider = new Hider(".sort", ()=>{
		$(".sort__body").removeClass("active");
	});

	if(sortBody.classList.contains("active")){
		sortBody.classList.remove("active");
		document.removeEventListener('click',hider.hide);
	}else{
		sortBody.classList.add("active");
		document.addEventListener('click',hider.hide);
	}

})

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

search.addEventListener('click',()=>{
	search.classList.add('open');
	btnBurger.classList.add('open');
	btnBurger.setAttribute('action','search');
	if(isMobile) return;
	searchWrapper.style.width = '320px';

	let hider = new Hider("search__wrapper",()=>{
		$(".search").removeClass("open");
		$(".burger").removeClass("open").attr("action","");
		$(".search__wrapper").css("width","60px");
		$(".search__results").hide();
	})

	document.addEventListener('mouseup',hider.hide);
});

searchInput.addEventListener('input',(event)=>{
	if(event.target.value.length > 2){
		searchResults.style.display = "block";
		searchResults.innerHTML =
			` <div class="search__row">
             	<div class="search__title h4">Статьи</div>
                  <p class="search__link h5"><a href="#">Рандомный текст</a></p>
                  <p class="search__link h5"><a href="#">Типо текст</a></p>
              </div>
              <div class="search__row">
                <div class="search__title h4">Товары</div>
                  <p class="search__link h5"><a href="#">Найдено туть</a></p>
                  <p class="search__link h5"><a href="#">эовы туть</a></p>
              </div>`
	}else{
		searchResults.style.display = "none";
	}
})

userDropdown.addEventListener("click",()=>{
	userDropdown.classList.toggle("open");

	let hider = new Hider(".user-dropdown",()=>{
		$(".user-dropdown").removeClass("open");
	});

	if(userDropdown.classList.contains("open")){
		document.addEventListener('mouseup',hider.hide);
	}else{
		document.removeEventListener('mouseup',hider.hide);
	}
})

//Additional
function toggleMobileMenu(burger){
	let action = $(burger).attr("action");
	if(action==="search"){
		$(".search").removeClass("open");
		searchResults.style.display = "none";
		$(burger).removeClass("open").attr("action",'');
		return;
	}

	let isOpen = burger.classList.contains("open");
	if(isOpen){
		$(burger).removeClass("open");
		$('.header-mobile__wrapper').removeClass("active");
		document.body.style.overflow = "auto";
		$('.search_white').show();
		return;
	}
	document.body.style.overflow = "hidden";
	$(burger).addClass("open");
	$('.header-mobile__wrapper').addClass("active");
	$('.search_white').hide();

}

function hideSidebarNav(){
	blogNav.forEach(nav=>{
		if(nav.classList.contains("open")){
			nav.classList.remove("open");
		}
	})
}


//CLASSES

/*
* Provide ability to do ACTION when click outside ELEMENT
* */
class Hider {
	constructor(element,action) {
		this.element = element;
		this.action = action;

	}


	hide=(event)=>{
		let div = $(this.element);
		if (!div.is(event.target) // если клик был не по нашему блоку
			&& div.has(event.target).length === 0) { // и не по его дочерним элементам
			this.action();
		}
	}
}

