function pickSchool(event, sender, title) {
    $(sender).closest('.picker').prepend('<div class="text-center">' + $(sender).find('img').get(0).outerHTML +'Je wordt naar <b>' + title + '</b> gestuurd...</div>');
    $(sender).closest('.picker').addClass('loading-page');
}