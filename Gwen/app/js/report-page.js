
$(document).ready(function () {
    loadAsync('div[data-load-url]');

    if (!$('div[data-load-url]') || !$('div[data-load-url]').length) {
        onPrintLoaded();
    }
});

function onReportMarginChange(e, sender) {
    var val = parseInt($(sender).val());
    if (isNaN(val)) { val = 0; }
    if (val > 25) { val = 25; }
    $(sender).val(val);
    var root = document.querySelector(':root');
    root.style.setProperty('--report-margin-left', val + 'mm');
    setTimeout(function () {
        window.dispatchEvent(new Event('resize'));/*for charts*/
    }, 500);
}

function onPrintLoaded() {
    $('.question-group, .relative-panel, .print-leerlijn-container').each(function (index, el) {
        if (el.getBoundingClientRect().height <= 400 || $(el).hasClass('radial-answer-container')) {
            $(el).addClass('no-break');
        }
    });

    $('.print-loading').addClass('opacity-0');
    $('.no-report-print').attr('style', '');
}