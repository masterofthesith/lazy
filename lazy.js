(function($) {
	var lazyLoad;
	function Utils() {}
	Utils.prototype = {
		constructor: Utils,
		isElementInView: function (element, fullyInView) {
			var pageTop = $(window).scrollTop();
			var pageBottom = pageTop + $(window).height();
			var elementTop = $(element).offset().top;
			var elementBottom = elementTop + $(element).height();

			if (fullyInView === true) {
				return ((pageTop < elementTop) && (pageBottom > elementBottom));
			} else {
				return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
			}
		}
	};
	var Utils = new Utils();
	function lazy() {
		if (lazyLoad) clearTimeout(lazyLoad);
		lazyLoad = setTimeout(function() {
			$(".lazy").each(function() {
				if (Utils.isElementInView($(this), false) && $(this).is("data-src"))  //Eğer ilgili element ekranda görülüyorsa ve data-src tanımlanmışsa
					$(this).attr("src", $(this).attr("data-src"));
			});
		},200);
	}
	$("body").on("scroll",function(e) {
		if (lazyLoad) clearTimeout(lazyLoad);
		lazy();
	});
	$(document).on("ready",function() {
		lazy();
	});
})(jQuery);
