var Color = ['green','red','orange'];
var numberOfMoves = 0;

function  makeDisk(lastPositionX: number, lastPositionY: number, diskColor: string, id: number){
    const diskElement = document.createElement("div");
    diskElement.style.top =  lastPositionX + 'px';
    diskElement.style.left =  lastPositionY + 'px';
    diskElement.style.width = '100px';
    diskElement.style.height = '30px';
    diskElement.style.borderRadius = '50%';
    diskElement.style.backgroundColor = diskColor;
    diskElement.style.position = 'absolute';
    diskElement.style.zIndex = '100';
    diskElement.id = 'temp'+ diskColor + id;
    return diskElement;
}

var colorMap: any = [];
function randColorFun(){
    let cnt = 100;
    while(cnt--){
        const randNumber = Math.floor(Math.random() * 3);
        console.log(colorMap[Color[randNumber]]);
        if(!colorMap[Color[randNumber]] ){
            colorMap[Color[randNumber]] = 1;
        } 
        else if(colorMap[Color[randNumber]] <= 3){

            colorMap[Color[randNumber]]++;
            return Color[randNumber];
        }
    }
    return 'white';
}

var idMap: any = [];
function addingDiskRandomly(lastPositionX: any,lastPositionY: any){
    const firstPoll  = document.getElementById('first-poll');
    const secondPoll = document.getElementById('second-poll');
    const thirdPoll  = document.getElementById('third-poll');
    let spaceGap = 0;
    colorMap = [];
    idMap = [];
    for(let i = 0; i< 3 ;i ++){
        const randColor  = randColorFun();
        const randColor1 = randColorFun();
        const randColor2 = randColorFun();
        let tempo = 100, id = 0;
        while(tempo--){
            const randNumber = Math.floor(Math.random() * 9);
            if(!idMap[randNumber]){
                id = randNumber;
                idMap[randNumber] = 1;
                break;
            }
            else if(idMap[randNumber]<=9){
                id = randNumber;
                break;
            }
        }
        const diskElement   = makeDisk(lastPositionX-spaceGap,lastPositionY,randColor,id);
        const diskElement1  = makeDisk(lastPositionX-spaceGap,lastPositionY,randColor1,id);
        const diskElement2  = makeDisk(lastPositionX-spaceGap,lastPositionY,randColor2,id);
        firstPoll?.appendChild(diskElement);
        secondPoll?.appendChild(diskElement1);
        thirdPoll?.appendChild(diskElement2);
        spaceGap += 30;
    }
}

function removeDisk(){
    $('#first-poll').children().each( function(){
       
        if($(this).attr('id') !== 'pollStick' && $(this).attr('id') !== 'pollBase'){
            $(this).remove();
        }
    });
    $('#second-poll').children().each( function(){
        if($(this).attr('id') !== 'pollStick1' && $(this).attr('id') !== 'pollBase1'){
            $(this).remove();
        }
    });
    
    $('#third-poll').children().each( function(){
        if($(this).attr('id') !== 'pollStick2' && $(this).attr('id') !== 'pollBase2'){
            $(this).remove();
        }
    });
}

function makeRevertable(){
    const firstPoll  = $('#first-poll > div::last-child');
    const secondPoll =  $('#second-poll > div::last-child');
    const thirdPoll  =  $('#third-poll > div::last-child');
    firstPoll.draggable({
        revert: true
    });
    secondPoll.draggable({
        revert: true
    });
    thirdPoll.draggable({
        revert: true
    });    
}



function makeUnDraggable(last: boolean) {
    $('#first-poll').children().each( function(){
        $(this).draggable('disable');
    });
    $('#second-poll').children().each( function(){
        $(this).draggable('disable');
    });
    
    $('#third-poll').children().each( function(){
        $(this).draggable('disable');
    });
    if(!last){
        const firstPoll  = $('#first-poll > div::last-child');
        const secondPoll =  $('#second-poll > div::last-child');
        const thirdPoll  =  $('#third-poll > div::last-child');
        firstPoll.draggable('enable');
        secondPoll.draggable('enable');
        thirdPoll.draggable('enable');
    }
}

function makeDraggable(){
    const firstPoll  = $('#first-poll > div::last-child');
    const secondPoll =  $('#second-poll > div::last-child');
    const thirdPoll  =  $('#third-poll > div::last-child');
    firstPoll.draggable();
    secondPoll.draggable();
    thirdPoll.draggable();
}

