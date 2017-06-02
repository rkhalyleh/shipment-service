$(function() {
	$.widget( "ui.showhealthstatus", {
		options: {
			value: 0
		},
		_create: function() {
			// Create the structure
			this.element.addClass("view-healthstatus-ref");
			var mainTable = $('<table cellspacing="15" width="600px"></table>').addClass('main-table');
			var row0 = getEmptyRow();
			row0.append(getTitleColumn("Get health status"));
			mainTable.append(row0);
			
			this.userId = getTextbox(null, null, "userIdInput");
			
			mainTable.append(getRowWithWidget("UserId", this.userId, true, "_userIdMsg"));
			
			mainTable.append($('<tr><td colspan="2"><hr class="bdr-light"></td></tr>'));
			
			$(this.element).append(mainTable);
	    },
	    getData: function() {
	    	if (!this.isValid()) {
	    		return null;
	    	}
	    	// Collecting Date
	    	var data = {};
			if (this.userId.val()) {
				data.userId = this.userId.val();
			}
			return data;
	    },
	    isValid: function(){
	    	var valid = true;
	    	$("._userIdMsg").text("");

	    	if (!this.userId.val()) {
				$("._userIdMsg").text("UserId is required!");
				valid = false;
			}
			return valid;
	    },
	    _setOption: function( key, value ) {
	    },
	    _setOptions: function( options ) {
	    },
	    refresh: function() {
	    },
	    _constrain: function( value ) {
	    },
	    _destroy: function() {
	    	this.element.removeClass("view-healthstatus-ref").text("");
	    }
	});
});
