var getTextColumn = function(text, isReq){
	if (isReq) {
		return getEmptyColumn().html(text + "<span class='star-style'>&nbsp;*</span>");
	}
	return getEmptyColumn().text(text);
}
var getTitleColumn = function(text){
	return getEmptyColumn(200).html("<h3>"+ text + "</h3>");
}
var getEmptyColumn = function(w){
	if (w){
		return $('<td width="'+w+'px"></td>');
	}
	return $('<td></td>');
}
var getHeaderColumn = function(h){
	return $('<th>' + h + '</th>');
}
var getEmptyRow = function(){
	return $('<tr class="ordershipmentService-row-feilds"></tr>');
};
var getColumn = function(w){
	var col = getEmptyColumn();
	col.append(w);
	return col;
};
var getshipmentServiceCombobox = function(name, w, cls) {
	var shipmentServiceCombo = getCombo(name, w, cls);
	
	$.getJSON("shipmentService", function(result) {
        $.each(result, function(index, item) {
            shipmentServiceCombo.append('<option value="' + item.id + '">' + item.name + '</option>');
        });
    });
	
	var cont = $("<div style='width: 88%'></div>")
	cont.append(shipmentServiceCombo);
	
	shipmentServiceCombo.combobox();
	
	return cont;
};
var getCustomersCombo = function(){
	var customersCombo = getCombo(null, null, "orderCustomerName");
	
	$.getJSON("api/customers", function(result) {
        $.each(result, function(index, item) {
            customersCombo.append('<option value="' + item.id + '">' + item.name + '</option>');
        });
    });
	
	var cont = $("<div style='width: 100%' class='customerComboBoxCont'></div>")
	cont.append(customersCombo);
	
	customersCombo.combobox();
	var getValue = function() {
		return customersCombo.val();
	}
	return cont;
};

var getCombo = function(name, w, cls){
	if (name) {
		if (w){
			return $("<select class='form-control "+cls+"' name='"+name+"' style='width:"+w+"px'></select>");
		}
		return $("<select class='form-control "+cls+"' name='"+name+"'></select>");
	}
	return $("<select class='form-control "+cls+"'></select>");
};

var getTextbox = function(name, w, cls){
	if (name) {
		if (w){
			return $("<input class='form-control "+cls+"' name='"+name+"' style='width:"+w+"px'/>");
		}
		return $("<input class='form-control "+cls+"' name='"+name+"'/>");
	}
	return $("<input class='form-control "+cls+"'/>");
};
var getDateWidget = function(cls) {
	var cont = $("<input type='text' class='form-control " + cls + "' >");
	cont.datepicker();
	cont.datepicker( "option", "dateFormat", 'yy-mm-dd' );
	return cont;
};

var getRowWithWidget = function(caption, w, isReq, errorCls){
	var row1 = getEmptyRow();
	row1.append(getTextColumn(caption, isReq));
	row1.append(getColumn(w));
	row1.append(getErrorMessageColumn(errorCls));
	return row1;
};

var getErrorMessageColumn = function(errorCls) {
	return getEmptyColumn().html("<span class='error-style " + errorCls + "'></span>");
};

var addHeaders = function(headers) {
	var head = $('<thead class="line-item-header"></thead>');
	var row = $('<tr></tr>');
	head.append(row);
	for (var i = 0 ; i < headers.length ;i++) {
		row.append(getHeaderColumn(headers[i]));
	}
	return head;
};
var addWidgetsToRow = function(widgets) {
	var row = $('<tr class="ordershipmentService-row-feilds"></tr>');
	for (var i = 0 ; i < widgets.length ;i++) {
		row.append(getColumn(widgets[i]));
	}
	return row;
};

var  getDeliveryMethodsCombo = function () {
	var delMthds = getCombo(null, null, "deliveryMethodsComboCSS");
	delMthds.attr("placeholder", "Select the delivery method");
	var option0 = $("<option value='-1'></option>");
	var option1 = $("<option value='1'>Transportation</option>");
	
	delMthds.append(option0);
	delMthds.append(option1);

	return delMthds;
}

var getRandomNumber = function() {
	return Math.floor(Math.random() * 10000000);
}
