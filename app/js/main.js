
let btnBurger = document.querySelector('.burger');


btnBurger.addEventListener('click',function (e){
	toggleMobileMenu(btnBurger);
})


//
// $('.search__wrapper').click(()=>{
// 	$(".search").addClass("open");
// 	let isOpen = $(this).hasClass("open");
// 	console.log('isOpen',isOpen)
// });



$('.search').click(()=>{
	let isOpen = $(this).hasClass("open");
	console.log('isOpen',isOpen)
	if(isOpen){
		$(".search").removeClass("open");
		$(".burger").removeClass("open").attr("action","");
	}

	$(".search").addClass("open");
	$(".search__wrapper").css("width","320px");
	$(".burger").addClass("open").attr("action","search");
	//$(".header-mobile__col" ).first().siblings().hide();
})

function toggleMobileMenu(burger){
	let action = $(burger).attr("action");
	if(action==="search"){
		$(".search").removeClass("open");
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

