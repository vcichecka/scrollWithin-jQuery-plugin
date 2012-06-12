/*!
 * Scroll Within, a jQuery plugin 
 * Version v0.1.2
 * http://pongoweb.it/
 *
 * Copyright (c) 2012 Fabio Fumis
 * Licensed under the MIT License: 
 * http://pongoweb.it/license
 */

(function($) {
	
	$.fn.scrollWithin = function(options) 
	{

		//Get obj
		var id = this;

		// default configuration properties
		var defaults = {	
			active_class: 'active',
			margin: 0,
			parent: false,
			duration: 'slow',
			easing: null,
			hash: false,
			onClickMenu: function() {},
			onScrollComplete: function() {},
		};

		var opts = $.extend(defaults, options); 

		//obj link menu
		var $a = $(id).find('a');

		//set default a class
		$a.first().addClass('active');
		var section = $a.first().attr('href');

		if(section) {

			//Go to init position
			if(opts.hash && window.location.hash) {
				hash_section = (window.location.hash);
				var init_position = $(hash_section).position();
				$('html, body').animate(
					{scrollTop:init_position.top - opts.margin},
					opts.duration,
					opts.easing
				);
			}
		
			//manage click
			$a.live('click', function() {
				var $link = $(this);
				section = $link.attr('href');
				var position = $(section).position();
				$('html, body').animate(
					{scrollTop:position.top - opts.margin},
					opts.duration,
					opts.easing
				);

				// call the onClickMenu callback
				opts.onClickMenu.call(id);

				if(!opts.hash) return false;

			});

			//Scroll event check
			$(window).scroll(function() {
				var pos = $(window).scrollTop() + opts.margin;

				//Check all elements position
				$a.each(function(index) {
					$link = $(this);
					section = $link.attr('href');
					if(section && pos >= $(section).position().top - 1) {
						$a.removeClass(opts.active_class);
						$link.addClass(opts.active_class);
						if(opts.parent) {
							$a.parent().removeClass(opts.active_class);
							$link.parent().addClass(opts.active_class);
						}
					}
				});

				//detect bottom
				if(pos + $(window).height() - opts.margin == $(document).height()) {
					//set default a class
					$a.removeClass(opts.active_class);
					$a.last().addClass(opts.active_class);
					if(opts.parent) {
						$a.parent().removeClass(opts.active_class);
						$link.parent().addClass(opts.active_class);
					}
				}

				// call the onScrollComplete callback
				opts.onScrollComplete.call(id);

			});

		}
		
	}

})(jQuery);
