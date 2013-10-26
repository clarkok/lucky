function pad(n){
	n	= n+'';
	return	n.length>=3 ? n:new Array(4-n.length).join('0')+n;
}

$(document).ready(function(){
	var	anss	= [];
	for (i=1; i<=216; i++)
		anss[i]	= false;
	var	drawer	= null;
	var	num	= $('#nump');
	var	rest	= -1;
	var	total	= 0;
	$("#cnt").val(1);
	$("#start").click(function(){
		console.debug("started");
		if (drawer === null){
			rest	= -1;
			drawer	= setInterval(function(){
				if (!rest){
					clearInterval(drawer);
					drawer	= null;
					return;
				}
				if (total >= 216){
					$('#ans').append("抽完了QAQ");
					clearInterval(drawer);
					drawer	= null;
					return;
				}
				rand	= Math.floor(Math.random() * 216)+1;
				while (anss[rand]){
					if (++rand > 216)
						rand	= 1;
				}
				if (rest > 0){
					total++;
					anss[rand]	= true;
					rand	= pad(rand);
					console.debug(rest);
					$('#ans').prepend(rand+' ');
					rest--;
				}
				rand	= pad(rand);
				num.html(rand);
			}, 80);
			$("#start").html('停止');
		} else {
			rest	= $('#cnt').val();
			$("#start").html('开始');
		}
	});
	$("#addhr").click(function(){
		$("#ans").prepend("<hr>");
	});
});
