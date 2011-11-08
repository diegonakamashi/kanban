function Kanban(){
	if (! (this instanceof arguments.callee)) {
    	return new arguments.callee(arguments);
  	}

  	var self = this; 	

  	var postItList = [];//Lista de postit
  	var movingPostit; //Postit que esta sendo movido
  	var postit = ""; //id do postit sendo movido no momento  	
  	 var fayeClient;
}

Kanban.prototype.status = function(){
	return status;
}

Kanban.prototype.updateValues = function(id, x, y){
	$('#position').text('O positit [' + id + '] esta nessa posição' +x + ', ' + y);
}

Kanban.prototype.sendPostitPosition = function() 
{
	var self = this;
	var x = 0;
	var y = 0;
	if(self.movingPostit){

 		$(document).mousemove(function(e){
   	

			console.log("Send information");
			var p_it = $("#"+self.movingPostit);
			var position = p_it.offset();
			self.fayeClient.publish('/teste', {
  				x: e.pageX,
  				y: e.pageY,
  				postit: self.movingPostit
			});
		});
	}
};

Kanban.prototype.init = function(){
	var self = this;	
	self.fayeClient = new Faye.Client('http://localhost:8888/faye', {
        	timeout: 120
    	});
		
	self.fayeClient.subscribe('/teste_update', function(message) {
			console.log("Receive message");
			if(self.movingPostit != message.postit)
			{
				self.movePostId('#' + message.postit, message.x, message.y);
				self.updateValues('#' + message.postit, message.x, message.y);
			}
		}); 	

	$( ".post-it" ).draggable({
			appendTo: "body",
			helper: "clone",
			start: function(){
				self.movingPostit = this.id;			
			},
			drag: function(){	
				self.movingPostit = this.id;				
			},
			stop: function(){
				self.movingPostit = null			
			},
		});
		
		$( ".spot" ).droppable({
			activeClass: "ui-state-default",
			hoverClass: "ui-state-hover",
			accept: ":not(.ui-sortable-helper)",
			drop: function( event, ui ) {
				$( ui.draggable ).appendTo( this );		
				self.movingPostit = null;
				// alert("O postit " + ui.draggable[0].id + " foi movido para a área " + this.id );

			} 
		}).sortable({
			items: "div:not(.placeholder)",
			sort: function() {
				$( this ).removeClass( "ui-state-default" );
			}
		});

		setInterval(self.sendPostitPosition.bind(self), 500);
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
