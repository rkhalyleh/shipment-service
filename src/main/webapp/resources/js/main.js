function getParam(name) {
    return (location.search.split(name + '=')[1] || '').split('&')[0];
}

//Get username
var username = getParam("user");
if (username) {
	$.ajax({
		url: "login/authenticateUser/"+ username,
	    dataType: 'json',
	    headers: { 
	        'Accept': 'application/json', 
	        'Content-Type': 'application/json' 
	    },
		success: function(data) {
			if( !data || data.username != username){
				location.href = "login.html";
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			location.href = "login.html";
		},
		async:false
	});
} else {
	location.href = "login.html";
}

$(document).ready(function(){
	
	var doSave = function(url, data) {
		if (!jQuery.isEmptyObject(data)) {
			$.ajax({
			    cache: false,
			    type: 'post',
			    dataType: 'json',
			    headers: { 
			        'Accept': 'application/json', 
			        'Content-Type': 'application/json' 
			    },
			    data: JSON.stringify(data),
			    url: url,
			    success: function (data) {
			    	$('.post-result').html('Save successfully!');
			    	$('.post-result').removeClass('wrong-entry');
			    	$('.post-result').addClass('right-entry');
					$('.post-result').fadeIn(500);
					setTimeout( "$('.post-result').fadeOut(1500);", 15000);

			    },
			    error: function (XMLHttpRequest, textStatus, errorThrown) {
			    	if (XMLHttpRequest.status == 409) {
			    		$('.post-result').html('The record already exists!');
			    	} else {
			    		$('.post-result').html('Save failed!');
			    	}
			    	
			    	$('.post-result').removeClass('right-entry');
			    	$('.post-result').addClass('wrong-entry');
					$('.post-result').fadeIn(500);
					setTimeout( "$('.post-result').fadeOut(1500);", 15000);
			    }
			});
		}
	};
	
	var hideActionsButtons = function() {
		$(".save-button").hide();
		$(".cancel-button").hide();
	};
	
	var addActionButtons = function(caption) {
		if (!caption) {
			caption = "Run";
		}
		$(".save-button").show();
		$(".cancel-button").show();
		if ($(".save-button-ref").length == 0){
			var saveBtn = $("<input type='button' class='btn-primary save-button-ref' value='" + caption + "'/>");
			var cancelBtn = $("<input type='button' class='btn-primary cancel-button-ref' value='Cancel'/>");
			
			saveBtn.click(function(){
				if ($(".view-userhealthinfo-ref").length > 0){
					var data = $(".main-content").userhealthinfo("getData");
					$.ajax({
						url: "healthInfo/userHealthInfo/"+data.userId,
					    dataType: 'json',
					    headers: { 
					        'Accept': 'application/json', 
					        'Content-Type': 'application/json' 
					    },
						success: function(data) {
					    	$('.post-result').html("User Health Info: "+ data.bmi);
					    	$('.post-result').removeClass('wrong-entry');
					    	$('.post-result').addClass('right-entry');
							$('.post-result').fadeIn(500);
							setTimeout( "$('.post-result').fadeOut(1500);", 30000);

						},
						error: function (XMLHttpRequest, textStatus, errorThrown) {
					    	$('.post-result').html('Error in getting bmi!');
					    	$('.post-result').removeClass('right-entry');
					    	$('.post-result').addClass('wrong-entry');
							$('.post-result').fadeIn(500);
							setTimeout( "$('.post-result').fadeOut(1500);", 15000);
						},
						async:false
					});

				}
				if ($(".new-bmi-ref").length > 0){
					var data = $(".main-content").showbmi("getData");
					$.ajax({
						url: "healthInfo/bmi/"+data.weight+"/"+data.length,
					    dataType: 'json',
					    headers: { 
					        'Accept': 'application/json', 
					        'Content-Type': 'application/json' 
					    },
						success: function(data) {
					    	$('.post-result').html("BMI = "+ data.bmi);
					    	$('.post-result').removeClass('wrong-entry');
					    	$('.post-result').addClass('right-entry');
							$('.post-result').fadeIn(500);
							setTimeout( "$('.post-result').fadeOut(1500);", 30000);

						},
						error: function (XMLHttpRequest, textStatus, errorThrown) {
					    	$('.post-result').html('Error in getting bmi!');
					    	$('.post-result').removeClass('right-entry');
					    	$('.post-result').addClass('wrong-entry');
							$('.post-result').fadeIn(500);
							setTimeout( "$('.post-result').fadeOut(1500);", 15000);
						},
						async:false
					});

				}
				if ($(".view-healthstatus-ref").length > 0){
					var data = $(".main-content").showhealthstatus("getData");
					$.ajax({
						url: "healthInfo/healthStatus/"+data.userId,
					    dataType: 'json',
					    headers: { 
					        'Accept': 'application/json', 
					        'Content-Type': 'application/json' 
					    },
						success: function(data) {
					    	$('.post-result').html("BMI: "+ data.bmi + "<br>Health Status: " + data.healthStatus);
					    	$('.post-result').removeClass('wrong-entry');
					    	$('.post-result').addClass('right-entry');
							$('.post-result').fadeIn(500);
							setTimeout( "$('.post-result').fadeOut(1500);", 30000);

						},
						error: function (XMLHttpRequest, textStatus, errorThrown) {
					    	$('.post-result').html('Error in getting the Health status!');
					    	$('.post-result').removeClass('right-entry');
					    	$('.post-result').addClass('wrong-entry');
							$('.post-result').fadeIn(500);
							setTimeout( "$('.post-result').fadeOut(1500);", 15000);
						},
						async:false
					});

				}
				if ($(".new-recipe-ref").length > 0){
					var data = $(".main-content").showrecipe("getData");
					doSave('shipmentService/create', data);
				}
				if ($(".new-user-ref").length > 0){
					var data = $(".main-content").newuser("getData");
					if (data){
						doSave('user', data);
					}
				}
				
			});
			$(".save-button").append(saveBtn);
			$(".cancel-button").append(cancelBtn);
		} else {
			$(".save-button-ref").attr("value", caption);
		}
	};
	
	var clearContainer = function(){
		$('.post-result').html("");
		if ($(".new-bmi-ref").length > 0){
			$(".main-content").showbmi("destroy");
		}
		if ($(".view-recipe-ref").length > 0){
			$(".main-content").showrecipe("destroy");
		}
		if ($(".new-user-ref").length > 0){
			$(".main-content").newuser("destroy");
		}
		if ($(".view-user-ref").length > 0){
			$(".main-content").viewusers("destroy");
		}
		if ($(".view-healthstatus-ref").length > 0){
			$(".main-content").showhealthstatus("destroy");
		}
		if ($(".view-gym-ref").length > 0){
			$(".main-content").showallgyms("destroy");
		}
		if ($(".view-userhealthinfo-ref").length > 0){
			$(".main-content").userhealthinfo("destroy");
		}

	};
	$(".create-new-user").click(function() {
		clearContainer();
		$(".main-content").newuser();
		addActionButtons("Save");
	});
	
	$(".view-bmi").click(function() {
		clearContainer();
		$(".main-content").showbmi();
		addActionButtons("Show");
	});
	$(".view-all-Recipe").click(function() {
		clearContainer();
		$(".main-content").showrecipe();
		hideActionsButtons();
	});

	$(".view-all-healthStatus").click(function() {
		clearContainer();
		$(".main-content").showhealthstatus();
		addActionButtons("Show");
	});
	$(".view-all-users").click(function() {
		clearContainer();
		$(".main-content").viewusers();
		hideActionsButtons();
	});
	$(".view-all-gyms").click(function() {
		clearContainer();
		$(".main-content").showallgyms();
		hideActionsButtons();
	});
	$(".view-user-healthinfo").click(function() {
		clearContainer();
		$(".main-content").userhealthinfo();
		addActionButtons("Show");
	});

});
