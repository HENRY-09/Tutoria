let pagina= location.pathname.split("/");
pagina=pagina[pagina.length-1];
if(pagina=="perfilProfesor" || pagina=="perfilEstudiante" ){
const Data= new FormData();
const foto= document.getElementById("foto");
const nombre= document.getElementById("nombre");
const foto2= document.getElementById("foto2");
const nombre2= document.getElementById("nombre2");

Data.append("tipo","pedirDatos");
fetch("iniciarSecion",{
    method: "POST",
    body: Data
})
.then(res=>res.json())
.then(res=>{
    if(res.nombre===null){
        alert("Lo sentimos Debe iniciar sesion");
        window.location="https://tutorias-academicas.com/index2";
    }
    else if(!pagina.includes(res.tipoLogin)){
        alert("Lo sentimos Debe iniciar sesion");
        window.location="https://tutorias-academicas.com/index2";
    }
    foto.setAttribute("src",`data:image/jpg;base64,${res.foto}`);
    nombre.textContent=`${res.nombre.toLowerCase()} ${res.apellido.toLowerCase()}`;

    foto2.setAttribute("src",`data:image/jpg;base64,${res.foto}`);
    nombre2.textContent=`${res.nombre.toLowerCase()}`;
    
})



const menu= document.getElementById("icon-menu");
let cont=0;
menu.addEventListener("click",()=>{
    const contenedor= document.querySelector(".contenedor-perfil");
    const baner= document.querySelector(".baner");
    const dinamico= document.getElementById("contenedor-dinamico");
    
    if(contenedor.classList.contains("menu-invisible")==true){
        contenedor.classList.remove("menu-invisible");
        contenedor.classList.add("menu-visible");
        /*dinamico.classList.remove("aumentar");
        dinamico.classList.add("disminuir");
        */
        baner.classList.add("baner-disminuir");
        if(cont==1){
            baner.classList.add("baner-disminuir2");
        }
        
        document.querySelector(".inicio").classList.add("div-disminuir");
        document.querySelector(".tutor").classList.add("div-disminuir");
        document.querySelector(".foto2").classList.add("div-disminuir");
        
        
    }
    else{
        contenedor.classList.remove("menu-visible");
        contenedor.classList.add("menu-invisible");
        /*dinamico.classList.remove("disminuir");
        dinamico.classList.add("aumentar");
        */
        baner.classList.remove("baner-disminuir");
        if(baner.classList.contains("baner-disminuir2")){
            cont=1;
            baner.classList.remove("baner-disminuir2");
        }else{
            cont=0;
        }
        
        
        document.querySelector(".inicio").classList.remove("div-disminuir");
        document.querySelector(".tutor").classList.remove("div-disminuir");
        document.querySelector(".foto2").classList.remove("div-disminuir");
    }
    
})

}
if(pagina=="perfilEstudiante"){
    const reservarTutorias=document.getElementById("ReservarTutorias");
    const misTutorias=document.getElementById("MisTutorias");
    const misTutorias2=document.getElementById("misTutorias2");
    const configuraciones=document.getElementById("Configuraciones");
    //Necesarias para eliminar contenido y volverlo a crear
    let contenido= document.getElementById("contenido");
    const contenedordinamico= document.getElementById("contenedor-dinamico");
    /*RESERVAR TUTORIA*/
    reservarTutorias.addEventListener("click",()=>{
        const activos= Array.from(document.querySelectorAll(".activo"));
        for (const elemento of activos) {
            elemento.classList.remove("activo");
            elemento.classList.add("inactivo");
        }
        reservarTutorias.classList.remove("inactivo");
        reservarTutorias.classList.add("activo");
        //Eliminar contenido y volverlo a crear.
        contenido.remove();
        contenido= document.createElement("div");
        contenido.setAttribute("id","contenido");
        contenido.setAttribute("class","contenido");
        contenedordinamico.append(contenido);
        //CREAR ELEMENTOS PARA LA RESERVA DE LA TUTORIA
        const contenedorMaterias= document.createElement("div");
        const titulo= document.createElement("h1");
        const parrafo= document.createElement("p");
        const listamaterias= document.createElement("div");

        contenedorMaterias.classList.add("contenedor-materias");
        titulo.textContent="Reservar Tutoría";
        parrafo.textContent="Recuerda ser muy puntual a la hora de la tutoria.";
        listamaterias.classList.add("lista-materias");
        /*Lista de materias*/
        fetch("materias")
        .then(res=>res.json())
        .then(res=>{
            if(res==null) alert("Error en la base de datos");
            for (const materia of res) {
                const divmateria= document.createElement("div");
                const inputmateria=document.createElement("input");
                divmateria.classList.add("materias");
                divmateria.classList.add("inactive");
                inputmateria.setAttribute("type","radio");
                inputmateria.setAttribute("value",`${materia.nombre}`);
                inputmateria.setAttribute("name","materia");
                divmateria.textContent=`${materia.nombre}`;
                divmateria.append(inputmateria);
                listamaterias.append(divmateria);
            }
            contenedorMaterias.append(titulo);
            contenedorMaterias.append(parrafo);
            contenedorMaterias.append(listamaterias);
            contenido.append(contenedorMaterias);
            
            /*Lista de tutores*/
            const listmaterias= document.getElementsByName("materia");
            
            for(let i=0;i<listmaterias.length;i++){
            listmaterias[i].addEventListener("click",()=>{
                
                if(document.querySelector(".contenedor-tutores")!=null){
                    document.querySelector(".contenedor-tutores").remove();
                }
                if(document.querySelector(".NO-TUTORIAS")!=null){
                    document.querySelector(".NO-TUTORIAS").remove();
                }
                /*MOSTRAR CUAL FUE SELECCIONADO*/
                const activos= Array.from(document.querySelectorAll(".active"));
                for (const elemento of activos) {
                    elemento.classList.remove("active");
                    elemento.classList.add("inactive");
                }
                listmaterias[i].parentElement.classList.remove("inactive");
                listmaterias[i].parentElement.classList.add("active");
                const Data = new FormData();
                Data.append("nombreM",listmaterias[i].value);
                fetch("tutor",{
                    method:"POST",
                    body: Data
                })
                .then(res=>res.json())
                .then(res=>{   
                    
                    

                    const contenedortutores= document.createElement("div");
                    contenedortutores.classList.add("contenedor-tutores");
                    contenido.append(contenedortutores);
                    for (const tutor of res) {
                        const tutores= document.createElement("div");
                        tutores.classList.add("tutores");
                        const foto= document.createElement("img");
                        const informaciontutor= document.createElement("div");
                        foto.setAttribute("src",`data:image/jpg;base64,${tutor.foto}`);
                        informaciontutor.classList.add("informacion-tutor");
                        const titulotutor= document.createElement("h2");
                        titulotutor.classList.add("titulo-tutor");
                        titulotutor.textContent="Tutor";
                        const nombretutor= document.createElement("h2");
                        nombretutor.classList.add("nombre-tutor");
                        nombretutor.textContent=`${tutor.nombre.toLowerCase()} ${tutor.apellido.toLowerCase()}`;
                        const descripcion= document.createElement("p");
                        
                        descripcion.textContent=`${tutor.especialidad}`;
                        const div= document.createElement("div");
                        div.classList.add("ver-agendar");
                        const verperfil= document.createElement("div");
                        verperfil.textContent="Ver perfil";
                        const agendartutoria= document.createElement("div");
                        agendartutoria.classList.add("agendar-tutoria");
                        agendartutoria.textContent="Agendar tutoria";
                        const cedulatutor= document.createElement("input");
                        cedulatutor.setAttribute("type","radio");
                        cedulatutor.setAttribute("name","tutor");
                        cedulatutor.setAttribute("value",`${tutor.cedula}`);
                        
                        
                        div.append(verperfil);
                        div.append(agendartutoria);
                        agendartutoria.append(cedulatutor);
                        informaciontutor.append(titulotutor);
                        informaciontutor.append(nombretutor);
                        informaciontutor.append(descripcion);
                        informaciontutor.append(div);
                        tutores.append(foto);
                        tutores.append(informaciontutor);
                        contenedortutores.append(tutores);
                    }
                    
                    /*FECHA DE LA TUTORIA*/ 
                    const listtutores= document.getElementsByName("tutor");
                    for(let i=0;i<listtutores.length;i++){
                        listtutores[i].addEventListener("click",()=>{
                            const cedulaprofesor= listtutores[i].value;
                            /*Eliminar contenido*/
                            contenido.remove();
                            contenido= document.createElement("div");
                            contenido.setAttribute("id","contenido");
                            contenido.setAttribute("class","contenido");
                            contenedordinamico.append(contenido);

                    
                            /*/*ESCOGER FECHA TUTORIA*/
                            const contenedorHorario= document.createElement("div");
                            const titulo= document.createElement("h1");
                            const parrafo= document.createElement("p");
                            const form= document.createElement("form");
                            const input= document.createElement("input");
                            const button= document.createElement("button");

                            contenedorHorario.classList.add("contenedor-materias");
                            titulo.textContent="Escoger Fecha";
                            parrafo.textContent="Recuerda que la fecha ingresada sera la fecha a la que debe de asistir a la tutoria.";
                            form.classList.add("fecha");
                            form.setAttribute("id","form");
                            form.setAttribute("method","POST");
                            
                            input.setAttribute("id","fecha");
                            input.setAttribute("type","datetime-local");
                            button.setAttribute("type","submit");
                            button.classList.add("reservar-tutoria")
                            button.textContent="Reservar Tutoria";
                            
                            form.append(input);
                            form.append(button);
                            contenedorHorario.append(titulo);
                            contenedorHorario.append(parrafo);
                            contenedorHorario.append(form);
                            contenido.append(contenedorHorario);
                            
                            const Datos= new FormData();
                            Datos.append("tipo","reservarTutoria");
                            form.addEventListener("submit",(e)=>{
                                e.preventDefault();
                                Datos.append("cedulaP",cedulaprofesor);
                                let fecha= document.getElementById("fecha").value;
                                fecha= fecha.split("T");
                                const horario=`${fecha[0]} ${fecha[1]}`;
                                Datos.append("fecha",horario);
                                
                                fetch("tutor",{
                                    method:"POST",
                                    body: Datos
                                })
                                .then(res=>res.json())
                                .then(res =>{

                                    //if(res==null) alert("Error en la base de datos");

                                    if(res=="RESERVADA"){
                                        form.setAttribute("action","perfilEstudiante"); 
                                        alert(`LA TUTORIA FUE: ${res}.`);
                                        form.submit();
                                         
                                    }
                                    else if(res=="NO RESERVADA"){
                                        alert(`LA TUTORIA FUE: ${res}.SELECCIONE OTRA FECHA.`);
                                        form.submit();
                                         
                                    }
                                })
                            })

                        })
                    }
                })
                .catch(res=>{
                    
                    if(document.querySelector(".contenedor-tutores")!=null){
                        document.querySelector(".contenedor-tutores").remove();
                    }

                    if(document.querySelector(".NO-TUTORIAS")!=null){
                        document.querySelector(".NO-TUTORIAS").remove();
                    }
                    const div= document.createElement("div");
                    div.classList.add("NO-TUTORIAS");
                    const h3= document.createElement("h3");
                    h3.textContent="NO HAY TUTORES DISPONIBLES";
                    div.append(h3);
                    contenido.append(div);
                })
            })
            }

        })        
        
    });
    

    /*MIS TUTORIAS ESTUDIANTE*/
    misTutorias.addEventListener("click",()=>{
        const activos= Array.from(document.querySelectorAll(".activo"));
        for (const elemento of activos) {
            elemento.classList.remove("activo");
            elemento.classList.add("inactivo");
        }
        misTutorias.classList.remove("inactivo");
        misTutorias.classList.add("activo");
        //Eliminar contenido y volverlo a crear.
        contenido.remove();
        contenido= document.createElement("div");
        contenido.setAttribute("id","contenido");
        contenido.setAttribute("class","contenido");
        contenedordinamico.append(contenido);
        MisTutorias("Estudiante");
        //FIN DE MIS TUTORIAS ESTUDIANTE
    });
    /*Mis tutorias2 el que esta debajo de Cerrar sesion */
    misTutorias2.addEventListener("click",()=>{
        window.location.reload();
    });
    /*MIS CONFIGURACIONES ESTUDIANTES*/
    configuraciones.addEventListener("click",()=>{
        const activos= Array.from(document.querySelectorAll(".activo"));
        for (const elemento of activos) {
            elemento.classList.remove("activo");
            elemento.classList.add("inactivo");
        }
        configuraciones.classList.remove("inactivo");
        configuraciones.classList.add("activo");
        //Eliminar contenido y volverlo a crear.
        contenido.remove();
        contenido= document.createElement("div");
        contenido.setAttribute("id","contenido");
        contenido.setAttribute("class","contenido");
        contenedordinamico.append(contenido);
        Configuraciones("Estudiante");
    });
    
}
if(pagina=="perfilProfesor"){
    const estudiantesAsignados=document.getElementById("EstudiantesAsignados");
    const misTutorias=document.getElementById("MisTutorias");
    const misTutorias2=document.getElementById("misTutorias2");
    const configuraciones=document.getElementById("Configuraciones");
    let contenido= document.getElementById("contenido");
    const contenedordinamico= document.getElementById("contenedor-dinamico");

    estudiantesAsignados.addEventListener("click",()=>{
        const activos= Array.from(document.querySelectorAll(".activo"));
        for (const elemento of activos) {
            elemento.classList.remove("activo");
            elemento.classList.add("inactivo");
        }
        estudiantesAsignados.classList.remove("inactivo");
        estudiantesAsignados.classList.add("activo");
        //Eliminar contenido y volverlo a crear.
        contenido.remove();
        contenido= document.createElement("div");
        contenido.setAttribute("id","contenido");
        contenido.setAttribute("class","contenido");
        contenedordinamico.append(contenido);
        MisTutorias("Profesor_Estudiantes");
        

    });
    misTutorias.addEventListener("click",()=>{
        const activos= Array.from(document.querySelectorAll(".activo"));
        for (const elemento of activos) {
            elemento.classList.remove("activo");
            elemento.classList.add("inactivo");
        }
        misTutorias.classList.remove("inactivo");
        misTutorias.classList.add("activo");
        //Eliminar contenido y volverlo a crear.
        contenido.remove();
        contenido= document.createElement("div");
        contenido.setAttribute("id","contenido");
        contenido.setAttribute("class","contenido");
        contenedordinamico.append(contenido);
        MisTutorias("Profesor");
        
        //FIN DE MIS TUTORIAS PROFESOR
    });
    misTutorias2.addEventListener("click",()=>{
        window.location.reload();
    });
        //MIS CONFIGURACIONES PROFESOR
    configuraciones.addEventListener("click",()=>{
        const activos= Array.from(document.querySelectorAll(".activo"));
        for (const elemento of activos) {
            elemento.classList.remove("activo");
            elemento.classList.add("inactivo");
        }
        configuraciones.classList.remove("inactivo");
        configuraciones.classList.add("activo");
        //Eliminar contenido y volverlo a crear.
        contenido.remove();
        contenido= document.createElement("div");
        contenido.setAttribute("id","contenido");
        contenido.setAttribute("class","contenido");
        contenedordinamico.append(contenido);
        Configuraciones("Profesor");
    });
}


