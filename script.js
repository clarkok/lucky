function pad(n){
    n    = n+'';
    return    n.length>=3 ? n:new Array(4-n.length).join('0')+n;
}

$(document).ready(function(){
    var    anss    = [];
    var    drawer    = null;
    var    num    = $('#nump');
    var    rest    = -1;
    var    total    = 0;
    var    level    = 0;
    var    need_new= true;
    $('#total').blur(function(){
        for (i=1; i<=$('input#total').val(); i++)
            anss[i]    = false;
    });
    $("#cnt").val(1);
    $("#start").click(function(){
        console.debug("started");
        if (drawer === null){
            rest    = -1;
            drawer    = setInterval(function(){
                if (!rest){
                    clearInterval(drawer);
                    drawer    = null;
                    $('#ans').prepend('<p>');
                    return;
                }
                if (total >= $('input#total').val()){
                    $('p#nump').html('抽完了QAQ');
                    clearInterval(drawer);
                    drawer    = null;
                    return;
                }
                rand    = Math.floor(Math.random() * $('input#total').val())+1;
                while (anss[rand]){
                    if (++rand > 216)
                        rand    = 1;
                }
                if (rest > 0){
                    total++;
                    anss[rand]    = true;
                    rand    = pad(rand);
                    console.debug(rest);
                    $('#ans').prepend(rand+' ');
                    rest--;
                }
                rand    = pad(rand);
                num.html(rand);
            }, 80);
            $("#start").html('停止');
        } else {
            if (need_new){
                $('#anssheel').prepend('<div id="ans" class="answers"></div>');
                need_new    = false;
            }
            rest    = $('#cnt').val();
            $('#ans').prepend('</p>');
            $("#start").html('开始');
        }
    });
    $('input#prize').blur(function(){
        if (!$(this).val())
            $(this).val('特等奖');
        $('button#level').html($(this).val());
    });
    $('#level').click(function(){
        level++;
        need_new    = true;
        $('#ans').animate({'top':'-8em'});
        $('.answers').unbind("click").click(function(){
            $(this).animate({'top':'0'});
            $(this).attr('id', '#'+(level-1));
        });
        if (level <= 4){
            $('#ans').prepend('<h2>'+$('input#prize').val()+'</h2>');
        }
        else {
            $('#num').animate({'opacity':'0'}, 'fast', function(){$('#num').hide();});
            $('#anssheel *').stop().css({'top': '0px'});
            $('#anssheel').animate({'top': '0'});
        }
    });
});
