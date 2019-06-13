$(function () {

    localStorage.clear();

    $('select').customSelect();

    $('.constructor-item-element:not(.disabled) path').on('mouseover', function () {
        var parent = $(this).parent();
        var parentId = parent.attr('data-id');
        if(parent.hasClass('with-logo')){
            var element = parent;
        }else{
            var element = $('[data-id="' + parentId + '"]');
        }
        element.addClass('hover');
        $('[data-extra="' + parentId + '"]').addClass('hover');
    }).on('mouseleave', function () {
        var parentId = $(this).parent().attr('data-id');
        $('[data-id="' + parentId + '"]').removeClass('hover');
        $('[data-extra="' + parentId + '"]').removeClass('hover');
    }).on('click', function () {
        $('.constructor-item-element').removeClass('active');
        var colorGet = localStorage.getItem('color');
        var parent = $(this).parent();
        var parentId = parent.attr('data-id');
        if(parent.hasClass('with-logo')){
            var element = parent;
        }else{
            var element = $('[data-id="' + parentId + '"]');
        }
        var elementExtra = $('[data-extra="' + parentId + '"]');
        var dataPrev = $('.preview-chain-val[data-target="' + parentId + '"]');
        element.addClass('active');
        elementExtra.addClass('active');
        if (colorGet != null) {
            element.attr('data-color', colorGet);
            elementExtra.attr('data-color', colorGet);
            dataPrev.html(colorGet).val(colorGet);
            localStorage.removeItem('color');
        }
        localStorage.removeItem('all');
    });

    $('.constructor-schematics-item').on('mouseover', function () {
        var sTarget = $(this).attr('data-target');
        var lTarget = $(this).attr('data-logo-target');
        $('.constructor-item-element[data-logo="' + lTarget + '"]').addClass('hover');
        $('[data-id="' + sTarget + '"]').addClass('hover');
        $('[data-extra="' + sTarget + '"]').addClass('hover');
    }).on('mouseleave', function () {
        var sTarget = $(this).attr('data-target');
        var lTarget = $(this).attr('data-logo-target');
        $('.constructor-item-element[data-logo="' + lTarget + '"]').removeClass('hover');
        $('[data-id="' + sTarget + '"]').removeClass('hover');
        $('[data-extra="' + sTarget + '"]').removeClass('hover');
    }).on('click', function () {
        $('.constructor-item-element').removeClass('active');
        var colorGet = localStorage.getItem('color');
        var lTarget = $(this).attr('data-logo-target');
        $('.constructor-item-element[data-logo="' + lTarget + '"]').addClass('active');
        var sTarget = $(this).attr('data-target');
        var sElement = $('[data-id="' + sTarget + '"]');
        var sElementExtra = $('[data-extra="' + sTarget + '"]');
        var dataPrev = $('.preview-chain-val[data-target="' + sTarget + '"]');
        sElement.addClass('active');
        sElementExtra.addClass('active');
        if (colorGet != null) {
            sElement.attr('data-color', colorGet);
            sElementExtra.attr('data-color', colorGet);
            dataPrev.html(colorGet).val(colorGet);
            localStorage.removeItem('color');
        }
        localStorage.removeItem('all');
    });

    $('.help').each(function () {
        var elementId = $(this).attr('data-target');
        var dataLogo = $(this).attr('data-logo');
        var element = $('[data-id="' + elementId + '"]');
        var elementExtra = $('[data-extra="' + elementId + '"]');
        var dataPrev = $('.preview-chain-val[data-target="' + elementId + '"]');
        $(this).on('mouseover', function () {
            if(dataLogo != undefined){
                $('.constructor-item-element[data-logo="' + dataLogo + '"]').addClass('hover');
            }else{
                element.addClass('hover');
                elementExtra.addClass('hover');
            }
        }).on('mouseleave', function () {
            if(dataLogo != undefined){
                $('.constructor-item-element[data-logo="' + dataLogo + '"]').removeClass('hover');
            }else{
                element.removeClass('hover');
                elementExtra.removeClass('hover');
            }
        }).on('click', function () {
            $('.constructor-item-element').removeClass('active');
            if(dataLogo != undefined){
                $('.constructor-item-element[data-logo="' + dataLogo + '"]').addClass('active');
            }else{
                element.addClass('active');
                elementExtra.addClass('active');
            }
            var colorGet = localStorage.getItem('color');
            if (colorGet != null) {
                element.attr('data-color', colorGet);
                elementExtra.attr('data-color', colorGet);
                dataPrev.html(colorGet).val(colorGet);
                localStorage.clear();
            }
            localStorage.removeItem('all');
        });
    });

    $('.pick-item button:not(.disabled)').on('click', function () {
        if(!$('body').hasClass('bap-color') && !$('body').hasClass('with-logos')){
            var color = $(this).attr('data-color');
            var colorSet = localStorage.setItem('color', color);
            $('.constructor-item-element.active').attr('data-color', color);
            var dataPrevId = $('.constructor-item-element.active').attr('data-id');
            $('.preview-chain-val[data-target="' + dataPrevId + '"]').html(color).val(color);
            var allGet = localStorage.getItem('all');
            if (allGet != null) {
                $('.preview-chain-val.color').html(color).val(color);
            }
        }
    });

    $('.logos .pick-item button').on('click', function () {
        var logo = $(this).attr('data-val');
        var logoId = $('.constructor-item-element.active').attr('data-logo');
        $('.constructor-item-element[data-logo="' + logoId + '"]').attr('data-logo-set', logo);
        $('[data-logo-val="' + logoId +'"]').html(logo).val(logo);
        if(!$(this).hasClass('custom-text')){
            $('.constructor-item-element[data-logo="' + logoId + '"]').removeAttr('data-custom-text');
            $('.constructor-panel-block textarea').val('');
        }
    });

    $('.constructor-panel-block textarea').on('input', function () {
        var customValue = $(this).val();
        var logoId = $('.constructor-item-element.active').attr('data-logo');
        $('.constructor-item-element[data-logo="' + logoId + '"]').attr('data-custom-text', customValue);
    });

    $('.constructor-panel-block .upload').on('input', function () {
        var customValue = $(this).val();
        console.log(customValue);
    });

    $('.constructor-schematics-title').on('click', function () {
        $(this).toggleClass('active');
        $(this).closest('.constructor').find('.constructor-item-in.active').toggleClass('with-scheme');
    });

    $('.apply-all button').on('click', function () {
        $('.constructor-item-element').each(function () {
            var target = $(this).attr('data-id');
            $('.constructor-item-element[data-id="' + target + '"]').addClass('active');
            var colorGet = localStorage.getItem('color');
            if (colorGet != null) {
                $('.constructor-item-element[data-id="' + target + '"]').attr('data-color', colorGet);
                $('.preview-chain-val[data-target="' + target + '"]').html(colorGet).val(colorGet);
            }
            localStorage.clear();
        });
        var allSet = localStorage.setItem('all', 'all');
    });

    $('.clear button').on('click', function () {
        $('.constructor-item-element').removeClass('active').attr('data-color', '');
        $('.preview-chain-val.color').html('Null').val('Null');
    });

    $('.content-center-panel-in.main .btn').on('click', function () {
        $('body').removeClass('first').addClass('second');
        $('.tabs-nav-item:first-child button').addClass('active');
        $('.constructor.cont').addClass('active');
    });

    function rotateDisabled() {
        if (!$('.constructor.active .constructor-item-in.active [data-id=left], .constructor.active .constructor-item-in.active [data-id=right]').length) {
            $('.constructor-rotate .left, .constructor-rotate .right').addClass('disabled');
        } else {
            $('.constructor-rotate .left').trigger('click');
        }
    }

    $('.tabs-nav-item button').on('click', function () {
        rotateDisabled();
        $('.constructor-item-element').removeClass('active');
        var target = $(this).attr('data-target');
        $('[data-id="' + target + '"]').addClass('active').siblings().removeClass('active');


        if ($(this).hasClass('tabs-nav-item-harness')) {
            $('body').addClass('with-harness');
        } else {
            $('body').removeClass('with-harness');
        }

        if ($(this).hasClass('logos')) {
            $('body').addClass('with-logos');
            localStorage.removeItem('color');
        } else {
            $('body').removeClass('with-logos');
        }


        if ($(this).hasClass('bap')) {
            $('body').addClass('bap-color');
            $('.pick-block-cont.neon .with-disabled').removeClass('disabled');
            $('.bap-color .pick-item button').on('click', function () {
                var bap = $(this).attr('data-color');
                if($('body').hasClass('bap-color')){
                    $('.constructor-item-img').attr('data-color', bap);
                }
            });
        } else {
            $('body').removeClass('bap-color');
            $('.pick-block-cont.neon .with-disabled').addClass('disabled');
        }

        if ($('body').hasClass('first')) {
            $('body').removeClass('first').addClass('second');
            $('.constructor.cont').addClass('active');
        }

        if ($(this).hasClass('options')) {
            $('.side-panel.calc').addClass('active');
            $('.continue.first').removeClass('active');
            $('.continue.second').addClass('active');
        } else {
            $('.continue.first').addClass('active');
            $('.continue.second').removeClass('active');
        }
        if (!$(this).hasClass('back')) {
            $(this).addClass('active').parent().siblings().find('button').removeClass('active');
        } else {
            $('body').removeClass('with-form').addClass('second');
            $('.tabs-nav-item .info, .tabs-nav-item-cont').trigger('click');
        }

        $('.form-side-item:first-child button').trigger('click');
        $('.btn.preview').hide();
        $('body').removeClass('with-preview');
        $('.modal-close').trigger('click');
    });

    $('.constructor-tabs-nav-item button').on('click', function () {
        var target = $(this).attr('data-target');
        $(this).addClass('active').parent().siblings().find('button').removeClass('active');
        $('.constructor.active .constructor-item-in[data-id="' + target + '"]').addClass('active').siblings().removeClass('active');
        $('.constructor-schematics[data-id="' + target + '"]').addClass('active').siblings('.constructor-schematics').removeClass('active');
        rotateDisabled();
    });

    $('.constructor-rotate button').on('click', function () {
        var target = $(this).attr('data-target');
        $(this).addClass('disabled').siblings().removeClass('disabled');
        $('.constructor.active .constructor-item-in.active > div[data-id="' + target + '"]').addClass('active').siblings().removeClass('active');
    });

    $('.logo-text button').on('click', function () {
        $(this).toggleClass('active').closest('.pick-item').siblings().find('button').removeClass('active');
        var target = $(this).attr('data-target');
        if (target != undefined) {
            $('.constructor-panel-block[data-id="' + target + '"]').addClass('active').siblings('.constructor-panel-block').removeClass('active');
        } else {
            $('.constructor-panel-block').removeClass('active');
        }
    });

    $('.order-form').on('click', function () {
        $('body').removeClass('second').addClass('with-form');
    });

    $('.form-side-item button').on('click', function () {
        $(this).addClass('active').removeClass('done').parent().siblings().find('button').removeClass('active');
        $(this).parent().prevAll().find('button').addClass('done');
        $(this).parent().nextAll().find('button').removeClass('done');
        var target = $(this).attr('data-target');
        $('[data-id="' + target + '"]').addClass('active').siblings().removeClass('active');
        if ($(this).parent().is(':last-child')) {
            $('.continue.second').removeClass('active');
            $('.btn.preview').show();
        }
    });

    $('.continue.first').on('click', function () {
        $('.tabs-nav-list-form .tabs-nav-item button.active').parent().next(':not(:last-child)').find('button').trigger('click');
    });

    $('.continue.second').on('click', function () {
        $('.form-side-item button.active').parent().next().find('button').trigger('click');
    });

    $('.preview, .btn.preview').on('click', function () {
        $('body').removeClass('second').addClass('with-form with-preview');
    });

    $('.btn-open').on('click', function () {
        if ($(this).hasClass('left')) {
            $('.side-left').addClass('open');
            $('.modal-back').addClass('open');
        } else {
            $('.side-right').addClass('open');
            if ($('body').hasClass('first')) {
                $('body').removeClass('first').addClass('second');
                $('.constructor.cont').addClass('active');
            }
        }
    });

    $('.modal-close, .modal-back').on('click', function () {
        $('.side-left, .side-right').removeClass('open');
        $('.modal-back').removeClass('open');
    });

    $('.form-block-item').on('keyup', function () {
        var target = $(this).attr('data-val');
        var val = $(this).val();
        $('[data-target="' + target + '"]').html(val).val(val);
    });

    $('select').on('change', function () {
        var target = $(this).attr('data-val');
        var val = $(this).find('option:selected').text();
        $('[data-target="' + target + '"]').html(val).val(val);
    });

    $('.form-block-checks').each(function () {
        var targetCheck = $(this).attr('data-val');
        $(this).find('input').on('click', function () {
            if($(this).siblings('label').find('span').hasClass('pick-block-cont')){
                $(this).siblings('label').find('.pick-item button').on('click', function () {
                    var color = $(this).attr('data-color');
                    $('[data-target="' + targetCheck + '"]').html(color).val(color);
                });
            }else{
                var targetVal = $(this).siblings('label').find('span').text();
                $('[data-target="' + targetCheck + '"]').html(targetVal).html(targetVal);
            }
        });
    });

});
