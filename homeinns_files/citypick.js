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

//绑定城市数据1【自动选择】
function BindCity_Auto(obj) {
    $(".citypop").hide();

    //$(".zb_pop").show().css({ "left": $(this).offset().left + 0, "top": $(this).offset().top + 31 });
    if (!$(obj).hasClass("popcity_liandong") && !$(obj).hasClass("owner")) {
        $(obj).parent().addClass("list_search_inputon");
    }
    $(".csxz").addClass("home_banner_order_cityon");

    $(".keyword_pop").hide();
    $(".keyword_pop_two").hide();
}

//绑定商圈数据2【输入感应】
function bindCityInput(obj) {
    $(".zb_pop").hide();
    $(".citypop").show().css({ "left": $(obj).offset().left+0, "top": $(obj).offset().top + 30 });
    $(obj).parent().addClass("nc");
    if (!$(obj).hasClass("popcity_liandong") && !$(obj).hasClass("owner")) {
        $(obj).parent().addClass("list_search_inputon");
    }
    $(".csxz").addClass("home_banner_order_cityon");

    $(".keyword_pop").hide();
    $(".keyword_pop_two").hide();

    if ($("#city_hide dd").length > 0) {
        $("#pop2_city").empty();
        var h = 0;
        var ct_value = $("#city_select").val();

        var mtc_Mark = false;
        var mtc_Pinyin = "";
        var mtc_CD = "";

        $("#city_hide dd").each(function (i) {
            var Descript = $(this).children("span").eq(0).text();
            var Pinyin = $(this).children("span").eq(1).text();
            var CD = $(this).children("span").eq(2).text();
            var FirstPinyin = $(this).children("span").eq(3).text();

            if (Descript == ct_value) {
                mtc_Mark = true;
                mtc_Pinyin = Pinyin;
                mtc_CD = CD
            }

            if (Descript.indexOf(ct_value) >= 0 || Pinyin.indexOf(ct_value) >= 0 || FirstPinyin.toLowerCase().indexOf(ct_value) >= 0 || FirstPinyin.indexOf(ct_value) >= 0) {
                if (h > 9) {
                    $("#pop2_city").append("<dd style='display:none;'><span class='pop_cityname'>" + Descript + "</span>" + Pinyin + "<span class='pop_citypinyin' style='display:none;'>" + Pinyin + "</span></span><span class='pop_citycode' style='display:none;'>" + CD + "</span></dd>");
                }
                else {
                    $("#pop2_city").append("<dd><span class='pop_cityname'>" + Descript + "</span>" + Pinyin + "<span class='pop_citypinyin' style='display:none;'>" + Pinyin + "</span></span><span class='pop_citycode' style='display:none;'>" + CD + "</span></dd>");
                }
                h++;
            }
        });

        $("#cityName").val(mtc_Pinyin);
        $("#cityCode").val(mtc_CD);

        $("#list_zbse").val("");
        $("#key").val("");
        $("#input_old").val("");
        if (mtc_Mark) {
            $("#key_cond").val(mtc_CD);
            $("#key_cond_txt").val(ct_value);
        }
        else {
            $("#key_cond").val("");
            $("#key_cond_txt").val("");
        }

        $(".citypop dl dd").bind("click", function () {
            var city_z = $(this).children(".pop_cityname").html();
            var city_pinyin = $(this).children(".pop_citypinyin").html();
            var city_code = $(this).children(".pop_citycode").html();

            $("#city_select").val(city_z);
            $("#cityName").val(city_pinyin);
            $("#cityCode").val(city_code);
            $("#cityName_old").val(city_z);
            $("#key_cond").val(city_code);
            $("#key_cond_txt").val(city_z);
            $(".popcity_liandong").val(city_z);

            if ($("#key").length > 0 && $("#key").val() != "" && $("#key").val().substring(0, 1) != "J") {
                $("#key").val("");
                $("#list_zbse").val("");
            }

            $(".citypop").hide();
        });

        $(".citypop dl dd").bind("mouseover", function () {
            $(".citypop dl dd").removeClass("cityon");
            $(this).addClass("cityon");
        });

        $(".citypop dl dd").bind("mouseout", function () {
            $(this).removeClass("cityon");
        });

        if (h > 10) {
            $("#cpk_CurrentPage").val("1");
            $("#cpk_MaxPage").val(div(h, 10) + 1);

            $("#citypick_page").empty();

            $("#citypick_page").append("<a id='cpk_pre' href='#'>&lt;&minus;</a><a id='cpk_1' href='#' class='city_pageon'>1</a>");
            for (var k = 2; k <= parseInt($("#cpk_MaxPage").val()); k++) {
                $("#citypick_page").append("<a id='cpk_" + k + "' href='#'>" + k + "</a>");
            }
            $("#citypick_page").append("<a id='cpk_next' href='#'>&minus;&gt;</a>");

            for (var m = 1; m <= parseInt($("#cpk_MaxPage").val()); m++) {
                $("#cpk_" + m).click(function () {
                    var id = $(this).attr("id");
                    var index = id.substring(4);
                    $("#cpk_CurrentPage").val(index);

                    cityPick_PageChange(h, parseInt($("#cpk_CurrentPage").val()), parseInt($("#cpk_MaxPage").val()));
                });
            }

            $("#cpk_pre").bind("click", function () {
                if ($("#cpk_CurrentPage").val() == 1) {
                    return;
                }
                else {
                    var curpage = $("#cpk_CurrentPage").val();
                    curpage = parseInt(curpage) - 1;
                    $("#cpk_CurrentPage").val(curpage);

                    cityPick_PageChange(h, curpage, parseInt($("#cpk_MaxPage").val()));
                }
            });

            $("#cpk_next").bind("click", function () {
                if ($("#cpk_CurrentPage").val() == $("#cpk_MaxPage").val()) {
                    return;
                }
                else {
                    var curpage = $("#cpk_CurrentPage").val();
                    curpage = parseInt(curpage) + 1;
                    $("#cpk_CurrentPage").val(curpage);

                    cityPick_PageChange(h, curpage, parseInt($("#cpk_MaxPage").val()));
                }
            });
        }
        else {
            $("#citypick_page").empty();
        }
    }
    else {
        $("#pop2_city").empty();
        $("#citypick_page").empty();
    }
}

