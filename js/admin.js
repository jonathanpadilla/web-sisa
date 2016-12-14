var btn_inicio_editar_bienvenida 	= $("#btn_inicio_editar_bienvenida");
var file_foto 						= $(".file_foto");
var txt_red_social 					= $(".txt_red_social");
var btn_inicio_editar_destacados 	= $("#btn_inicio_editar_destacados");
var btn_editar_destacado 			= $(".btn_editar_destacado");
var btn_inicio_editar_nuevos 		= $("#btn_inicio_editar_nuevos");
var btn_editar_nuevo 				= $(".btn_editar_nuevo");

var editar_texto_input 				= $(".editar_texto_input");
var editar_texto_area 				= $(".editar_texto_area");

$(function(){
	'use strict';

	// inputs
	editar_texto_input.dblclick(function(){

		// variables
		var content = $(this);
		var item 	= content.data('item');
		var texto 	= content.find(item).text();
		var id 		= content.data('id');
		var campo 	= content.data('campo');

		// crear input o textarea
		var input = focusInTexto( content, texto, 'input');
		
		// destruir textarea y enviar para guardar
		content.focusout(function(){

			var texto_final = focusOutTexto(content, input, item)
			guardarTexto(texto_final, id, campo);

		});

	});

	// textarea
	editar_texto_area.dblclick(function(){

		// variables
		var content = $(this);
		var item 	= content.data('item');
		var texto 	= content.find(item).text();
		var id 		= content.data('id');
		var campo 	= content.data('campo');

		// crear input o textarea
		var input = focusInTexto( content, texto, 'textarea');
		
		// destruir textarea y enviar para guardar
		content.focusout(function(){

			var texto_final = focusOutTexto(content, input, item)
			guardarTexto(texto_final, id, campo);

		});

	});

	// subir fotos
	file_foto.on('change', function(){
		var btn 					= $(this);
		var content_image 			= btn.data('img');
		var form 					= btn.data('form');
		var id 						= btn.data('id');

		// $("."+content_image).html('<img src="#">');
		guardarImagen( $("#"+form), 1);
	});

	// editar links redes sociales
	txt_red_social.focusout(function(){
		var btn 	= $(this);
		var id 		= btn.data('id');
		var texto 	= btn.val();

		guardarFilaSeccion(id, {'texto1':texto });
	});

	// destacados
	btn_inicio_editar_destacados.on('click', function(){
		$(".contenido_imagen_editar").addClass('contenido_imagen_vacio');

		$("#txt_id").val('');
		$("#txt_texto_1").val('');
		$("#txt_texto_2").val('');
		$("#txt_precio").val('');
		$(".contenido_imagen_editar").html('');

		$('#exampleModal1').foundation('open');
	});

	btn_editar_destacado.on('click', function(e){
		e.preventDefault();

		var btn 	= $(this);
		var img 	= btn.data('img');
		var id 		= btn.data('id');
		var txt1 	= btn.data('texto1');
		var txt2 	= btn.data('texto2');
		var precio 	= btn.data('precio');

		$("#txt_id").val(id);
		$("#txt_texto_1").val(txt1);
		$("#txt_texto_2").val(txt2);
		$("#txt_precio").val(precio);

		$(".contenido_imagen_editar").removeClass('contenido_imagen_vacio');
		$(".contenido_imagen_editar").html('<img src="'+img+'">');

		$('#exampleModal1').foundation('open');
	});

	$(".btn_eliminar_cupcake").on('click', function(e){
		var btn = $(this);

		e.preventDefault();

		if(confirm('¿Realmente desea eliminar el registro del sistema?'))
		{
			$.ajax({
				url: Routing.generate('ajax_eliminar_cupcake'),
				data: {'id':btn.data('id')},
				dataType: 'json',
				method: 'post',
			}).success(function(json){
				if(json.result)
				{
					location.reload(true);
				}
			
			});

		}

	});

	$(".btn_guardar_destacados").on('click', function(){

		var datos = new FormData($("#form_destacados")[0]);

		$.ajax({
			url: $("#form_destacados").attr('action'),
			data: datos,
			dataType: 'json',
			method: 'post',
			contentType:false,
		  	processData:false,
		  	cache:false
		}).success(function(json){
			if(json.result)
			{
				location.reload(true);
			}
		
		});
		
	});

	$(".file_foto_destacado").change(function(){
		var btn = $(this).val();

		if(btn.length != 0 )
		{
			console.log('tiene');
			$(".contenido_imagen_editar").addClass('contenido_imagen_vacio');
			$(".contenido_imagen_editar").find('img').css('display', 'none');
		}else{
			console.log('no tiene');
			$(".contenido_imagen_editar").removeClass('contenido_imagen_vacio');
			$(".contenido_imagen_editar").find('img').css('display', 'inline-block');
		}

	});

	// nuevos
	btn_inicio_editar_nuevos.on('click', function(){

		$(".contenido_imagen_editar_nuevo").addClass('contenido_imagen_vacio');

		$("#txt_id_nuevo").val('');
		$("#txt_texto_1_nuevo").val('');
		$("#txt_texto_2_nuevo").val('');
		$("#txt_precio_nuevo").val('');
		$(".contenido_imagen_editar_nuevo").html('');

		$('#exampleModal2').foundation('open');
	});

	btn_editar_nuevo.on('click', function(e){
		e.preventDefault();

		var btn 	= $(this);
		var img 	= btn.data('img');
		var id 		= btn.data('id');
		var txt1 	= btn.data('texto1');
		var txt2 	= btn.data('texto2');
		var precio 	= btn.data('precio');

		$("#txt_id_nuevo").val(id);
		$("#txt_texto_1_nuevo").val(txt1);
		$("#txt_texto_2_nuevo").val(txt2);
		$("#txt_precio_nuevo").val(precio);

		$(".contenido_imagen_editar_nuevo").removeClass('contenido_imagen_vacio');
		$(".contenido_imagen_editar_nuevo").html('<img src="'+img+'">');

		$('#exampleModal2').foundation('open');
	});

	$(".btn_guardar_nuevo").on('click', function(){

		var datos = new FormData($("#form_nuevos")[0]);

		$.ajax({
			url: $("#form_nuevos").attr('action'),
			data: datos,
			dataType: 'json',
			method: 'post',
			contentType:false,
		  	processData:false,
		  	cache:false
		}).success(function(json){
			if(json.result)
			{
				location.reload(true);
			}
		
		});
		
	});

	$("#btn_editar_banner").on('click', function(){
		$("#file_imagen_banner").trigger('click');
	});

	$("#file_imagen_banner").change(function(){

		var datos = new FormData( $("#form_imagen_banner")[0] );
		$.ajax({
			url: Routing.generate('ajax_guardar_imagen_banner'),
			data: datos,
			dataType: 'json',
			method: 'post',
			contentType:false,
		  	processData:false,
		  	cache:false
		}).success(function(json){
			if(json.result)
			{
				location.reload(true);
			}

		});

	});

	$(".btn_eliminar_banner").on('click', function(){
		var btn = $(this);
		var id 	= btn.data('id');

		if(confirm('¿Realmente desea eliminar la imagen?'))
		{
			$.ajax({
				url: Routing.generate('ajax_eliminar_imagen_banner'),
				data: {'id': id},
				dataType: 'json',
				method: 'post',
			}).success(function(json){
				if(json.result)
				{
					location.reload(true);
				}
			
			});

		}

	});

	$(".btn_agregar_cupcake").on('click', function(e){
		var btn = $(this);
		e.preventDefault();

		$("#txt_id").val('');
		$("#txt_cat").val(btn.data('categoria'));
		$("#txt_texto_2").val('');
		$("#contenido_imagen_editar").html('');

		$(".contenido_imagen_editar").addClass('contenido_imagen_vacio');
		$('#exampleModal1').foundation('open');
		// console.log(btn.data('categoria'));
	});

	$(".btn_guardar_cupcakes").on('click', function(){
		var btn = $(this);

		var datos = new FormData( $("#form_cupcakes")[0] );

		$.ajax({
			url: Routing.generate('ajax_agregar_cupcake'),
			data: datos,
			dataType: 'json',
			method: 'post',
			contentType:false,
		  	processData:false,
		  	cache:false
		}).success(function(json){
			if(json.result)
			{
				location.reload(true);
			}
		});
		
	});

});

