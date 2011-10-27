function PostIt(x, y, id)
{
	if (! (this instanceof arguments.callee)) {
    	return new arguments.callee(arguments);
  	}

  	var self = this;

  	var positionX = x;
  	var positionY = y;
  	var postitID = id;
  	var kanban;
  	var priority;
}

PostIt.prototype.x = function() 
{
	return positionX;
}

PostIt.prototype.y = function() 
{
	return positionY;
}

PostIt.prototype.id = function() 
{
	return postitID;
}