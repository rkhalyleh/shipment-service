$(function() {
	$.widget( "ui.repeater", {
		options: {
			value: 0
		},
		_create: function() {
			this.lastChar = 1;
			
			var self = this;
			// Create the structure
			this.element.addClass("new-repeater-ref");
			this.mainTable = $('<table cellspacing="15" width="100%"></table>').addClass("order_shipmentService_repeater");
			
			this.mainTable.append(addHeaders([this.getHeaderWithStart("ITEM DETAILS"), 
				this.getHeaderWithStart("QUANTITY"), 
				this.getHeaderWithStart("RATE"), 
				"AMOUNT", 
				"<div style='width:60px;'/>"]));
			
			var tbody = $("<tbody/>");
			
			// Widgets
			this.itemName = getshipmentServiceCombobox("details_01", 320, "itemName");
			this.quantity = getTextbox("quantity_01", 110, "quantity");
			this.rate = getTextbox("rate_01", 110, "rate");
			this.amount = getTextbox("amount_01", 110, "amount")
			
			tbody.append(this.getTableRow());
			
			this.mainTable.append(tbody);
			
			$(this.element).append(this.mainTable);
			
			$(this.element).append('<i class="fa fa-plus add_ExpenseRow"></i> <span class="add-link add_ExpenseRow">Add new item</span>');
			
			
			$('.add_ExpenseRow').on("click", function(){
			    if($('.order_shipmentService_repeater tr').length <= 6){
			        var newRow = self.getTableRow();
			        tbody.append(newRow);
			        
			        $(".del_ExpenseRow").click(function(){
					    $(this).closest('tr').remove();
					    self.lastChar = self.lastChar - 2;
					});
			        
			    } else {
			        alert("Reached Maximum Rows!");
			    };
			});
	    },
	    getData: function() {
	    	var data = [];
	    	$('.order_shipmentService_repeater tr').each(function(rowIndex, row) {
	    		if (rowIndex > 0){
	    			var item = {};
	    			item.name = $(this).find(".itemName").val();
	    			item.quantity = $(this).find(".quantity").val();
	    			item.rate = $(this).find(".rate").val();
//	    			item.quantity = $(this).find(".amount").val();
		    		
	    			if (!jQuery.isEmptyObject(item)) {
	    				data.push(item);
	    			}
	    		}
	    	 });
	    	
	    	return data;
	    },
	    getTableRow: function(){
	        var newRow = $("<tr class='ordershipmentService-row-feilds'></tr>");
	        var td1 = getEmptyColumn();
	        td1.append(getshipmentServiceCombobox('details_0' + this.lastChar, 320, "itemName"));
	        newRow.append(td1);
	        
	        var td2 = getEmptyColumn();
	        td2.append(getTextbox('quantity_0' + this.lastChar, 110, "quantity"));
	        newRow.append(td2);
	        
	        var td3 = getEmptyColumn();
	        td3.append(getTextbox('rate_0' + this.lastChar, 110, "rate"));
	        newRow.append(td3);
	        
	        var td4 = getEmptyColumn();
	        td4.append(getTextbox('amount_0' + this.lastChar, 110, "amount"));
	        newRow.append(td4);
	        
	        if (this.lastChar > 1) {
	        	 var td5 = getEmptyColumn();
	 	        td5.append("<i class='fa fa-minus del_ExpenseRow'></i>");
	 	        newRow.append(td5);
	        }
	        this.lastChar = this.lastChar + 1;

	        return newRow;
	    },
	    getHeaderWithStart: function(caption) {
	    	return caption + "<span class='star-style'>&nbsp;*</span>";
	    },
	    _destroy: function() {
	    	this.element.removeClass("new-repeater-ref").text("");
	    	this.mainTable.remove();
	    }
	});
});
