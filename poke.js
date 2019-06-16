$(function () {
    let poke = [];
    let colorArr = ['s','h','d','c'];
    let flag = {};
    let box = $('.box');
    let first = null;
    for(let i=0;i<52;i++){
        let index = Math.floor(Math.random()*colorArr.length);
        let color = colorArr[index];
        let number = Math.round(Math.random()*12+1);
        while (flag[color+'_'+number]){
            index = Math.floor(Math.random()*colorArr.length);
            color = colorArr[index];
            number = Math.round(Math.random()*12+1);
        }
        poke.push({color,number});
        flag[color+'_'+number] = true;
    }
    let index = -1;
    for(let i=0;i<7;i++){
        for(let j=0;j<=i;j++){
            index++;
            let obj = poke[index];
            let lefts = 450-50*i+100*j , tops = 50 * i;
            $('<div>').addClass('poke')
                .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
                .appendTo('.box')
                .data('number',obj.number)
                .attr('id',i+'_'+j)
                .delay(index*10)
                .animate({left:lefts,top:tops})
        }
    }
    for(;index<52;index++){
        let obj = poke[index];
        $('<div>')
            .addClass('poke')
            .addClass('left')
            .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
            .appendTo('.box')
            .data('number',obj.number)
            .attr('id',-2+'_'+-2)
            .delay(index*10)
            .animate({left:200,top:480,opacity:1})
    }
    box.on('click','.poke',function () {
        let _this = $(this);
        let [i,j] = _this.attr('id').split('_');
        let id1 = i*1+1+'_'+j,id2 = i*1+1+'_'+(j*1+1);
        if($('#'+id1).length || $('#'+id2).length ){
            return ;
        }
        if(_this.hasClass('active')){
            $(this).removeClass('active').animate({top:'+=30px'})
        }else {
            $(this).addClass('active').animate({top: '-=30px'})
        }
        if(!first){
            first = _this;
        }else{
            let number1 = first.data('number'),number2 = _this.data('number');
            if(number1 + number2 === 14){
                $('.active').animate({top: 0, right: 200,opacity: 0},function () {
                    $(this).remove()
                })
            }else{
                $('.active').animate({top: '+=30'},function () {
                    $(this).removeClass('active')
                })

            }
            first = null;
        }
    });
    let n = 0;
    $('.rightBtn').on('click',function () {
        $('.left').last().css('zIndex',n++).animate({left:710},function () {
            $(this).removeClass('left').addClass('right')
        })
    });
    let m = 0;
    $('.leftBtn').on('click',function () {
        $('.right').first().css('zIndex',m++).animate({left:200},function () {
            $(this).removeClass('right').addClass('left')
        })
    })
});