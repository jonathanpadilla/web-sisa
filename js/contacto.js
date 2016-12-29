$(function(){
	var map = new GMaps({
            el: "#mapa-contacto",
            lat: -37.4762325,
            lng: -72.3284743,
            zoom: 15,
            scrollwheel: false
        });
        map.addMarker({
            lat: -37.4762325,
            lng: -72.3284743,
            title: "CsCupcakes"
        });

    $(".btn-enviar").on('click', function(){

        $('#form_contacto').validate({
            rules: {

                nombre: {
                    required: true
                },
                telefono: {
                    required: true
                },
                correo: {
                    required: true,
                    email: true
                },
                mensaje: {
                    required: true
                }
            },
            messages: {

                nombre: {
                    required: 'Campo requerido',
                },
                telefono: {
                    required: 'Campo requerido',
                },
                correo: {
                    required: 'Campo requerido',
                    email: 'Correo no válido'
                },
                mensaje: {
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

        if($('#form_contacto').valid(true))
        {
            $.ajax({
                url: Routing.generate('ajax_enviar_contacto'),
                data: $('#form_contacto').serialize(),
                dataType: 'json',
                method: 'post'
            }).done(function(json){
                if(json.result)
                {
                    location.reload(true);
                }
            });

        }
        
    });
});