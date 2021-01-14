let pagina= location.pathname.split("/");
pagina=pagina[pagina.length-1];
let arreglo=[];
let arregloE=[];
let cont1=0;
let contE=0;
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
                            titulo.classList.add("calendario-h1")
                            parrafo.textContent="Recuerda que la fecha ingresada sera la fecha a la que debe de asistir a la tutoria.";
                            

                            const calendario= document.createElement("div");
                            calendario.setAttribute("id","calendar");
                            /*form.classList.add("fecha");
                            form.setAttribute("id","form");
                            form.setAttribute("method","POST");
                            
                            input.setAttribute("id","fecha");
                            input.setAttribute("type","datetime-local");
                            button.setAttribute("type","submit");
                            button.classList.add("reservar-tutoria")
                            button.textContent="Reservar Tutoria";
                            
                            form.append(input);
                            form.append(button);*/

                            contenedorHorario.append(titulo);
                            contenedorHorario.append(parrafo);

                            contenedorHorario.append(calendario);
                            //contenedorHorario.append(form);
                            contenido.append(contenedorHorario);
                            



                            
//////////////////////////////////////////////////////////////////////



    
    var calendarEl = document.getElementById('calendar');

    
    /*var hola = new Date();

    var fecha = ""+hola.getFullYear()+"-"+hola.getMonth()+"-"+(hola.getDate()+1)+"";

    alert(fecha);*/

      let hoy = new Date();
      let DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
      let manana = new Date(hoy.getTime() + DIA_EN_MILISEGUNDOS);

    
    
    var calendar = new FullCalendar.Calendar(calendarEl, {

      plugins: [ 'dayGrid', 'timeGrid', 'list', 'interaction' ],
      

      
      //fecha = calendar.getDate();

      //defaultDate: ''+calendar.getDate().getYear()+'-'+calendar.getDate().getMonth()+'-'+calendar.getDate().getDay()+'',
      defaultDate: manana,
      defaultView: 'timeGridWeek',
     

      header: {
        left: 'prev,next',
        center: 'title',
        
      },

      eventLimit:true,
      

      selectOverlap:false,

      views: {

        timeGrid: {
          
          //minTime: "5:00:00",
          //maxTime: "23:00:00"

          columnHeaderFormat:  { year: 'numeric',month:'2-digit', day:'2-digit',weekday: 'long', },

          titleFormat: { year: 'numeric', month: 'long', day: 'numeric' } ,

          slotLabelFormat: {
                          hour: 'numeric',
                          minute: '2-digit',
                          omitZeroMinute: false,
                          meridiem: 'short'
                        }
        
         }
    
    },
      
      selectable: true,

      eventConstraint:{
            startTime: '2021-01-01T10:00:00',
            endTime: '2021-12-05T22:00:00'
},


      
     select: function(arg) {
      

      var fecha3 = new Date(manana.getTime()-(24 * 60 * 60 * 1000));

      
  
      
      //var fechaHoy = new Date(2017, 0, 1, 1, 15);


      var diferencia = 24-fecha3.getHours();


      var auxiliar = new Date(fecha3.getFullYear(),fecha3.getMonth(),fecha3.getDate(),fecha3.getHours()+diferencia,0,0);

      var final = new Date(arg.start.getFullYear(),arg.start.getMonth(),arg.start.getDate(),arg.start.getHours()+1,0,0);

      
      
     //alert(auxiliar);
     

      if(Date.parse(auxiliar)<=Date.parse(arg.start)  && pagina=="perfilProfesor"){


        
          calendar.addEvent({
          
          
          start: arg.start,
          end: final,
         
          
          overlap: false,
          color: '#19CD0D',
          allDay: false
          
          
          },
          
       
          )


          var fecha = new Date(arg.start);

         

       fechaFinal = ""+fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+fecha.getHours()+":00:00";

       fechaFinal2 = ""+fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+(fecha.getHours()+1)+":00:00";

       //alert(fechaFinal);

       arreglo[cont1]=fechaFinal+"/"+fechaFinal2;
       cont1++;
       longitud= cont1;
       //aqui se agregara cada fecha al arreglo y cuando se presione un boton continuar es que se mandara al servidor.
        /* $.ajax({
                        
          
                        type: 'GET',
                        url: "Backend.php",
                        data: {
                            
                            "fecha":fechaFinal,
                            "fecha2":fechaFinal2
                            
                            
                            
                        }, 
                        success: function(data) {
                               
                        
                                

                              
                       }
                
                }); */
                

        
        }
        
        //calendar.unselect()
          }, //Finalizar condicional
      
          
  
          

  aspectRatio: 1.35,
      
      dateClick:function(info){

        //alert('Clicked '+info.dateStr);

        
        
        
      
        
      },

      eventMouseEnter:function(mouseEnterInfo) { 

        //mouseEnterInfo.el.style.backgroundColor = '#299AD1';

        

      },

     


     

      eventMouseLeave:function(mouseLeaveInfo) { 

        //mouseLeaveInfo.el.style.backgroundColor = '#19CD0D';

      },

      
     


      eventClick:function(calEvent,jsEvent,view){
        //Elimina el evento luego de que ya esta creado y ademas hay que eliminar del arreglo tambien la fecha borrada.
        
        var fecha = new Date(calEvent.event.start);
        let color= calEvent.event.backgroundColor;

        const fechaFinal = ""+fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+fecha.getHours()+":00:00";
 
        const fechaFinal2 = ""+fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+(fecha.getHours()+1)+":00:00";
 
        //alert(fechaFinal);
        const fechaE=fechaFinal+"/"+fechaFinal2; 
        if(pagina=="perfilProfesor"){
            let pos = arreglo.indexOf(fechaE);
            
            if(pos!= -1){
                arreglo.splice(pos,1);
                longitud=arreglo.length;
                cont1--;
            }
            calEvent.event.remove(); 
        }
        else if(pagina=="perfilEstudiante"){
            calendarEl.addEventListener("click",(e)=>{
                const elemento= document.querySelector(".contenedor-reservar");
                const elemento1= document.querySelector(".triangulo");
                if(elemento != null){
                    elemento.remove();
                    elemento1.remove();
                }
                 const div= document.createElement("div");
                 div.classList.add("contenedor-reservar");
                 const div1= document.createElement("div");
                 div1.classList.add("triangulo");
                 let arr= fechaFinal.split(" ");
                 let arr1= fechaFinal2.split(" ");
 
                const div2= document.createElement("div");
                const span1= document.createElement("span");
                const p1= document.createElement("p");
                span1.textContent="Fecha: ";
                
                p1.textContent=`${arr[0]}`;
 
 
                const div3= document.createElement("div");
                const span2= document.createElement("span");
                const p2= document.createElement("p");
                span2.textContent="Hora: ";
                
                let horaI= arr[1].split(":");
                horaI=""+horaI[0]+":"+horaI[1];
                let horaF= arr1[1].split(":");
                horaF=""+horaF[0]+":"+horaF[1];
                p2.textContent=`${horaI} - ${horaF}`;
                const button= document.createElement("button");
                button.textContent="Reservar tutoria";
 
                div2.append(span1);
                div3.append(span2);
                div2.append(p1);
                div3.append(p2);
                div.append(div2);
                div.append(div3);
                div.append(button);
                 e.target.append(div1);
                 e.target.append(div);
                 
 
                 const Datos= new FormData();
                             Datos.append("tipo","reservarTutoria");
                             button.addEventListener("click",()=>{
                                 Datos.append("cedulaP",cedulaprofesor);
                                 const horario=`${fechaFinal}`;
                                 const horario2=`${fechaFinal2}`;
                                 Datos.append("fecha",horario);
                                 Datos.append("fecha2",horario2);
                                 fetch("tutor",{
                                     method:"POST",
                                     body: Datos
                                 })
                                 .then(res=>res.json())
                                 .then(res =>{
 
                                     //if(res==null) alert("Error en la base de datos");
 
                                     if(res=="RESERVADA"){
                                         alert(`LA TUTORIA FUE: ${res}.`);
                                          window.location.href="perfilEstudiante";
                                     }
                                     else if(res=="NO RESERVADA"){
                                         alert(`LA TUTORIA FUE: ${res}.SELECCIONE OTRA FECHA.`);
                                     }
                                 })
                             })
                 ///////////////
                 if(calEvent.event.backgroundColor=="red"){
                    
                    button.remove();
                    const button2= document.createElement("button");
                    button2.textContent="No disponible";
                    button2.style.backgroundColor = 'red';
                    div.append(button2);
                }
                if(calEvent.event.backgroundColor!="#19CD0D" && calEvent.event.backgroundColor!="red"){
                    div.remove();
                    div1.remove(); 
                }
                if(e.target.classList.contains("fc-button") ||e.target.classList.contains("fc-icon") ){
                    div.remove();
                    div1.remove(); 
                }

                ////////
                var fecha3 = new Date(manana.getTime()-(24 * 60 * 60 * 1000));
                var diferencia = 24-fecha3.getHours();
                var auxiliar = new Date(fecha3.getFullYear(),fecha3.getMonth(),fecha3.getDate(),fecha3.getHours()+diferencia,0,0);

                if(Date.parse(auxiliar)>=Date.parse(calEvent.event.start)){
                    div.remove();
                    div1.remove(); 
                }
                ////////
             })
            
        }

      //cuando sea para el estudiante hay que eliminar lo del evento donde se agregan las fechas y hay que ponerle
      //para que le salga el reservar tutoria y ademas hay que cambiarle el color de esa fecha en la base de datos
      //para que salga en rojo y no nadie mas pueda seleccionarla. eso se puede validar por el color si el color esta en 
      //verde entonces que le salga el mensaje para que reserve y si esta en rojo pues que no le salga...
      //En PERFIL .JS AQUI VA UN CONDICIONAL DE CUANDO ES ESTUDIANTE

      },


  
     
      

      /*eventDurationEditable:false,

      eventStartEditable:false,*/
      
      
      events: `calendario/examples/Backend2?cedula=${cedulaprofesor}`
      
      
      

       // can click day/week names to navigate views
      
       
     
      
    });



    

    var dia = calendar.getDate();


    //calendar.setOption('defaultDate','2021-5-15');
    calendar.setOption('firstDay',dia.getDay());

    calendar.setOption('locale','es');

    calendar.render();

