<?php

namespace WebBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class InicioController extends Controller
{
    public function inicioAction(Request $request)
    {
        $session = $request->getSession();
        $admin   = ($session->get('admin'))? true: false;

    	$em      = $this->getDoctrine()->getManager();

        $lista_servicio = $em->getRepository('WebBundle:Servicio')->findBy(array('activo' => 1 ));

        return $this->render('WebBundle::inicio.html.twig', array(
        	'session'   => $admin,
            'lista_servicio'    => $lista_servicio,
            'activo'    => 'inicio'
        	));
    }
}