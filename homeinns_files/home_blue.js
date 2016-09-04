$(function () {
    //敬请期待hover
    $(".sb_jqqd").hover(function () {
        $(this).children().children(".sb_show").show();
    }, function () {
        $(this).children().children(".sb_show").hide();
    });

//    $(".icon_shanglv").hover(function () {
//        $(".sl_show").show();
//    }, function () {
//        $(".sl_show").hide();
//    });
    //关闭小如
    $(".xr_piao_close").click(function () {
        $(".xr_piao").hide();
    });
    $(".top_brand_icon a span:last").css("border-right", "none"); //旗下品牌右侧去除border
    $(".top_brand_icon a").hover(function () {//旗下品牌hover效果
        $(this).addClass("icon_meunon");
    }, function () {
        $(this).removeClass("icon_meunon");
    });
    $(".top_loginL a:last").css("background", "none"); //旗下品牌最后一个去除背景
    $(".top_loginR p a:last,.top_loginR_after p a:last").css({//头部登录最后一个去除背景
        "background": "none",
        "padding-right": "0px",
        "margin-right": "0px"
    });
    //nav导航
    var qcloud = {};
    $('[_t_nav]').hover(function () {
        var _nav = $(this).attr('_t_nav');
        clearTimeout(qcloud[_nav + '_timer']);
        qcloud[_nav + '_timer'] = setTimeout(function () {
            $('[_t_nav]').each(function () {
                $(this)[_nav == $(this).attr('_t_nav') ? 'addClass' : 'removeClass']('navon');
            });
            $('#' + _nav).stop(true, true).slideDown(150);
        }, 150);
    }, function () {
        var _nav = $(this).attr('_t_nav');
        clearTimeout(qcloud[_nav + '_timer']);
        qcloud[_nav + '_timer'] = setTimeout(function () {
            $('[_t_nav]').removeClass('navon');
            $('#' + _nav).stop(true, true).slideUp(150);
        }, 150);
    });
    //banner效果
    $(".home_banner_jtl,.home_banner_jtr").hover(function () {
        $(this).addClass("jton");
    }, function () {
        $(this).removeClass("jton");
    });
    for (bn = 1; bn <= $(".home_banner_img ul").length; bn++) {//循环，给点区域赋值
    };
    $(".home_banner_dian a:first").addClass("home_banner_dianon"); //默认第一个点高亮
    $(".home_banner_dian a").live("hover", function () {
        $(this).addClass("home_banner_dianon").siblings().removeClass("home_banner_dianon");
        $(".home_banner_img ul").eq($(this).index()).fadeIn().siblings().hide();
        $(".home_banner_img").attr("gssnapshot", $(this).index())
    })

    b_time = setInterval("banner_auto()", 5000); //执行自动执行函数	
    $(".home_banner").hover(function () { clearInterval(b_time) }, function () { b_time = setInterval("banner_auto()", 5000); });

    $(".home_banner_img ul").eq(0).show();
    $(".home_banner_jtl").click(function () {
        var ben_s = $(".home_banner_img ul").filter(":visible").index();
        var l_w = $(".home_banner_img ul").length;
        if (ben_s == 0) {
            $(".home_banner_img ul").eq(ben_s).fadeOut("fast", function () {
                $(".home_banner_img ul").eq(l_w - 1).fadeIn("slow");
                $(".home_banner_dian a").eq(l_w - 1).addClass("home_banner_dianon").siblings().removeClass("home_banner_dianon");
                if (window.GridsumWebDissector) {
                    window.GridsumSnapshotID = l_w - 1;
                }
            });
        } else {
            $(".home_banner_img ul").eq(ben_s).fadeOut("fast", function () {
                $(".home_banner_img ul").eq(ben_s - 1).fadeIn("slow");
                $(".home_banner_dian a").eq(ben_s - 1).addClass("home_banner_dianon").siblings().removeClass("home_banner_dianon");
                if (window.GridsumWebDissector) {
                    window.GridsumSnapshotID = ben_s - 1;
                }
            });
        }
    });
    $(".home_banner_jtr").click(function () {
        var r_w = $(".home_banner_img ul").length;
        var r_ban = $(".home_banner_img ul").filter(":visible").index();
        if (r_ban == r_w - 1) {
            $(".home_banner_img ul").eq(r_ban).fadeOut("fast", function () {
                $(".home_banner_img ul").eq(0).fadeIn("slow");
                $(".home_banner_dian a").eq(0).addClass("home_banner_dianon").siblings().removeClass("home_banner_dianon");
                if (window.GridsumWebDissector) {
                    window.GridsumSnapshotID = 0;
                }
            });
        } else {
            $(".home_banner_img ul").eq(r_ban).fadeOut("fast", function () {
                $(".home_banner_img ul").eq(r_ban + 1).fadeIn("slow");
                $(".home_banner_dian a").eq(r_ban + 1).addClass("home_banner_dianon").siblings().removeClass("home_banner_dianon");
                if (window.GridsumWebDissector) {
                    window.GridsumSnapshotID = r_ban + 1;
                }
            });
        }
    });
    //品牌tab
    $(".brand_boxT li:first").addClass("bon");
    $(".brand_boxC div:first").show();
    $(".brand_boxT li").hover(function () {
        $(this).addClass("bon").siblings().removeClass("bon");
        $(".brand_boxC div").eq($(this).index()).show().siblings().hide();
    });
    $(".brand_boxC div dl:last-child").css("margin-right", "0px");
    $(".hot_box:even").css("margin-right", "0px");
    $(".hot_box:first").css("margin-right", "14px");
    $(".footer_gs a:last").css("margin-right", "16px");
    $(".home_navT li").hover(function () {
        $(this).addClass("navon");
    }, function () {
        $(this).removeClass("navon");
    });
    //品牌tab图片hover	
    $(".brand_boxC div dl").hover(function () {
        $(this).children().children(".brand_img").addClass("brandon");
    }, function () {
        $(this).children().children(".brand_img").removeClass("brandon");
    });

    (function (win) {//扫一扫show
        $(function () {
            $(win).scroll(function () {
                // 浏览器窗口的高度 
                var windowPageYOffset = win.pageYOffset;
                // 浏览器窗口的高度 + 页面滚动的距离    
                var windowPageYOffsetAddHeight = windowPageYOffset + window.innerHeight;
                // 该值越小，越早触发效果，自己随便设置
                var sensitivity = 1;
                var imgOffsetTop = $(".home_ewmL_lphone,.home_ewmL_rphone,.home_ewmR").offset().top;
                if (imgOffsetTop >= windowPageYOffset && imgOffsetTop < windowPageYOffsetAddHeight + sensitivity) {
                    // 达到一定位置，触发效果，透明度变为1
                    $(".home_ewmL_lphone,.home_ewmL_rphone,.home_ewmR").css({
                        "transform": "translate3d(0, 0, 0)",
                        "-ms-transform": "translate3d(0, 0, 0)",
                        "-o-transform": "translate3d(0, 0, 0)",
                        "-webkit-transform": "translate3d(0, 0, 0)",
                        "-moz-transform": "translate3d(0, 0, 0)",
                        "opacity": 1
                    });
                }
            })
        })
    } (window))

    $(".hot_box img").hover(function () {//热门优惠促销hover
        $(this).addClass("hotimgon");
        $(this).parent("a").siblings("span").addClass("hon");
    }, function () {
        $(this).removeClass("hotimgon");
        $(this).parent("a").siblings("span").removeClass("hon");
    });

    loadLocalCity();
    $("#btn_search,#btn_search_map").click(function () {

        var click_mark = true;
        if ($("#cityName").val() == "") {
            alert("请选择城市");
            $("#cityName").focus();
            return false;
        }

        if ($("#brand").val() == "") {
            $("#brand").val("rmysjxabcd");
        }

        var orderBy = "0";
        //var orderBy = "11"; //个性化来源
        if ($("#list_zbse").val() != "" && $("#key").val() != "" && $("#key").val().substring(0, 1) == "M") {
            orderBy = "3";
        }

        if ($("#list_zbse").val() != "" && $("#key").val() == "") {
            if ($("#list_zbse").val() != "输入酒店位置 酒店名 或 品牌") {
                var key = encodeURIComponent($.trim($("#list_zbse").val()));

                key = replace_all(key, "%", "_");

                $("#key").val("F" + key);
            }
        }

        var url = "/list/" + $("#cityName").val() + "/" + $("#key").val() + "-" + $("#brand").val() + "---" + orderBy + "-1";
        if ($(this).attr("id") == "btn_search_map") {
            url = "/map/" + $("#cityName").val() + "/" + $("#key").val() + "-" + $("#brand").val() + "---" + orderBy + "-1";
        }
        if ($("#beginDate").val() != undefined) {
            if (parseDate($("#beginDate").val()) >= parseDate($("#endDate").val())) {
                alert("离店日期必须大于入住日期");
                return;
            }
        }
        else {
            if (parseDate($("#J_date_1").val()) >= parseDate($("#J_date_2").val())) {
                alert("离店日期必须大于入住日期");
                return;
            }
        }

        $("#frm").attr("action", url);
        $("#frm").submit();
    });

    $(".home_hot_txt_adress li a:first").css("margin-left", "0px"); //热门目的地--更多目的地 第一个a无左边距

    //    $("#city_select").click(function () {//弹出城市选择框
    //        if ($(this).val() == '中文／全拼') {
    //            $(this).val("");
    //            $(".zb_pop").show().css({ "left": $(this).offset().left + 0, "top": $(this).offset().top + 31 });
    //            $("#home_zbjd").removeClass("csxz");
    //            $(this).addClass("csxz");
    //            $(this).parent().addClass("home_order_form_inputon");
    //        } else {
    //            $(".zb_pop").show().css({ "left": $(this).offset().left + 0, "top": $(this).offset().top + 31 });
    //            $("#home_zbjd").removeClass("csxz");
    //            $(this).addClass("csxz");
    //            $(this).parent().addClass("home_order_form_inputon");
    //        }
    //        if ($(window).scrollTop() < 150) {
    //            $("html, body").animate({ scrollTop: 150 }, "slow");
    //        } else {
    //            return;
    //        }
    //        $(this).addClass("home_banner_order_cityon");
    //    });

    //城市选择开始
    $("#city_select").click(function () {//弹出城市选择框
        if ($(this).val() == '中文／全拼') {
            $(this).val("");
            $(".zb_pop").show().css({ "left": $(this).offset().left + 0, "top": $(this).offset().top + 31 });
            $("#home_zbjd").removeClass("csxz");
            $(this).addClass("csxz");
            $(this).addClass("home_banner_order_cityon");
        } else {
            $(".zb_pop").show().css({ "left": $(this).offset().left + 0, "top": $(this).offset().top + 31 });
            $("#home_zbjd").removeClass("csxz");
            $(this).addClass("csxz");
            $(this).addClass("home_banner_order_cityon");
        }
        if ($(window).scrollTop() < 150) {
            $("html, body").animate({ scrollTop: 150 }, "slow");
        } else {
            return;
        }
    });


    //城市输入感应
    $("#home_zbjd").bind("keyup", function () {
        $("#city_select").val($(this).val());

        //$(".zb_pop").show().css({ "left": $("#home_zbjd").offset().left - 3, "top": $("#home_zbjd").offset().top + 30 });
        $(".zb_pop").show().css({ "left": $(this).offset().left + 0, "top": $(this).offset().top + 31 });
        if (replace_all($(this).val(), " ", "") != "" && replace_all($(this).val(), " ", "") != "中文／全拼") {
            if ($("#cityName_old").val() != $(this).val()) {
                $("#cityName_old").val($(this).val());
                bindCityInput(this);
                $(".home_zb_w635_ss li").removeClass("home_zb_w635_sson");
                $(".home_zb_w635_ss li").removeClass("home_zb_iconclick");
                $(".home_around").slideUp();
                $(".home_around_sj").hide();
            }
        }
        else {
            $(".home_zb_w635_ss li").removeClass("home_zb_w635_sson");
            $(".home_zb_w635_ss li").removeClass("home_zb_iconclick");
            $(".home_around").slideUp();
            $(".home_around_sj").hide();

            if (($("#city_select").val() == "" || $("#city_select").val() == "中文／全拼" || $(".popcity_liandong").val() == "" || $(".popcity_liandong").val() == "中文／全拼") && $("#cityCode").val() != "") {
                $("#city_select").val("");
                $(".popcity_liandong").val("");
                $("#cityName").val("");
                $("#cityCode").val("");
                $("#cityName_old").val("");
            }
        }
    });

    $(".zb_pop_close").click(function () {
        $(".zb_pop").hide();
        $("#city_select").removeClass("home_banner_order_cityon");
        $("#home_zbjd").removeClass("home_zb_w635_searchon");
    });

    $(".zb_pop_tab li:first").addClass("zb_pop_tabon");

    $(".zb_pop_tab li").click(function () {
        $(this).addClass("zb_pop_tabon").siblings().removeClass("zb_pop_tabon");
    });

    $(".zb_pop_se li a").hover(function () {
        $(this).addClass("zb_pop_seon");
    }, function () {
        $(this).removeClass("zb_pop_seon");
    });

    $(".zb_pop_se li a").click(function () {//关键字选择
        var home_zb_pop_se_z = $(this).html();
        $(".zb_pop").hide();
        $(".csxz").val(home_zb_pop_se_z);
        if ($(".csxz").attr("id") == 'city_select') {
            //$(".citypop").show().css({"left":$("#city_select").offset().left-3,"top":$("#city_select").offset().top+30});
            $("#city_select").removeClass("home_banner_order_cityon");
        }
        if ($(".csxz").attr("id") == 'home_zbjd') {
            $("#home_zbjd").removeClass("home_zb_w635_searchon");
        }
    });

    $(".home_zb_w635_ss li").hover(function () {
        var zb_ss_bgx = $(this).attr("bdx");
        $(this).children("i").css("background-position", zb_ss_bgx + "px -52px");
    }, function () {
        if ($(this).hasClass("home_zb_iconclick")) {
            return;
        } else {
            var zb_ss_bgx = $(this).attr("bdx");
            $(this).children("i").css("background-position", zb_ss_bgx + "px 0px");
        }
    });

    $(".home_around_tab li a:first").addClass("home_around_tabon");
    $(".home_around_change li a:first").addClass("home_around_changeon");
    $(".home_around_change li a").hover(function () {
        $(this).addClass("home_around_changeon");
    }, function () {
        $(this).removeClass("home_around_changeon");
    });

    $(".home_zb_w635_ss li").click(function () {
        var zb_ss_bgx = $(this).attr("bdx");
        if ($(this).hasClass("home_zb_iconclick")) {
            $(this).children("i").css("background-position", zb_ss_bgx + "px 0px");
            $(this).removeClass("home_zb_iconclick");
            $(".home_around").slideUp();
            $(".home_around_sj").hide()
        } else {
            $(".home_zb_w635_ss li").each(function () {
                var zb_ss_bgxt = $(this).attr("bdx");
                $(this).children("i").css("background-position", zb_ss_bgxt + "px 0px");
            });
            $(this).children("i").css("background-position", zb_ss_bgx + "px -52px");
            $(this).addClass("home_zb_iconclick").siblings().removeClass("home_zb_iconclick");
            $(".home_around").slideDown();
            $(".home_around_sj").show().css({ "left": $(this).offset().left + 26, "top": $(".home_around").offset().top - 9 });
            bindZone(this)//绑定周边信息
        }
    });
    //快速查找周边酒店结束

    //热门优惠与促销js开始
    var home_promo_l = $(".home_promo_pe div ul").length; //获取列表ul的长度
    var home_promo_y = home_promo_l % 3; //取余
    var home_promo_z = parseInt(home_promo_l / 3);
    //整除结果
    var home_promo_d;
    if (home_promo_y == 0) {//判读是否整除
        home_promo_d = home_promo_z;
    } else {
        home_promo_d = home_promo_z + 1;
    }
    for (i = 1; i <= home_promo_d; i++) {//循环，给点区域赋值
        var _bannerdian = $("<span></span>");
        $(".home_promo_dian").append(_bannerdian);
    };
    $(".home_promo_dian span:first").addClass("home_promo_dianon"); //默认第一个点高亮
    $(".home_promo_dian span").live("hover", function () {
        var home_promo_index = $(this).index();
        var home_promo_spanl = $(".home_promo_dian span").length - 1;
        $(this).addClass("home_promo_dianon").siblings().removeClass("home_promo_dianon");
        if (home_promo_index == home_promo_spanl) {
            if (home_promo_y == 0) {
                $(".home_promo_pe div").animate({ "margin-left": -home_promo_index * 984 }, "slow");
            } else {
                $(".home_promo_pe div").animate({ "margin-left": 328 * (3 - home_promo_y) - home_promo_index * 984 }, "slow");
            }
        } else {
            $(".home_promo_pe div").animate({ "margin-left": -home_promo_index * 984 }, "slow");
        }
    })


    //热门优惠与促销js结束	

    $(".home_around_tab li a").hover(function () {
        $(this).addClass("home_around_tabon");
    }, function () {
        $(this).removeClass("home_around_tabon");
    });

    //关闭弹窗
    $(".sy_tk a").click(function () {
        $(".sy_tk").hide();
        $(".popup").hide();
    });
});

