/*
par dictateurfou
info: je vous déconseil de modifier ce script au risque de le rendre disfonctionel tout a été créer de facion automatiser pour que vous n'ayez juste a modifier le css
 */
var post = ["titre", {ul : 'defaut', li:'defaut', h2:'defaut', container:'defaut'},{name:"sortir vehicule svp je e kle redirais pas une troiseme fois",type:"server",action:"mineur:getCar"},{name:"test loooooooooooonnnnnng",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"},{name:"test2",type:"server",action:"mineur:getCar"}];
var pos = 0;
var tabMemory = [];
var open = false;
var posReturn = 0;





function decendre(){
	var max = $('li').length + 1;
	var active = Number($('.active').attr('id'));

	if(active < max){
		final = Number(active) + 1;
		$('.active').removeClass('active');
		$('#'+ final +'').addClass('active');
		var positionScroll = $('#liste').scrollTop();
		var heightLi = $('#'+ final +'').outerHeight(true);
		var topLi = $('#'+ final +'').position().top;
		var h2Height = $('h2').outerHeight(true);
		var h2top = $('h2').position().top;
		var hauteurLi = topLi - h2Height - h2top;
		var finLi = hauteurLi + heightLi;
		console.log(finLi);
		if(finLi > $('ul').outerHeight()){
			console.log('âsse');
			$('#liste').animate({
        		scrollTop: positionScroll + (finLi - heightLi)
    		},  600);
		}

	}

	active = $('#'+ final +'');
	var type = active.data('type');
	var id = Number(active.attr('id'));
	if(type == 'execute'){
		var argument = post[id].arg;
		$.post('http://menu_builder/client', JSON.stringify({
                arg : argument,
                action : argument.execute,
        }));
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

	active = $('#'+ final +'');
	var type = active.data('type');
	var id = Number(active.attr('id'));
	if(type == 'execute'){
		var argument = post[id].arg;
		$.post('http://menu_builder/client', JSON.stringify({
                arg : argument,
                action : argument.execute,
        }));
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

	else if(type == "execute"){
		$.post('http://menu_builder/client', JSON.stringify({
                arg : argument,
                action : action,
        }));
	}

	else if(type == "sous-menu"){
		menuOpen(argument)
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
	var position = $('#liste').scrollTop(0);
	var liClasse = tab[1].li;
	var ulClasse = tab[1].ul;
	var h2Classe = tab[1].h2;
	var style = {li:liClasse,ul:ulClasse,h2:h2Classe};

	if(typeof tab[1].container !== 'undefined'){
		var containerClasse = tab[1].container;
		style = {li:liClasse,ul:ulClasse,h2:h2Classe,container:containerClasse};
		$('#container').removeClass();
		$('#container').addClass(style.container)
	}
	
	if(open == false){
		open = true;
		tabMemory = [post];
		posReturn = 0
	}
	else if(open == true){
		posReturn++;
		var i = 0;
		var existe = false
		while(i < tabMemory.length){
			if(tabMemory[i][0] == tab[0]){
				tabMemory[i] = post;
				existe = true
			}
		i++;
		}
		if(existe == false){
			tabMemory.push(post)
		}
	}



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


function createNew(tab){
	$('#titre-menu').html(tab[0]);
	post = tab;
	$('body').show();
	var position = $('#liste').scrollTop(0);
	var liClasse = tab[1].li;
	var ulClasse = tab[1].ul;
	var h2Classe = tab[1].h2;
	var style = {li:liClasse,ul:ulClasse,h2:h2Classe};

	if(typeof tab[1].container !== 'undefined'){
		var containerClasse = tab[1].container;
		style = {li:liClasse,ul:ulClasse,h2:h2Classe,container:containerClasse};
		$('#container').removeClass();
		$('#container').addClass(style.container)
	}

	open = true;
	tabMemory = [post];
	posReturn = 0;
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

		if(typeof mess.createNew !== 'undefined'){
			createNew(mess.createNew);
		}


		if(typeof mess.close !== 'undefined'){
			if(posReturn == 0){
				$('body').hide();
				open = false;
				$.post('http://menu_builder/close', JSON.stringify({
    			}));
			}
			else{
				tabMemory.splice(posReturn, 1);
				posReturn = posReturn - 1;
				menuOpen(tabMemory[posReturn])
				posReturn = posReturn - 1;
			}
			
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




/* for test in navigator */

/*
menuOpen(post);
document.onkeydown = function(data) {


    if(data.which == 38){//haut
    	monter();
    
    }

    if(data.which == 40){//down
    	decendre();
    }

};

*/