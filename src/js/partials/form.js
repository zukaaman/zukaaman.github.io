$(document).on('submit', '#main-form', function(e) {
    e.preventDefault();
    var replyto = $('input[name=email]'),
        replyto_text = replyto.val(),
        body = $('textarea[name=text]'),
        body_text = body.val();

    $.ajax({
        url: "https://formspree.io/zukaaman@gmail.com",
        method: "POST",
        data: {
            _replyto: replyto_text,
            _subject: subject_text,
            message: body_text
        },
        dataType: "json",
        beforeSend: function( xhr ) {
            spinner.show();
      }
    }).done(function(){
        $('#contacts-success-wrapper').show();
    }).fail(function() {
        $('#contacts-error-wrapper').show();
    }).always(function() {
        spinner.hide();
        $('#contacts-wrapper').remove();
    });
});
