<?php
    session_start();
    $conn = new PDO('mysql:host=localhost;dbname=tutori12_Tutorias', "tutori12_Danilo", "tutorias");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
   
    
            if($_POST["tipo1"]=="Estudiante" || $_POST["tipo1"]=="Profesor"){
                    
            $cedula=$_SESSION["cedula"];
            $foto=addslashes(file_get_contents($_FILES["foto"]["tmp_name"]));

            if($_POST["tipo"]=="Estudiante"){
                $sql= $conn->prepare("UPDATE estudiantes SET foto = '$foto' WHERE cedula=$cedula");
                $sql->execute();
                $sql= $conn->prepare("SELECT foto FROM estudiantes WHERE cedula=$cedula");
            
            }
            else if($_POST["tipo"]=="Profesor"){
                $sql= $conn->prepare("UPDATE profesores SET foto = '$foto' WHERE cedula=$cedula");
                $sql->execute();
                $sql= $conn->prepare("SELECT foto FROM profesores WHERE cedula=$cedula");
            
            }

            $sql->execute();
            $resultado= $sql->fetchAll(PDO::FETCH_ASSOC);
            foreach ($resultado as $row){
                $res['foto']= "".base64_encode($row['foto']);
                $_SESSION["foto"]=$res['foto'];
            }
            echo json_encode($res);
        }
        else if($_POST["tipo1"]=="Informacion-personal"){
            $nombre= strtoupper($_POST["nombre"]);
            $apellido= strtoupper($_POST["apellido"]);
            $cedulaV=$_SESSION["cedula"];
            $cedulaN= $_POST["cedula"];
            $celular= $_POST["celular"];
            if($_POST["tipo"]=="Estudiante"){
                $sql= $conn->prepare("UPDATE estudiantes SET nombre='$nombre',apellido='$apellido',cedula=$cedulaN,celular=$celular WHERE cedula=$cedulaV");
                $sql->execute();
                $_SESSION["cedula"]=$cedulaN;
                $_SESSION["nombre"]=$nombre;
                $_SESSION["apellido"]=$apellido;
                //ACTUALIZAR LA NUEVA CEDULA EN LA TABLA DE TUTORIAS DONDE ESTA LA CEDULA VIEJA EN ESTUDIANTE Y PROFESOR
                $sql= $conn->prepare("UPDATE tutorias SET idEstudiante=$cedulaN WHERE idEstudiante=$cedulaV");
                $sql->execute();
            }
            else if($_POST["tipo"]=="Profesor"){
                $sql= $conn->prepare("UPDATE profesores SET nombre='$nombre',apellido='$apellido',cedula=$cedulaN,celular=$celular WHERE cedula=$cedulaV");
                $sql->execute();
                $_SESSION["cedula"]=$cedulaN;
                $_SESSION["nombre"]=$nombre;
                $_SESSION["apellido"]=$apellido;
                $sql= $conn->prepare("UPDATE tutorias SET idTutor=$cedulaN WHERE idTutor=$cedulaV");
                $sql->execute();

                $sql= $conn->prepare("UPDATE fecha SET idTutor=$cedulaN WHERE idTutor=$cedulaV");
                $sql->execute();
            }
        }
        else if($_POST["tipo1"]=="Pedir-contrasena"){
            $cedula=$_SESSION["cedula"];
            $pass=$_POST["pass"];
            if($_POST["tipo"]=="Estudiante"){
                $sql= $conn->prepare("SELECT pasword FROM estudiantes WHERE cedula=$cedula");
            }
            else if($_POST["tipo"]=="Profesor"){
                $sql= $conn->prepare("SELECT pasword FROM profesores WHERE cedula=$cedula");
            }
            $sql->execute();
            $resultado= $sql->fetchAll(PDO::FETCH_ASSOC);
            foreach ($resultado as $row){
                $hash= $row['pasword'];
            }
            if(password_verify($pass,$hash)){
                $res["res"]="valida";
            }
            else{
                $res["res"]="invalida";
            }
            echo json_encode($res);
            
        }
        else if($_POST["tipo1"]=="Cambiar-contrasena"){
            $pass=$_POST["pass"];
            $pass = password_hash($pass,PASSWORD_BCRYPT);
            $cedula=$_SESSION["cedula"];
            if($_POST["tipo"]=="Estudiante"){
                $sql= $conn->prepare("UPDATE estudiantes SET pasword='$pass' WHERE cedula=$cedula");
                $sql->execute();
            }
            else if($_POST["tipo"]=="Profesor"){
                $sql= $conn->prepare("UPDATE profesores SET pasword='$pass' WHERE cedula=$cedula");
                $sql->execute();
            }
        }
        else if($_POST["tipo1"]=="Actualizar-horario"){
            $cedula=$_SESSION["cedula"];
            if(isset($_POST["inicioE"])){
                $inicio = json_decode($_POST['inicioE']);
                $fin= json_decode($_POST['finE']);
                $a=0;
                while ($a < count($inicio)) {
                    $fechaI=$inicio[$a];
                    $fechaF=$fin[$a];
                    $sql = $conn->prepare("DELETE FROM fecha WHERE idTutor=$cedula && start='$fechaI' && end='$fechaF'");
                    $sql->execute();
                    $a++;
                    //eliminar de tutorias donde idTutor star coincidan
                    $sql = $conn->prepare("DELETE FROM tutorias WHERE idTutor=$cedula && star='$fechaI'");
                    $sql->execute();
                }
            }
            if(isset($_POST["inicio"])){
                $inicio = json_decode($_POST['inicio']);
                $fin= json_decode($_POST['fin']);
                $a=0;
                while ($a < count($inicio)) {
                    $fechaI=$inicio[$a];
                    $fechaF=$fin[$a];
                    $sql = $conn->prepare("INSERT INTO fecha(idTutor,start,end,color) VALUE ($cedula,'$fechaI','$fechaF','#19CD0D')");
                    $sql->execute();
                    $a++;
                }
            }
            
        }
?>


