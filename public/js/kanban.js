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

Kanban.prototype.sendPostitPosition = function() {
	var self = this;
	var x = 0;
	var y = 0;
	if(self.movingPostit){
 		$(document).mousemove(function(e){
			console.log("Send information");
			var p_it = $("#"+self.movingPostit);
			var position = p_it.offset();
			self.fayeClient.publish('/teste', {
				type: 'moving',
  				x: e.pageX,
  				y: e.pageY,
  				postit: self.movingPostit
			});
		});
	}
};

Kanban.prototype.init = function(){
	var self = this;	
	self.fayeClient = new Faye.Client('http://192.168.191.125:8888/faye', {	timeout: 120 });
			
	self.fayeClient.subscribe('/teste_update', function(message) {
			console.log("Receive message");

			if(message.type == 'moving'){
				if(self.movingPostit != message.postit)
					self.movePostId('#' + message.postit, message.x, message.y);
			}else if(message.type == 'drop'){				
			self.dropPostIt('#'+message.p_id, '#'+message.spot);
			
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
				self.fayeClient.publish('/teste', {
					type: 'drop',
  					p_id: ui.draggable[0].id,
  					spot: this.id,
				});	
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
	var spot = $(local);
	var p_id = $(id);
	p_id.removeAttr("style");
	p_id.appendTo(spot);
};