$(function () {
    var load_city = setTimeout(loadCity, 1000);
    //城市自动选择
    $("#city_select").click(function () {
        $(".keyword_pop").hide();
        $(".keyword_pop_two").hide();

        if (replace_all($("#city_select").val(), " ", "") == "中文／全拼") {
            $(this).val("");
        }

        BindCity_Auto(this);
    });

    //城市输入感应
    $('#city_select').bind("keyup", function (event) {
        if (replace_all($("#city_select").val(), " ", "") != "" && replace_all($("#city_select").val(), " ", "") != "中文／全拼") {
            if ($("#cityName_old").val() != $("#city_select").val()) {
                $("#cityName_old").val($("#city_select").val());
                bindCityInput(this);
            }
        }
        else {
            BindCity_Auto(this);
        }
    });

    $(document).keydown(function (event) {
        switch (event.keyCode) {
            case 37:     //左方向键
                if ($(".citypop").is(":visible")) {
                    $("#cpk_pre").trigger("click");

                    var pg = parseInt($("#cpk_CurrentPage").val());
                    var index_no = pg > 0 ? (pg - 1) * 10 + 1 : 1;
                    $(".citypop_c dl dd").removeClass("cityon");
                    $(".citypop_c dl dd").eq(index_no - 1).addClass("cityon");
                };
                break;
            case 39:     //右方向键
                if ($(".citypop").is(":visible")) {
                    $("#cpk_next").trigger("click");

                    var pg = parseInt($("#cpk_CurrentPage").val());
                    var index_no = pg > 0 ? (pg - 1) * 10 + 1 : 1;
                    $(".citypop_c dl dd").removeClass("cityon");
                    $(".citypop_c dl dd").eq(index_no - 1).addClass("cityon");
                };
                break;
            case 40:     //下方向键
                if ($(".citypop").filter(":visible")) {
                    var cityon_index = $(".cityon").index();
                    var cityon_length = $(".citypop_c dl dd").length - 1;

                    if ($(".cityon").index() == -1) {
                        $(".citypop_c dl dd").eq(0).addClass("cityon").siblings().removeClass("cityon");
                    }
                    else if (cityon_index == cityon_length) {
                        $(".citypop_c dl dd").eq(cityon_length).removeClass("cityon");
                        $(".citypop_c dl dd").eq(div(cityon_length, 10) * 10).addClass("cityon");
                    }
                    else if (cityon_index % 10 == 9) {
                        $("#cpk_next").trigger("click");

                        var pg = parseInt($("#cpk_CurrentPage").val());
                        var index_no = pg > 0 ? (pg - 1) * 10 + 1 : 1;
                        $(".citypop_c dl dd").removeClass("cityon");
                        $(".citypop_c dl dd").eq(index_no - 1).addClass("cityon");
                    }
                    else {
                        $(".citypop_c dl dd").eq(cityon_index + 1).addClass("cityon").siblings().removeClass("cityon");
                    }
                };
                break;
            case 38:     //上方向键
                if ($(".citypop").filter(":visible")) {
                    var cityon_index = $(".cityon").index();
                    var cityon_length = $(".citypop_c dl dd").length - 1;

                    if ($(".cityon").index() == -1) {
                        $(".citypop_c dl dd").eq(0).addClass("cityon").siblings().removeClass("cityon");
                    }
                    else if (cityon_index % 10 == 0) {
                        $("#cpk_pre").trigger("click");

                        var pg = parseInt($("#cpk_CurrentPage").val());
                        var index_no = pg > 0 ? (pg - 1) * 10 + 1 : 1;
                        $(".citypop_c dl dd").removeClass("cityon");
                        $(".citypop_c dl dd").eq(index_no - 1).addClass("cityon");
                    }
                    else {
                        $(".citypop_c dl dd").eq(cityon_index - 1).addClass("cityon").siblings().removeClass("cityon");
                    }
                };
                break;
            case 13:     //enter键
                if ($(".citypop").filter(":visible")) {
                    $(".cityon").trigger("click");
                };
                break;
        }
    });

    $(".zb_pop_close").click(function () {
        $(".zb_pop").hide();
        $("#city_select").parent().removeClass("list_search_inputon");
        $(".csxz").removeClass("home_banner_order_cityon");
    });

    $(".zb_pop_tab li:first").addClass("zb_pop_tabon");

    $(".zb_pop_tab li").hover(function () {
        $(this).addClass("zb_pop_tabon").siblings().removeClass("zb_pop_tabon");

        $("#tab_default,.ABCDEF,.GHIJ,.KLMN,.PQRSTUVW,.XYZ").hide();
        var className = $(this).text();
        if ($.trim(className) == "热门") {
            $("#tab_default").show();
        }
        else {
            $("." + className).show();
        }
    });

    $(".zb_pop_se li a").hover(function () {
        $(this).addClass("zb_pop_seon");
    }, function () {
        $(this).removeClass("zb_pop_seon");
    });
    $(".zb_pop_se li a").click(function () {
        var list_search_csz = $(this).html();
        var list_search_pinyin = $(this).parent().children(".pop_pinyin").html();
        var list_search_code = $(this).parent().children(".pop_code").html();

        $(".zb_pop").hide();
        $("#city_select").val(list_search_csz);
        $("#cityName").val(list_search_pinyin);
        $("#cityCode").val(list_search_code);
        $("#key_cond").val(list_search_code); //作为商圈的所在城市代码
        $("#key_cond_txt").val(list_search_csz);
        $("#cityName_old").val(list_search_csz);
        $(".popcity_liandong").val(list_search_csz);

        $("#city_select").parent().removeClass("list_search_inputon");
        $(".csxz").removeClass("home_banner_order_cityon");
        //$(".citypop").show().css({"left":$("#city_select").offset().left-8,"top":$("#city_select").offset().top+30});

        if ($("#key").length > 0 && $("#key").val() != "" && $("#key").val().substring(0, 1) != "J") {
            $("#key").val("");
            $("#list_zbse").val("");
        }
    });
    $(".citypop dl dd").hover(function () {//鼠标放上去高亮
        $(this).addClass("cityon");
    }, function () {
        $(this).removeClass("cityon");
    });

});

