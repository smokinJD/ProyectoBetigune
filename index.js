var $sub = $('#subtipoConsultas');
var subOpts = $sub.html();


$('#tipoConsultas').on('change', function () {
    var select = $(this).val();

    $sub.empty();
    var opts = $(subOpts).filter('[data-option="' + select + '"]').appendTo($sub)

    $sub.val(opts.first().val())
}).trigger('change');