var wpOffset = 100,
trenner = '<div class="trenner"></div>',
verzeichnisLoaded = [],
spansize = $('.pushy span').size(),
scrollSpeed = 750,
interval,
loaded = 0;

$.fn.waypoint.defaults = {
    context : window,
    continuous : true,
    enabled : true,
    horizontal : false,
    offset : 0,
    triggerOnce : false
};

$(document).ready(function() {

// Nach Reload an Seitenanfang springen
// window.onload = function() {
//  setTimeout (function () {
//   scrollTo(0,0);
//  }, 0);
// }


// Läd die verzeichnisse als html dateien
$('.pushy span').each(function(index, el) {
	if ($(this).text().length == 2)  verzeichnisLoaded.push($(this).text().substring(0, $(this).text().length - 1));
	else verzeichnisLoaded.push($(this).text());
}).promise().done(loadHtml(loaded));


function loadHtml(loaded){
	$.get('verzeichnis/'+verzeichnisLoaded[loaded]+'.html', function(data) {
		var container = $('<div />').html(data);
		
		if(verzeichnisLoaded[loaded].length == 1) container.wrap('<div/>').attr('waybig', verzeichnisLoaded[loaded]+'.');
		else container.wrap('<div/>').attr('way', verzeichnisLoaded[loaded]);;
		
		$('#container').append(container).append(trenner);
		
		if(loaded < verzeichnisLoaded.length){
			loadHtml(++loaded);
		}

		if(loaded == verzeichnisLoaded.length){
			addAttributesToElements();
		}
	});
}

// Fügt Klassen und attribute für die Animationen hinzu
function addAttributesToElements(){
	$('p:not(.noanim),blockquote,figure,h1,h2,h3,h4,h5,.trenner,iframe').each(function(index, el) {
		$(this).addClass('animated').attr({
			"data-animation-delay" : 150,
			"data-animation" : 'fadeIn'
		});
	}).promise().done(initAnimations());
}


// Wenn im Menü gescrollt wird, sollte nicht der Content mitscrollen
$('.pushy').hover(function() {
	$('body').addClass('hidden')
}, function() {
	$('body').removeClass('hidden')
});

// Resize iframe Videos
$('#video').fitVids();

// Scrollbalken für Side-Menü
$('.pushy').jScrollPane({
	autoReinitialise: true
});


$(document).on('click', '.pushy a', function(event) {
	event.preventDefault();
	if($(this).hasClass('main')){
		scrollToSection('waybig',$(this).attr('waybigp'))
	}else{
		scrollToSection('way',$(this).attr('wayp'))
	}
});

$(document).on('click', '.showbeitrag_list li', function(event) {
	$('.showbeitrag_list li,.showbeitrag').removeClass('active_');
	$(this).addClass('active_');

	$('.showbeitrag[showbeitrag="'+$(this).attr('showbeitrag')+'"]').addClass('active_')
});

var pos = 0;
var width_slider = 800;

$(document).on('click', '.slider_nav', function(event) {
	var direction = parseInt($(this).attr('direction'));
	if(direction == 1 && pos !== 0){
		pos--;
	}else if(direction == 2 && pos !== 6){
		pos++;
	}
	updateSider();
});

function updateSider(){
	$('.designintro_wrapper').animate({scrollLeft: pos * width_slider}, 400 ,'easeInOutExpo');
}

function scrollToSection(attr,id){
	$('html,body').animate({scrollTop: $('['+attr+'="'+id+'"]').offset().top-50}, scrollSpeed ,'easeInOutExpo');
}

// Mithilfe von waypoints können wir die articel schön einfaden lassen
function initAnimations(){    
    $('.animated').waypoint(function() {
        var elem = $(this);
        var animation = elem.data('animation');
        if (!elem.hasClass('visible') && elem.attr('data-animation') !== undefined) {
            if (elem.attr('data-animation-delay') !== undefined) {
                var timeout = elem.data('animation-delay');
                setTimeout(function() {
                    elem.addClass(animation + " visible");
                }, timeout);
            } else {
                elem.addClass(elem.data('animation') + " visible");
            }
        }
    }, {
        offset : wpOffset + '%'
    });

    NProgress.done();
}

function initWaypointForMenu(){
	$('.pushy span').each(function(index, el) {
		if ($(this).closest('a').hasClass('main')) {
			$(this).closest('a').attr('waybigp',$(this).text());
		}else{
			$(this).closest('a').attr('wayp',$(this).text());	
		};

		
	}).promise().done(function(){
		$('[way]').waypoint(function(direction) {
			// $('[wayp]').removeClass('active')
  			$('[wayp="'+$(this).attr('way')+'"]').toggleClass('active', direction === 'down');
		}, {
    	    offset : $.waypoints('viewportHeight') / 2
		});


		$('[waybig]').waypoint(function(direction) {
			console.log(direction)

			// $('[waybigp],[wayp]').removeClass('active');
  			$('[waybigp="'+$(this).attr('waybig')+'"]').toggleClass('active', direction === 'down');
		}, {
    	    // offset : $.waypoints('viewportHeight') / 2
		});



	});
}

initWaypointForMenu();

});	