$(function() {
	$.widget( "ui.showallgyms", {
		options: {
			value: 0
		},
		_create: function() {
			// Create the structure
			this.element.addClass("view-gym-ref");
			$(this.element).append($('<h3>Free Personal gyms:</h3>'));
			var mainDiv = $('<div class="viewgymsDiv"></div>');
			$(this.element).append(mainDiv);
			$(".viewgymsDiv").jsGrid({
		        inserting: false,
		        editing: true,
		        sorting: false,
		        paging: false,

		        height: "auto",
		        width: "100%",
		 
		        autoload: true,
		        
		        editItem: function(id){ 
		            console.log(id); 
		        },
		        controller: {
		            loadData: function() {
		                var d = $.Deferred();
		 
		                $.ajax({
		                    url: "healthInfo/gym",
		                    dataType: "json"
		                }).done(function(response) {
		                    d.resolve(response);
		                });
		 
		                return d.promise();
		            }
		        },

		        fields: [
		        	{ name: "id", type: "text", width: 50, validate: "required", title: "Id"},
		        	{ name: "name", type: "text", width: 250, validate: "required", title: "Name"},
		            { name: "location", type: "text", title: "Location", width: 150,
		        		itemTemplate: function(value, item) {
		                    var $result = jsGrid.fields.control.prototype.itemTemplate.apply(this, arguments);
		                    
		                    var $img = $('<a href="https://maps.google.com/?q='+ item.location +'" target="_blank"><img src="resources/images/Google-Maps-icon.png" alt="'+ item.location +'" border="0"></a>');
		                    	
		                    return $result.add($img);
		                }
		        	},
		            { name: "rating", type: "text", width: 50, title: "Rating"}
		        ]
		    });
	    },
	    _destroy: function() {
	    	this.element.removeClass("view-gym-ref").text("");
	    }
	});
});
