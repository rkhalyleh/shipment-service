$(function() {
	$.widget( "ui.newuser", {
		options: {
			value: 0
		},
		_create: function() {
			// Create the structure
			this.element.addClass("new-user-ref");
			var mainTable = $('<table cellspacing="15" width="600px"></table>').addClass('main-table');
			var row0 = getEmptyRow();
			row0.append(getTitleColumn("New User"));
			mainTable.append(row0);
			
			this.name = getTextbox(null, null, "nameInput");
			this.username = getTextbox(null, null, "userNameInput");
			this.activityStyle = getTextbox(null, null, "activityStyleInput");
			this.birthDate = getDateWidget("birthDateDateInputCSS");
			this.email = getTextbox(null, null, "emailInput");
			this.gender = getTextbox(null, null, "genderInput");
			this.height = getTextbox(null, null, "heightInput");
			this.weight = getTextbox(null, null, "weightInput");
			
			mainTable.append(getRowWithWidget("Name", this.name, true, "_nameMsg"));
			mainTable.append(getRowWithWidget("Username", this.username, true, "_usernameMsg"));
			mainTable.append(getRowWithWidget("Activity Style", this.activityStyle, true, "_activityStyleMsg"));
			mainTable.append(getRowWithWidget("BirthDate", this.birthDate, true, "_birthDateMsg"));
			mainTable.append(getRowWithWidget("Email", this.email, true, "_emailMsg"));
			mainTable.append(getRowWithWidget("Gender", this.gender, true, "_genderMsg"));
			mainTable.append(getRowWithWidget("Height", this.height, true, "_heightMsg"));
			mainTable.append(getRowWithWidget("Weight", this.weight, true, "_weightMsg"));
			
			mainTable.append($('<tr><td colspan="2"><hr class="bdr-light"></td></tr>'));
			
			$(this.element).append(mainTable);
	    },
	    getData: function() {
	    	if (!this.isValid()) {
	    		return null;
	    	}
	    	// Collecting Date
	    	var data = {};
			if (this.name.val()) {
				data.name = this.name.val();
			}
			if (this.username.val()) {
				data.userName = this.username.val();
			}
			if (this.activityStyle.val()) {
				data.activityStyle = this.activityStyle.val();
			}
			if (this.birthDate.val()) {
				data.birthDate = this.birthDate.val();
			}
			if (this.email.val()) {
				data.email = this.email.val();
			}
			if (this.gender.val()) {
				data.gender = this.gender.val();
			}
			if (this.height.val()) {
				data.height = parseInt(this.height.val());
			}
			if (this.weight.val()) {
				data.weight = parseInt(this.weight.val());
			}
			console.log(this.weight.val());
			console.log(data);
			return data;
	    },
	    isValid: function(){
	    	var valid = true;
	    	$("._nameMsg").text("");
	    	$("._usernameMsg").text("");
	    	$("._activityStyleMsg").text("");
	    	$("._birthDateMsg").text("");
	    	$("._emailMsg").text("");
	    	$("._genderMsg").text("");
	    	$("._heightMsg").text("");
	    	$("._weightMsg").text("");


	    	if (!this.name.val()) {
				$("._nameMsg").text("Name is required!");
				valid = false;
			}
			if (!this.username.val()) {
				$("._usernameMsg").text("Username is required!");
				valid = false;
			}
			if (!this.activityStyle.val()) {
				$("._activityStyleMsg").text("Activity Style is required!");
				valid = false;
			}
			if (!this.birthDate.val()) {
				$("._birthDateMsg").text("BirthDate is required!");
				valid = false;
			}
			if (!this.email.val()) {
				$("._emailMsg").text("Email is required!");
				valid = false;
			}
			if (!this.gender.val()) {
				$("._genderMsg").text("Gender is required!");
				valid = false;
			}
			if (!this.height.val()) {
				$("._heightMsg").text("Height is required!");
				valid = false;
			}
			if (!this.weight.val()) {
				$("._weightMsg").text("Weight is required!");
				valid = false;
			}
			return valid;
	    },
	    _setOption: function( key, value ) {
//	        if ( key === "value" ) {
//	            value = this._constrain( value );
//	        }
//	        this._super( key, value );
	    },
	    _setOptions: function( options ) {
//	        this._super( options );
//	        this.refresh();
	    },
	    refresh: function() {
//	        var progress = this.options.value + "%";
//	        this.element.text( progress );
//	        if ( this.options.value == 100 ) {
//	            this._trigger( "complete", null, { value: 100 } );
//	        }
	    },
	    _constrain: function( value ) {
//	        if ( value > 100 ) {
//	            value = 100;
//	        }
//	        if ( value < 0 ) {
//	            value = 0;
//	        }
//	        return value;
	    },
	    _destroy: function() {
	    	this.element.removeClass("new-user-ref").text("");
	    }
	});
});
