var guardar_form = $("#guardar_form");
var form_servicios = $("#form_servicios");
var btn_eliminar_servicio = $(".btn_eliminar_servicio");

$(function(){

	btn_eliminar_servicio.on('click', function(){
		var btn = $(this);
		var id = btn.data('id');

		$.ajax({
			url: Routing.generate('ajax_eliminar_servicio'),
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

	guardar_form.on('click', function(){

		form_servicios.validate({
            rules: {

                titulo: {
					required: true
				},
                descripcion: {
                    required: true
                },
                foto: {
                    required: true
                }
            },
            messages: {

                titulo: {
                    required: 'Campo requerido',
                },
                descripcion: {
                    required: 'Campo requerido',
                },
                foto: {
                    required: 'Campo requerido',
                }
            },
            errorPlacement: function(error, element) {
                if (element.is(":radio") || element.is(":checkbox")) {
                    element.closest('.option-group').after(error);
                }
                else {
                    error.insertAfter(element);
                }
            }
        });

        if (form_servicios.valid(true)) {

			var datos = new FormData( form_servicios[0] );

			$.ajax({
				url: Routing.generate('ajax_guardar_servicio'),
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
		}

	});

});