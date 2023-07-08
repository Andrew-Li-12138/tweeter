$(document).ready(function() {

  $("#tweet-text").on('keypress', function() {
    //wrap 'this' wit JQuery so text can have the text value of client's input in textarea
    const text = $(this).val();
    //calculate remaining count
    const textLength = text.length;
    const remainingCount = 140 - textLength;
    console.log(remainingCount);
    
    //traverse up the DOM tree from this to its parent
    const form = $(this).closest('form');
    //travel back down to find class .counter
    const counter = form.find('.counter');
    //change text with .counter's element <output> to remainingCount number
    counter.text(remainingCount)
    //specify what color to print out for number <0 and >0
    if (remainingCount < 0) {
      counter.css('color', 'red');
      } else {
        counter.css('color', 'black')
      }
  }); 
});
