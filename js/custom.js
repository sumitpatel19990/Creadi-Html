(function($){
	//"use strict";
	$(document).ready(function($){

		$('.menuopv1 a.nav-toggle').on('click', function(){
			$(this).next().slideToggle();
		});

		$('.yamm-content').each(function(){
			$(this).parents('ul.dropdown-menu').width($(this).data('width'));
		});

		$.slidebars({
			disableOver: 999,
			hideControlClasses: true
		});

		var sidebar_pos = highstand_set_pos_sidebar_menu;

		if($('.sb-toggle-'+sidebar_pos).length > 0){
			var sb_connection = $('.sb-toggle-'+sidebar_pos).data('connection');

			if(sb_connection != '' && $('#'+sb_connection).length > 0){
				$('.sb-slidebar.sb-'+sidebar_pos).html($('#'+sb_connection).html());
			}
		}

		//Search menu

		var search_form = '<div class="overlay" id="one">'
                        +'<div class="modal">'
                            +'<form role="search" method="get" action="'+ site_uri +'" onsubmit="return highstand_check_search_form(this);">'
                                +'<input class="sitesearch_input" name="s" id="s" value="Please Search Here..." onfocus="if(this.value == \'Please Search Here...\') {this.value = \'\';}" onblur="if (this.value == \'\') {this.value = \'Please Search Here...\';}" type="text">'
                                +'<input name="search_action" value="Search" class="sitesearch_but" type="submit" />'
                            +'</form>'
                        +'</div>'
                    +'</div>';
		$('li.nav-search>a').html('<i class="fa fa-search secbt"></i>').attr('data-overlay-trigger', 'one');
		$('.sb-slidebar li.nav-search>a').html('<i class="fa fa-search secbt"></i> Search').attr('data-overlay-trigger', 'one');

		$('footer').after(search_form);	

		$('.overlay').overlay();

		//-----------------------------------------------------------
		$(
		'.king-sidebar .widget_categories,.king-sidebar .widget_archive,'+
		'.king-sidebar .widget_pages,.king-sidebar .widget_meta,'+
		'.king-sidebar .widget_recent_entries,'+
		'.king-sidebar .widget_product_categories,'+
		'.king-sidebar .widget_nav_menu').each(function(){

			$(this).find('ul').addClass('arrows_list1');
			$(this).find('li a').prepend('<i class="fa fa-caret-right"></i>');

		});
		$('ul.nav>li.current-menu-item>a').addClass('active');


		$('#tabs ul.tabs li').on( 'click', function(e){
			$('#tabs .tab_container').css({display:'none'});
			$( $(this).find('a').attr('href') ).css({display:'block'});
			$('#tabs ul.tabs li.active').removeClass('active');
			$(this).addClass('active');
			e.preventDefault();
		});

		$('#scrollup').on( 'click', function(e){
			$('html,body').animate({ 'scroll-top' : 0 });
			e.preventDefault();
		});

		$('.navbar-toggle').on( 'click', function(){
			var targ = $(this).attr('data-target');
			if( $( targ ).get(0) ){
				$( targ ).slideToggle();
			}
		});
		
		$('a').on( 'click', function(e){
			if( $(this).attr('href') == '#' && this.className.indexOf('cbp') === -1 ){
				e.preventDefault();
			}
		});

		
		document.mainMenu = $('body');
		
		$(window).scroll(function () {

			var compact_height = 30;

			// if(parseInt($('header.header').data('compact')) > 0){
			// 	compact_height = parseInt($('header.header').data('compact'));
			// }
			
			var headr_pos = $('body .header').offset();
			//console.log(headr_pos.top);

		    if ($(window).scrollTop() >= compact_height ) {
		        $('#scrollup').show();
		        document.mainMenu.addClass('compact');
		    } else {
		        $('#scrollup').hide();
		        document.mainMenu.removeClass('compact');
		    }
		});
		
		$('.close-but').on( 'click', function(){
			$(this).parent().parent().hide('slow',function(){$(this).remove();});
		});
		
		$('.video-player .video-close').on( 'click', function(){
			$(this).parent().find('iframe').remove();
			$(this).parent().animate({opacity:0},function(){$(this).hide();});
		});
		
		$('.king-video-play-wrapper .play-button').on( 'click', function(){
			var url = $(this).data('video');
			var height = $(this).data('height');
			if( url.indexOf('youtube.com') > -1 ){
				var id = url.split('v=')[1].replace('/','');
				id = 'https://www.youtube.com/embed/'+id+'?autoplay=1&controls=0&showinfo=0';
			}else if( url.indexOf('vimeo.com') > -1 ){
				var id = url.split('vimeo.com/')[1].replace('/','');
				id = 'https://player.vimeo.com/video/'+id+'?autoplay=1&title=0&byline=0&portrait=0';
			}
			var w = $(window).width(); 
			var h = parseInt(w*0.5609);
			var mt = -parseInt((h-height)/2);
			$(this).closest('.king-video-play-wrapper')
					.find('.video-player')
					.append('<iframe style="height:'+h+'px;width:'+w+'px;margin-top:'+mt+'px" src="'+id+'"></iframe')
					.css({display:'block', opacity:0})
					.animate({opacity:1});
		});
		
		$('.king-preload').each(function(){
			
			var rel = $(this).attr('data-option').split('|');
			
			(function( elm ){
				$.post( site_uri+'/index.php', {
						'control'	: 'ajax',
						'task'		: rel[0], 
						'id'		: rel[1],
						'amount'	: rel[2]
					}, function (result) {
					
					elm.innerHTML = result;
					$(elm).addClass('animated fadeIn');
						
				})
			})(this);
			
		});
		
		$('.navbar-nav li.yamm-fw a.active').each(function(){
			$(this).closest('li.yamm-fw').find('>a').addClass('active');
		});
		
		var act = false;
		$('#king-mainmenu>li').each(function(){
			if( $(this).hasClass('current-menu-parent') || $(this).find('>a').hasClass('active') ){
				if( act == false ){
					act = true;
				}else{
					$(this).removeClass('current-menu-parent');
					$(this).find('>a.active').removeClass('active');
				}	
			}
		});
		
		// Menu OnePage
		$('#menu-onepage .navbar-toggle').on( 'click', function(){
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				$('#menu-onepage .navbar-collapse').removeClass('opened').addClass('closed');
			}
			else{
				$(this).addClass('active');
				$('#menu-onepage .navbar-collapse').removeClass('closed').addClass('opened');
			}
			$('#menu-onepage .navbar-collapse').slideToggle();
		});
		
		$('#menu-onepage a').on( 'click', function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('#menu-onepage li.active').removeClass('active');
					$(this).parent().addClass('active');
					$('.nav-collapse').attr({style:''});

					$('html,body').animate({
						scrollTop: target.offset().top-80
					}, 1000);
					
					return false;
				}
			}
		});
		
		
		$('#king-mainmenu li a').on( 'click', function(e){
			if( !$(this.parentNode).find('ul').get(0) || $('body').width() > 1000 ){
				return true;
			}
			if( $(this.parentNode).hasClass('open') ){
				$(this.parentNode).removeClass('open');
				return true;
			}else $(this.parentNode).addClass('open');

			e.preventDefault();
			
			return false;
		});
		
		//enable scroll for map
		$('.fgmapfull').on( 'click', function () {
		    $('.fgmapfull iframe').css("pointer-events", "auto");
		});
		
		videos_gallery( jQuery );
		

		$(function() {
			$('#sidebar ul.children').hide();
			$('#sidebar .arrows_list1 > li > a').on( 'click', function(event) {
				if($(this).parent().hasClass('page_item_has_children')){
					event.preventDefault();
					$(this).next('.children').slideToggle("slow");
				}
			});
		});
		
		$('.retina-support').each(function(){
			$(this).find('img').each(function(){
				if( $(this).attr('width') ){
					$(this).removeAttr('height').attr({ width : ( $(this).attr('width')/2) });
				}	
			});
		});
		
		//Tooltip
		$('.hs_button').add('.hs_tooltip').hsTooltip();
		
		// Google maps and button close
		$('.contact_form_box>.close').on('click', function(){
			$(this).parent('.contact_form_box').toggle( "slide" );
			$('.show_contact_form').fadeIn('slow');
		});
		$('.show_contact_form').on('click', function(){
			$(this).prev('.contact_form_box').toggle( "slide" );
			$('.show_contact_form').fadeOut('slow');
		});

		//flips4 fix height
		$('.flips4').each(function( index ){
			var img = $(this).find('img'),
				ratio_height,
				flip_back = $(this).find('.flips4_back');

			ratio_height = img.width() * img.prop('naturalHeight') / img.prop('naturalWidth');

			$(this).height(ratio_height);
			flip_back.height(ratio_height - parseInt(flip_back.css('padding-top')) - parseInt(flip_back.css('padding-bottom')));
			//console.log();
		});

		$('#breadcrumb').css({'background-attachment': 'fixed'});

		if( typeof $().owlCarousel == 'function' ){
	
	
			highstand_ourteam_init();
	
			highstand_testimonials_init();
			
			highstand_ourworks_init();
			
			highstand_lastpost_init();
			
			// Services Owl Carousel
			$('.services-owl-carousel').each(function() {
				$(this).owlCarousel({
					items : 3,
					itemsTablet: [768,1],
					itemsTabletSmall: false,
					itemsMobile : [479,1],
					autoPlay : 18000,
					stopOnHover : true,
					paginationSpeed : 1000,
					goToFirstSpeed : 2000,
					singleItem : false,
				});
			});

			// Tabs Slider Style 1
			$('.tabs-slider-style').each(function() {
				$(this).owlCarousel({
					autoPlay : 5000,
					stopOnHover : true,
					navigation: false,
					paginationSpeed : 1000,
					goToFirstSpeed : 2000,
					singleItem : true
				});
			});


			$(".list-property-owl-carousel").owlCarousel({
				// Most important owl features
				items : 4,
				itemsCustom : false,
				itemsDesktop : [1199,4],
				itemsDesktopSmall : [980,3],
				itemsTablet: [768,2],
				itemsTabletSmall: false,
				itemsMobile : [480,1],
				singleItem : false,
				itemsScaleUp : false,
			});
		}
	});

})(jQuery);


