/* ------- 多行超出裁剪 ------- */
function ellipsis(box, num) {
    $(box).each(function () {
        var maxwidth = num;
        if ($(this).text().length > maxwidth) {
            $(this).text($(this).text().substring(0, maxwidth));
            $(this).html($(this).html() + '…');
        }
    });
}

$(".card-content").css({
    "background" : "red"
})

ellipsis(".card-content",30)