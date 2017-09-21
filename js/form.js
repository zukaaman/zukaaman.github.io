$(document).on('submit', '#main-form', function(e) {
    e.preventDefault();
    var replyto = $('input[name=_replyto]'),
        replyto_text = replyto.val(),
        subject = $('input[name=_subject]'),
        subject_text = subject.val(),
        body = $('textarea[name=body]'),
        body_text = body.val();

    $.ajax({
        url: "https://formspree.io/addr@example.com",
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
