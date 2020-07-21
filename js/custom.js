// API 상세설명 더보기 OR 접기
function boxDetailCt(){
    var iboxDetail = $('.box-detail'),
        openName = 'open';

    iboxDetail.each(function(){
        $(this).find('.txt').height() >= 1
            ? $(this).find('.txt').height() > parseInt($(this).find('.txt').css('line-height')) * 2 && $(this).addClass('txt-hide')
            : $(this).hide();
    });

    $('body').on('click', '.box-detail .more', function() {
        !$(this).prev().hasClass(openName)
            ? $(this).text('접기').prev().addClass(openName)
            : $(this).text('더보기').prev().removeClass(openName);
        return false;
    });
};

// gnb menu
function commonMenuCtl(){
    var gnbMenu = $('.gnb-menu'),
        gnbMenuB = gnbMenu.find('> li > a'),
        selectName = 'active';
    gnbMenu.find('.on').addClass(selectName);
    gnbMenuB.on('click', function(){
        if ($('body').hasClass('mini-navbar')){return false;}
        $(this).parent().siblings().find('> a').removeClass(selectName).parent().find('.dept2').slideUp(200);
        $(this).hasClass(selectName)
            ? $(this).next().parent().find('.dept2').slideUp(200, function() {
                $(this).parent().find('>a').removeClass(selectName);
            })
            : $(this).next().parent().find('.dept2').slideDown(200, function(){
                $(this).parent().find('>a').addClass(selectName);
            });
    });
};

// modal body maxheight
function setModalMaxHeight(element) {
    this.$element = $(element);
    this.$content = this.$element.find('.modal-content');
    var borderWidth = this.$content.outerHeight() - this.$content.innerHeight();
    var dialogMargin = $(window).width() < 768 ? 20 : 60;
    var contentHeight = $(window).height() - (dialogMargin + borderWidth);
    var headerHeight = this.$element.find('.modal-header').outerHeight() || 0;
    var footerHeight = this.$element.find('.modal-footer').outerHeight() || 0;
    var maxHeight = contentHeight - (headerHeight + footerHeight);

    this.$content.css({
        'overflow': 'hidden'
    });

    this.$element
        .find('.modal-body').css({
            'max-height': maxHeight,
            'overflow-y': 'auto'
        });
};

$(document).ready(function(){
    $('.menu-ctrl').on('click', function(){
        $('.gnb-menu, h1').hide();
        var w = !$('body').hasClass('mini-navbar') ? 70 : 220;
        $('#header .logo, #container .leftCnt').stop().animate({ width: w });
        $('#header .header-top-groupt').stop().animate({ paddingLeft: w }, function(){
            $('.gnb-menu, h1').fadeIn(500);
        });
        $('body').toggleClass('mini-navbar');
        return false;
    });

    commonMenuCtl();
    
    $('[data-toggle="tooltip"]').tooltip();

    $('.data-picker .datepicker').datepicker({
        format: "yyyy.mm.dd",
        autoclose: true,
    });

    $('.modal').on('show.bs.modal', function () {
        $(this).show();
        setModalMaxHeight(this);
    });
});

$(window).resize(function () {
    if ($('.modal.in').length != 0) {
        setModalMaxHeight($('.modal.in'));
    }
});