const MisTutorias= (user)=>{
    
    const contenido= document.getElementById("contenido");
    const div= document.createElement("div");
    const h2= document.createElement("h2");
    const p= document.createElement("p");
    //AGREGAR ESTILO CSS
    div.classList.add("titulo-mis-tutoria");
    h2.textContent="Mis Tutorías";
    p.textContent="Recuerda ser muy puntual a la hora de la tutoria.";
    if(user=="Profesor_Estudiantes"){
        h2.textContent="Mis Alumnos Asignados";
        p.textContent="Estos son los alumnos con los que tiene tutorias asignadas.";
    }
    div.append(h2);
    div.append(p);
    contenido.append(div);
    const Data= new FormData();
    Data.append("tipo",user);
    fetch("misTutorias",{
        method:"POST",
        body: Data
    })
    .then(res=>res.json())
    .then(res=>{
        
        //if(res==null) alert("Error en la base de datos");
        
        if(res.nombre===null){
            alert("Lo sentimos Debe iniciar sesion");
            window.location="https://tutorias-academicas.com/index2";
        }
        
            for (const datos of res) {
                const contenedor= document.createElement("div");
                //AGREGAR ESTILO CSS
                contenedor.classList.add("contenedor-tutoria");
                const contenedorFoto= document.createElement("div");
                if(user=="Estudiante" || user=="Profesor"){
                    contenedorFoto.classList.add("contenedor-foto");
                }
                else{
                    contenedorFoto.classList.add("contenedor-foto2");
                }
                
                const foto= document.createElement("img");
                foto.classList.add("imagen-tutor");//AGREGAR CSS object-fit:cover;
                
                const contenedorInf=document.createElement("div");
                //AGREGAR ESTILO CSS
                contenedorInf.classList.add("contenedor-inf");
                const h3=document.createElement("h3");
                const nombreT= document.createElement("h3");
                if(user=="Estudiante"){
                    h3.textContent="Tutor";
                    foto.setAttribute("src",`data:image/jpg;base64,${datos.fotoT}`);
                    nombreT.textContent=`${datos.nombreT.toLowerCase()} ${datos.apellidoT.toLowerCase()}`;
                }
                else if(user=="Profesor" ||user=="Profesor_Estudiantes"){
                    h3.textContent="Estudiante";
                    foto.setAttribute("src",`data:image/jpg;base64,${datos.fotoE}`);
                    nombreT.textContent=`${datos.nombreE.toLowerCase()} ${datos.apellidoE.toLowerCase()}`;
                }
               
                
                
                contenedorFoto.append(foto);
                const informacion= document.createElement("p");
                informacion.textContent="El encuentro se realizara via zoom por medio del enlace: ";
                const enlace= document.createElement("a");
                enlace.textContent=datos.link;
                enlace.setAttribute("href",datos.link);
                informacion.append(enlace);
                //Se debe repartir la hora en fecha y hora
                let contenedorFecha;
                if(user=="Estudiante" || user=="Profesor"){
                    let fechaT=datos.fecha;
                    fechaT=fechaT.split(" ");
                    contenedorFecha=document.createElement("div");
                    contenedorFecha.classList.add("contenedor-fecha");
                    const fecha= document.createElement("h4");
                    const hora= document.createElement("h4");
                    
                    fecha.textContent=`${fechaT[0]}`;
                    hora.textContent=`${fechaT[1].slice(0,-3)}`;
    
                    const span1= document.createElement("span");
                    const span2= document.createElement("span");
                    span1.classList.add("icon-calendar");
                    span2.classList.add("icon-clock");
                    fecha.append(span1);
                    hora.append(span2);
    
                    contenedorFecha.append(fecha);
                    contenedorFecha.append(hora);

                }
                

                contenedorInf.append(h3);
                contenedorInf.append(nombreT);
                contenedorInf.append(informacion);
                if(user=="Estudiante" || user=="Profesor"){
                    contenedorInf.append(contenedorFecha);
                }
                

                //AGREGAR ESTILO CSS
                const contenedorOpciones= document.createElement("div");
                if(user=="Estudiante" || user=="Profesor"){
                    contenedorOpciones.classList.add("contendor-opciones");
                    const calendario= document.createElement("div");
                    calendario.textContent="Ver Calendario";
                    const cancelarT=document.createElement("div");
                    cancelarT.textContent="Cancelar Tutoria";
                    cancelarT.setAttribute("id",`${datos.idTutoria}`);
                    cancelarT.setAttribute("class","cancelar-tutoria");
                    contenedorOpciones.append(calendario);
                    contenedorOpciones.append(cancelarT);
                }
                

                contenedor.append(contenedorFoto);
                contenedor.append(contenedorInf);
                if(user=="Estudiante" || user=="Profesor"){
                    contenedor.append(contenedorOpciones);
                }
                contenido.append(contenedor);
            }
        
    })
    .then(res=>{
        const body=document.getElementsByTagName('body')[0];
        const cancelarTutoria= document.querySelectorAll(".cancelar-tutoria");
        for(let i=0;i<cancelarTutoria.length;i++){
            cancelarTutoria[i].addEventListener("click",()=>{
                const div= document.createElement("div");
                div.classList.add("after");
                const div2= document.createElement("div");
                div2.classList.add("contenedor-cancelar");
                const span=document.createElement("span");
                const div3=document.createElement("div");
                div3.classList.add("contenedor-cerrar");
                span.classList.add("icon-cross");
                const h2=document.createElement("h2");
                h2.textContent="CANCELAR TUTORIA";
                const p= document.createElement("p");
                p.textContent="Introduzca el motivo por el cual usted desea cancelar la tutoria";
                const textarea= document.createElement("textarea");
                textarea.setAttribute("name","razon");
                textarea.setAttribute("cols","50");
                textarea.setAttribute("rows","6");
                textarea.setAttribute("maxlength","149");
                const button= document.createElement("button");
                button.setAttribute("id","enviar-cancelar");
                button.textContent="Cancelar";
                div3.append(span);
                div2.append(div3);
                div2.append(h2);
                div2.append(p);
                div2.append(textarea);
                div2.append(button);
                div.append(div2);
                body.append(div);
                
                div3.addEventListener("click",()=>{
                    div.remove();
                })
                button.addEventListener("click",()=>{
                    if(textarea.value=="" || textarea.value.trim()==""){
                        alert("Introduzca la razon por la que quiere cancelar la tutoria");
                    }
                    else{
                        const Data2= new FormData();
                        Data2.append("tipo","cancelar-tutoria");
                        Data2.append("idTutoria",cancelarTutoria[i].getAttribute("id"));
                        Data2.append("razon",textarea.value);
                        fetch('cancelarTutoria', {
                          method: 'POST',
                          body: Data2
                        })
                        .then(res=>res.json())
                        .then(res=>{
                            alert(res);
                            div.remove();
                            window.location.reload();
                        })
                        
                    }
                })
                
            })
        }
       
    })
    .catch(res=>{
        const div= document.createElement("div");
        div.classList.add("NO-TUTORIAS");
        const h3= document.createElement("h3");
        h3.textContent="USTED NO TIENE TUTORIAS";
        if(user=="Profesor_Estudiantes"){
            h3.textContent="USTED NO TIENE ESTUDIANTES ASIGNADOS";
        }
        div.append(h3);
        contenido.append(div);
    })
}


