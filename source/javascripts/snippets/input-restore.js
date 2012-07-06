// Saves default text input value, removes on click, and resets if the user does not enter a string
$('input[type=text]').each(function(i){
	var defaultValue = new Array();
	defaultValue[i] = $(this).val();

	$(this).click(function(){
		if($(this).val() == defaultValue[i]){
			$(this).val('');
		}
	});

	$(this).focusout(function(){
		if($(this).val() == ''){
			$(this).val(defaultValue[i]);
		}
	});

});