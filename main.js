var counter1 = 1;
var counter2 = 0;
moment.lang('en', {
    calendar : {
        lastDay : '[Yesterday at] LT',
        sameDay : '[Today]',
        nextDay : '[Tomorrow]',
        lastWeek : '[last] dddd [at] LT',
        nextWeek : 'dddd MMMM Do',
        sameElse : 'L'
    }
});

function displayDays(){

	for (var i = 0; i <	7; i++) {
		var day = $(' \
		<div class="day"> \
		<h4>'+moment().add('days', counter2).calendar()+'</h4> \
		<div class="tasks"> \
		<img src="http://cdn.flaticon.com/png/256/32360.png" alt="add item" class="add-item"> \
		<p style="max-width: 60%;" class="task-description">Just do something!</p> \
		</div> \
		</div> \
		');
		$('.container').append(day);
		counter2++;
	};
}
function isScrolledIntoView(elem){
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function addAppoint(){
	var task = $('<p class="editable" contenteditable="true" ></p>').css({maxWidth: '60%', color: 'gray'});
	$(arguments[0]).after(task);
	counter1++;
}

$(document).on('ready', function() {
	displayDays();
	$(document).on('scroll', function(){
		if(isScrolledIntoView($('.day:last'))){
			displayDays();
		};
	});
	$(document).on({
		mouseenter: function(){
			$(this).find('.add-item').toggle();
		},
		mouseleave: function(){
			$(this).find('.add-item').toggle();
		}
		},'.day');
	$(document).on('click', '.add-item', function(event){
		addAppoint(this);
		$('.editable:first').focus();
		$('.editable:first').blur(function(event){
			if($('.editable:first').text() === ''){
				$('.editable:first').remove();
			}else{
				$('.editable:first').attr({contenteditable: false});
        		$('.editable:first').css('color', 'black');
			}
		});
	});
	$(document).keypress('p', function(event){
		if(event.which === 13) {
			if($('p:first').text() !== ''){
				$('p').attr({contenteditable: false});
        		$('p').css('color', 'black');
			}else{
				$('p:first').remove();
			}
    	}
	});
});
