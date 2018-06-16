(function($) {   // Returns whether or not a result set has results in it 
$.fn.outerHTML = function() {   return $('<div>').append( this.eq(0).clone() ).html(); };})(jQuery);