/*
par dictateurfou
info: calcul du top du premier li pour calculer le scroll a faire je vous déconseil de modifier la fonction monter et decendre vous pouvez modifier menuOpen pour le html
si vous voulez rajouter des classes spécific

 */
var post = ["titre", {ul : 'defaut', li:'defaut', h2:'defaut'},{name:"sortir vehicule",type:"server",action:"mineur:getCar"},{name:"test",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"}];
var pos = 0;


function decendre(){
	var max = $('li').length + 1;
	var active = Number($('.active').attr('id'));
	var hauteurLi = $('li:first-child').outerHeight(true);
	console.log('passe');
	console.log(active);
	console.log(max);
	if(active < max){
		console.log('passe2');
		final = Number(active) + 1;
		$('.active').removeClass('active');
		$('#'+ final +'').addClass('active');
		var position = $('#liste').scrollTop();
		var marginForScroll = $('#2').position().top;
		var positionFinalTop = $('#'+ final +'').position().top;
		var positionToScroll = positionFinalTop - marginForScroll;
		var positionAfterScroll = (positionFinalTop - marginForScroll - position);
		var positionWithHeight = (positionAfterScroll + hauteurLi);
		console.log(positionWithHeight);
		if(positionWithHeight > 350){
			$('#liste').animate({
        		scrollTop: (position + (positionWithHeight - hauteurLi))
    		},  600);
		}
	}

}



function monter(){
	var active = $('.active').attr('id');
	if(active > 2){
		final = Number(active) - 1;
		$('.active').removeClass('active');
		$('#'+ final +'').addClass('active');
		var position = $('#liste').scrollTop();
		var marginForScroll = $('#2').position().top;
		var positionFinalTop = $('#'+ final +'').position().top;
		var positionToScroll = positionFinalTop - marginForScroll;
		var positionAfterScroll = (positionFinalTop - marginForScroll - position);
		if(positionAfterScroll < 0){
			console.log('action scroll monter');
			$('#liste').animate({
        		scrollTop: positionToScroll
    		},  200);
		}
	}
}

function entrer(){
	var active = $('.active');
	var type = active.data('type');
	var action = active.data('action');
	var id = Number(active.attr('id'));
	var argument = post[id].arg;

	if(type == 'server'){
		$.post('http://menu_builder/server', JSON.stringify({
                arg : argument,
                action : action,
        }));
	}
	else if(type == 'client'){
		$.post('http://menu_builder/client', JSON.stringify({
                arg : argument,
                action : action,
        }));
	}

	else if(type == 'callback'){
		$.post('http://' + action + '', JSON.stringify({
                arg : argument,
        }));
	}
}
	


function menuOpen(tab){
	$('#titre-menu').html(tab[0]);
	post = tab;
	$('body').show();
	var liClasse = tab[1].li;
	var ulClasse = tab[1].ul;
	var h2Classe = tab[1].h2;
	var style = {li:liClasse,ul:ulClasse,h2:h2Classe};

	$('ul').removeClass();
	$('h2').removeClass();

	$('ul').addClass(style.ul);
	$('h2').addClass(style.h2);
	var i = 2;
	while(i < tab.length){
		if(i == 2){
			$('#liste').html('<li id="' + i + '" class="active ' + style.li + '" data-type="' + tab[i].type + '" data-action="' + tab[i].action + '">' + tab[i].name + '</li>');
		}
		else{
			$('#liste').append('<li id="' + i + '" class="' + style.li + '" data-type=' + tab[i].type + ' data-action=' + tab[i].action + '>' + tab[i].name + '</li>');
		}
		i++;
	}
}




$(function(){

    window.addEventListener("message", function(event) {
		var mess = event.data;
		if(typeof mess.create !== 'undefined'){
			menuOpen(mess.create);
		}

		if(typeof mess.close !== 'undefined'){
			$('body').hide();
		}

		if(typeof mess.top !== 'undefined'){
			monter();
		}

		if(typeof mess.down !== 'undefined'){
			decendre();
		}

		if(typeof mess.enter !== 'undefined'){
			entrer();
		}

    });

});


