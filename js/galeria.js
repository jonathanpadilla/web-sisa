$(function(){
	$('#galeria').lightGallery({
		selector: '.item',
	});

	$("#input_imagen_galeria").change(function(){

		var datos = new FormData( $("#form_subir_imagen")[0] );

			$.ajax({
				url: Routing.generate('ajax_subir_imagen_galeria'),
				data: datos,
				dataType: 'json',
				method: 'post',
				contentType:false,
				processData:false,
				cache:false
			}).done(function(json){
				if(json.result)
				{
					location.reload(true);
				}
			});
	});
});