function Spot(label)
{
	if (! (this instanceof arguments.callee)) {
    	return new arguments.callee(arguments);
  	}

  	var self = this;
  	var label = label;  	
}

