let cont1=0;
let arreglo=[];
let longitud=1;

document.addEventListener('DOMContentLoaded', function() {
    
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
     

      if(Date.parse(auxiliar)<=Date.parse(arg.start)){


        
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

         

        const fechaFinal = ""+fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+fecha.getHours()+":00:00";
 
        const fechaFinal2 = ""+fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()+" "+(fecha.getHours()+1)+":00:00";
 
        //alert(fechaFinal);
 
        const fechaE=fechaFinal+"/"+fechaFinal2; 
        let pos = arreglo.indexOf(fechaE);
        
        if(pos!= -1){
            arreglo.splice(pos,1);
            longitud=arreglo.length;
            cont1--;
        }
        calEvent.event.remove(); 

      

      }


  
     
      

      /*eventDurationEditable:false,

      eventStartEditable:false,*/
      
      
      
      //cuando sea para el estudiante hay que eliminar lo del evento donde se agregan las fechas y hay que ponerle
      //para que le salga el reservar tutoria y ademas hay que cambiarle el color de esa fecha en la base de datos
      //para que salga en rojo y no nadie mas pueda seleccionarla. eso se puede validar por el color si el color esta en 
      //verde entonces que le salga el mensaje para que reserve y si esta en rojo pues que no le salga...
      
      

       // can click day/week names to navigate views
      
       
     
      
    });



    

    var dia = calendar.getDate();


    //calendar.setOption('defaultDate','2021-5-15');
    calendar.setOption('firstDay',dia.getDay());

    calendar.setOption('locale','es');

    calendar.render();
  });




const estudiante= document.getElementById("estudiante");
const profesor = document.getElementById("profesor");
const pasword= document.getElementById("password");
const paswordC = document.getElementById("passwordC");
const form= document.getElementById("form");
const correo= document.getElementById("correo");
const sub= document.getElementById("enviar");
const inicio= document.getElementById("inicio");
const registrarse= document.getElementById("registrarse");
let aceptar= location.hash;
const file= document.getElementById("foto");
const especialidad1= document.getElementById("especialidad");

file.addEventListener("change",()=>{
    var pdrs = file.files[0].name;
    document.getElementById('info-f').textContent = pdrs;
})


let pagina= location.pathname.split("/");
pagina=pagina[pagina.length-1];

if(pagina=="registrarse2"){
    
    longitud=0;
    const select= document.getElementById("materia");
    const horario= document.querySelector(".seleccionar-horario");
    const contenedor_calendario= document.getElementById("contenedor-calendario");
    const calendario_aceptar= document.getElementById("calendario-aceptar");
    
    horario.addEventListener("click",()=>{
        contenedor_calendario.classList.remove("invisible");
    })
    calendario_aceptar.addEventListener("click",()=>{
        contenedor_calendario.classList.add("invisible");
    })

    fetch("materias")
    .then(res=>res.json())
    .then(res=>{
        
        const fragmento= document.createDocumentFragment();
        for(const valor of res){
            const opcion= document.createElement("option");
            opcion.setAttribute("value",valor.nombre);
            opcion.textContent=valor.nombre;
            fragmento.append(opcion);
        }
        select.append(fragmento);
    })

}

pasword.addEventListener("keyup",()=>{
    if(pasword.value!=paswordC.value){
        paswordC.classList.add("red");
    }
    else{
        paswordC.classList.remove("red");
    }
})

paswordC.addEventListener("keyup",()=>{
    if(pasword.value!=paswordC.value){
        paswordC.classList.add("red");
    }
    else{
        paswordC.classList.remove("red");
    }
})

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const ExpReg=  /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
    let email=false;
    let pass=false;
    if(paswordC.value==pasword.value){
        pass=true;
    }
    if(ExpReg.test(correo.value)==true){
        email=true;
    }
    let cont=0;
        if(foto.value!=""){
            cont++;
        }
    if(email==true && pass==true && cont!=0 && longitud>0){
        const nombre= document.getElementById("nombre").value;
        const apellido= document.getElementById("apellido").value;
        const cedula= document.getElementById("cedula").value;
        const celular= document.getElementById("celular").value;
        const correo= document.getElementById("correo").value;
        const pass= document.getElementById("password").value;
        const foto=document.getElementById("foto");
        const Data= new FormData();
        
        Data.append("nombre",nombre);
        Data.append("apellido",apellido);
        Data.append("cedula",cedula);
        Data.append("celular",celular);
        Data.append("correo",correo);
        Data.append("pasword",pass);
        Data.append("foto",foto.files[0]);
        
        if(pagina=="registrarse"){
            Data.append("tipo","registrarE");
        }
        else if(pagina=="registrarse2"){
            const materia= document.getElementById("materia").value;
            const especialidad= document.getElementById("especialidad").value;
            let arreglo1=[];
            let arreglo2=[];
            let cont2=0;
            for (let valor of arreglo) {
                valor= valor.split("/");
                arreglo1[cont2]=valor[0];
                arreglo2[cont2]=valor[1];
                cont2++;
            }
            
            Data.append("inicio",JSON.stringify(arreglo1));
            Data.append("fin",JSON.stringify(arreglo2));
            Data.append("materia",materia);
            Data.append("tipo","registrarP");
            Data.append("especialidad",especialidad);
        }
        
            fetch("confirmacion",{
            method: "POST",
            body: Data
            })
            .then(res=>res.json())
            .then(res=>{
                alert(res);
            })
            .catch(res=>{
                alert("EL USUARIO NO SE PUDO REGISTRAR")
            })
        
        
        
        
    }
    else{
        if(email!= true && pass!= true){
            alert("EL CORREO NO ES VALIDO Y LAS CONTRASEÑAS NO COINCIDEN");
        }
        else if(pass!=true){
            alert("LAS CONTRASEÑAS NO COINCIDEN");
        }
        else if(email!=true){
            alert("EL CORREO NO ES VALIDO");
        }
        else if(cont==0){
            alert("No ha seleccionado una foto de perfil");
        }
        else if(longitud<=0){
            alert("No ha seleccionado un horario.")
        }
    }

})



