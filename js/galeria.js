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

	$(".btn_eliminar_imagen_galeria").on('click', function(){
		var btn = $(this);
		var id = btn.data('id');

		$.ajax({
			url: Routing.generate('ajax_eliminar_imagen_galeria'),
			data: {id:id},
			dataType: 'json',
			method: 'post'
		}).done(function(json){
			if(json.result)
			{
				location.reload(true);
			}
		});

	});


});