function highstand_check_search_form(obj){
	var search_input = jQuery(obj).find('.sitesearch_input').val();

	if(search_input == '' || search_input == 'Please Search Here...')
		return false;

	return true;
}

function timelineLoadmore( index, btn ){

	jQuery( btn ).html('<i class="fa fa-spinner fa-spin"></i>').get(0).disabled = true;
	jQuery.post( site_uri+'/wp-admin/admin-ajax.php', {
			'action': 'loadPostsTimeline',
			'index': index
		}, function (result) {
			jQuery( btn ).remove();
			jQuery('#cd-timeline').append( result );
	});
	return false;
}

function videos_gallery($){

	$('.videos-gallery-list').each(function(){
		$(this).find('iframe').each(function(){
			$(this).parent().find('br').remove();
			var yid = this.src;
			yid = yid.split('embed')[1].replace(/\//g,'');
			$(this).closest('.wpb_text_column').attr({'data-yid':yid}).on( 'click', function(){
				var yid = $(this).attr('data-yid');
				$(this).closest('.wpb_row').find('.videos-gallery-player .wpb_wrapper').html('<iframe src="https://www.youtube.com/embed/'+yid+'?autoplay=1"></iframe>');
			});
			$(this).after('<img src="https://i.ytimg.com/vi/'+yid+'/default.jpg" />').remove();
		});
	});

}

function highstand_testimonials_init(){

	/* testimonials carousel with owl scripts */
	$(".ow-testimonials").each(function(){

		if( $(this).data('kc-loaded') !== true )
			$(this).data({ 'kc-loaded' : true });
		else return;

		$(this).owlCarousel({
			autoPlay : 18000,
			stopOnHover : true,
			navigation: false,
			paginationSpeed : 1000,
			goToFirstSpeed : 2000,
			singleItem : true,
		});
	});

	$(".testimonial-layout-5").each(function(){

		if( $(this).data('kc-loaded') !== true )
			$(this).data({ 'kc-loaded' : true });
		else return;

		$(this).owlCarousel({
			autoPlay : 9000,
			stopOnHover : true,
			navigation: false,
			paginationSpeed : 1000,
			goToFirstSpeed : 2000,
			singleItem : true,
			autoHeight : true,
		});
	});

	$(".testimonial-layout-8").each(function(){

		if( $(this).data('kc-loaded') !== true )
			$(this).data({ 'kc-loaded' : true });
		else return;

		$(this).owlCarousel({
			autoPlay: 5000,
			items : 3,
			itemsDesktop : [1170,3],
			itemsDesktopSmall : [1170,3]
		});
	});

	$(".testimonial-layout-11").each(function(){
		
		if( $(this).data('kc-loaded') !== true )
			$(this).data({ 'kc-loaded' : true });
		else return;
		
		$(this).owlCarousel({
			autoPlay : 9000,
			stopOnHover : true,
			navigation: false,
			paginationSpeed : 1000,
			goToFirstSpeed : 2000,
			singleItem : true
		});
	});

	$(".testimonial-layout-12").each(function(){
		
		if( $(this).data('kc-loaded') !== true )
			$(this).data({ 'kc-loaded' : true });
		else return;
		
		$(this).owlCarousel({
			autoPlay : 18000,
			stopOnHover : true,
			navigation: false,
			paginationSpeed : 1000,
			goToFirstSpeed : 2000,
			singleItem : true,
			autoHeight : true
		});
	});

	$(".testimonial-layout-13").each(function(){
		
		if( $(this).data('kc-loaded') !== true )
			$(this).data({ 'kc-loaded' : true });
		else return;
		
		$(this).owlCarousel({
			autoPlay : 9000,
			stopOnHover : true,
			lazyLoad : true,
			pagination:true,
			singleItem : true
		});
	});
		
}

function highstand_ourteam_init(){
	
	/* Our team carousel with owl scripts */
	$('.owl-our-team').each(function(){
		
		if( $(this).data('kc-loaded') !== true )
			$(this).data({ 'kc-loaded' : true });
		else return;
			
		$(this).owlCarousel({
			autoPlay: 6000,
			items : 5,
			itemsDesktop : [1199,4],
			itemsDesktopSmall : [979,3]
		});
	});

	$('.our-team-layout-3').each(function(){
		
		if( $(this).data('kc-loaded') !== true )
			$(this).data({ 'kc-loaded' : true });
		else return;
			
		$(this).owlCarousel({
			items : 4,
			itemsCustom : false,
			itemsDesktop : [1199,4],
			itemsDesktopSmall : [980,3],
			itemsTablet: [768,2],
			itemsTabletSmall: false,
			itemsMobile : [479,1],
			singleItem : false,
			itemsScaleUp : false,
		})
	});

	$('.our-team-layout-7').each(function(){
		
		if( $(this).data('kc-loaded') !== true )
			$(this).data({ 'kc-loaded' : true });
		else return;
			
		$(this).owlCarousel({
			items : 4,
			itemsCustom : false,
			itemsDesktop : [1199,4],
			itemsDesktopSmall : [980,3],
			itemsTablet: [768,2],
			itemsTabletSmall: false,
			itemsMobile : [480,1],
			singleItem : false,
			itemsScaleUp : false
		})
	});

}

function highstand_ourworks_init(){
	// Portfolio
	$('.our-works-layout-3').each(function(){
		
		if( $(this).data('kc-loaded') !== true )
			$(this).data({ 'kc-loaded' : true });
		else return;
		
		$(this).owlCarousel({
			autoPlay: 6000,
			items : 4,
			itemsDesktop : [1199,4],
			itemsDesktopSmall : [979,3]
        });
	});
	
	if( typeof window.hs_cube_init == 'function' )
		hs_cube_init();
	
}

function highstand_lastpost_init(){

	$('.last-post-layout-4').each(function() {
		
		if( $(this).data('kc-loaded') !== true )
			$(this).data({ 'kc-loaded' : true });
		else return;
		
		$(this).owlCarousel({
			items : 3,
			itemsCustom : false,
			itemsDesktop : [1199,3],
			itemsDesktopSmall : [980,3],
			itemsTablet: [768,2],
			itemsTabletSmall: false,
			itemsMobile : [480,1],
			singleItem : false,
			itemsScaleUp : false
		});
	});

	// Last post layout 9
	$('.last-post-layout-9').each(function() {
		
		if( $(this).data('kc-loaded') !== true )
			$(this).data({ 'kc-loaded' : true });
		else return;
		
		$(this).owlCarousel({
			items : 2,
			itemsCustom : false,
			itemsDesktop : [1199,2],
			itemsDesktopSmall : [980,2],
			itemsTablet: [768,2],
			itemsTablet: [640,1],
			itemsTabletSmall: false,
			itemsMobile : [480,1],
			singleItem : false,
			itemsScaleUp : false
		});
	});

	// Last post layout 10
	$('.last-post-layout-10').each(function() {

		if( $(this).data('kc-loaded') !== true )
			$(this).data({ 'kc-loaded' : true });
		else return;

		$(this).owlCarousel({
			autoPlay : 5000,
			stopOnHover : true,
			navigation: false,
			paginationSpeed : 1000,
			goToFirstSpeed : 2000,
			singleItem : true
		});
	});

}


(function ( $ ) {
	$.fn.hsTooltip = function() {
	 
		return this.each(function() {			
			var rect = this.getBoundingClientRect();
			var tooltip = $(this).data('tooltip');			
			var span_w = $(this).find('span').outerWidth();
			var span_h = $(this).find('span').outerHeight();
			var this_w = $(this).outerWidth();
			var this_h = $(this).outerHeight();
			
			
			if(typeof(tooltip) == 'undefined'){
				$(this).find('span').css('margin-left', -span_w/2);			
				$(this).hover().find('span').css('bottom', this_h+10);
			}else{
				var position = $(this).data('position');
				var ext_bottom = -10;
				if(typeof position == 'undefined')
					position = 'top';
				
				$(this).addClass(position);
				
				if($(this).hasClass('style1')) ext_bottom = 5;
				
				switch(position) {
					case 'right': {
						var bottom;						
						bottom = this_h/2 - span_h/2;
						
						$(this).find('span').css('left', this_w+10 );
						$(this).find('span').css('bottom', bottom );
						
						$(this).hover().find('span').css('left', this_w-ext_bottom);
						break;
					}
					
					case 'bottom': {
						$(this).find('span').css('margin-left', -span_w/2);			
						$(this).hover().find('span').css('bottom', -span_h+ext_bottom);
						break;
					}
					
					case 'left': {
						var bottom, ext_left = 0;
						bottom = this_h/2 - span_h/2;
						if(!$(this).hasClass('style1')) ext_left = 10;
						
						$(this).find('span').css('left', -span_w-ext_left );
						$(this).find('span').css('bottom', bottom );
						
						break;
					}						
						
					default: {
						$(this).find('span').css('margin-left', -span_w/2);			
						$(this).hover().find('span').css('bottom', this_h-ext_bottom);
					}
				} 							
			}
			
		});
	 
	};
}( jQuery ));

/* 
 * Images fadeIn
 * Copyright 2016 King-Theme
 */
(function($) {
	"use strict";

	$('.image_fadein').each(function(){
		var _this = $(this),
			rotate = $(this).data('rotate');

		$(this).find('img:gt(0)').hide();

		setInterval(function () {
		    _this.find('>:first-child').fadeOut()
		                             .next('img')
		                             .fadeIn()
		                             .end()
		                             .appendTo('.image_fadein');
		}, rotate); // 4 seconds
	});

	$(document).ready(function() {

	    $(".tabs-realestate").each(function() {

	    	$(this).find(">:first").addClass('active');

	    	$(this).find('li').on('click', function(t){
	    		var i = $("a", this).attr("href");
	    		var cat = $("a", this).data("cat");

	    		$('.tabs-content-realestate').find('.property_cat').val(cat);

	        	$(this).siblings().removeClass("active");
	        	$(this).addClass("active");
	        	$(i).siblings().hide();
	        	$(i).fadeIn(400);
	        	t.preventDefault();
	    	});

	    });


	    $('.search_property').on( 'click', function(){
	    	$(this).parents('form').submit();
	    });


	    $(".travel_bf_tabs").each(function() {

	    	$(this).find(">:first").addClass('active');

	    	$(this).find('li').on('click', function(t){
	    		var i = $("a", this).attr("href");
	    		var type = $("a", this).data("type");
console.log(type);
	    		$('#travel_type').val(type);

	        	$(this).siblings().removeClass("active");
	        	$(this).addClass("active");
	        	$(i).siblings().hide();
	        	$(i).fadeIn(400);
	        	t.preventDefault();
	    	});

	    });

	});
	

})(jQuery);


/* 
 * overlay.js v1.1.0
 * Copyright 2014 Joah Gerstenberg (www.joahg.com)
 */
(function($) { 
  $.fn.overlay = function() {
    overlay = $('.overlay');

    overlay.ready(function() {
      	overlay.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
        	if (!$(this).hasClass('shown')) return $(this).css('visibility', 'hidden');
      	});

      	overlay.on('show', function() {
        	$(this).css('visibility', 'visible');
        	$(this).addClass('shown');
       		return true;
      	});

      	overlay.on('hide', function() {
        	$(this).removeClass('shown');
        	return true;
      	});

      	overlay.on('click', function(e) {
        	if (e.target.className === $(this).attr('class')) return $(this).trigger('hide');
      	})

      	$('a[data-overlay-trigger=""]').on('click', function() {
        	overlay.trigger('show');
      	});

      	$('a[data-overlay-trigger]:not([data-overlay-trigger=""])').on('click', function() {
        	//console.log($('.overlay#' + $(this).attr('data-overlay-trigger')))
        	$('.overlay#' + $(this).attr('data-overlay-trigger')).trigger('show');
      	});
    });


    var sidebar_pos = highstand_set_pos_sidebar_menu;

    $( ".nav-search > a" ).on('click', function(){
    	$( '.sb-toggle-'+sidebar_pos ).trigger( "click" );
    });


  };
})(jQuery);


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

