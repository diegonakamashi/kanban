function Kanban(){
	if (! (this instanceof arguments.callee)) {
    	return new arguments.callee(arguments);
  	}

  	var self = this; 	

  	var postItList = [];//Lista de postit
  	var movingPostit; //Postit que esta sendo movido
  	var postit;//id do postit sendo movido no momento
}

Kanban.prototype.status = function(){
	return status;
}

Kanban.prototype.updateValues = function(x, y, id){
	$('#position').text('O positit [' + this.postit + '] esta nessa posição' +x + ', ' + y);

	this.movePostId('#post-it3', x, y);
}

Kanban.prototype.getMovingPostit = function(){	
	var self = this;
	return self.movingPostit;
}

Kanban.prototype.init = function(){
	var self = this;	

	//Function utilizada quando se esta movendo o postit
	function mousemove_func(e){
		self.updateValues(e.pageX, e.pageY);
	}

	$( ".post-it" ).draggable({
			appendTo: "body",
			helper: "clone",
			start: function(){
				self.postit = this.id;
				$(document).mousemove(mousemove_func); 				
			
			},
			drag: function(){	
				self.postit = this.id;
				$(document).mousemove(mousemove_func);   				
			},
			stop: function(){
				self.postit = this.id;
				$(document).unbind('mousemove', mousemove_func);
			},
		});
		
		$( ".spot" ).droppable({
			activeClass: "ui-state-default",
			hoverClass: "ui-state-hover",
			accept: ":not(.ui-sortable-helper)",
			drop: function( event, ui ) {
				$( ui.draggable ).appendTo( this );		
				alert("O postit " + ui.draggable[0].id + " foi movido para a área " + this.id );
			} 
		}).sortable({
			items: "div:not(.placeholder)",
			sort: function() {
				$( this ).removeClass( "ui-state-default" );
			}
		});
}

Kanban.prototype.movePostId = function(id, left, top) {	
	var coord = {
		left: left,
		top: top
	};

	$(id).offset(coord);
};

Kanban.prototype.dropPostIt = function(id, local) 
{
	
};
