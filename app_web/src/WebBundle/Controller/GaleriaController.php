<?php

namespace WebBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class GaleriaController extends Controller
{
    public function galeriaAction(Request $request)
    {
        $session = $request->getSession();
        $admin   = ($session->get('admin'))? true: false;

    	$em      = $this->getDoctrine()->getManager();

        return $this->render('WebBundle::galeria.html.twig', array(
        	'session'   => $admin,
            'activo'    => 'galeria'
        	));
    }
}