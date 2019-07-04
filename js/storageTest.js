function pagination($count, currPage) {
    layui.use(['laypage', 'element'], function () {
        var laypage = layui.laypage;

        //执行一个laypage实例
        laypage.render({
            elem: 'pages',
            count: $count, //数据总数，从服务端得到
            limits: true,
            limit: 4,
            curr: currPage,
            theme: '#012e67',
            jump: function (obj, first) {
                if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr  ajax 再次请求
                    showData(obj.curr);
                }
            }
        });
    });
}

$(function () {
    // 选择类别
    $(".search .choice-btn").click(function () {
        if ($(this).hasClass('btn-bg btn-color')) {
            $(this).removeClass('btn-bg btn-color')
        } else {
            $(this).addClass('btn-bg btn-color')
        }
    })


    /*缓存 先判断本地是否有缓存*/
    if (localStorage.getItem('data') == null || localStorage.getItem('data') == 'undefined') {
        $.ajax({
            dataType: "json",
            type: "GET",
            url: "../data/ExhibitorInfo.ashx",
            success: function (data) {
                //序列化转化成json字符串
                localStorage.setItem('data', JSON.stringify(data));
                showData();
            },
            error: function () {
                confirm("请求错误！")
            }
        })
    } else {
        showData();
    }

})


/* ----------- 显示内容 -----------*/ 
function showData(currPage) {
    // 加载之前先清空
    $("#listCard").html("")
    // 循环跑卡片
    $("#tempCard").html(createCard())
    var storage = localStorage.getItem('data');
    //反序列化 将字符串转化成json对象
    var jsonData = encodeURIComponent(JSON.parse(storage));
    console.log(jsonData)
    $count = jsonData[0].Count
    pagination($count, currPage)
    for (let i = 0; i < jsonData.length; i++) {
        // 创建卡片
        var template = $("#card").clone().removeAttr("id")
        var tLogo = template.find(".card-logo")
        var tTitle = template.find(".card-title")
        var tContent = template.find(".card-content")
        tLogo.attr('src', jsonData[i].Uplogosrc)
        tTitle.text(jsonData[i].CompanyCn)
        tContent.text(jsonData[i].IntroCn)

        $("#listCard").append(template)
    }

    $("#tempCard").html("")

}
