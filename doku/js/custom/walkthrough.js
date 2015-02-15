var wtfunction = function(){

	$(".btnradarmit").click(function(){
		var currentstate = $(".wt-active");

		currentstate.removeClass('wt-active');
		$('#radarmit').addClass('wt-active');
	});

	$(".btnschreiben").click(function(){
		var currentstate = $(".wt-active");

		currentstate.removeClass('wt-active');
		$('#stateschreiben').addClass('wt-active');
	});

	$(".btnradarohne").click(function(){
		var currentstate = $(".wt-active");

		currentstate.removeClass('wt-active');
		$('#radarohne').addClass('wt-active');
	});

	$(".btnlesen").click(function(){
		var currentstate = $(".wt-active");

		currentstate.removeClass('wt-active');
		$('#statelesen').addClass('wt-active');
	});

	$(".btnzeitstrahl").click(function(){
		var currentstate = $(".wt-active");

		currentstate.removeClass('wt-active');
		$('#statezeitstrahl').addClass('wt-active');
	});

};

$(document).ready(wtfunction);