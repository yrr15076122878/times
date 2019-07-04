function createCard() {

    /* --------- style --------- */
    $listCard = $("#listCard")
    $listCard.css({
        "min-height": "360px"
    })

    var cardId =
        "border-style:" + "solid;" +
        "border-color:" + "#ccc;" +
        "border-width:" + "1px;" +
        "margin-top:" + "1%;" +
        "margin-bottom:" + "1%;" +
        "padding-top:" + "1%;" +
        "padding-bottom:" + "1%;" +
        "padding-left:" + "2%;" +
        "padding-right:" + "2%;"

    var headerClass =
        "margin-bottom:" + '10px;'

    var logoClass =
        "width:" + '30px;' +
        "margin-right:" + '10px;' +
        "vertical-align:" + 'middle;'

    var titleClass =
        "font-size:" + '18px;' +
        "font-weight:" + 'bold;' +
        "vertical-align:" + 'middle;'

    var contentClass =
        "font-size:" + '16px;' +
        "line-height:" + '1.2;'

    /* --------- 虚拟DOM ------------ */
    $card = "<div id=\"card\" style=" + cardId + ">" +
        "<div class=\"card-header\" style=" + headerClass + "><img class=\"card-logo\" style=" + logoClass + "><span class=\"card-title\" style=" + titleClass + "></span></div>" +
        "<div class=\"card-content\" style=" + contentClass + "></div>" +
        "</div>"


    /*-- 返回card --*/
    return $card;
}