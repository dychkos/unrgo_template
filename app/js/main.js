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

//Listeners
btnBurger.addEventListener('click',function (e){
	toggleMobileMenu(btnBurger);
})

function syncHeight() {
	document.documentElement.style.setProperty(
		"--window-inner-height",
		`${window.innerHeight}px`
	);
}

window.addEventListener("resize", syncHeight);

window.onscroll = () =>{
	console.log(window.scrollY)
	if(window.scrollY > 60){
		up.classList.add("active");
	}else {
		up.classList.remove("active");
	}
}

search.addEventListener('click',()=>{
	// let isOpen = search.classList.contains('open');
	// console.log('here')
	// // if(isOpen){
	// // 	if(isMobile) return;
	// // 	search.classList.remove('open');
	// // 	btnBurger.classList.remove('open');
	// // 	btnBurger.setAttribute('action','');
	// // 	document.removeEventListener('mouseup',searchHide);
	// // 	searchWrapper.style.width = '60px';
	// // 	return;
	// // }
	search.classList.add('open');
	btnBurger.classList.add('open');
	btnBurger.setAttribute('action','search');
	if(isMobile) return;
	searchWrapper.style.width = '320px';
	document.addEventListener('mouseup',searchHide);
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
	if(userDropdown.classList.contains("open")){
		document.addEventListener('mouseup',userDropdownHide);

	}else{
		document.removeEventListener('mouseup',userDropdownHide);

	}
})

let swiper = new Swiper(".swiper", {
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

function searchHide (e) {
	hideByDocumentClick(e,".search__wrapper",()=>{
		$(".search").removeClass("open");
		$(".burger").removeClass("open").attr("action","");
		$(".search__wrapper").css("width","60px");
		$(".search__results").hide();
	})
}

function userDropdownHide (e) {
	hideByDocumentClick(e,".user-dropdown",()=>{
		$(".user-dropdown").removeClass("open");
	})
}

function hideByDocumentClick(e,element,action){
	let div = $(element);
	if (!div.is(e.target) // если клик был не по нашему блоку
		&& div.has(e.target).length === 0) { // и не по его дочерним элементам
		action();
	}
}