const Configuraciones= (user)=>{
    const body=document.getElementsByTagName('body')[0];
    let contenedor_perfil= document.querySelector(".contenedor-perfil");
    contenedor_perfil.remove();
    contenedor_perfil= document.createElement("div");
    contenedor_perfil.classList.add("contenedor-perfil");
    contenedor_perfil.classList.add("contenedor-perfil2");
    contenedor_perfil.classList.add("menu-visible");
    const contenido= document.getElementById("contenido");
    const baner= document.querySelector(".baner");
    baner.classList.add("baner-disminuir2");
    contenido.classList.add("white");
    body.append(contenedor_perfil);

    const div1= document.createElement("div");
    div1.textContent="Configuraciones";
    const div2= document.createElement("div");
    div2.classList.add("opciones2");
    const span1= document.createElement("span");
    span1.classList.add("icon-pencil");
    div2.textContent="Información personal";

    const div3= document.createElement("div");
    div3.classList.add("opciones2");
    const span2= document.createElement("span");
    span2.classList.add("icon-camera");
    div3.textContent="Actualizar foto de perfil";

    const div4= document.createElement("div");
    div4.classList.add("opciones2");
    const span3= document.createElement("span");
    span3.classList.add("icon-lock");
    div4.textContent="Cambiar contraseña";
    const contenedor_opciones= document.createElement("div");
    div2.append(span1);
    div3.append(span2);
    div4.append(span3);
    contenedor_perfil.append(contenedor_opciones);
    contenedor_opciones.append(div1);
    contenedor_opciones.append(div2);
    contenedor_opciones.append(div3);
    contenedor_opciones.append(div4);
    //ACTUALIZAR INFORMACION PERSONAL
    div2.addEventListener("click",()=>{
        let conten= document.getElementById("contenido");
        const contenedor_dinamico= document.getElementById("contenedor-dinamico");
        conten.remove();
        conten= document.createElement("div");
        conten.setAttribute("id","contenido");
        conten.classList.add("contenido");
        conten.classList.add("white");
        contenedor_dinamico.append(conten);

        div2.classList.add("inactivo");
        div3.classList.remove("inactivo");
        div4.classList.remove("inactivo");

        const contenedor=document.createElement("div");
        contenedor.classList.add("contenedor-informacion");
        const h1=document.createElement("h1");
        h1.textContent="Informacion personal";
        const p=document.createElement("p");
        p.textContent="Ver y editar tu informacion personal";
        const form=document.createElement("form");

        let div=document.createElement("div");
        let label=document.createElement("label");
        let input=document.createElement("input");
        label.setAttribute("for","nombre");
        label.textContent="Nombre";
        input.setAttribute("id","nombre");
        input.setAttribute("type","text");
        div.append(label);
        div.append(input);
        form.append(div);

        div=document.createElement("div");
        label=document.createElement("label");
        input=document.createElement("input");
        label.setAttribute("for","apellido");
        label.textContent="Apellido";
        input.setAttribute("id","apellido");
        input.setAttribute("type","text");
        div.append(label);
        div.append(input);
        form.append(div);

        div=document.createElement("div");
        label=document.createElement("label");
        input=document.createElement("input");
        label.setAttribute("for","cedula");
        label.textContent="N. de cedula";
        input.setAttribute("id","cedula");
        input.setAttribute("type","number");
        input.setAttribute("min","1");
        div.append(label);
        div.append(input);
        form.append(div);

        div=document.createElement("div");
        label=document.createElement("label");
        input=document.createElement("input");
        label.setAttribute("for","celular");
        label.textContent="N. de celular";
        input.setAttribute("id","celular");
        input.setAttribute("type","number");
        input.setAttribute("min","1");
        div.append(label);
        div.append(input);
        form.append(div);

        const button=document.createElement("button");
        button.classList.add("boton-informacion");
        button.textContent="Actualizar informacion";
        button.setAttribute("type","submit");
        form.append(button);

        contenedor.append(h1);
        contenedor.append(p);
        contenedor.append(form);
        conten.append(contenedor);

        form.addEventListener("submit",(e)=>{
            e.preventDefault();
            const nombre= document.getElementById("nombre").value;
            const apellido= document.getElementById("apellido").value;
            const cedula= document.getElementById("cedula").value;
            const celular= document.getElementById("celular").value;
            const Data = new FormData();
            Data.append("tipo",user);
            Data.append("tipo1","Informacion-personal");
            Data.append("nombre",nombre);
            Data.append("apellido",apellido);
            Data.append("cedula",cedula);
            Data.append("celular",celular);
            if(nombre!="" && apellido!="" && cedula!="" && celular!=""){
                fetch("configuraciones",{
                    method:"POST",
                    body: Data
                })
                .then(res=>{
                    
                    alert("La informacion personal fue actualizada Exitosamente");
                    document.getElementById("nombre2").textContent=nombre;
                    
                })
            }
            else if(nombre==""){
                alert("El nombre es requerido para actualizar la informacion personal");
            }
            else if(apellido==""){
                alert("El apellido es requerido para actualizar la informacion personal");
            }
            else if(cedula==""){
                alert("La cedula es requerido para actualizar la informacion personal");
            }
            else if(celular==""){
                alert("El celular es requerido para actualizar la informacion personal");
            }

        })

    })
    //ACTUALIZAR FOTO DE PERFIL
    div3.addEventListener("click",()=>{
        let conten= document.getElementById("contenido");
        const contenedor_dinamico= document.getElementById("contenedor-dinamico");
        conten.remove();
        conten= document.createElement("div");
        conten.setAttribute("id","contenido");
        conten.classList.add("contenido");
        conten.classList.add("white");
        contenedor_dinamico.append(conten);

        div3.classList.add("inactivo");
        div2.classList.remove("inactivo");
        div4.classList.remove("inactivo");
        const contenedor=document.createElement("div");
        const h1=document.createElement("h1");
        h1.textContent="Actualizar foto de perfil";
        const p=document.createElement("p");
        p.textContent="Ver y actualizar tu foto de perfil";
        const contenedor_foto= document.createElement("div");
        contenedor_foto.classList.add("contenedor-actualizar-foto");
        const img= document.createElement("img");
        img.setAttribute("id","foto3");
        const foto_Perfil=`${document.getElementById("foto2").getAttribute("src")}`;
        img.setAttribute("src",foto_Perfil);
        const button= document.createElement("div");
        const label= document.createElement("label");
        label.setAttribute("for","foto");
        label.textContent="Cambiar foto de perfil";
        const input= document.createElement("input");
        input.setAttribute("id","foto");
        input.setAttribute("type","file");
        button.append(label);
        button.append(input);
        contenedor_foto.append(img);
        contenedor_foto.append(button);
        contenedor.append(h1);
        contenedor.append(p);
        contenedor.append(contenedor_foto);
        conten.append(contenedor);
        
        input.addEventListener("change",()=>{
            const Data = new FormData();
            Data.append("tipo",user);
            Data.append("tipo1",user);
            Data.append("foto",input.files[0]);
            fetch("configuraciones",{
                method:"POST",
                body: Data
            })
            .then(res=>res.json())
            .then(res=>{
                const foto1= document.getElementById("foto2");
                const foto2= document.getElementById("foto3");
                //Tomar el src que se va mostrar en las dos imagenes de perfil
                foto1.setAttribute("src",`data:image/jpg;base64,${res.foto}`);
                foto2.setAttribute("src",`data:image/jpg;base64,${res.foto}`);
            })
        })

    })
    //ACTUALIZAR CONTRASEÑA
    div4.addEventListener("click",()=>{
        let conten= document.getElementById("contenido");
        const contenedor_dinamico= document.getElementById("contenedor-dinamico");
        conten.remove();
        conten= document.createElement("div");
        conten.setAttribute("id","contenido");
        conten.classList.add("contenido");
        conten.classList.add("white");
        contenedor_dinamico.append(conten);

        div4.classList.add("inactivo");
        div3.classList.remove("inactivo");
        div2.classList.remove("inactivo");

        const contenedor=document.createElement("div");
        contenedor.classList.add("contenedor-contraseña");
        const h1=document.createElement("h1");
        h1.textContent="Cambiar contraseña";
        const p=document.createElement("p");
        p.textContent="Actualiza tu contraseña";
        const form=document.createElement("form");
        
        let div=document.createElement("div");
        let label=document.createElement("label");
        let input=document.createElement("input");
        label.setAttribute("for","actual-contraseña");
        label.textContent="Actual contraseña";
        let par=document.createElement("p");
        par.textContent="Introduzca su contraseña actual";
        input.setAttribute("id","actual-contraseña");
        input.setAttribute("type","password");
        div.append(label);
        div.append(par);
        div.append(input);
        form.append(div);

        div=document.createElement("div");
        label=document.createElement("label");
        input=document.createElement("input");
        label.setAttribute("for","nueva-contraseña");
        label.textContent="Nueva contraseña";
        par=document.createElement("p");
        par.textContent="Minimo 5 caracteres";
        input.setAttribute("id","nueva-contraseña");
        input.setAttribute("type","password");
        div.append(label);
        div.append(par);
        div.append(input);
        form.append(div);

        div=document.createElement("div");
        label=document.createElement("label");
        input=document.createElement("input");
        label.setAttribute("for","repetir-contraseña");
        label.textContent="Repetir contraseña";
        par=document.createElement("p");
        par.textContent="Asegurese de que las contraseñas coincidan";
        input.setAttribute("id","repetir-contraseña");
        input.setAttribute("type","password");
        div.append(label);
        div.append(par);
        div.append(input);
        form.append(div);
        
        const button=document.createElement("button");
        button.classList.add("cambiar-contraseña");
        button.textContent="Cambiar contraseña";
        button.setAttribute("type","submit");
        form.append(button);


        contenedor.append(h1);
        contenedor.append(p);
        contenedor.append(form);
        conten.append(contenedor);

        form.addEventListener("submit",(e)=>{
            e.preventDefault();
            const pass_actual=document.getElementById("actual-contraseña").value;
            let Data = new FormData();
            //Pedir contraseña
            Data.append("tipo",user);
            Data.append("tipo1","Pedir-contrasena");
            Data.append("pass",pass_actual);
            fetch("configuraciones",{
                method:"POST",
                body: Data
            })
            .then(res=>res.json())
            .then(res=>{
                
                let pass_nueva=document.getElementById("nueva-contraseña").value;
                let pass_repetir=document.getElementById("repetir-contraseña").value;
                if(res.res=="valida"){
                    if(pass_nueva.trim()!="" && pass_repetir.trim()!="" && pass_nueva.trim().length>=5){
                        pass_nueva= pass_nueva.trim();
                        pass_repetir= pass_repetir.trim();
                        if(pass_nueva==pass_repetir){
                            Data.append("tipo1","Cambiar-contrasena");
                            Data.append("pass",pass_nueva);
                            fetch("configuraciones",{
                                method:"POST",
                                body: Data
                            })
                            .then(res=>{
                                alert("La contraseña a sido cambiada Exitosamente. Por favor vuelva iniciar sesion");
                                window.location.href="destruirSecion";
                            })
                        }
                        else{
                            alert("Las contraseñas no coinciden.");
                        }
                        
                    }
                    else if(pass_nueva.trim().length<5){
                        alert("La contraseña nueva debe tener minimo 5 caracteres y no puede estar vacia.");
                    }
                    else{
                        alert("Debe repetir la contraseña nueva");
                    }
                    
                }
                else{
                    alert("La contraseña actual introducida no es correcta.");
                }
                
            })
            //Cambiar contraseña
            
        })

    })

}