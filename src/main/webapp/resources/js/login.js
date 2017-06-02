$(document).ready(function(){
	$('.username').keypress(function(e) {
		if (e.which == '13') {
			e.preventDefault();
			doLogin();
			
		}
	});
	$('.password').keypress(function(e) {
		  if (e.which == '13') {
			     e.preventDefault();
			     doLogin();
			   }
			});
	
	$('.log-btn').click(function(){
		doLogin();
	});

	var doLogin = function(){
		var username = $('.username').val();
		var password = $('.password').val();

		if (!username || !password) {
			$('.log-status').addClass('wrong-entry');
			$('.alert').fadeIn(500);
			setTimeout( "$('.alert').fadeOut(1500);", 3000);
		} else {
			$('.log-status').removeClass('wrong-entry');
			
			var userData = JSON.stringify({
		        'username': username,
		        'password': password
		    });
			// Verify login
			$.ajax({
			    cache: false,
			    type: 'POST',
			    dataType: 'json',
			    headers: {
			        'Accept': 'application/json',
			        'Content-Type': 'application/json'
			    },
			    data: userData,
			    url: 'login/auth',
			    success: function (data) {
			    	window.location.href = "main.html?user=" + username;
			    },
			    error: function (XMLHttpRequest, textStatus, errorThrown) {
			    	$('.log-status').addClass('wrong-entry');
					$('.alert').fadeIn(500);
					setTimeout( "$('.alert').fadeOut(1500);", 3000);
			    }
			});
		}
	};

});
