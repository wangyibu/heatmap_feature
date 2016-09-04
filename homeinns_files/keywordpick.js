function replace_all(value, oldstr, newstr) {
    var arrcount = value.split(oldstr).length;

    var ret = value.replace(oldstr, newstr);

    if (ret.split(oldstr).length < arrcount) {
        return replace_all(ret, oldstr, newstr);
    }
    else {
        return ret;
    }
}

//绑定商圈数据1【自动选择】
function BindShangQuan_Auto(obj) {
    $(".keyword_pop_two").hide();

    $(".keyword_pop").show().css({ "left": $("#list_zbse").offset().left + 0, "top": $("#list_zbse").offset().top + 31 });
    if (!$(obj).hasClass("owner")) {
        $(obj).parent().addClass("nc list_search_keywordon");
    }
    $(obj).addClass("home_banner_order_keywordon");
    
    $(".citypop").hide();
    $(".zb_pop").hide();

    if ($("#key_cond").val() == "") {
        alert("请选择城市");
    return false;
    }

    $.ajax({
        type: "GET",
        url: "/Ajax/GetShangQun_Auto",
        data: { cityCode: $("#key_cond").val(), ts: Math.random() },
        dataType: "json",
        success: function (result) {
            if (result != null && result.Code == "200") {
                if (result.data != null && result.data != undefined && result.data != "") {
                    $("#pop_shangquan").empty();
                    $("#pop_xinzheng").empty();
                    $("#pop_xianlu").empty();

                    $(result.data).each(function (i) {
                        if (result.data[i].KeySearchType == "L") {
                            $("#pop_shangquan").append("<li><a><span class='pop1_shangquan_des'>" + result.data[i].KeyName + "</span><code>（" + result.data[i].HotelCount + "）</code><span class='pop1_shangquan_code' style='display:none;'>" + result.data[i].KeySearchType + result.data[i].KeyCD + "</span></a></li>");
                        }
                        else if (result.data[i].KeySearchType == "R") {
                            $("#pop_xinzheng").append("<li><a><span class='pop1_shangquan_des'>" + result.data[i].KeyName + "</span><code>（" + result.data[i].HotelCount + "）</code><span class='pop1_shangquan_code' style='display:none;'>" + result.data[i].KeySearchType + result.data[i].KeyCD + "</span></a></li>");
                        }
                        else if (result.data[i].KeySearchType == "D") {
                            $("#pop_xianlu").append("<li><a><span class='pop1_shangquan_des'>" + result.data[i].KeyName + "</span><code>（" + result.data[i].HotelCount + "）</code><span class='pop1_shangquan_code' style='display:none;'>" + result.data[i].KeySearchType + result.data[i].KeyCD + "</span></a></li>");
                        }
                    });

                    $(".keyword_pop_tab_div li a").bind("click", function () {
                        var keyword_pop_tab_z = $(this).children(".pop1_shangquan_des").html();
                        var pop1_shangquan_code = $(this).children(".pop1_shangquan_code").html();

                        $(".keyword_pop").hide();

                        $("#list_zbse").val(keyword_pop_tab_z);
                        $("#input_old").val(keyword_pop_tab_z);
                        $("#key").val(pop1_shangquan_code);

                        $("#list_zbse").parent().removeClass("nc");
                        $("#list_zbse").parent().removeClass("list_search_keywordon");
                    });

                    $(".keyword_pop_tab_div li a").bind("mouseover", function () {
                        $(this).addClass("keyword_pop_tab_divon");
                    });

                    $(".keyword_pop_tab_div li a").bind("mouseout", function () {
                        $(this).removeClass("keyword_pop_tab_divon");
                    });
                }
                else {
                    $("#pop_shangquan").empty();
                    $("#pop_xinzheng").empty();
                    $("#pop_xianlu").empty();
                }
            }
            else {
                alert("没有相关数据");
            }
            $(".keyword_pop").show();
        }
    });
}

