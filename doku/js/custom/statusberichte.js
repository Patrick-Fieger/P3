var main = function(){
$( ".testklick" ).click(function() {
  $("#genauhier").slideToggle();
});
};

$("#nextreport").click(function(){
	var currentreport = $(".active-report");
	var nextreport = currentreport.next();

	var currentdot = $(".active-reportdot");
	var nextdot = currentdot.next();

if(nextreport.length === 0){
	nextreport = $('.report').first();
	nextdot = $('.reportdot').first();
}

	currentreport.removeClass('active-report');
	nextreport.addClass('active-report');

	currentdot.removeClass('active-reportdot');
	nextdot.addClass('active-reportdot');
});

$("#previousreport").click(function(){
	var currentreport = $(".active-report");
	var prevreport = currentreport.prev();

	var currentdot = $(".active-reportdot");
	var nextdot = currentdot.prev();

if(prevreport.length === 0){
	prevreport = $('.report').last();
	nextdot = $('.reportdot').last();
}

	currentreport.removeClass('active-report');
	prevreport.addClass('active-report');

	currentdot.removeClass('active-reportdot');
	nextdot.addClass('active-reportdot');
});

$(document).ready(main);