String.prototype.format = function() {

  var string = this;

  jQuery(arguments).each(function() {
    string = string.replace(/%s/, this);
  });

  return string;
};

String.prototype.capitalize = function() {
  var string = this;

  string = string.replace(/-/g, ' ');
  string = string.replace(/_/g, ' ');
  string = string.replace(/\w+/g, function(s) {
    return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
  });

  return string;
};

String.prototype.repeat = function(times) {
	for(var i = 0, buffer = ""; i < times; i++ ) buffer += this;
	return buffer;
};

String.prototype.ljust = function(width, padding) {
	padding = padding || " ";
	padding = padding.substr(0, 1);
	if (this.length < width)
		return this + padding.repeat(width - this.length);
	else
		return this;
};

String.prototype.rjust = function(width, padding) {
	padding = padding || " ";
	padding = padding.substr(0, 1);
	if (this.length < width)
		return padding.repeat(width - this.length) + this;
	else
		return this;
};

Array.prototype.isEmpty = function(){
  return this.length == 0;
};

window.isNumber = function(obj){
  return !isNaN(parseFloat(obj)) && isFinite(obj);
};