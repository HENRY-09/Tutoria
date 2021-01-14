<?php


$pdo = new PDO('mysql:host=localhost;dbname=tutori12_Tutorias', "tutori12_Danilo", "tutorias");
	$cedula=$_GET["cedula"];
	$sentenciaSQL = $pdo->prepare("SELECT start,end,color FROM fecha WHERE idTutor=$cedula");

	$sentenciaSQL->execute();

	$resultado = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);


	
	echo json_encode($resultado);

	

	





?>