//绑定商圈数据2【输入感应】
function bindKeyInput(obj) {
    $(".keyword_pop").hide();
    $(".keyword_pop").show().css({ "left": $("#list_zbse").offset().left + 0, "top": $("#list_zbse").offset().top + 31 });
    $(obj).parent().addClass("nc");
    //$(obj).parent().addClass("list_search_keywordon");
    $(obj).addClass("home_banner_order_keywordon");

    $(".citypop").hide();
    $(".zb_pop").hide();

    $("#pop_nearby").text($("#list_zbse").val());
    $("#pop_namecontain").text($("#list_zbse").val());
    $("#pop_hotelinput").text($("#list_zbse").val());
    $("#pop_mapinput").text($("#list_zbse").val());

    $("#key").val("");

    $.ajax({
        type: "GET",
        url: "/Ajax/GetShangQun_Mohu",
        data: { name: $.trim($("#list_zbse").val()), cityCD: $("#key_cond").val(), ts: Math.random() },
        dataType: "json",
        success: function (result) {
            if (result != null && result.Code == "200") {
                if (result.data != null && result.data != undefined && result.data != "") {
                    $("#pop2_hotel").empty();
                    $("#pop2_hotel").show();
                    $("#pop2_hotel_title").show();
                    $(result.data).each(function (i) {
                        $("#pop2_hotel").append("<ul><a>" + result.data[i].BrandDes + "（" + result.data[i].KeyName.replace($("#list_zbse").val(), "<span>" + $("#list_zbse").val() + "</span>") + ")</a><span class='pop_shangquan_code' style='display:none;'>" + result.data[i].KeySearchType + result.data[i].KeyCD + "</span></ul>");
                    });

                    $("#pop2_hotel ul a").bind("click", function () {
                        var home_order_zb_two_l_z = $(this).text();
                        var pop_shangquan_code = $(this).parent().children(".pop_shangquan_code").html();

                        $(".keyword_pop_two").hide();

                        $("#list_zbse").val(home_order_zb_two_l_z);
                        $("#input_old").val(home_order_zb_two_l_z);
                        $("#key").val(pop_shangquan_code);
                        $(".home_index").trigger("click");
                    });

                    $("#pop2_hotel ul a").bind("mouseover", function () {
                        $(this).addClass("keyword_pop_two_on");
                    });

                    $("#pop2_hotel ul a").bind("mouseout", function () {
                        $(this).removeClass("keyword_pop_two_on");
                    });
                }
                else {
                    $("#pop2_hotel").empty();
                    $("#pop2_hotel").hide();
                    $("#pop2_hotel_title").hide();
                }

                var map = new BMap.Map("hidemap"); // 创建Map实例  121.446235_31.169152
                map.centerAndZoom($("#key_cond_txt").val(), 15); // 初始化地图,设置中心点坐标和地图级别。
                map.centerAndZoom(new BMap.Point(121.446235, 31.169152), 15);
                var options = {
                    map: map,
                    autoViewport: false,
                    forceLocal: true,
                    onSearchComplete: function (results) {
                        if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                            // 判断状态是否正确
                            $("#pop2_map").empty();
                            for (var i = 0; i < results.getCurrentNumPois(); i++) {
                                var title = results.getPoi(i).title;
                                var address = results.getPoi(i).address;
                                var lng = results.getPoi(i).point.lng;
                                var lat = results.getPoi(i).point.lat;

                                if (i > 5) { continue; }
                                $("#pop2_map").append("<ul><a>" + title + "（" + address.replace($("#list_zbse").val(), "<span>" + $("#list_zbse").val() + "</span>") + ")</a><span class='pop_shangquan_code' style='display:none;'>" + lng + "_" + lat + "</span></ul>");
                            }

                            $("#pop2_map ul a").bind("click", function () {
                                var home_order_zb_two_l_z = $(this).text();
                                var pop_shangquan_code = $(this).parent().children(".pop_shangquan_code").html();

                                $(".keyword_pop_two").hide();
                                $("#list_zbse").val(home_order_zb_two_l_z);
                                $("#key").val("M" + pop_shangquan_code + "_5");

                                $("#list_zbse").parent().removeClass("list_search_keywordon");
                                $("#list_zbse").removeClass("home_banner_order_keywordon");
                            });

                            $("#pop2_map ul a").bind("mouseover", function () {
                                $(this).addClass("keyword_pop_two_on");
                            });

                            $("#pop2_map ul a").bind("mouseout", function () {
                                $(this).removeClass("keyword_pop_two_on");
                            });
                        }
                        else {
                            $("#pop2_map").empty();
                        }
                    }
                };
                var local = new BMap.LocalSearch($("#key_cond_txt").val(), options);
                local.search($("#list_zbse").val());
            }
        }
    });
}

