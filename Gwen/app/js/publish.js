
function initPublishAll() {
    if ($('.publish-all') && $('.publish-all').length && !$('.publish-all').hasClass('disabled')) {
        $('.btn-publish-page').removeClass('disabled');
        $('.publish-page').addClass('can-publish-page');
    } else {
        $('.btn-publish-page').addClass('disabled');
        $('.publish-page').removeClass('can-publish-page');
    }
    //recreatePopover('.publish-all-click');
    $('.publish-all-start').addClass('can-publish-page');
}

function publishPageClick() {
    hidePopover();
    $('.publish-all').click();
}

function publishAllClick(e, sender) {
    hidePopover();
    openPopupTarget($(sender).attr('data-href'), function () {
        initSelect();
    });
}

function publishStudents(e, sender) {
    $('.popup-body .publish-container').addClass('next');
    $('.popup-body form').ajaxSubmit({
        success: function (data, status, xhr) {
            $('.popup-body').html(data);
        }
    });
}

/*
function initPublishAll() {
    $('.publish-all-click span').attr('class', 'bx bx-send');
    if ($('.publish-all') && $('.publish-all').length && !$('.publish-all').hasClass('disabled')) {
        $('.publish-all-click').removeClass('hidden');
    } else {
        $('.publish-all-click').addClass('hidden');
    }
}

function publishPageClick() {
    hidePopover();
    $('.publish-all-click span').attr('class', 'fas fa-spinner fa-spin');
    $('.publish-all').click();
}*/

function publishForms(e, sender) {
    $('.popup-body form').each(function (index, form) {
        $(form).find('input:checked').each(function (i, input) {
            $(input).before("<i class='bx bx-loader-circle'></i>");
        });
        $(form).addClass('submitted');
        $(sender).addClass('hidden');
        $(form).ajaxSubmit({
            context: form,
            //before: function () {
            //    $(this).find('input:checked').each(function (i, input) {
            //        $(input).before("<i class='bx bx-loader-circle'></i>");
            //    });
            //},
            success: function (data, status, xhr) {
                $(this).find('.bx-loader-circle').removeClass('bx-loader-circle').addClass('bxs-check-circle');
                $(this).addClass('complete');
                onPublishComplete();
            },
            error: function (data, status, xhr) {
                $(this).find('.bx-loader-circle').removeClass('bx-loader-circle').addClass('bxs-x-circle');
                $(this).addClass('complete');
                onPublishComplete();
            }
        });
    });
}

var publishTimeoutId;
function onPublishComplete() {
    if ($('.popup-body form:not(.complete)') && $('.popup-body form:not(.complete)').length) { return; }
    clearTimeout(publishTimeoutId);
    publishTimeoutId = setTimeout(function () {
        reloadComponents();
    }, 1200);
}