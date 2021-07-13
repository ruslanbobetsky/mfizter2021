// $(function(){

// 	new WOW().init();
// });

function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});

const swiper = new Swiper('.swiper-container', {
	// Optional parameters
	direction: 'horizontal',
	//loop: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	  },
	//   autoplay: { 
    //     delay: 3500, 
    //   }, 
      slidesPerView: 'auto',      
	  scrollbar: {
		el: '.swiper-scrollbar',
	  },
});