$(document).click(function (event) {
    if (event.target.className != "home_banner_jtr") {
        if ($(".citypop").is(":visible")) {
            return;
        } else {
            if (event.target.id == "city_select" || event.target.id == "home_zbjd") {	//入住城市失去焦点事件
                $(".zb_pop").show();
            } else {
                $(".zb_pop").hide();
                $(".citypop").hide();
                $("#city_select").removeClass("home_banner_order_cityon");
                $("#home_zbjd").removeClass("home_zb_w635_searchon");
            }
        }

        if (event.target.id == "home_zbse") {	//关键字失去焦点事件
            $(".keyword_pop").show();
        } else {
            $(".keyword_pop").hide();
            $(".keyword_pop_two").hide();
            $("#home_zbse").removeClass("home_banner_order_keywordon");
        }
    }
})

function bindZone(obj) {
    if ($("#cityCode").val() != "") {
        $.ajax({
            type: "GET",
            url: "/Ajax/GetZoneByCity",
            data: { name: $("#cityCode").val(), type: $(obj).attr("mt"), ts: Math.random() },
            dataType: "json",
            success: function (result) {
                if (result != null && result.Code == "200") {
                    if (result.data != null && result.data != undefined && result.data != "") {
                        $("#zone_tp").empty();
                        $("#zone_bt").empty();
                        var lv_max = "";
                        var first = "";

                        var show_mark = false;

                        $(result.data).each(function (i) {
                            var ID = result.data[i].ID;
                            var AreaCd = result.data[i].AreaCd;
                            var AreaNm = result.data[i].AreaNm;
                            var AreaSort = result.data[i].AreaSort;
                            var AreaTpSubNm = result.data[i].AreaTpSubNm;
                            var TypeSubCd = result.data[i].TypeSubCd;
                            var Cd = result.data[i].Cd;
                            var lon = result.data[i].Lon;
                            var lat = result.data[i].Lat;

                            var t_mk = "";
                            var b_mk = "";
                            if (AreaTpSubNm.length >= 7) {
                                AreaTpSubNm = AreaTpSubNm.substring(0, 6) + "...";
                                t_mk = result.data[i].AreaTpSubNm;
                            }
                            if (AreaNm.length >= 7) {
                                AreaNm = AreaNm.substring(0, 6) + "...";
                                b_mk = result.data[i].AreaNm;
                            }
                            var bot_mk = "";
                            if (lv_max.indexOf(TypeSubCd) == -1) {
                                lv_max = lv_max + "," + TypeSubCd;

                                var top_mk = $(obj).attr("mt") == Cd ? "" : "none";

                                if (top_mk != "none" && first == "") {
                                    first = TypeSubCd;
                                }

                                bot_mk = first == TypeSubCd ? "" : "none";
                                if (bot_mk != "none") {
                                    show_mark = true;
                                }

                                var content_top = "<li style='cursor:pointer; display:" + top_mk + ";'><a style='text-decoration:none' mt = '" + Cd + "' lt='" + TypeSubCd + "' pick='' title='" + t_mk + "'>" + AreaTpSubNm + "</a></li>";
                                var content_bot = "<li style='display:" + bot_mk + ";'><a style='text-decoration:none' mt = '" + Cd + "' lt = '" + TypeSubCd + "' pick='' lon='" + lon + "' lat='" + lat + "' title='" + b_mk + "'>" + AreaNm + "</a></li>";

                                $("#zone_tp").append(content_top);
                                $("#zone_bt").append(content_bot);
                            }
                            else {
                                bot_mk = first == TypeSubCd ? "" : "none";
                                if (bot_mk != "none") {
                                    show_mark = true;
                                }

                                $("#zone_bt").append("<li style='display:" + bot_mk + ";'><a style='text-decoration:none' mt = '" + Cd + "' lt = '" + TypeSubCd + "' pick='' lon='" + lon + "' lat='" + lat + "' title='" + b_mk + "'>" + AreaNm + "</a></li>");
                            }
                        });

                        for (var k = 0; k < $(".home_around_tab li").length; k++) {
                            if ($(".home_around_tab li").eq(k).css("display") != "none") {
                                $(".home_around_tab li").eq(k).children("a").addClass("home_around_tabon");
                                $(".home_around_tab li").eq(k).children("a").attr("pick", "true");
                                break;
                            }
                        }

                        $(".home_around_change li a").bind("click", function () {
                            var lon = $(this).attr("lon");
                            var lat = $(this).attr("lat");

                            if (lon != "" && lat != "") {
                                $("#list_zbse").val($(this).text());
                                $("#key").val("M" + lon + "_" + lat + "_5");
                                var orderBy = "3";
                                var url = "/list/" + $("#cityName").val() + "/" + $("#key").val() + "-rmysjxabcd---3-1";

                                if ($("#beginDate").val() != undefined) {
                                    if (parseDate($("#beginDate").val()) >= parseDate($("#endDate").val())) {
                                        alert("离店日期必须大于入住日期");
                                        return;
                                    }
                                }
                                else {
                                    if (parseDate($("#J_date_1").val()) >= parseDate($("#J_date_2").val())) {
                                        alert("离店日期必须大于入住日期");
                                        return;
                                    }
                                }

                                $("#frm").attr("action", url);
                                $("#frm").submit();
                            }
                        });

                        $(".home_around_change li a").bind("mouseover", function () {
                            $(this).addClass("home_around_changeon");
                        });

                        $(".home_around_change li a").bind("mouseout", function () {
                            if ($(this).attr("pick") != "true") {
                                $(this).removeClass("home_around_changeon");
                            }
                        });

                        $("#zone_tp").children("li").bind("click", function () {
                            var typetop = $($(this).html()).attr("lt");
                            var mark = true;
                            $(".home_around_tabon").attr("pick", "");
                            $(".home_around_tabon").removeClass("home_around_tabon");

                            $(this).children("a").attr("pick", "true");
                            $(this).children("a").addClass("home_around_tabon");

                            $("#zone_bt").children("li").each(function () {
                                $(this).hide();
                                $(this).children("a").removeClass("home_around_changeon");
                                $(this).children("a").attr("pick", "");

                                var typebot_lt = $($(this).html()).attr("lt");
                                var typebot_mt = $($(this).html()).attr("mt");
                                if (typetop == typebot_lt && $(obj).attr("mt") == typebot_mt) {
                                    $(this).show();
                                }
                            });
                        });

                        $("#zone_tp li a").bind("mouseover", function () {
                            $(this).addClass("home_around_tabon");
                        });

                        $("#zone_tp li a").bind("mouseout", function () {
                            if ($(this).attr("pick") != "true") {
                                $(this).removeClass("home_around_tabon");
                            }
                        });

                        $(".home_around_tab li").each(function () {
                            if (($(this).index() + 1) % 8 == 0) {
                                $(this).css("width", "auto");
                            }
                            if ($(this).index() > 7) {
                                $(this).children("a").css("line-height", "28px");
                            }
                        });

                        if (show_mark == true) {
                            $(".home_around").slideDown();
                            $(".home_around_sj").show().css({ "left": $(obj).offset().left + 26, "top": $(".home_around").offset().top - 9 });
                        }
                    }
                    else {
                        $("#zone_tp").empty();
                        $("#zone_bt").empty();
                    }
                }
                else {
                    $("#zone_tp").empty();
                    $("#zone_bt").empty();

                    var zb_ss_bgx = $(obj).attr("bdx");
                    $(obj).children("i").css("background-position", zb_ss_bgx + "px 0px");
                    $(obj).removeClass("home_zb_iconclick");
                    $(".home_around").slideUp();
                    $(".home_around_sj").hide();
                }
            }
        });
    }
    else {
        alert("请先选择城市");
    }
}

