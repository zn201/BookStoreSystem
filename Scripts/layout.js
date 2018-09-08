(function (d) {
    d.fn.Jlazyload = function (c, b) {
        if (this.length) {
            var a = d.extend({ type: null, offsetParent: null, source: "data-src", placeholderImage: "/images/grey.gif", placeholderClass: "loading-style1", threshold: 200 }, c || {}), e = this, f, m, h = function (a) { for (var e = a.scrollLeft, b = a.scrollTop, d = a.offsetWidth, m = a.offsetHeight; a.offsetParent;)e += a.offsetLeft, b += a.offsetTop, a = a.offsetParent; return { left: e, top: b, width: d, height: m } }, g = function () {
                var f = document.documentElement, c = document.body; m = {
                    left: window.pageXOffset ? window.pageXOffset :
                        f.scrollLeft || c.scrollLeft, top: window.pageYOffset ? window.pageYOffset : f.scrollTop || c.scrollTop, width: f.clientWidth, height: f.clientHeight
                }; e = e.filter(function () { return d(this).attr(a.source) }); d.each(e, function () {
                    var e = d(this).attr(a.source); if (e) {
                        var f = !a.offsetParent ? m : h(d(a.offsetParent).get(0)), c, g = h(this), i, j, k, l, n = a.threshold ? parseInt(a.threshold) : 0; c = f.left + f.width / 2; i = g.left + g.width / 2; j = f.top + f.height / 2; k = g.top + g.height / 2; l = (f.width + g.width) / 2; f = (f.height + g.height) / 2; c = Math.abs(c - i) < l + n && Math.abs(j -
                            k) < f + n; switch (a.type) { case "image": i = d(this); c && (i.attr("src", e).removeAttr(a.source), b && b(e, i)); break; case "textarea": i = d(this); c && (d("#" + e).html(i.val()).removeAttr(a.source), i.remove(), b && b(e, i)); break; case "module": i = d(this), c && (i.removeAttr(a.source), b && b(e, i)) }
                    }
                })
            }, j = function () { 0 < e.length && (clearTimeout(f), f = setTimeout(function () { g() }, 10)) }; g(); a.offsetParent ? d(a.offsetParent).bind("scroll", function () { j() }) : d(window).bind("scroll", function () { j() }).bind("reset", function () { j() })
        }
    }
})(jQuery);
function change(d) { var c = document.getElementById(d).href, c = c.substring(0, c.length - 6), c = c + RndNum(6); document.getElementById(d).href = c } function RndNum(d) { for (var c = "", b = 0; b < d; b++)c += Math.floor(10 * Math.random()); return c }
jQuery.cookie = function (d, c, b) {
    if ("undefined" != typeof c) { b = b || {}; null === c && (c = "", b.expires = -1); var a = ""; if (b.expires && ("number" == typeof b.expires || b.expires.toUTCString)) "number" == typeof b.expires ? (a = new Date, a.setTime(a.getTime() + 864E5 * b.expires)) : a = b.expires, a = "; expires=" + a.toUTCString(); var e = b.path ? "; path=" + b.path : "", f = b.domain ? "; domain=" + b.domain : "", b = b.secure ? "; secure" : ""; document.cookie = [d, "=", encodeURIComponent(c), a, e, f, b].join("") } else {
        c = null; if (document.cookie && "" != document.cookie) {
            b =
            document.cookie.split(";"); for (a = 0; a < b.length; a++)if (e = jQuery.trim(b[a]), e.substring(0, d.length + 1) == d + "=") { c = decodeURIComponent(e.substring(d.length + 1)); break }
        } return c
    }
};
$(function () {
    //var d = jQuery.cookie("Email"), c = jQuery.cookie("Nick"); c ? d = (new Function("return '" + c + "'"))() : d && (c = d.indexOf("@"), 0 < c && (d = d.substr(0, c))); d && ($(".loginInfo").show(), $(".loginInfo .userName").text(d), $(".welcome").hide()); $(".loginInfo a,.welcome a,#reviewLogin").each(function () { $(this).attr("href", $(this).attr("href") + "?url-redirect-to=" + escape(document.location)) }); $("#i-mycart").hover(function () { window.cartWin = setTimeout(function () { $("#o-mycart-list").fadeIn("fast") }, 500) }, function () {
    //    clearTimeout(cartWin);
    //    $("#o-mycart-list").fadeOut("fast")
    //}); window.loadCart = function (a) {
    //    var e = ""; $(a.Items).each(function (a, b) { e = e + '<dl class="index-gouwu-list"><div class="index-gouwu-img"> <img src="' + b.Image + '" width="40" /> </div><dt><a href="' + b.Url + '">' + b.Name + '</a></dt><dd>\u9500\u552e\u4ef7 \uff1a<span class="f-Price">\uffe5' + b.SalePrice + "</span> </dd><dd> \u539f\u4ef7\uff1a\uffe5" + b.OriginalPrice + "</dd><dd> \u6570\u91cf\uff1a" + b.Quantity + " \u4ef6</dd></dl>" }); html = e = a.Items.length == 0 ? '<span style="margin:10px;color:Gray"><br />\u60a8\u7684\u8d2d\u7269\u8f66\u4e2d\u6682\u65e0\u5546\u54c1\uff0c\u8d76\u5feb\u9009\u62e9\u5fc3\u7231\u7684\u5546\u54c1\u5427\uff01</span>' :
    //        e + '<div style="text-align:right; line-height:30px;">\u5171  <span class="f-red" id="itemQuan">' + a.Quantity + '</span>  \u4ef6\u5546\u54c1\uff0c \u91d1\u989d\u603b\u8ba1\uff1a <span class="f-Price">\uffe5' + a.Total + '</span> </div><div style="text-align:right"> <a href="http://order.99read.com"><img src="http://static.99read.com/images/button/button-JS.jpg" alt="\u7ed3\u7b97\u4e2d\u5fc3" border="0" /></a></div>'; $("#o-mycart-list").html(html); $("#mycart-amount").text(a.Quantity); $("#goodscount").text("\u5df2\u6709" +
    //            a.Quantity + "\u4ef6\u5546\u54c1,"); $(".deleitem").click(function () { $(this).text("\u5220\u9664\u4e2d..."); $.post($(this).attr("href"), null, function () { $.post("http://order.99read.com/ajax/cartInfo.aspx?jsoncallback=?", null, loadCart, "html") }, "html"); return false })
    //};
    //$.getJSON("http://order.99read.com/ajax/cartInfo.aspx?jsoncallback=?", null, loadCart); $(".banner-more-l,.banner-more-r").click(function () {
    //    var a = $(".banner-more").attr("index"); if (a) a = parseInt(a); else { a = 0; $("#banner-more").attr("index", 0) } $("a",
    //        this).hasClass("banner-more-l") ? a-- : a++; a >= $(".banner-more ul").length && (a = 0); a < 0 && (a = $(".banner-more ul").length - 1); $(".banner-more").attr("index", a); $(".banner-more ul:visible").hide(); $(".banner-more ul").eq(a).show(); return false
    //});
    var b = $("div.navbar-box:eq(0)"); (d = b.attr("channel")) && $.get("/Ajax/GetNav.aspx", { c: d }, function (a) { b.empty(); b.append(a) }, "html"); $("#justTime .Jmenu li").click(function () {
        var a = $("#justTime").attr("index"); if (a) a = parseInt(a); else { a = 0; $("#justTime").attr("index", 0) } $("a",
            this).hasClass("prev_s") ? a-- : a++; a >= $("#justTime .tab-holder").length && (a = 0); a < 0 && (a = $("#justTime .tab-holder").length - 1); $("#justTime").attr("index", a); $("#justTime .tab-holder:visible").hide(); $("#justTime .tab-holder").eq(a).show(); return false
    }); $("#justTime .tab-holder").each(function (a, e) { try { var b = parseFloat($(".v0", e).val()), c = parseFloat($(".v1", e).val()), d = Math.round(c / b * 100) * 0.1; $(".zhekou-img", e).html((d + ".0").substr(0, 3)) } catch (g) { $(".zhekou-img", e).remove() } }); 0 < $("#justTime .tab-holder").length &&
        setInterval(function () {
            $("#justTime .tab-holder").each(function (a, b) {
                var f = new Date($(".endDate", b).val().replace(/-/g, "/")) - new Date; if (f < 0) { $(".time-holder .title" + (a + 1)).html("<span class='f-14bold f-red'>\u6b64\u6b21\u9650\u65f6\u62a2\u8d2d\u5df2\u7ed3\u675f!</span>"); return true } var c = parseInt(f / 1E3 / 60 / 60), d = parseInt((f - c * 36E5) / 1E3 / 60), f = parseInt((f - c * 36E5 - d * 6E4) / 1E3); $(".h", b).text(c > 9 || c < 0 ? Math.abs(c) : "0" + c); $(".m", b).text(d > 9 || d < 0 ? Math.abs(d) : "0" + d); $(".s", b).text(f > 9 || f < 0 ? Math.abs(f) : "0" +
                    f)
            })
        }, 1E3); $(".Jtab").each(function () { var a = this; $(".Jmenu li", a).each(function (b, c) { $(c).hover(function () { $(".current", a).removeClass("current"); $(this).addClass("current"); $(".Jmenudiv>*", a).hide(); $(".Jmenudiv", a).children().eq(b).show(); $(".Jmenudiv", a).children().eq(b); var c = $(".Jmenudiv", a).children().eq(b); $("img[data-src]", c).Jlazyload({ type: "image" }) }) }) }); $(".search-textA#q").focus(function () { $(this).val() == $(this).attr("oldv") && $(this).val(""); $(this).css("color", "#333") }).blur(function () {
            $(this).val() ==
            "" && $(this).val($(this).attr("oldv")); $(this).val() == $(this).attr("oldv") && $(this).css("color", "#ccc")
        }); $("form#search").submit(function () {
            var a = $.trim($(".search-textA#q").val()); if (a == "" || $(".search-textA#q").val() == $(".search-textA#q").attr("oldv")) { alert("\u8bf7\u8f93\u5165\u5173\u952e\u5b57"); return false } if (a == "79\u90095") { window.location.href = "http://www.99read.com/Product/Promotion79In5.aspx"; return false } if (a == "\u534a\u4ef7\u6298\u6263") {
                window.location.href = "http://www.99read.com/Product/DiscountProduct.aspx";
                return false
            }
        }); 0 < $(".Jtab-newhead:hidden").length && $(".allsort").hover(function () { window.openMenu = setTimeout(function () { $(".Jtab-newhead").show() }, 300) }, function () { clearTimeout(openMenu); $(".indexpage2010_popup:visible").hide(); $(".Jtab-newhead").hide() }); $(".Jindex-001").each(function (a) { $(this).removeClass("Jindex-001"); $(this).addClass("Jindex-0" + (a + 1 > 9 ? "" : "0") + (a + 1)) }); $(".Jmenu-list>li").hover(function (a) {
            var b = $(this); a: {
                if (b.children(".indexpage2010_popup").size() == 0) {
                    var c = b.children("h2").find(".Jlabel"),
                    d; b: { d = $.trim(c.text()); if (categories) for (var h = 0; h < categories.length; h++) { var g = categories[h]; if (g.n == d) { d = g; break b } } d = null } if (!d) break a; for (var g = $("<div class='indexpage2010_popup Jindex-002'></div>").prependTo(b), j = $("<div class='indexpage2010_popup_left'></div>").prependTo(g).append("<h4 class='f-hui f-bold'>\u9009\u62e9\u5206\u7c7b</h4>"), h = 0; h < d.c.length; h++) {
                        var k = d.c[h], c = $("<div class='indexpage2010_list'></div>").appendTo(j), l = $("<h3></h3>").appendTo(c); k.u ? $("<a class='f-title-A f-bold'></a>").attr("href",
                            "http://www.99read.com" + k.u).attr("target", "_blank").appendTo(l).text(k.n) : l.text(k.n); $item_c = $("<div class='indexpage2010_link'></div>").appendTo(c); for (c = 0; c < k.c.length; c++) { l = k.c[c]; $("<a></a>").attr("target", "_blank").attr("href", "http://search.99read.com" + l.u).appendTo($item_c).text(l.n) }
                    } h = $("<div></div>").prependTo(g).addClass("indexpage2010_popup_right").append("<h3 class='f-hui f-bold'>\u4e3b\u9898\u9986</h3>"); g = $("<div></div>").addClass("indexpage2010_link-TuiJian").appendTo(h); for (h =
                        0; h < d.s.length; h++) { j = d.s[h]; $("<a></a>").appendTo(g).attr("href", "http://www.99read.com/" + j.u).attr("target", "_blank").text(j.n) }
                } b.show()
            } clearTimeout(window.hideMenu); if ($(".indexpage2010_popup:visible").length > 0 && a.pageX > $(".indexpage2010_popup:visible").offset().left) return false; $(".indexpage2010_popup:visible").hide(); $(".indexpage2010_popup", b).show()
        }, function () { window.hideMenu = setTimeout(function () { $(".indexpage2010_popup:visible").hide() }, 100) }); $(".indexpage2010_popup").hover(function () {
            $(".Jmenu-list h2 .current").removeClass("current");
            $("h2 a", $(this).parent()).addClass("current")
        }, function () { $(".Jmenu-list .current").removeClass("current") }); $(".JDown").hover(function () { $(".JContent", this).show() }, function () { $(".JContent", this).hide() })
});