
$(function() {
      stack = Swing.Stack(); //load Swing library
      var data = [ 'Card 1','Card 2','Card 3', 'Card 4', 'Card 5' ];

      //Current position in Array
      var pos = 0;
      // How many cards should be rendered in DOM
      var cardsToRender = 3;
      var cardTemplate = $('#dummycard').clone();
      $('#dummycard').remove();
      // Reduce if there is less data than cards
      if(data.length < cardsToRender) {
        cardsToRender = data.length;
      }

      for(i=0;i<cardsToRender;i++) {
        addNewCard(data[i],i);
      }

      function addNewCard(data,id) {
        var newCard = $(cardTemplate).clone();
        $(newCard).find('.content').html(data);
        $(newCard).attr('id','card_' + id);
        $('.stack').prepend($(newCard));
        stack.createCard(document.getElementById('card_' + id));
      }

      function populateStack() {
        pos++;
        var newPos = pos + $('.card').length;
        if(newPos < data.length) {
          addNewCard(data[newPos],newPos);
        }
      }
      //When card has been thrown out and animation has ended
      stack.on('throwoutend', function(e) {
         // Remove swing eventlisteners from card
         stack.getCard(e.target).destroy();
        //Fade out card and remove it from DOM afterwards
         var transX = parseInt($(e.target).css('transform').split(',')[4]);
        var transY = parseInt($(e.target).css('transform').split(',')[5]);
        $(e.target).css({'transform' : 'translate(' + transX + 'px,' + 500 + 'px)',"transition": "transform 400ms ease-in"});
         $(e.target).animate({ 'opacity' : 0} ,400, function() { 
           $(this).remove(); 
           populateStack();    
         }); 
      });

      $('#btntrue').on('click',function(){
         stack.getCard(document.getElementById('card_' + pos)).throwOut(1, 0);
      });
       $('#btnfalse').on('click',function(){
         stack.getCard(document.getElementById('card_' + pos)).throwOut(-1, 0);
      });
    });

