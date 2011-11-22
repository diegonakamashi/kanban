function PostIt(id)
{
	if (! (this instanceof arguments.callee)) {
    	return new arguments.callee(arguments);
  	}

  	var self = this;

  	var postitID = id;
  	var spot;
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