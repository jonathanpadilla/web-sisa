<?php

namespace WebBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class ContactoController extends Controller
{
    public function contactoAction(Request $request)
    {
        $session = $request->getSession();
        $admin   = ($session->get('admin'))? true: false;

    	$em      = $this->getDoctrine()->getManager();

        return $this->render('WebBundle::contacto.html.twig', array(
        	'session'   => $admin,
            'activo'    => 'contacto'
        	));
    }

    public function enviarContactoAction(Request $request)
    {
        $result = true;

        $datos_mail = array(
            'nombre'        => ucwords($request->get('nombre')),
            'correo'        => $request->get('correo'),
            'telefono'      => $request->get('telefono'),
            'mensaje'       => $request->get('mensaje'),
            'from'          => 'jonathanpadilla09@outlook.com',
            'to'            => 'jonathanpadilla0109@gmail.com',
        );

        $this->enviarMail($datos_mail);

        echo json_encode(array('result' => $result));
        exit;
    }

    private function enviarMail($arr = false)
    {
        // print_r($productos);
        $return = false;
        if(is_array($arr))
        {
            $headers = "From: ".$arr['from']."\r\n";
            $headers .= "Reply-To: ".$arr['to']."\r\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
            $contenido = $this->renderView('WebBundle::plantilla_contacto.html.twig', array('datos' => $arr));
            // echo $contenido; exit;
            if(mail($arr['to'], 'sisacomercial.cl - '.$arr['nombre'], $contenido, $headers))
            {
                $return = $contenido;
            }
        }
        return $return;
    }

}