/////////////////////////////////////////////////////////////////////




                            

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
    const div5= document.createElement("div");
    if(user=="Profesor"){
       
        div5.classList.add("opciones2");
        const span4= document.createElement("span");
        span4.classList.add("icon-calendar");
        div5.textContent="Actualizar horario";
        div5.append(span4);
        contenedor_opciones.append(div5);
        div5.addEventListener("click",()=>{
            arreglo=[];
            arregloE=[];
            cont1=0;
            contE=0;
            let conten= document.getElementById("contenido");
            const contenedor_dinamico= document.getElementById("contenedor-dinamico");
            conten.remove();
            conten= document.createElement("div");
            conten.setAttribute("id","contenido");
            conten.classList.add("contenido");
            conten.classList.add("white");
            contenedor_dinamico.append(conten);
    
            div5.classList.add("inactivo");
            div2.classList.remove("inactivo");
            div3.classList.remove("inactivo");
            div4.classList.remove("inactivo");
    
            const contenedor=document.createElement("div");
            contenedor.classList.add("contenedor-calendario");
            const h1=document.createElement("h1");
            h1.textContent="Horario de disponibilidad";
            const p=document.createElement("p");
            p.textContent="Ver y editar tu horario de disponibilidad para las tutorias.";
            const calendario= document.createElement("div");
            calendario.setAttribute("id","calendar");
            const button3=document.createElement("button");
            button3.setAttribute("id","calendario-aceptar");
            button3.setAttribute("class","calendario-aceptar");
            button3.textContent="Actualizar";

            contenedor.append(h1);
            contenedor.append(p);
            calendario.append(button3);
            contenedor.append(calendario);
            conten.append(contenedor);


            //////////////////////////////////////////////////////////////////////



    
    var calendarEl = document.getElementById('calendar');

    
    /*var hola = new Date();

    var fecha = ""+hola.getFullYear()+"-"+hola.getMonth()+"-"+(hola.getDate()+1)+"";

    alert(fecha);*/

      let hoy = new Date();
      let DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
      let manana = new Date(hoy.getTime() + DIA_EN_MILISEGUNDOS);

    
    
    var calendar = new FullCalendar.Calendar(calendarEl, {

      plugins: [ 'dayGrid', 'timeGrid', 'list', 'interaction' ],
      

      
      //fecha = calendar.getDate();

      //defaultDate: ''+calendar.getDate().getYear()+'-'+calendar.getDate().getMonth()+'-'+calendar.getDate().getDay()+'',
      defaultDate: manana,
      defaultView: 'timeGridWeek',
     

      header: {
        left: 'prev,next',
        center: 'title',
        
      },

      eventLimit:true,
      

      selectOverlap:false,

      views: {

        timeGrid: {
          
          //minTime: "5:00:00",
          //maxTime: "23:00:00"

          columnHeaderFormat:  { year: 'numeric',month:'2-digit', day:'2-digit',weekday: 'long', },

          titleFormat: { year: 'numeric', month: 'long', day: 'numeric' } ,

          slotLabelFormat: {
                          hour: 'numeric',
                          minute: '2-digit',
                          omitZeroMinute: false,
                          meridiem: 'short'
                        }
        
         }
    
    },
      
      selectable: true,

      eventConstraint:{
            startTime: '2021-01-01T10:00:00',
            endTime: '2021-12-05T22:00:00'
},


      
     select: function(arg) {
      

      var fecha3 = new Date(manana.getTime()-(24 * 60 * 60 * 1000));

      
  
      
      //var fechaHoy = new Date(2017, 0, 1, 1, 15);


      var diferencia = 24-fecha3.getHours();


      var auxiliar = new Date(fecha3.getFullYear(),fecha3.getMonth(),fecha3.getDate(),fecha3.getHours()+diferencia,0,0);

      var final = new Date(arg.start.getFullYear(),arg.start.getMonth(),arg.start.getDate(),arg.start.getHours()+1,0,0);

      
      
     //alert(auxiliar);
     

      if(Date.parse(auxiliar)<=Date.parse(arg.start)  && pagina=="perfilProfesor"){


        
          calendar.addEvent({
          
          
          start: arg.start,
          end: final,
         
          
          overlap: false,
          color: '#19CD0D',
          allDay: false
          
          
          },
          
       
          )


          var fecha = new Date(arg.start);

         

       fechaFinal = ""+fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+fecha.getHours()+":00:00";

       fechaFinal2 = ""+fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+(fecha.getHours()+1)+":00:00";

       //alert(fechaFinal);

       arreglo[cont1]=fechaFinal+"/"+fechaFinal2;
       cont1++;
       longitud= cont1;
      
                

        
        }
        
        //calendar.unselect()
          }, //Finalizar condicional
      
          
  
          

  aspectRatio: 1.35,
      
      dateClick:function(info){

        //alert('Clicked '+info.dateStr);

        
        
        
      
        
      },

      eventMouseEnter:function(mouseEnterInfo) { 

        //mouseEnterInfo.el.style.backgroundColor = '#299AD1';

        

      },

     


     

      eventMouseLeave:function(mouseLeaveInfo) { 

        //mouseLeaveInfo.el.style.backgroundColor = '#19CD0D';

      },

      
     


      eventClick:function(calEvent,jsEvent,view){
        //Elimina el evento luego de que ya esta creado y ademas hay que eliminar del arreglo tambien la fecha borrada.
        
        var fecha = new Date(calEvent.event.start);
        let color= calEvent.event.backgroundColor;

        const fechaFinal = ""+fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+fecha.getHours()+":00:00";
 
        const fechaFinal2 = ""+fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+(fecha.getHours()+1)+":00:00";
 
        //alert(fechaFinal);
        const fechaE=fechaFinal+"/"+fechaFinal2; 
        if(pagina=="perfilProfesor"){
            let pos = arreglo.indexOf(fechaE);
            
            if(pos!= -1){
                arreglo.splice(pos,1);
                longitud=arreglo.length;
                cont1--;
            }
            else if(pos== -1){
                //Agregar la fehca a un arreglo eliminar[] para eliminar esa fecha que ya estaba
                arregloE[contE]=fechaFinal+"/"+fechaFinal2;
                contE++;
            }
            calEvent.event.remove(); 
        }

      //cuando sea para el estudiante hay que eliminar lo del evento donde se agregan las fechas y hay que ponerle
      //para que le salga el reservar tutoria y ademas hay que cambiarle el color de esa fecha en la base de datos
      //para que salga en rojo y no nadie mas pueda seleccionarla. eso se puede validar por el color si el color esta en 
      //verde entonces que le salga el mensaje para que reserve y si esta en rojo pues que no le salga...
      //En PERFIL .JS AQUI VA UN CONDICIONAL DE CUANDO ES ESTUDIANTE

      },


  
     
      

      /*eventDurationEditable:false,

      eventStartEditable:false,*/
      
      
      events: `calendario/examples/Backend`
      
      
      

       // can click day/week names to navigate views
      
       
     
      
    });



    

    var dia = calendar.getDate();


    //calendar.setOption('defaultDate','2021-5-15');
    calendar.setOption('firstDay',dia.getDay());

    calendar.setOption('locale','es');

    calendar.render();

/////////////////////////////////////////////////////////////////////
button3.addEventListener("click",()=>{
    //recordar en el php primero se borran las fechas de arregloE y luego se agregan las del arreglo
            let arreglo1=[];
            let arreglo2=[];
            let arreglo3=[];
            let arreglo4=[];
            let cont2=0;
            for (let valor of arreglo) {
                valor= valor.split("/");
                arreglo1[cont2]=valor[0];
                arreglo2[cont2]=valor[1];
                cont2++;
            }
            cont2=0;
            for (let valor of arregloE) {
                valor= valor.split("/");
                arreglo3[cont2]=valor[0];
                arreglo4[cont2]=valor[1];
                cont2++;
            }
            const Data= new FormData();
            
           
            if(arreglo.length>0){
                Data.append("inicio",JSON.stringify(arreglo1));
                Data.append("fin",JSON.stringify(arreglo2));
            }
            if(arregloE.length>0){
                Data.append("inicioE",JSON.stringify(arreglo3));
                Data.append("finE",JSON.stringify(arreglo4));
            }
            if(arregloE.length>0 ||arreglo.length>0){
                Data.append("tipo1","Actualizar-horario");
                fetch("configuraciones",{
                    method: "POST",
                    body: Data
                })
                .then(res=>{
                    alert("Su horario fue actualizado.");
                    window.location.href="perfilProfesor";
                })
            }
})


        })
    }
    
    
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
        div5.classList.remove("inactivo");

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
        div5.classList.remove("inactivo");
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
        div5.classList.remove("inactivo");

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