jQuery(document).ready(function($) {


	//Validate comment form
	$('#comment_submit').on('click', function(e){
		
		var valid = true,
			author = $('#commentform #author').val(),
			email = $('#commentform #email').val(),
			comment = $('#commentform #comment').val();

		if(author == ''){
			valid = false;
			alert('Please enter your name.');			
		}else if(!validateEmail(email)){
			valid = false;
			alert('Please enter a valid email.');			
		}else if(comment == ''){
			valid = false;
			alert('Please enter your comment.');
		}

		if(valid === false){
			e.preventDefault();
		}

	});




	$('.feature_section4 .kc_row.kc_row_inner').hover(function() {
		$('.feature_section4_active').removeClass('active');
	}, function() {
		$('.feature_section4_active').addClass('active');
	});



	/*Subscribe Progress*/

	$(".hs_subscribe").submit(function(){

		highstand_submit_newsletter( this );

		return false;
	});
	
	function highstand_submit_newsletter( sform ){
		
		var email = jQuery( sform ).children(".enter_email_input").val();

		if( email.length < 8 || email.indexOf('@') == -1 || email.indexOf('.') == -1 ){
			jQuery( sform ).children('.enter_email_input').
			animate({marginLeft:-10, marginRight:10},100).
			animate({marginLeft:0, marginRight:0},100).
			animate({marginLeft:-10, marginRight:10},100).
			animate({marginLeft:0, marginRight:0},100);
			jQuery( sform ).children('.highstand_newsletter_status').html('<span style="color:#F00;">Your email is invalid.</span>');
			return false;
		}

		jQuery( sform ).children('.highstand_newsletter_status').html('<i style="color:#ccc" class="fa fa-spinner fa-pulse fa-2x"></i> Sending...');

		var admin_url = jQuery( sform ).data('url');

		$.ajax({

			type:'POST',

			data:{	
				"action" : "highstand_newsletter",
				"highstand_newsletter" : "subcribe",
				"highstand_email" : email 
			},

			url: admin_url,

			success: function( data ) {

//				jQuery( sform ).children(".king-newsletter-preload").fadeOut( 500 );

				var obj = $.parseJSON( data );

				if( obj.status === 'success' ){

					var txt = '<div class="highstand_newsletter_status" style="color:green;">'+obj.messages+'</div>';

				}else{

					var txt = '<div class="highstand_newsletter_status" style="color:red;">'+obj.messages+'</div>';

				}	
					
				jQuery( sform ).children('.highstand_newsletter_status').after( txt ).remove();

			}

		});	
	}




	/*--------------------------------------------
	 # Hosting
	 -------------------------------------------*/

	$('.search_domain_form').find('input[type="submit"]').on('click', function( event ){
		event.preventDefault();

		var domain = $('#domain_input').val();

		if($.active < 1){
			$('#domain_input').addClass('loading');
			$.ajax({
				url: highstand_hosting_params.ajax_url,
				type: 'POST',
				dataType: 'json',
				data: {
					'domain': domain,
					'action': 'highstand_search_domain',
					'security': $('#security').val()
				},
				success: function(data){
					$('#domain_search_results').html(data.results_html);
					$('#domain_input').removeClass('loading');	
					
				}
			});
		}

	});

});




