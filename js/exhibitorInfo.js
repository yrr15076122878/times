function paged($count, currPage) {
    layui.use(['laypage', 'element', 'layer'], function () {
        var laypage = layui.laypage;
        var layer = layui.layer;
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
                    newList(obj.curr);
                }
            }
        });

    });
}


/* ----- layer ----- */
function detailOpen(data) {
    layer.open({
        title: [data.CompanyCn, 'text-align:center;font-size:18px'],
        type: 1,
        skin: "layui-layer-lan",
        shade: .9,
        area: ['50%', '90%'],
        content: $("#detailModal") //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
    });
}


/* ------- 多行超出裁剪 ------- */
function ellipsis(ele, maxLength, data) {
    // 创建查看详情并指定id
    var detail = "<span id="+data.eid+" class=\"detail\">查看详情</span>"

    $(ele).each(function () {
        if ($(this).text().length > maxLength) {
            $(this).text($(this).text().substring(0, maxLength));
        }
        $(this).append('<b>... </b>', detail)
        $(this).children(".detail").click(function() {
            detailOpen(data)
        })
    });    
}


/* --- 初始化 --- */
$(function () {
    // 选择类别
    $(".search .choice-btn").click(function () {
        if ($(this).hasClass('btn-bg btn-color')) {
            $(this).removeClass('btn-bg btn-color')
        } else {
            $(this).addClass('btn-bg btn-color')
        }
    })

    /* ------ 循环跑卡片 ------ */
    $("#tempCard").html(createCard())
    // 初始化数据
    $.ajax({
        url: "../data/ExhibitorInfo.ashx",
        dataType: "json",
        type: "GET",
        success: function (data) {
            $count = data[0].Count
            paged($count)
            for (let i = 0; i < data.length; i++) {
                // 创建卡片
                var template = $("#card").clone().removeAttr("id")
                var tLogo = template.find(".card-logo")
                var tTitle = template.find(".card-title")
                var tContent = template.find(".card-content")
                tLogo.attr('src', data[i].Uplogosrc)
                tTitle.text(data[i].CompanyCn)
                tContent.text(data[i].IntroCn)

                $("#listCard").append(template)

                ellipsis(tContent, 100, data[i])
            }

            $("#tempCard").html("")

        },
        error: function () {
            confirm("请求错误！")
        }

    })

})

// 切换页
function newList(currPage) {
    $("#listCard").html("")
    /* ------ 循环跑卡片 ------ */
    $("#tempCard").html(createCard())
    // 获取数据
    $.ajax({
        url: "../data/ExhibitorInfo.ashx",
        dataType: "json",
        type: "GET",
        data: {
            page: currPage
        },
        success: function (data) {
            console.log(data)
            $count = data[0].Count
            paged($count, currPage)
            for (let i = 0; i < data.length; i++) {
                // 创建卡片
                var template = $("#card").clone().removeAttr("id")
                var tLogo = template.find(".card-logo")
                var tTitle = template.find(".card-title")
                var tContent = template.find(".card-content")
                tLogo.attr('src', data[i].Uplogosrc)
                tTitle.text(data[i].CompanyCn)
                tContent.text(data[i].IntroCn)
                
                $("#listCard").append(template)
                
                ellipsis(tContent, 100, data[i])
            }

            $("#tempCard").html("")

        },
        error: function () {
            confirm("请求错误！")
        }
    })
}