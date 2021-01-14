

//fc.table para cambiar tamaño a las filas

//Evento clickqueado
eventClick:function(calEvent,jsEvent,view){


        
        
  //calEvent es el evento cliqueado con el calEvent.event podemos llamar  todos los metodos del evento.
  calEvent.event.remove();


}

//Estilo por horas y fechas
defaultView: 'timeGridWeek',
//Seleccionar y cambiar de color
  
selectable: true,
select: function(arg) {
      calendar.addEvent({
      start: arg.start,
      end: arg.end,
      overlap: false,
      color: '#19CD0D',
      allDay: arg.allDay  
      
      })
    
    calendar.unselect()
  }

   //Permite clikear y saber la información de la fecha seleccionada!
  dateClick:function(info){

    alert('Clicked '+info.dateStr);

    
  }