function loadLocalCity() {
    var url = location.href.replace("http://", "");
    if (url.lastIndexOf("/") == url.length - 1) {
        url = url.substring(0, url.length - 1);
    }

    if (url.indexOf("/") != -1 && url.substring(url.indexOf("/homeinn")) != "/homeinn" && url.substring(url.indexOf("/motel")) != "/motel" && url.substring(url.indexOf("/yitel")) != "/yitel" && url.substring(url.indexOf("/yssj")) != "/yssj") {
        return;
    }

    var cityChinese = "上海";
    try {
        cityChinese = remote_ip_info["city"];
    }
    catch (e) {

    }

    $.ajax({
        type: "GET",
        url: "/Ajax/GetCityByChineseName",
        data: { name: cityChinese, ts: Math.random() },
        dataType: "json",
        success: function (result) {
            if (result != null && result.Code == "200") {
                if (result.data != null && result.data != undefined && result.data != "") {
                    var CD = result.data.CD;
                    var Descript = result.data.Descript;
                    var Pinyin = result.data.Pinyin;
                    $("#city_select").val(Descript);
                    $("#cityName").val(Pinyin);
                    $("#cityCode").val(CD);
                    $("#cityName_old").val(Descript);

                    $(".popcity_liandong").val(Descript);

                    $("#key_cond").val(CD);
                    $("#key_cond_txt").val(Descript);
                }
            }
        }
    });
}