$(function () {
    //搜索名称含XX的酒店
    $("#input_name_Search").click(function () {
        //var key = encodeURI($("#list_zbse").val()); ie对的
        var key = encodeURIComponent($.trim($("#list_zbse").val()));

        key = replace_all(key, "%", "_");

        $("#key").val("J" + key);
        $("#btn_search, #btn_search_mt, #btn_search_rj").trigger("click");
    });

    //搜索地点在XX附近的酒店
    $("#input_map_Search").click(function () {
        if ($("#pop2_map ul").eq(0) != null && $("#pop2_map ul").eq(0) != undefined) {
            var obj = $("#pop2_map ul").eq(0).children("a");
            var home_order_zb_two_l_z = $(obj).text();
            var pop_shangquan_code = $(obj).parent().children(".pop_shangquan_code").html();

            if (pop_shangquan_code != undefined) {
                $("#key").val("M" + pop_shangquan_code + "_5");
            }
            else {
                $("#list_zbse").val("");
                $("#key").val("");
            }
        }
        else {
            $("#key").val("");
        }
        $("#btn_search, #btn_search_mt, #btn_search_rj").trigger("click");
    });

    //关键字自动选择
    $("#list_zbse").click(function () {
        if ($(this).val() == '输入酒店位置 酒店名 或 品牌') {
            $(this).val("");
            $("#key").val("");
        }
        $("#keyword_value").hide();
        $(".zb_pop").hide();
        $(".citypop").hide();

        //if (replace_all($("#list_zbse").val(), " ", "") == "输入酒店位置酒店名或品牌") {
        // $(this).val("");
        // }

        BindShangQuan_Auto(this);
        if ($(window).scrollTop() < 150) {
            $("html, body").animate({ scrollTop: 150 }, "slow");
        } else {
            return;
        }
    });

    $("#keyword_value").click(function () {
        $(this).hide();
        $("#list_zbse").trigger("click");
        $("#list_zbse").focus();
    });

    //关键字输入感应
    $("#list_zbse").bind("keyup", function () {
        if (replace_all($("#list_zbse").val(), " ", "") != "") {
            if ($("#input_old").val() != $("#list_zbse").val()) {
                $("#input_old").val($("#list_zbse").val())
                bindKeyInput(this);
            }
        }
        else {
            BindShangQuan_Auto(this);
        }
    });

    $(".keyword_pop_close").click(function () {
        $(".keyword_pop").hide();
        $("#list_zbse").parent().removeClass("nc");
        $("#list_zbse").parent().removeClass("list_search_keywordon");
        $("#list_zbse").removeClass("home_banner_order_keywordon");
    });

    $(".keyword_pop_tab li:first").addClass("keyword_pop_tabon"); //切换第一个高亮

    $(".keyword_pop_tab li").hover(function () {//tab切换
        $(this).addClass("keyword_pop_tabon").siblings().removeClass("keyword_pop_tabon");
        $(".keyword_pop_tab_div ul").eq($(this).index()).show().siblings().hide();
    });

    $(".keyword_pop_tab_div ul:first").show();
    $(".keyword_pop_tab li").click(function () {//tab切换
        $(this).addClass("keyword_pop_tabon").siblings().removeClass("keyword_pop_tabon");
        $(".keyword_pop_tab_div ul").eq($(this).index()).show().siblings().hide();
    });

    $(".keyword_pop_tab_div li a").hover(function () {
        $(this).addClass("keyword_pop_tab_divon");
    }, function () {
        $(this).removeClass("keyword_pop_tab_divon");
    });

    $(".keyword_pop_two_l ul a").hover(function () {
        $(this).addClass("keyword_pop_two_on");
    }, function () {
        $(this).removeClass("keyword_pop_two_on");
    });

    $(".keyword_pop_two_tip ul a").click(function () {
        $(".keyword_pop_two").hide();
        $("#keyword_value").val($(this).text());
    });

    $(".keyword_pop_two_tip ul a").hover(function () {
        $(this).addClass("keyword_pop_two_tipon");
    }, function () {
        $(this).removeClass("keyword_pop_two_tipon");
    });

    $(".keyword_pop_two_l:last").css("padding-bottom", "0px");

    $(".keyword_pop_two_close").click(function () {
        $(".keyword_pop_two").hide();
    });

    //关键字结束
    if ($("#list_zbse").val() == "") {
        var wd = parseInt($("#list_zbse").css("width").replace("px", ""));
        if (wd < 150) {
            $("#keyword_value").empty();
            $("#keyword_value").append("输入位置/店名");
        }

        $("#keyword_value").show().css({ "left": $("#list_zbse").offset().left + 10, "top": $("#list_zbse").offset().top + 1 });
    }

    $(window).resize(function () {
        $("#keyword_value").css({ "left": $("#list_zbse").offset().left + 10, "top": $("#list_zbse").offset().top + 1 });
    });
});

$(document).click(function (event) {
    if (event.target.className == "transmap_pop_two_l" || event.target.id == "keyword_value") {
        return;
    }

    if (event.target.id != "list_zbse" || event.target.className == "keyword_pop_two" || event.target.className == "keyword_pop") {
        $(".keyword_pop_two").hide();
        $(".keyword_pop").hide();
        $("#list_zbse").parent().removeClass("list_search_keywordon");
        $("#list_zbse").removeClass("home_banner_order_keywordon");
    }
});