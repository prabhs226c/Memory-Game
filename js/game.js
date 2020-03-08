$(document).on('click','.game-toggle',function(){
    if($(this).attr('game-state')==0)
    {
        $(this).text('Stop Game')
        $(this).attr('game-state',1)
    }else{
        $(this).text('New Game')
        $(this).attr('game-state',0)
    }
   console.log('game-state toggled')

})

