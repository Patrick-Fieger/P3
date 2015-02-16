var szenarien = function(){

$("#nextszenario").click(function(){
	var currentreport = $(".active-szenario");
	var nextreport = currentreport.next();

	var currentdot = $(".active-szenariodot");
	var nextdot = currentdot.next();

if(nextreport.length === 0){
	nextreport = $('.szenario').first();
	nextdot = $('.szenariodot').first();
}

	currentreport.removeClass('active-szenario');
	nextreport.addClass('active-szenario');

	currentdot.removeClass('active-szenariodot');
	nextdot.addClass('active-szenariodot');
});

$("#previousszenario").click(function(){
	var currentreport = $(".active-szenario");
	var prevreport = currentreport.prev();

	var currentdot = $(".active-szenariodot");
	var nextdot = currentdot.prev();

if(prevreport.length === 0){
	prevreport = $('.szenario').last();
	nextdot = $('.szenariodot').last();
}

	currentreport.removeClass('active-szenario');
	prevreport.addClass('active-szenario');

	currentdot.removeClass('active-szenariodot');
	nextdot.addClass('active-szenariodot');
});
};

$(document).ready(szenarien);