function bannerlog(id) {
    $.ajax({
        type: "GET",
        url: "/Ajax/AddScrollPicLog",
        data: { id: id, ts: Math.random() },
        dataType: "json",
        success: function (data) {
        }
    });
}

function parseDate(str) {
    if (str instanceof Date) {
        return str;
    }
    if (typeof str == 'string') {
        var results = str.match(/^ *(\d{4})(\d{2})(\d{2}) *$/);
        if (results && results.length > 3)
            return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10));
        results = str.match(/^ *(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2}) *$/);
        if (results && results.length > 6)
            return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10), parseInt(results[6], 10));
        results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);
        if (results && results.length > 3)
            return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10));
        results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}) *$/);
        if (results && results.length > 5)
            return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10));
        results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
        if (results && results.length > 6)
            return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10), parseInt(results[6], 10));
        results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);
        if (results && results.length > 7)
            return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10), parseInt(results[6], 10), parseInt(results[7], 10));
    }
    return null;
}

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

//banner自动滚动
function banner_auto() {
    img_count = $(".home_banner_dian a").length;
    hight_num = $(".home_banner_dianon").index(); //知道现在高亮的是哪一个
    if (hight_num == img_count - 1) {
        $(".home_banner_dian a").eq(0).addClass("home_banner_dianon").siblings().removeClass("home_banner_dianon"); //改变高亮
        $(".home_banner_img ul").eq(0).fadeIn().siblings().hide(); //改变图片
        $(".home_banner_img").attr("gssnapshot", 0);
    } else {
        $(".home_banner_dian a").eq(hight_num + 1).addClass("home_banner_dianon").siblings().removeClass("home_banner_dianon"); //改变高亮
        $(".home_banner_img ul").eq(hight_num + 1).fadeIn().siblings().hide(); //改变图片	
        $(".home_banner_img").attr("gssnapshot", hight_num + 1);
    }
}

////四个品牌切换效果
//$(".home_bround_po dl").eq(0).addClass("liston");
//$(".home_bround_po dl").hover(function () {
//    $(this).addClass("liston").siblings().removeClass("liston");
//});		
