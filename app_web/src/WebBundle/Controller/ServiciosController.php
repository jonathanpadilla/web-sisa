<?php

namespace WebBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class ServiciosController extends Controller
{
    public function serviciosAction(Request $request)
    {
        $session = $request->getSession();
        $admin   = ($session->get('admin'))? true: false;

    	$em      = $this->getDoctrine()->getManager();

        return $this->render('WebBundle::servicios.html.twig', array(
        	'session'   => $admin,
            'activo'    => 'servicios'
        	));
    }
}