/*!
 * @preserve
 *
 * Readmore.js jQuery plugin
 * Author: @jed_foster
 * Project home: http://jedfoster.github.io/Readmore.js
 * Licensed under the MIT license
 *
 * Debounce function from http://davidwalsh.name/javascript-debounce-function
 */

/* global jQuery */

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(
function($) {
  'use strict';

  var readmore = 'readmore',
      defaults = {
        speed: 100,
        collapsedHeight: 200,
        heightMargin: 16,
        moreLink: '<a href="#">Read More</a>',
        lessLink: '<a href="#">Close</a>',
        embedCSS: true,
        blockCSS: 'display: block; width: 100%;',
        startOpen: false,

        // callbacks
        beforeToggle: function(){},
        afterToggle: function(){}
      },
      cssEmbedded = {},
      uniqueIdCounter = 0;

  function debounce(func, wait, immediate) {
    var timeout;

    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (! immediate) {
          func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) {
        func.apply(context, args);
      }
    };
  }

  function uniqueId(prefix) {
    var id = ++uniqueIdCounter;

    return String(prefix == null ? 'rmjs-' : prefix) + id;
  }

  function setBoxHeights(element) {
    var el = element.clone().css({
          height: 'auto',
          width: element.width(),
          maxHeight: 'none',
          overflow: 'hidden'
        }).insertAfter(element),
        expandedHeight = el.outerHeight(),
        cssMaxHeight = parseInt(el.css({maxHeight: ''}).css('max-height').replace(/[^-\d\.]/g, ''), 10),
        defaultHeight = element.data('defaultHeight');

    el.remove();

    var collapsedHeight = cssMaxHeight || element.data('collapsedHeight') || defaultHeight;

    // Store our measurements.
    element.data({
      expandedHeight: expandedHeight,
      maxHeight: cssMaxHeight,
      collapsedHeight: collapsedHeight
    })
    // and disable any `max-height` property set in CSS
    .css({
      maxHeight: 'none'
    });
  }

  var resizeBoxes = debounce(function() {
    $('[data-readmore]').each(function() {
      var current = $(this),
          isExpanded = (current.attr('aria-expanded') === 'true');

      setBoxHeights(current);

      current.css({
        height: current.data( (isExpanded ? 'expandedHeight' : 'collapsedHeight') )
      });
    });
  }, 100);

  function embedCSS(options) {
    if (! cssEmbedded[options.selector]) {
      var styles = ' ';

      if (options.embedCSS && options.blockCSS !== '') {
        styles += options.selector + ' + [data-readmore-toggle], ' +
          options.selector + '[data-readmore]{' +
            options.blockCSS +
          '}';
      }

      // Include the transition CSS even if embedCSS is false
      styles += options.selector + '[data-readmore]{' +
        'transition: height ' + options.speed + 'ms;' +
        'overflow: hidden;' +
      '}';

      (function(d, u) {
        var css = d.createElement('style');
        css.type = 'text/css';

        if (css.styleSheet) {
          css.styleSheet.cssText = u;
        }
        else {
          css.appendChild(d.createTextNode(u));
        }

        d.getElementsByTagName('head')[0].appendChild(css);
      }(document, styles));

      cssEmbedded[options.selector] = true;
    }
  }

  function Readmore(element, options) {
    this.element = element;

    this.options = $.extend({}, defaults, options);

    embedCSS(this.options);

    this._defaults = defaults;
    this._name = readmore;

    this.init();

    // IE8 chokes on `window.addEventListener`, so need to test for support.
    if (window.addEventListener) {
      // Need to resize boxes when the page has fully loaded.
      window.addEventListener('load', resizeBoxes);
      window.addEventListener('resize', resizeBoxes);
    }
    else {
      window.attachEvent('load', resizeBoxes);
      window.attachEvent('resize', resizeBoxes);
    }
  }


  Readmore.prototype = {
    init: function() {
      var current = $(this.element);

      current.data({
        defaultHeight: this.options.collapsedHeight,
        heightMargin: this.options.heightMargin
      });

      setBoxHeights(current);

      var collapsedHeight = current.data('collapsedHeight'),
          heightMargin = current.data('heightMargin');

      if (current.outerHeight(true) <= collapsedHeight + heightMargin) {
        // The block is shorter than the limit, so there's no need to truncate it.
        return true;
      }
      else {
        var id = current.attr('id') || uniqueId(),
            useLink = this.options.startOpen ? this.options.lessLink : this.options.moreLink;

        current.attr({
          'data-readmore': '',
          'aria-expanded': this.options.startOpen,
          'id': id
        });

        current.after($(useLink)
          .on('click', (function(_this) {
            return function(event) {
              _this.toggle(this, current[0], event);
            };
          })(this))
          .attr({
            'data-readmore-toggle': '',
            'aria-controls': id
          }));

        if (! this.options.startOpen) {
          current.css({
            height: collapsedHeight
          });
        }
      }
    },

    toggle: function(trigger, element, event) {
      if (event) {
        event.preventDefault();
      }

      if (! trigger) {
        trigger = $('[aria-controls="' + _this.element.id + '"]')[0];
      }

      if (! element) {
        element = _this.element;
      }

      var $element = $(element),
          newHeight = '',
          newLink = '',
          expanded = false,
          collapsedHeight = $element.data('collapsedHeight');

      if ($element.height() <= collapsedHeight) {
        newHeight = $element.data('expandedHeight') + 'px';
        newLink = 'lessLink';
        expanded = true;
      }
      else {
        newHeight = collapsedHeight;
        newLink = 'moreLink';
      }

      // Fire beforeToggle callback
      // Since we determined the new "expanded" state above we're now out of sync
      // with our true current state, so we need to flip the value of `expanded`
      this.options.beforeToggle(trigger, $element, ! expanded);

      $element.css({'height': newHeight});

      // Fire afterToggle callback
      $element.on('transitionend', (function(_this) {
        return function() {
          _this.options.afterToggle(trigger, $element, expanded);

          $(this).attr({
            'aria-expanded': expanded
          }).off('transitionend');
        }
      })(this));

      $(trigger).replaceWith($(this.options[newLink])
        .on('click', (function(_this) {
            return function(event) {
              _this.toggle(this, element, event);
            };
          })(this))
        .attr({
          'data-readmore-toggle': '',
          'aria-controls': $element.attr('id')
        }));
    },

    destroy: function() {
      $(this.element).each(function() {
        var current = $(this);

        current.attr({
          'data-readmore': null,
          'aria-expanded': null
        })
          .css({
            maxHeight: '',
            height: ''
          })
          .next('[data-readmore-toggle]')
          .remove();

        current.removeData();
      });
    }
  };


  $.fn.readmore = function(options) {
    var args = arguments,
        selector = this.selector;

    options = options || {};

    if (typeof options === 'object') {
      return this.each(function() {
        if ($.data(this, 'plugin_' + readmore)) {
          var instance = $.data(this, 'plugin_' + readmore);
          instance.destroy.apply(instance);
        }

        options.selector = selector;

        $.data(this, 'plugin_' + readmore, new Readmore(this, options));
      });
    }
    else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      return this.each(function () {
        var instance = $.data(this, 'plugin_' + readmore);
        if (instance instanceof Readmore && typeof instance[options] === 'function') {
          instance[options].apply(instance, Array.prototype.slice.call(args, 1));
        }
      });
    }
  };

}));

jQuery(document).ready(function($){
	$('.work-des').each(function() {
	    if($(this).innerHeight() > 210){
	        $(this).readmore({
	          moreLink: '<a href="#" class="read-more-link addto_favorites" style="margin-top: 10px;display: inline-block;"><i class="fa fa-chevron-down"></i> Show more</a>',
	          lessLink: '<a href="#" class="read-less-link addto_favorites" style="margin-top: 10px;display: inline-block;"><i class="fa fa-chevron-up"></i> Show less</a>',
	          maxHeight: 205,
	          speed: 200,
	          afterToggle: function(trigger, element, expanded) {
	            if(! expanded) { // The "Close" link was clicked
	              $('html, body').animate( { scrollTop: element.offset().top }, {duration: 100 } );
	            }
	          }
	        });
	    }
	});
});