//Dropable Functionality 
$( function() {
    $('#first-poll').droppable({
        activate: function(event, ui){
            makeRevertable();
            $('#first-poll').addClass('dropHover');
        },
        deactivate: function(event, ui){
            $('#first-poll').removeClass('dropHover');
        },
        tolerance: "touch",
        drop: function(event, ui){
            var tolerance = $( "#first-poll" ).droppable( "option", "tolerance" );
            if(tolerance === 'touch'){
                ui.draggable.draggable( 'option', 'revert', false );
                var tempTop = $('#first-poll > div::last-child').position().top;
                tempTop -= 30;
                const item = ui.draggable.css('top', tempTop).css('left','52px');
                if(ui.draggable.parent().attr('id') === 'first-poll'){
                    makeUnDraggable(false);
                    makeDraggable();
                    makeRevertable();
                }
                else{
                    $(this).append(item);
                    makeUnDraggable(false);
                    makeDraggable();
                    numberOfMoves++;
                    $('#move').text(numberOfMoves.toString());
                }
                makeDraggable();
                console.log($('#first-poll > div::last-child'));
            }
        }
    });
    
    $('#second-poll').droppable({
        activate: function(event, ui){
            makeRevertable();
            $('#second-poll').addClass('dropHover');
        },
        deactivate: function(event, ui){
            $('#second-poll').removeClass('dropHover');
        },
        tolerance: "touch",
        drop: function(event, ui){
            var tolerance = $( "#second-poll" ).droppable( "option", "tolerance" );
            if(tolerance === 'touch'){
                ui.draggable.draggable( 'option', 'revert', false );
                var tempTop = $('#second-poll > div::last-child').position().top;
                tempTop -= 30;
                const item = ui.draggable.css('top', tempTop).css('left','52px');
                if(ui.draggable.parent().attr('id') === 'second-poll'){
                    makeUnDraggable(false);
                    makeDraggable();
                    makeRevertable();
                }
                else{
                    $(this).append(item);
                    makeUnDraggable(false);
                    makeDraggable();
                    numberOfMoves++;
                    $('#move').text(numberOfMoves.toString());
                }
                makeDraggable();
            }
        }
    });

    $('#third-poll').droppable({
        activate: function(event, ui){
            makeRevertable();
            $('#third-poll').addClass('dropHover');
        },
        deactivate: function(event, ui){
            $('#third-poll').removeClass('dropHover');
        },
        tolerance: "touch",
        drop: function(event, ui){
            var tolerance = $( "#third-poll" ).droppable( "option", "tolerance" );
            if(tolerance === 'touch'){
                ui.draggable.draggable( 'option', 'revert', false );
                var tempTop = $('#third-poll > div::last-child').position().top;
                tempTop -= 30;
                const item = ui.draggable.css('top', tempTop).css('left','52px');
                if(ui.draggable.parent().attr('id') === 'third-poll'){
                    makeUnDraggable(false);
                    makeDraggable();
                    makeRevertable();
                }
                else{
                    $(this).append(item);
                    makeUnDraggable(false);
                    makeDraggable();
                    numberOfMoves++;
                    $('#move').text(numberOfMoves.toString());
                }
                makeDraggable();
            }
        }
    });
    
} );

function gameStatus(){
    const firstPoll  = $('#first-poll > div::last-child').css('backgroundColor');
    const secondPoll =  $('#second-poll > div::last-child').css('backgroundColor');
    const thirdPoll  =  $('#third-poll > div::last-child').css('backgroundColor');
    console.log(firstPoll, secondPoll, thirdPoll);
    let cnt1 = 0 , cnt2 = 0, cnt3 = 0;
    $('#first-poll').children().each( function(){
        if($(this).css('backgroundColor') !== firstPoll) {
            cnt1++;
        }
    });
    $('#second-poll').children().each( function(){
        if($(this).css('backgroundColor') !== secondPoll) {
            cnt2++;
        }
    });
    
    $('#third-poll').children().each( function(){
        if($(this).css('backgroundColor') !== thirdPoll) {
            cnt3++;
        }
    });
    if(cnt1 || cnt2 || cnt3)return 0;
    return 1;
}


function clockTimer(){
    $('#btn').attr('disabled','true');
    var timeLeft = 120; ///Timer
    var timer = setInterval(function () {
        if(gameStatus()){
            clearInterval(timer);
            timeLeft = 0;
            $('.wining-msg').css('display', 'block');
            $('#timer').text('00:00');
            $('#btn').removeAttr('disabled');
            makeUnDraggable(true);
        }
        else if(timeLeft===0){
            clearInterval(timer);
            timeLeft = 0;
            $('.losing-msg').css('display', 'block');
            $('#timer').text('00:00');
            $('#btn').removeAttr('disabled');
            makeUnDraggable(true);
        }
        var timeleft = timeLeft--;
        var timeleft1 = Math.floor(timeleft/60); 
        var timeleft2 = timeleft%60; 
        var result =  '0'+timeleft1.toString() + ' : ' + ((timeleft2<10)? '0': '') + timeleft2.toString() ; 
        $('#timer').text(result);
    }, 1000);
}


//Game Start
addingDiskRandomly(261,52);
///Start Button
document.getElementById('btn')?.addEventListener('click',()=>{
    $('#move').text("0");
    numberOfMoves = 0;
    removeDisk();
    addingDiskRandomly(261,52);
    makeDraggable();
    clockTimer(); 
    $('.wining-msg').css('display', 'none');
    $('.losing-msg').css('display', 'none');
});
