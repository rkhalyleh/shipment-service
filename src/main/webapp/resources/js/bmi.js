$(function() {
	$.widget( "ui.showbmi", {
		options: {
			value: 0
		},
		_create: function() {
			// Create the structure
			this.element.addClass("new-bmi-ref");
			var mainTable = $('<table cellspacing="15" width="600px"></table>').addClass('main-table');
			var row0 = getEmptyRow();
			row0.append(getTitleColumn("Get Bmi"));
			mainTable.append(row0);
			
			this.weight = getTextbox(null, null, "weightInput");
			this.length = getTextbox(null, null, "lengthInput");
			
			mainTable.append(getRowWithWidget("Weight", this.weight, true, "_weightMsg"));
			mainTable.append(getRowWithWidget("Length", this.length, true, "_lengthMsg"));
			
			mainTable.append($('<tr><td colspan="2"><hr class="bdr-light"></td></tr>'));
			
			$(this.element).append(mainTable);
	    },
	    getData: function() {
	    	if (!this.isValid()) {
	    		return null;
	    	}
	    	// Collecting Date
	    	var data = {};
			if (this.weight.val()) {
				data.weight = this.weight.val();
			}
			if (this.length.val()) {
				data.length = this.length.val();
			}
			return data;
	    },
	    isValid: function(){
	    	var valid = true;
	    	$("._weightMsg").text("");
	    	$("._lengthMsg").text("");

	    	if (!this.weight.val()) {
				$("._weightMsg").text("Weight is required!");
				valid = false;
			}
			if (!this.length.val()) {
				$("._lengthMsg").text("Length is required!");
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
	    	this.element.removeClass("new-bmi-ref").text("");
	    }
	});
});
