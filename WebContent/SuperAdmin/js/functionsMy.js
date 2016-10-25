$(document).ready(function () {

    //--------------------µã»÷Æô¶¯ Í£Ö¹°´Å¥----------------


    /* --------------------------------------------------------
	Template Settings
    -----------------------------------------------------------*/
    
    var settings =  '<a id="settings" href="#changeSkin" data-toggle="modal">' +
			'<i class="fa fa-gear"></i> Change Skin' +
		    '</a>' +   
		    '<div class="modal fade" id="changeSkin" tabindex="-1" role="dialog" aria-hidden="true">' +
			'<div class="modal-dialog modal-lg">' +
			    '<div class="modal-content">' +
				'<div class="modal-header">' +
				    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
				    '<h4 class="modal-title">Change Template Skin</h4>' +
				'</div>' +
				'<div class="modal-body">' +
				    '<div class="row template-skins">' +
					'<a data-skin="skin-blur-violate" class="col-sm-2 col-xs-4" href="">' +
					    '<img src="img/skin-violate.jpg" alt="">' +
					'</a>' +
					'<a data-skin="skin-blur-lights" class="col-sm-2 col-xs-4" href="">' +
					    '<img src="img/skin-lights.jpg" alt="">' +
					'</a>' +
					'<a data-skin="skin-blur-city" class="col-sm-2 col-xs-4" href="">' +
					    '<img src="img/skin-city.jpg" alt="">' +
					'</a>' +
					'<a data-skin="skin-blur-greenish" class="col-sm-2 col-xs-4" href="">' +
					    '<img src="img/skin-greenish.jpg" alt="">' +
					'</a>' +
					'<a data-skin="skin-blur-night" class="col-sm-2 col-xs-4" href="">' +
					    '<img src="img/skin-night.jpg" alt="">' +
					'</a>' +
					'<a data-skin="skin-blur-blue" class="col-sm-2 col-xs-4" href="">' +
					    '<img src="img/skin-blue.jpg" alt="">' +
					'</a>' +
					'<a data-skin="skin-blur-sunny" class="col-sm-2 col-xs-4" href="">' +
					    '<img src="img/skin-sunny.jpg" alt="">' +
					'</a>' +
					'<a data-skin="skin-cloth" class="col-sm-2 col-xs-4" href="">' +
					    '<img src="img/skin-cloth.jpg" alt="">' +
					'</a>' +
					'<a data-skin="skin-tectile" class="col-sm-2 col-xs-4" href="">' +
					    '<img src="img/skin-tectile.jpg" alt="">' +
					'</a>' +
					'<a data-skin="skin-blur-chrome" class="col-sm-2 col-xs-4" href="">' +
					    '<img src="img/skin-chrome.jpg" alt="">' +
					'</a>' +
					'<a data-skin="skin-blur-ocean" class="col-sm-2 col-xs-4" href="">' +
					    '<img src="img/skin-ocean.jpg" alt="">' +
					'</a>' +
					'<a data-skin="skin-blur-sunset" class="col-sm-2 col-xs-4" href="">' +
					    '<img src="img/skin-sunset.jpg" alt="">' +
					'</a>' +
					'<a data-skin="skin-blur-yellow" class="col-sm-2 col-xs-4" href="">' +
					    '<img src="img/skin-yellow.jpg" alt="">' +
					'</a>' +
					'<a  data-skin="skin-blur-kiwi"class="col-sm-2 col-xs-4" href="">' +
					    '<img src="img/skin-kiwi.jpg" alt="">' +
					'</a>' +
				    '</div>' +
				'</div>' +
			    '</div>' +
			'</div>' +
		    '</div>';
    $('#main').prepend(settings);
            
    $('body').on('click', '.template-skins > a', function(e){
	e.preventDefault();
	var skin = $(this).data('skin');
	$('body').attr('id', skin);
	$('#changeSkin').modal('hide');
    });
    
    /* --------------------------------------------------------
	Components
    -----------------------------------------------------------*/
    (function(){
        /* Textarea */
	if($('.auto-size')[0]) {
	    $('.auto-size').autosize();
	}

        //Select
	if($('.select')[0]) {
	    $('.select').selectpicker();
	}
        
        //Sortable
        if($('.sortable')[0]) {
	    $('.sortable').sortable();
	}
	
        //Tag Select
	if($('.tag-select')[0]) {
	    $('.tag-select').chosen();
	}
        
        /* Tab */
	if($('.tab')[0]) {
	    $('.tab a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	    });
	}
        
        /* Collapse */
	if($('.collapse')[0]) {
	    $('.collapse').collapse();
	}
        
        /* Accordion */
        $('.panel-collapse').on('shown.bs.collapse', function () {
            $(this).prev().find('.panel-title a').removeClass('active');
        });

        $('.panel-collapse').on('hidden.bs.collapse', function () {
            $(this).prev().find('.panel-title a').addClass('active');
        });

        //Popover
    	if($('.pover')[0]) {
    	    $('.pover').popover();
    	} 
    })();

    /* --------------------------------------------------------
	Sidebar + Menu
    -----------------------------------------------------------*/
    (function(){
        /* Menu Toggle */
        $('body').on('click touchstart', '#menu-toggle', function(e){
            e.preventDefault();
            $('html').toggleClass('menu-active');
            $('#sidebar').toggleClass('toggled');
            //$('#content').toggleClass('m-0');
        });
         
        /* Active Menu */
        $('#sidebar .menu-item').hover(function(){
            $(this).closest('.dropdown').addClass('hovered');
        }, function(){
            $(this).closest('.dropdown').removeClass('hovered');
        });

        /* Prevent */
        $('.side-menu .dropdown > a').click(function(e){
            e.preventDefault();
        });
	

    })();


    /* --------------------------------------------------------
	Custom Scrollbar
    -----------------------------------------------------------*/
    (function() {
	if($('.overflow')[0]) {
	    var overflowRegular, overflowInvisible = false;
	    overflowRegular = $('.overflow').niceScroll();
	}
    })();

    
    /* --------------------------------------------------------
     Checkbox + Radio
     -----------------------------------------------------------*/
    if($('input:checkbox, input:radio')[0]) {
    	
	//Checkbox + Radio skin
	$('input:checkbox:not([data-toggle="buttons"] input, .make-switch input), input:radio:not([data-toggle="buttons"] input)').iCheck({
		    checkboxClass: 'icheckbox_minimal',
		    radioClass: 'iradio_minimal',
		    increaseArea: '20%' // optional
	});
    
	//Checkbox listing
	var parentCheck = $('.list-parent-check');
	var listCheck = $('.list-check');
    
	parentCheck.on('ifChecked', function(){
		$(this).closest('.list-container').find('.list-check').iCheck('check');
	});
    
	parentCheck.on('ifClicked', function(){
		$(this).closest('.list-container').find('.list-check').iCheck('uncheck');
	});
    
	listCheck.on('ifChecked', function(){
		    var parent = $(this).closest('.list-container').find('.list-parent-check');
		    var thisCheck = $(this).closest('.list-container').find('.list-check');
		    var thisChecked = $(this).closest('.list-container').find('.list-check:checked');
	    
		    if(thisCheck.length == thisChecked.length) {
			parent.iCheck('check');
		    }
	});
    
	listCheck.on('ifUnchecked', function(){
		    var parent = $(this).closest('.list-container').find('.list-parent-check');
		    parent.iCheck('uncheck');
	});
    
	listCheck.on('ifChanged', function(){
		    var thisChecked = $(this).closest('.list-container').find('.list-check:checked');
		    var showon = $(this).closest('.list-container').find('.show-on');
		    if(thisChecked.length > 0 ) {
			showon.show();
		    }
		    else {
			showon.hide();
		    }
	});
	   
    }
    
    /* --------------------------------------------------------
        MAC Hack 
    -----------------------------------------------------------*/
    (function(){
	//Mac only
        if(navigator.userAgent.indexOf('Mac') > 0) {
            $('body').addClass('mac-os');
        }
    })();
    
});


$(window).load(function(){
    /* --------------------------------------------------------
     Tooltips
     -----------------------------------------------------------*/
    (function(){
        if($('.tooltips')[0]) {
            $('.tooltips').tooltip();
        }
    })();

    /* --------------------------------------------------------
     Animate numbers
     -----------------------------------------------------------*/
    $('.quick-stats').each(function(){
        var target = $(this).find('h2');
        var toAnimate = $(this).find('h2').attr('data-value');
        // Animate the element's value from x to y:
        $({someValue: 0}).animate({someValue: toAnimate}, {
            duration: 1000,
            easing:'swing', // can be anything
            step: function() { // called on every step
                // Update the element's text with rounded-up value:
                target.text(commaSeparateNumber(Math.round(this.someValue)));
            }
        });

        function commaSeparateNumber(val){
            while (/(\d+)(\d{3})/.test(val.toString())){
                val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            }
            return val;
        }
    });
    
});
