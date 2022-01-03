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

//Listeners
btnBurger.addEventListener('click',function (e){
	toggleMobileMenu(btnBurger);
})

search.addEventListener('click',()=>{
	let isOpen = search.classList.contains('open');
	if(isOpen){
		if(isMobile) return;
		search.classList.remove('open');
		btnBurger.classList.remove('open');
		btnBurger.setAttribute('action','');
		document.removeEventListener('mouseup',searchStatusHandler);
		searchWrapper.style.width = '60px';
		return;
	}
	search.classList.add('open');
	btnBurger.classList.add('open');
	btnBurger.setAttribute('action','search');
	if(isMobile) return;
	searchWrapper.style.width = '320px';
	document.addEventListener('mouseup',searchStatusHandler);
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
})

var swiper = new Swiper(".swiper", {
	slidesPerView: 3,
	spaceBetween: 30,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
});

// $('.search').click(()=>{
// 	let isOpen = $(this).hasClass("open");
// 	console.log($(this))
// 	let isDesktop = $('.header-mobile').css("display") === 'none';
// 	console.log('isOpen',isOpen);
// 	if(isOpen){
// 		$(".search").removeClass("open");
// 		$(".burger").removeClass("open").attr("action","");
// 		if(isDesktop){
// 			console.log('unbind')
// 			$(document).unbind('mouseup',searchStatusHandler);
// 		}
//
// 		return;
// 	}
// 	if(isDesktop){
// 		$(".search__wrapper").css("width","320px");
// 		$(document).on("mouseup",searchStatusHandler)
// 	}
//
// 	$(".search").addClass("open");
// 	$(".burger").addClass("open").attr("action","search");
// 	//$(".header-mobile__col" ).first().siblings().hide();
// })

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
		$('.search_white').show();
		return;
	}
	$(burger).addClass("open");
	$('.header-mobile__wrapper').addClass("active");
	$('.search_white').hide();

}

function searchStatusHandler (e) { // событие клика по веб-документу
	let div = $("search__wrapper"); // тут указываем ID элемента
	if (!div.is(e.target) // если клик был не по нашему блоку
		&& div.has(e.target).length === 0) { // и не по его дочерним элементам
		$(".search").removeClass("open");
		$(".burger").removeClass("open").attr("action","");
		$(".search__wrapper").css("width","60px");
		$(".search__results").hide();
	}
}

