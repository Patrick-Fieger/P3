var plan = function(){

	var fadespeed = 500;
$( "#plankp" ).click(function() {
	var currentplan = $(".active-plan");
	currentplan.fadeOut(fadespeed, function(){
		$("#keypartner").fadeIn(fadespeed).addClass('active-plan');
	}).removeClass('active-plan');
});

$( "#planka" ).click(function() {
	var currentplan = $(".active-plan");
	currentplan.fadeOut(fadespeed, function(){
		$("#keyactivities").fadeIn(fadespeed).addClass('active-plan');
	}).removeClass('active-plan');
});

$( "#plankr" ).click(function() {
	var currentplan = $(".active-plan");
	currentplan.fadeOut(fadespeed, function(){
		  $("#keyresources").fadeIn(fadespeed).addClass('active-plan');
	}).removeClass('active-plan');
});

$( "#planvp" ).click(function() {
	var currentplan = $(".active-plan");
	currentplan.fadeOut(fadespeed, function(){
		  $("#valueproposition").fadeIn(fadespeed).addClass('active-plan');
	}).removeClass('active-plan');
});

$( "#plancr" ).click(function() {
	var currentplan = $(".active-plan");
	currentplan.fadeOut(fadespeed, function(){
  		$("#customerrelationship").fadeIn(fadespeed).addClass('active-plan');
	}).removeClass('active-plan');
});

$( "#plancs" ).click(function() {
	var currentplan = $(".active-plan");
	currentplan.fadeOut(fadespeed, function(){
		  $("#customersegments").fadeIn(fadespeed).addClass('active-plan');
	}).removeClass('active-plan');
});

$( "#planc" ).click(function() {
	var currentplan = $(".active-plan");
	currentplan.fadeOut(fadespeed, function(){
		  $("#channels").fadeIn(fadespeed).addClass('active-plan');
	}).removeClass('active-plan');
});

$( "#plancos" ).click(function() {
	var currentplan = $(".active-plan");
	currentplan.fadeOut(fadespeed, function(){
		  $("#coststructure").fadeIn(fadespeed).addClass('active-plan');
	}).removeClass('active-plan');
});

$( "#planrs" ).click(function() {
	var currentplan = $(".active-plan");
	currentplan.fadeOut(fadespeed, function(){
		  $("#revenuestream").fadeIn(fadespeed).addClass('active-plan');
	}).removeClass('active-plan');
});


};

$(document).ready(plan);