/**
 *
 * @author yadong.zhang (yadong.zhang0415(a)gmail.com)
 * @website https://www.zhyd.me
 * @version 1.0
 * @date 2017-04-01
 * @since 1.0
 */

// 动态切换浏览器窗口title https://zhangge.net/
jQuery(document).ready(function() {
    function c() {
        document.title = document[a] ? "嘤嘤嘤": d
    }
    var a, b, d = document.title;
    "undefined" != typeof document.hidden ? (a = "hidden", b = "visibilitychange") : "undefined" != typeof document.mozHidden ? (a = "mozHidden", b = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (a = "webkitHidden", b = "webkitvisibilitychange");
    "undefined" == typeof document.addEventListener && "undefined" == typeof document[a] || document.addEventListener(b, c, !1)
});

function initNavbar() {
    $(".navbar .navbar-nav li").each(function () {
        var $this = $(this);
        if ($this.hasClass("dropdown")) {
            $this.on("mouseover", function () {
                $this.addClass("open").find("a:first-child").attr("aria-expanded", "true");
            }).on("mouseout", function () {
                $this.removeClass("open").find("a:first-child").attr("aria-expanded", "false");
            });
        }
        $this.find("a").each(function () {
            var $this = $(this);
            var $parent = $this.parent();
            $parent.removeClass("active");
            if ($this.attr("href") === $.tool.currentPath()) {
                $parent.toggleClass("active");
            }
        });
    });
}


function initScrollMenu() {
    var topmenu = $("#topmenu"); //得到导航对象
    var mainmenu = $("#mainmenu"); //得到导航对象
    var win = $(window); //得到窗口对象
    var sc = $(document);//得到document文档对象。
    var am = $(".article-module");// 文章目录对象
    bindScroll();
    win.scroll(function () {
        bindScroll();
    });

    function bindScroll() {
        if (sc.scrollTop() >= 100) {
            if (!mainmenu.hasClass("transparent")) {
                topmenu.animate({opacity: '0'}, 0);
                mainmenu.addClass('transparent');
                if (win.width() > 768) {
                    mainmenu.animate({top: '0', 'z-index': 1000}, 1);
                }
            }
        } else {
            topmenu.animate({opacity: '1'}, 0);
            mainmenu.removeClass('transparent');
            if (win.width() > 768) {
                mainmenu.animate({top: '30', 'z-index': 998}, 1);
            }
        }
    }
}

// var PaymentUtils = window.payment || {
//     config: [{url: appConfig.zfbPraiseCode, desc: '支付宝转账'}, {url: appConfig.wxPraiseCode, desc: '微信转账'}],
//     show: function () {
//         $("#reward").modal('show');
//         this.change(0);
//         $("#reward input").on('ifChecked', function (event) {
//             var index = $(this).data("index");
//             PaymentUtils.change(index);
//         });
//     },
//     hide: function () {
//         $("#reward").modal('hide');
//     },
//     change: function (index) {
//         var config = this.config[index];
//         $("#qrcode-container").empty();
//         $('<img  src="' + config.url + '" style="width: 250px;height: auto;" alt="' + config.desc + '">').appendTo($("#qrcode-container"));
//     }

// };


$(function () {

    $(document).ready(function () {
        NProgress.start();
    });
    $(window).load(function () {
        NProgress.done();
    });

    // # NProgress页面顶部进度条
    $(document).ajaxStart(function () {
        NProgress.start();
    }).ajaxStop(function () {
        NProgress.done();
    });

    initNavbar();
    initScrollMenu();


    $('.to-top').toTop({
        autohide: true,//返回顶部按钮是否自动隐藏。可以设置true或false。默认为true
        offset: 100,//页面滚动到距离顶部多少距离时隐藏返回顶部按钮。默认值为420
        speed: 500,//滚动和渐隐的持续时间，默认值为500
        right: 25,//返回顶部按钮距离屏幕右边的距离，默认值为15
        bottom: 50//返回顶部按钮距离屏幕顶部的距离，默认值为30
    });

    $("[data-toggle='tooltip']").tooltip();
    $('[data-toggle="popover"]').popover();

    // 图片预览
    $(".showImage").fancybox();

    if ($("#scrolldiv")) {
        $("#scrolldiv").textSlider({line: 1, speed: 300, timer: 5000});
    }

    if ($.rating) {
        $.rating.init(5);
    }

    if ($.bubble) {
        $.bubble.init();
    }

    getCurrentDate(), setInterval(function () {
        getCurrentDate();
    }, 1000);

    function getCurrentDate() {
        var now = new Date();
        var weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        $("#currentTime").html(now.format('yyyy年MM月dd日 hh时mm分ss秒') + " " + weekArr[now.getDay()]);
    }

    

    /* 显示取链的表格 */
    $(".showContent").click(function () {
        $(this).toggleClass('fa-plus-square fa-minus-square');
        // $(".disable-content").toggleClass('fade-in hide');
        $(".disable-content").slideToggle(400);
    });

    /* 分享 */
    // if (/iphone|ipod|ipad|ipad|mobile/i.test(navigator.userAgent.toLowerCase())) {
    //     $('.share-sd').click(function () {
    //         $('#share').animate({
    //                 opacity: 'toggle',
    //                 top: '-80px'
    //             },
    //             500).animate({
    //                 top: '-60px'
    //             },
    //             'fast');
    //         return false;
    //     });
    // } else {
    //     $(".share-sd").mouseover(function () {
    //         $(this).children("#share").show();
    //     });
    //     $(".share-sd").mouseout(function () {
    //         $(this).children("#share").hide();
    //     });
    // }

    /* 文章点赞 */
    $("#social .like").click(function () {
        var $this = $(this);
        var $a = $(this).find("a");
        var $count = $a.find("i.count");
        var id = $a.data("id");
        $.bubble.unbind();
        $.ajax({
            type: "post",
            url: "/api/doPraise/" + id,
            success: function (json) {
                $.alert.ajaxSuccess(json);
                if (json.status === 200) {
                    $this.effectBubble({
                        y: -80,
                        className: 'thumb-bubble',
                        fontSize: 1,
                        content: '<i class="fa fa-smile-o"></i>+1'
                    });
                    $count.text(parseInt($count.text()) + 1);
                }
                $.bubble.init();
            },
            error: function () {
              //  $.alert.ajaxError();
                $.bubble.init();
            }
        });
    });

    /* 图片懒加载 */
    $("img.lazy-img").lazyload({
        placeholder: appConfig.staticPath + "/img/loading.gif",
        effect: "fadeIn",
        threshold: 100
    });
    $(window).bind("load", function () {
        var timeout = setTimeout(function () {
            $("img.lazy-img").trigger("sporty");
        }, 3000);
    });

    /* 热门搜索标签点击事件 */
    $(".search-hot li").click(function () {
        var $this = $(this);
        var text = $this.find("a span").text();
        $this.parents(".searchForm").find("input[name=keywords]").val(text);
        $this.parents(".searchForm").find(".nav-search-btn").click();
    });

  

    /* 首页通知, AMD YES! */
    if ($('#notice-box') && $('#notice-box')[0]) {
        $.ajax({
            type: "post",
            url: "/api/listNotice",
            success: function (json) {
                if (json.status == 200 && json.data && json.data.length > 0) {
                    var tpl = '{{#data}}<li class="scrolltext-title">'
                        + '<a href="javascript:void(0)" rel="bookmark">{{&content}}</a>'
                        + '</li>{{/data}}';
                    var html = Mustache.render(tpl, json);
                    $("#notice-box").html(html);
                }
            },
            error: function () {
                //$.alert.ajaxError();
            }
        });
    }

    /* 轮播图 */
    $('#myCarousel').mouseover(function () {
        $(".carousel-control").removeClass("hide");
    }).mouseout(function () {
        $(".carousel-control").addClass("hide");
    }).carousel({
        interval: 5000
    });

   
});