function div(number1, number2) {
    var num1 = Math.round(number1);
    var num2 = Math.round(number2);
    var result = num1 / num2;
    if (result >= 0) {
        result = Math.floor(result);
    }
    else {
        result = Math.ceil(result);
    }
    return result;
}

function cityPick_PageChange(dataCount, currentPage, maxPage) {
    for (var v = 1; v <= maxPage; v++) {
        $("#cpk_" + v).removeAttr("class");
        if (currentPage == v) {
            $("#cpk_" + v).attr("class", "city_pageon");
        }
    }

    for (var v = 1; v <= dataCount; v++) {
        $("#pop2_city").children("dd").eq(v - 1).hide();
        if (v >= (currentPage - 1) * 10 + 1 && v <= currentPage * 10) {
            $("#pop2_city").children("dd").eq(v - 1).show();
        }
    }
}

function loadCity() {
    $.ajax({
        type: "GET",
        url: "/Ajax/GetCity_All",
        data: { ts: Math.random() },
        dataType: "json",
        success: function (result) {
            if (result != null && result.Code == "200") {
                var usedCity = result.Message;
                if (result.data != null && result.data != undefined && result.data != "") {
                    //                    $("#a_f").empty();
                    //                    $("#g_j").empty();
                    //                    $("#k_n").empty();
                    //                    $("#p_w").empty();
                    //                    $("#x_z").empty();
                    $("#his").empty();
                    $("#city_hide").empty();

                    $(result.data).each(function (i) {
                        var CD = result.data[i].CD;
                        var Descript = result.data[i].Descript;
                        var Pinyin = result.data[i].Pinyin;
                        var FirstPinyin = result.data[i].FirstPinyin;
                        var Type = result.data[i].Type;

                        if (FirstPinyin != "") {
                            if (Type == "looked") {
                                $("#his").append("<li><a title='" + Descript + "'>" + Descript + "</a><span class='pop_pinyin' style='display: none;'>" + Pinyin + "</span><span class='pop_code' style='display: none;'>" + CD + "</span></li>");
                            }
                            else {
                                $("#city_hide").append("<dd style='display:none;'><span class='pop_cityname'>" + Descript + "</span>" + Pinyin + "<span class='pop_citypinyin' style='display:none;'>" + Pinyin + "</span></span><span class='pop_citycode' style='display:none;'>" + CD + "</span><span class='pop_city_jp' style='display:none;'>" + FirstPinyin + "</span></dd>");

                                //                                var fp = FirstPinyin.substring(0, 1);
                                //                                if (fp == "A" || fp == "B" || fp == "C" || fp == "D" || fp == "E" || fp == "F") {
                                //                                    $("#a_f").append("<li><a>" + Descript + "</a><span class='pop_pinyin' style='display: none;'>" + Pinyin + "</span><span class='pop_code' style='display: none;'>" + CD + "</span></li>");
                                //                                }
                                //                                else if (fp == "G" || fp == "H" || fp == "I" || fp == "J") {
                                //                                    $("#g_j").append("<li><a>" + Descript + "</a><span class='pop_pinyin' style='display: none;'>" + Pinyin + "</span><span class='pop_code' style='display: none;'>" + CD + "</span></li>");
                                //                                }
                                //                                else if (fp == "K" || fp == "L" || fp == "M" || fp == "N") {
                                //                                    $("#k_n").append("<li><a>" + Descript + "</a><span class='pop_pinyin' style='display: none;'>" + Pinyin + "</span><span class='pop_code' style='display: none;'>" + CD + "</span></li>");
                                //                                }
                                //                                else if (fp == "A" || fp == "P" || fp == "Q" || fp == "R" || fp == "S" || fp == "T" || fp == "U" || fp == "V" || fp == "W") {
                                //                                    $("#p_w").append("<li><a>" + Descript + "</a><span class='pop_pinyin' style='display: none;'>" + Pinyin + "</span><span class='pop_code' style='display: none;'>" + CD + "</span></li>");
                                //                                }
                                //                                else if (fp == "X" || fp == "Y" || fp == "Z") {
                                //                                    $("#x_z").append("<li><a>" + Descript + "</a><span class='pop_pinyin' style='display: none;'>" + Pinyin + "</span><span class='pop_code' style='display: none;'>" + CD + "</span></li>");
                                //                                }
                            }
                        }
                    });

                    $(".zb_pop_se li a").bind("mouseover", function () {
                        $(this).addClass("zb_pop_seon");
                    });

                    $(".zb_pop_se li a").bind("mouseout", function () {
                        $(this).removeClass("zb_pop_seon");
                    });

                    $(".zb_pop_se li a").bind("click", function () {
                        var list_search_csz = $(this).html();
                        var list_search_pinyin = $(this).parent().children(".pop_pinyin").html();
                        var list_search_code = $(this).parent().children(".pop_code").html();

                        $(".zb_pop").hide();
                        $("#city_select").val(list_search_csz);
                        $("#cityName").val(list_search_pinyin);
                        $("#cityCode").val(list_search_code);
                        $("#key_cond").val(list_search_code); //作为商圈的所在城市代码
                        $("#key_cond_txt").val(list_search_csz);
                        $("#cityName_old").val(list_search_csz);
                        $(".popcity_liandong").val(list_search_csz);

                        $("#city_select").parent().removeClass("list_search_inputon");
                        $(".csxz").removeClass("home_banner_order_cityon");

                        if ($("#key").length > 0 && $("#key").val() != "" && $("#key").val().substring(0, 1) != "J") {
                            $("#key").val("");
                            $("#list_zbse").val("");
                        }
                    });
                }
                else {
                    //                    $("#a_f").empty();
                    //                    $("#g_j").empty();
                    //                    $("#k_n").empty();
                    //                    $("#p_w").empty();
                    //                    $("#x_z").empty();
                    $("#his").empty();
                    $("#city_hide").empty();
                }
            }
            else {
                alert("没有相关数据");
            }
        }
    });
}

$(document).click(function (event) {
    if (event.target.id == "cpk_next" || event.target.id == "cpk_pre") {
        return;
    }
    if ((event.target.id != "city_select" && event.target.id != "home_zbjd") || event.target.className == "zb_pop" || event.target.className == "citypop") {
        $(".zb_pop").hide();
        $(".citypop").hide();
        $("#city_select, #list_zbse").parent().removeClass("list_search_inputon");
        $(".csxz").removeClass("home_banner_order_cityon");
        $(".popcity_liandong").attr("class", "popcity_liandong");
    }
})