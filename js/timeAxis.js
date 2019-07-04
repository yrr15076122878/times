$(function () {
    $.ajax({
        url: "./data/ObtainYear.ashx",
        type: "GET",
        success: function(data) {
            console.log(data.year)
        }
    })
})