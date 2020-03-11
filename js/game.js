'use strict'
$('.back').hide()

let game_state = 0
let moves_left =  0
let score =  0
let high_score = 0
let paired_matches = 0
let myTime = null

let flipped_cards = []

let card_positions = []
let cards_remaining = []

$(document).on('click','.game-toggle',function(){
    if(game_state===0)
    {
        $(this).text('Stop Game')
        game_state = 1
        init_game()

    }else if(confirm('Are you sure')){
        stop_game()
    }
   console.log('game-state toggled')

})

$('card').on('click',flip_card)

function init_game()
{
    let start = new Date().getTime()
    myTime = setInterval(()=>{

        $('#timer').val( new Date().getTime() - start )
    },500)
    load_cards()
    moves_left = 12
    $('#moves').val(moves_left)
    console.log(cards_remaining)

    for(let i = 0; i < 16;i++)
    {
        let random_index = hold_position()
        card_positions[i] = cards_remaining[random_index]
        cards_remaining.splice(random_index,1)
    }
    console.log(card_positions)
}

function update_highScore()
{
    if(score > high_score)
    {
        high_score = score
        $('#high-score').val(high_score)
    }
}
function load_cards()
{
    let j = 1;
    for(let i=0;i<15;i=i+2)
    {
        cards_remaining[i] = 'a'+j+'.png'
        cards_remaining[i+1] = 'a'+j+'.png'
        j++
    }
}

function hold_position()
{
    return Math.floor(Math.random() * Math.floor(cards_remaining.length));
}

function flip_card(ev)
{

    if(game_state === 1)
    {
        if($(this).attr('card_state') === 'closed' && $('card[card_state="open"]').length < 2)
        {
            let this_position = $(this).attr('stack-position')
            let card = $(this).find('img').eq(0)

            card.removeClass('reverse-flip')
            card.addClass('flip')
            setTimeout(()=>{card.attr('src','images/'+card_positions[this_position])},500)
            $(this).attr('card_state','open')

            if($('card[card_state="open"]').length === 2)
            {
                match_cards()
            }
        }
    }
}

function match_cards()
{
    moves_left -= 1
    $('#moves').val(moves_left)

    let first_card = $('card[card_state="open"]')[0]
    let first_card_position = $(first_card).attr('stack-position')

    let second_card = $('card[card_state="open"]')[1]
    let second_card_position = $(second_card).attr('stack-position')

    if(card_positions[first_card_position] === card_positions[second_card_position])
    {
        score += 10
        $(first_card).attr('card_state','solved')
        $(second_card).attr('card_state','solved')
        paired_matches +=1
        if(paired_matches === 8)
        {
            setTimeout(()=>{
                alert('Game Finished. Your Score: '+score)
                stop_game()
            },2000)

        } if(moves_left === 0)
        {
            setTimeout(()=>{
                alert('You are out of Moves. Your Score: '+score)
                stop_game()
            },2000)

        }
    }else{
        score -= 1

        setTimeout(resetDeck,4000)
        if(moves_left === 0)
        {
            setTimeout(()=>{
                alert('You are out of Moves. Your Score: '+score)
                stop_game()
            },2000)

        }
    }
    $('#score').val(score)
}
function resetDeck()
{

    let first_card = $('card[card_state="open"]')[0]
    let second_card = $('card[card_state="open"]')[1]

    $(first_card).attr('card_state','closed')
    $(second_card).attr('card_state','closed')
    $(first_card).find('img').eq(0).removeClass('flip')
    $(first_card).find('img').eq(0).addClass('reverse-flip')

    $(second_card).find('img').eq(0).removeClass('flip')
    $(second_card).find('img').eq(0).addClass('reverse-flip')

    setTimeout(()=>{
        $(first_card).find('img').eq(0).attr('src','images/a0.png')

        $(second_card).find('img').eq(0).attr('src','images/a0.png')

    },500)

  }

  function stop_game()
  {
      clearInterval(myTime)
      update_highScore()
      $('img').removeClass('flip')

      $('.game-toggle').text('New Game')
      game_state = 0
      $('card').attr('card_state','closed')
      $('img').attr('src','images/a0.png')
      $('#moves').val(0)
      $('#score').val(0)
      update_highScore()
      score = 0
  }