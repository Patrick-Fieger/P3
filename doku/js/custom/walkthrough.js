var wtfunction = function(){

	$(".btnradarmit").click(function(){
		var currentstate = $(".wt-active");
		console.log("WAAAAAAAASSSSSS");

		currentstate.removeClass('wt-active');
		$('#radarmit').addClass('wt-active');
	});

};

$(document).ready(wtfunction);