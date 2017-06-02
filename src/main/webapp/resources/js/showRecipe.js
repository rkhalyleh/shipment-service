$(function() {
	$.widget( "ui.showrecipe", {
		options: {
			value: 0
		},
		_create: function() {
			// Create the structure
			this.element.addClass("view-recipe-ref");
			$(this.element).append($('<h3>Free Personal Recipes:</h3>'));
			var mainDiv = $('<div class="viewrecipesDiv"></div>');
			$(this.element).append(mainDiv);
			$(".viewrecipesDiv").jsGrid({
		        inserting: false,
		        editing: true,
		        sorting: false,
		        paging: false,

		        height: "auto",
		        width: "100%",
		 
		        autoload: true,
		        
		        deleteItem: function(item){ 
		        	$.ajax({
		        	    url: 'recipe',
		        	    type: 'DELETE',
					    dataType: 'json',
					    headers: { 
					        'Accept': 'application/json', 
					        'Content-Type': 'application/json' 
					    },
					    data: JSON.stringify({"id": item.id}),
		        	    success: function(result) {
		        	    	$(".viewrecipesDiv").jsGrid("loadData");
		        	    	
		        	    	$('.post-result').html('Delete successfully!');
					    	$('.post-result').removeClass('wrong-entry');
					    	$('.post-result').addClass('right-entry');
							$('.post-result').fadeIn(500);
							setTimeout( "$('.post-result').fadeOut(1500);", 15000);

		        	    }
		        	});
		        },
		        editItem: function(id){ 
		            console.log(id); 
		        },
		        controller: {
		            loadData: function() {
		                var d = $.Deferred();
		 
		                $.ajax({
		                    url: "healthInfo/recipe",
		                    dataType: "json"
		                }).done(function(response) {
		                    d.resolve(response);
		                });
		 
		                return d.promise();
		            }
		        },

		        fields: [
		        	{ name: "id", type: "text", width: 50, validate: "required", title: "Id"},
		        	{ name: "name", type: "text", width: 100, validate: "required", title: "Name"},
		            { name: "description", type: "text", title: "Description", width: 150 },
		            { name: "cuisine", type: "text", width: 50, title: "Cuisine"},
		            { name: "imageUrl", type: "text", width: 200, title: "Image",
		            	itemTemplate: function(value, item) {
		                    var $result = jsGrid.fields.control.prototype.itemTemplate.apply(this, arguments);
		                    
		                    var $img = $('<a href="'+item.recipeurl+'" target="_blank"><img src="' + item.imageUrl + '" alt="Smiley face" height="180" width="200" border="0"></a>');
		                    	
		                    return $result.add($img);
		                }
	
		            },
		            { name: "calories", type: "text", title: "Calories"}
//		            { name: "id", type: "control", editButton: false, width: 150,
//		            	itemTemplate: function(value, item) {
//		                    var $result = jsGrid.fields.control.prototype.itemTemplate.apply(this, arguments);
//		                    
//	                    	var linkId = "viewItemLink_"+ getRandomNumber();
//			                    
//		                    var shipmentServiceContent = $("<div>");
//		                    shipmentServiceContent.dialog({
//		                        autoOpen: false, 
//		                        title: "View shipmentService ("+item.shipmentService.length+")",
//		                        width: "500px",
//		                        position: { my: "center", at: "top" }
//		                    });
//		                    var shipmentServiceTable = $("<table brecipe='1' width='100%'>");
//		                    shipmentServiceTable.append($("<tr><th>Index</th><th>Name</th><th>Quantity</th><th>Rate</th><th>Selling Price</th></tr>'"))
//		                    var i = 0;
//		                    $.each(item.shipmentService, function (i, itm) {
//		                    	i++;
//		                    	var nameLbl = "<label id=\"itemDetName_" + getRandomNumber() + "\">" + itm.name + "</label>"
//		                    	
//		                    	shipmentServiceTable.append('<tr><td>'+i+'</td><td>' + nameLbl + '</td><td>' + itm.quantity + 
//		                    			'</td><td>' + itm.rate + '</td><td>' + itm.sellingPrice + '</td></tr>');
//		                    });
//		                    var title = $("<span>shipmentService details for the sales recipe (" + item.salesrecipe + "):</span>");
//		                    shipmentServiceContent.append(title);
//		                    shipmentServiceContent.append(shipmentServiceTable);
//
//		                    var total = $("<span>Total number of shipmentService (<span class=\"dialogDetailsTotalshipmentService_" + getRandomNumber() + "\">" + item.shipmentService.length + "</span>):</span>");
//		                    shipmentServiceContent.append(total);
//		                    
//		                    var $customButton = $("<a>")
//		                    	.html("<span style='padding-left: 5px;' id='" +linkId + "'>View shipmentService (<span class=\"recipeTotalshipmentService_" + getRandomNumber() + "\">" + item.shipmentService.length + "</span>)</span>")
//		                    	.click(function(e) {
//		                    		shipmentServiceContent.dialog( "open" );
//		                            e.stopPropagation();
//		                        });
//		                    return $result.add($customButton);
//		                }
//		            }
		        ]
		    });
	    },
	    _destroy: function() {
	    	this.element.removeClass("view-recipe-ref").text("");
	    }
	});
});
