var wpOffset = 100,
trenner = '<div class="trenner"></div>',
verzeichnisLoaded = [],
spansize = $('.pushy span').size(),
scrollSpeed = 750,
interval;

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
window.onload = function() {
 setTimeout (function () {
  scrollTo(0,0);
 }, 0);
}

// Fake progress
setTimeout(function(){
	NProgress.done();	
},500);

// Läd die verzeichnisse als html dateien
$('.pushy span').each(function(index, el) {
	if ($(this).text().length == 2) loadHtml($(this).text().substring(0, $(this).text().length - 1));
	else loadHtml($(this).text())
}).promise().done(setIntervalForVerzeichnisse());

function loadHtml(verzeichnis){
	$.get('verzeichnis/'+verzeichnis+'.html', function(data) {
		var container = $('<div />').html(data);
		
		if(verzeichnis.length ==1) container.wrap('<div/>').attr('waybig', verzeichnis+'.');
		else container.wrap('<div/>').attr('way', verzeichnis);;
		
		$('#container').append(container).append(trenner);
		
		verzeichnisLoaded.push(verzeichnis);
		console.log(verzeichnis)
	});
}

// Checkt ob alle Dateien vollständig geladen sind
function setIntervalForVerzeichnisse(){
	interval = setInterval(addAttributesToElements, 10);
}

// Fügt Klassen und attribute für die Animationen hinzu
function addAttributesToElements(){
	if(verzeichnisLoaded.length == spansize){
		clearInterval(interval);
		$('p,blockquote,figure,h1,.trenner,iframe').each(function(index, el) {
			$(this).addClass('animated').attr({
				"data-animation-delay" : 150,
				"data-animation" : 'fadeIn'
			});
		}).promise().done(initAnimations());
	}
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