// funciones globales
function focusInTexto(content, texto, area)
{
	// input o textarea
	var campo_texto = '';
	if(area == 'input')
		campo_texto = '<input type="text" id="texto_generico" value="'+texto+'">';
	else if(area == 'textarea')
		campo_texto = '<textarea id="texto_generico" rows="5">'+texto+'</textarea>';

	// insertar en el contenido y agregar focus
	content.html(campo_texto);
	$("#texto_generico").focus();

	return $("#texto_generico");
}

function focusOutTexto(content, texto, item)
{
	var texto_real = texto.val();
	content.html('<'+item+'>'+texto_real+'</'+item+'>');
	return texto_real;
}

function guardarTexto(texto, id, campo)
{
	var arr = {
		'texto': texto,
		'id': id,
		'campo': campo
	}

	$.ajax({
		url: Routing.generate('ajax_guardar_texto'),
		data: arr,
		dataType: 'json',
		method: 'post',
	}).success(function(json){
		if(json.result)
		{
			console.log('guardado');
		}
	
	});
	
}

function guardarImagen(form, id)
{
	var datos = new FormData(form[0]);
	datos.append('id', id);

	$.ajax({
		url: Routing.generate('ajax_guardar_imagen'),
		data: datos,
		dataType: 'json',
		method: 'post',
		contentType:false,
	  	processData:false,
	  	cache:false
	}).success(function(json){
		if(json.result)
		{
			console.log('guardado');
			location.reload(true);
		}
	
	});
	
}

function guardarFilaSeccion(id, arr)
{
	$.ajax({
		url: Routing.generate('ajax_guardar_fila_seccion'),
		data: {'id': id, 'datos': arr},
		dataType: 'json',
		method: 'post',
	}).success(function(json){
		if(json.result)
		{
			console.log(json);
	
		}
	
	});
	
}