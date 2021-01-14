<?php
session_start();
        

      try{

        $conn = new PDO('mysql:host=localhost;dbname=tutori12_Tutorias', "tutori12_Danilo", "tutorias");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
        if(isset($_POST["tipo"])){
          if($_POST["tipo"]=="reservarTutoria"){
            $sql= $conn->prepare("SELECT  COUNT(*) FROM tutorias");
            $sql->execute();
            $resultado= $sql->fetchAll(PDO::FETCH_ASSOC);
            $antes=$resultado[0];
            
            foreach ($resultado as $row) {
            $idT =$row['COUNT(*)']+1;
            }
            $sql= $conn->prepare("SELECT enlace FROM enlaces WHERE idEnlace=$idT");
            $sql->execute();
            $resultado= $sql->fetchAll(PDO::FETCH_ASSOC);
            foreach ($resultado as $row) {
              $enlace =$row['enlace'];
            }

            $cedulaP=$_POST["cedulaP"];
            $cedula=$_SESSION['cedula'];
            $fecha=$_POST['fecha'];
            $fecha2=$_POST['fecha2'];

            

            $sql = $conn->prepare("INSERT INTO tutorias(activo,idTutoria,idTutor,idEstudiante,title,descripcion,color,textColor,star,link) VALUES ( 1,$idT,$cedulaP,$cedula,'TUTORIA','NOMBRE DEL TUTOR....' ,'#1FE9E9','#FFFFFF', '$fecha','$enlace')");
            $sql->execute();

            $sql = $conn->prepare("UPDATE fecha SET color='red' WHERE idTutor= $cedulaP && start='$fecha' && end='$fecha2'");
            $sql->execute();
    
            $sql= $conn->prepare("SELECT  COUNT(*) FROM tutorias");
            $sql->execute();
            $resultado= $sql->fetchAll(PDO::FETCH_ASSOC);
            $despues=$resultado[0];
            if($antes!=$despues){
                //enviar correo empieza aqui
                $sql= $conn->prepare("SELECT nombre,apellido,correo FROM estudiantes WHERE cedula=$cedula");
                $sql->execute();
                $resultado= $sql->fetchAll(PDO::FETCH_ASSOC);
                foreach ($resultado as $row) {
                  $correo1 =$row['correo'];
                  $nombreE=$row['nombre']." ".$row['apellido'];
                }
                $sql= $conn->prepare("SELECT nombre,apellido,correo FROM profesores WHERE cedula=$cedulaP");
                $sql->execute();
                $resultado= $sql->fetchAll(PDO::FETCH_ASSOC);
                foreach ($resultado as $row) {
                  $correo2 =$row['correo'];
                  $nombreP=$row['nombre']." ".$row['apellido'];
                }

                $to = $correo1.",".$correo2;
                $subject = "TUTORIA RESERVADA";
                $headers = 'From:soporte@tutorias-academicas.com'."\r\n" ;
                $headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
                
                
                
                $message = ' 
                    
                    <HTML>
                    
                       <BODY style="text-align: center; background-color: rgb(224,237,243); width: 80%; height:100%; margin-left:10%; border-radius: 10px;font-size: 15px;">
                    
                    <p style="margin-top: 5%;margin-left: 5%;margin-right: 5%;">El Estudiante <span style="font-weight: bold;">'.$nombreE.'</span> reservo una tutoria para la fecha <span style="font-weight: bold;">'.$fecha.'</span> con el tutor <span style="font-weight: bold;">'.$nombreP.'</span>.</p>
                    
                    <p style="margin-left: 5%;margin-right: 5%;">La reunion se realizara via Zoom y el enlace de la reunion es:</p>
                
                    <a href="'.$enlace.'" style="text-align: center;margin-left: 5%;margin-right: 5%; display:block;">'.$enlace.'</a>
                    
                    
                    
                    <p style="margin-left: 5%;margin-right: 5%;">!Gracias!</p>
                    -------------------------
                
                    
                
                        </BODY>
                        </HTML>
                
                            ';
                
                    
                    mail($to, $subject, $message, $headers);
                //enviar correo finaliza aqui
                echo json_encode("RESERVADA");
            } 
            else {
                echo json_encode("NO RESERVADA");
            }
          }
          
        }
        else{
          
          $nombreM=$_POST['nombreM'];
          $sql= $conn->prepare("SELECT * FROM profesores WHERE materia='$nombreM' && activo='1'");
          $sql->execute();
          $resultado= $sql->fetchAll(PDO::FETCH_ASSOC);
          $cont=0;
          foreach($resultado as $row){
            $res["foto"]="".base64_encode($row["foto"]);
            $res["nombre"]=$row["nombre"];
            $res["apellido"]=$row["apellido"];
            $res["cedula"]=$row['cedula'];
            $res["especialidad"]=$row['especialidad'];
            $respuesta[$cont]=$res;
            $cont++;
          }
          echo json_encode($respuesta);
        }
        

      }catch(Exception $e){

        echo json_encode(null);


      }    

?> 