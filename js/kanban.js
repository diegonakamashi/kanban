function Kanban(){
	if (! (this instanceof arguments.callee)) {
    	return new arguments.callee(arguments);
  	}

  	STATUS_STOP = 0;
  	STATUS_START = 1;
  	STATUS_DRAG = 2;

  	var self = this;
  	var status = STATUS_STOP;//Private Variuable
}

Kanban.prototype.status = function(){
	return status;
}

//Recebe uma function como parãmetro que será chamada
//toda vez que um post-it for movido
Kanban.prototype.init = function(onDragging){
	$( ".post-it" ).draggable({
			appendTo: "body",
			helper: "clone",
			start: function(){
				status = STATUS_START;
				if(onDragging)
					onDragging();
				// $(document).mousemove(function(e){
    //   				$('#position').text(e.pageX +', '+ e.pageY);
    //   				$('#status').text('start');
   	// 			}); 
			},
			drag: function(){	
				if(onDragging)
					onDragging();	
				status = STATUS_DRAG;						
			},
			stop: function(){
				if(onDragging)
					onDragging();
				status = STATUS_STOP;
			},
		});
		
		$( ".spot" ).droppable({
			activeClass: "ui-state-default",
			hoverClass: "ui-state-hover",
			accept: ":not(.ui-sortable-helper)",
			drop: function( event, ui ) {
//				$( this ).find( ".placeholder" ).remove();
				$( ui.draggable ).appendTo( this );				
			}
		}).sortable({
			items: "div:not(.placeholder)",
			sort: function() {
				// gets added unintentionally by droppable interacting with sortable
				// using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
				$( this ).removeClass( "ui-state-default" );
			}
		});
}
