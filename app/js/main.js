// $(function(){

// 	new WOW().init();
// });

const swiper = new Swiper('.swiper-container', {
	// Optional parameters
	direction: 'horizontal',
	//loop: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	  },
	  autoplay: { 
        delay: 3500, 
      }, 
      slidesPerView: 'auto',      
	  scrollbar: {
		el: '.swiper-scrollbar',
	  },
});