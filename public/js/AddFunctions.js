//JS criado somente para adicionar funções aos objetos ja existentes no JavaScript

Array.prototype.each = function(fun)
{
	var len = this.length;
    if (typeof fun != "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      fun.call(thisp, this[i], i, this);
    }
};