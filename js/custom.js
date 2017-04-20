! function() {
    "use strict";

    function a() {
        var a = window.hp.getDevice().device;
        a !== window.hp.currentDevice && ($(document).trigger("device-change", {
            oldDevice: window.hp.currentDevice,
            newDevice: a
        }), window.hp.currentDevice = a)
    }
    window.hp = {
        getScrollSize: function() {
            var a, b, c = $("body");
            return c.css("overflow", "hidden"), a = c.width(), c.css({
                overflow: "auto",
                height: "101%"
            }), b = c.width() - a, c.removeAttr("style"), Math.abs(b)
        },
        clearForm: function(a) {
            return a.trigger("reset"), a.find("input, textarea").each(function() {
                $(this).parent().parent().removeClass("child-input-focused")
            }), a
        },
        scrollDebounceStop: function() {
            var a = 600;
            $(document).on("mousewheel.scrollDebounceStop", function(a) {
                return !1
            }), setTimeout(function() {
                $(document).off("mousewheel.scrollDebounceStop")
            }, a)
        },
        debounce: function(a, b, c) {
            var d;
            return function() {
                var e = this,
                    f = arguments,
                    g = function() {
                        d = null, c || a.apply(e, f)
                    },
                    h = c && !d;
                clearTimeout(d), d = setTimeout(g, b), h && a.apply(e, f)
            }
        },
        getRandomInt: function(a, b) {
            return Math.floor(Math.random() * (b - a + 1)) + a
        },
        scrollTo: function(a, b) {
            var c, d = 300,
                b = b || function() {};
            c = "number" == typeof a ? a : $(a).offset().top, $("html, body").animate({
                scrollTop: c
            }, d, b)
        },
        getDevice: function() {
            var a = [{
                    device: "phone",
                    size: 768
                }, {
                    device: "tablet",
                    size: 1024
                }, {
                    device: "desktop",
                    size: !1
                }],
                b = a[a.length - 1];
            return a.some(function(a, c) {
                if (window.matchMedia("only screen and (max-width: " + a.size + "px)").matches) return b = a
            }), b
        },
        responsive: function(a, b) {
            b[window.hp.currentDevice] ? b[window.hp.currentDevice].run() : b.other.run(), $(document).on("device-change", function(a, c) {
                var d = b[c.oldDevice] ? c.oldDevice : "other",
                    e = b[c.newDevice] ? c.newDevice : "other";
                c.oldDevice ? d !== e && (b[d].destroy && b[d].destroy(), b[e].run()) : b[e].run()
            })
        }
    }, $(window).bind("resize", a), a()
}(),
function() {
    "use strict";

    function a() {
        "expertise" !== window.location.hash && b() ? "desktop" === window.hp.getDevice().device ? g() : h() : $(document.body).removeClass("load")
    }

    function b() {
        if (i = document.getElementById("home-canvas"), !i) return !1;
        j = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1e4), j.position.z = 800, j.position.y = 600, k = new THREE.Scene, m = new Array;
        for (var a = 2 * Math.PI, b = new THREE.SpriteCanvasMaterial({
                color: 16777215,
                program: function(b) {
                    b.beginPath(), b.arc(0, 0, .5, 0, a, !0), b.fill()
                }
            }), g = 0, h = 0; h < p; h++)
            for (var r = 0; r < q; r++) n = m[g++] = new THREE.Sprite(b), n.position.x = h * o - p * o / 2, n.position.z = r * o - q * o / 2, k.add(n);
        return l = new THREE.CanvasRenderer, l.setPixelRatio(window.devicePixelRatio), l.setSize(window.innerWidth, window.innerHeight), l.setClearColor(1644827, 1), i.appendChild(l.domElement), $(document.body).removeClass("load"), document.addEventListener("mousemove", d, !1), document.addEventListener("touchstart", e, !1), document.addEventListener("touchmove", f, !1), window.addEventListener("resize", c, !1), l
    }

    function c() {
        u = window.innerWidth / 2, v = window.innerHeight / 2, j.aspect = window.innerWidth / window.innerHeight, j.updateProjectionMatrix(), l.setSize(window.innerWidth, window.innerHeight)
    }

    function d(a) {
        s = a.clientX - u, t = a.clientY - v
    }

    function e(a) {
        1 === a.touches.length && (a.preventDefault(), s = a.touches[0].pageX - u, t = a.touches[0].pageY - v)
    }

    function f(a) {
        1 === a.touches.length && (a.preventDefault(), s = a.touches[0].pageX - u, t = a.touches[0].pageY - v)
    }

    function g() {
        return !!i && (requestAnimationFrame(g), void h())
    }

    function h() {
        j.position.x += .01 * (-s - j.position.x), j.position.y += .01 * (-t + 600 - j.position.y), j.lookAt(k.position);
        for (var a = 0, b = 0; b < p; b++)
            for (var c = 0; c < q; c++) n = m[a++], n.position.y = 50 * Math.sin(.3 * (b + r)) + 50 * Math.sin(.5 * (c + r)), n.scale.x = n.scale.y = 4 * (Math.sin(.3 * (b + r)) + 1) + 4 * (Math.sin(.5 * (c + r)) + 1);
        l.render(k, j), r += .1
    }
    var i, j, k, l, m, n, o = 100,
        p = 40,
        q = 40,
        r = 0,
        s = 0,
        t = 0,
        u = window.innerWidth / 2,
        v = window.innerHeight / 2;
    window.startMainCanvas = a, window.destroyMainCanvas = function() {
        i = !1
    }
}(),
function() {
    function a() {
        function a() {
            var a = d.scrollTop() + e.height() > f.offset().top + f.height();
            c.toggleClass("fixed-link-lock", a)
        }
        var b = $(".add-sidebar .back-link-alt");
        if (b.length) {
            var c = $("body"),
                d = $(document),
                e = $(window),
                f = $(".post-container");
            d.on("scroll", a)
        }
    }

    function b() {
        function a() {
            f.length && (g.on("scroll", b), b())
        }

        function b() {
            i.removeClass(j), d(f) ? c(function() {
                i.addClass(j)
            }) : clearTimeout(e)
        }

        function c(a) {
            clearTimeout(e), e = setTimeout(a, k)
        }

        function d(a) {
            var b = g.scrollTop(),
                c = h.height(),
                d = a.offset().top,
                e = a.height();
            return b < d + e - c
        }
        var e, f = $(".graff-box"),
            g = $(document),
            h = $(window),
            i = $("body"),
            j = "show-the-arrow",
            k = 3e3;
        return {
            init: a,
            check: b
        }
    }

    function c() {
        jQuery("a.lightbox-link").fancybox({
            helpers: {
                overlay: {
                    locked: !1,
                    css: {
                        background: "rgba(0, 0, 0, 0.65)"
                    }
                }
            }
        })
    }

    function d(a) {
        function b(a) {
            a.addClass("animated " + g).delay(e).queue(function(b) {
                a.addClass(h), b()
            }).delay(d).queue(function(b) {
                a.removeClass("animated " + g + " " + h), b()
            }).delay(d).queue(function(a) {
                f++, f === c.length && (f = 0), a(), b(c.eq(f))
            })
        }
        var c = $(a),
            d = 1e3,
            e = 3e3,
            f = 0,
            g = "fadeInUp",
            h = "fadeOutUp";
        c.length && b(c.eq(0))
    }

    function e() {
        Modernizr.touchevents ? f() : window.startMainCanvas()
    }

    function f() {
        function a() {
            for (var a = 10, b = 10, c = a * b, d = '<div class="entry-cells">', e = 0; e < c; e++) d += '<div class="cell cell-' + e + '"></div>';
            return d += "</div>"
        }
        var b = $("#home-canvas"),
            c = $(a());
        b.html(c), $("body").removeClass("load")
    }

    function g() {
        var a = $("[data-animate-it]");
        a.addClass("hidden"), setTimeout(function() {
            a.each(function() {
                var a = $(this);
                a.removeClass("hidden").addClass(a.data("animate-it") + " animated")
            })
        }, 100)
    }

    function h(a) {
        function b() {
            var b = e.scrollTop(),
                g = d.offset().top,
                h = d.height(),
                i = c.height(),
                j = a.offsetTop || 0,
                k = a.offsetBottom || 0,
                l = b + j > g && b + k < g + h - i,
                m = b + k >= g + h - i;
            f.toggleClass(a.cls, l), f.toggleClass(a.btmCls, m)
        }
        var c = $(a.box),
            d = $(a.cnt),
            e = $(document),
            f = $(document.body);
        a.cls;
        c.length && d.length && e.bind("scroll.setClassInside", b)
    }

    function i(a) {
        $.fancybox({
            href: a,
            helpers: {
                overlay: {
                    locked: !1,
                    css: {
                        background: "rgba(255, 255, 255, 0.9)"
                    }
                }
            },
            padding: 0
        })
    }

    function j() {
        function a(a) {
            e.html(a.success), hp.clearForm(c), c.removeClass("error"), i("#msg-box"), $.post(d)
        }

        function b(a) {
            var b = {};
            $.each(a, function(a, c) {
                b["enquiry[" + a + "]"] = c
            }), c.addClass("error"), f.showErrors(b)
        }
        var c = $("form.contact-form");
        if (c.length) {
            var d = c.attr("action"),
                e = $(".msg-lightbox"),
                f = c.validate({
                    errorPlacement: function() {},
                    highlight: function(a) {
                        $(a).parent().addClass("error")
                    },
                    unhighlight: function(a) {
                        $(a).parent().removeClass("error")
                    },
                    invalidHandler: function() {
                        b({})
                    },
                    submitHandler: function() {
                        try {
                            arguments[1].preventDefault()
                        } catch (e) {}
                        return c.addClass("loading"), $.post(d, c.serialize()).always(function(c) {
                            "object" != typeof c && (c = $.parseJSON(c)), c && c.success ? a(c) : b(c)
                        }), !0
                    }
                });
            return c
        }
    }

    function k(a) {
        function b(a) {
            a.addClass(e)
        }

        function c(a) {
            d(this) && a.removeClass("child-input-focused"), a.removeClass("just-focus")
        }

        function d(a) {
            return 0 === $.trim(a.val()).length
        }
        var e = "child-input-focused just-focus";
        a = $(a), a.each(function() {
            var a = $(this),
                d = a.parent().parent();
            a.bind("focus", b.bind(a, d)), a.bind("blur", c.bind(a, d))
        })
    }

    function l() {
        function a() {
            var a = d.scrollTop(),
                f = c.height(),
                g = b.height();
            e.toggleClass("header-white-active", a < f - g), e.toggleClass("entry-text-active", a < f - g && 0 !== a)
        }
        var b = $("header"),
            c = $(".entry-text"),
            d = $(document),
            e = $("body");
        d.on("scroll.homeHeaderObserve", a)
    }

    function m() {
        $carousels = $(".gallery-photos .holder, .gallery-clients .holder"), $carousels.each(function() {
            var a = $(this),
                b = a.data("autoplay");
            a.imagesLoaded(function() {
                a.owlCarousel({
                    loop: !0,
                    autoWidth: !0,
                    center: !0,
                    autoplay: b,
                    autoplaySpeed: 800,
                    autoplayHoverPause: !0,
                    slideBy: 1
                })
            })
        })
    }

    function n() {
        $("body").mobileNav({
            hideOnClickOutside: !0,
            menuActiveClass: "nav-active",
            menuOpener: ".nav-opener",
            menuDrop: ".nav-box"
        })
    }

    function o() {
        return new WOW({
            offset: 200,
            mobile: !1
        }).init()
    }

    function p() {
        var a = window,
            b = a.Intercom;
        if ("function" == typeof b) b("reattach_activator"), b("update", intercomSettings);
        else {
            var c = document,
                d = function() {
                    d.c(arguments)
                };
            d.q = [], d.c = function(a) {
                    d.q.push(a)
                }, a.Intercom = d,
                function() {
                    var a = c.createElement("script");
                    a.type = "text/javascript", a.async = !0, a.src = "https://widget.intercom.io/widget/dg9qfwj1";
                    var b = c.getElementsByTagName("script")[0];
                    b.parentNode.insertBefore(a, b)
                }()
        }
    }

    function q() {
        function a(a) {
            function b(b) {
                b && b.preventDefault(), $bdy.removeClass("hide-main-section"), $bdy.addClass("slide-entry-section"), p(), clearTimeout(c), c = setTimeout(function() {
                    a.afterCb && a.afterCb($bdy, d)
                }, e)
            }
            var c, d = $(a.cnt),
                e = 300;
            if (d.length) {
                var f = $(a.arrow);
                $nextEl = d.next(), $bdy = $("body"), debouncedHandler = hp.debounce(b, 1e3, !0), a.beforeCb && a.beforeCb($bdy, d), "#expertise" !== window.location.hash ? (f.on("click", debouncedHandler), d.on("mousewheel", function(a) {
                    a.deltaY < 0 && debouncedHandler()
                }), d.on("swipeup", debouncedHandler)) : (e = 0, b(), $bdy.addClass("prevent-main-section"))
            }
        }
        a({
            cnt: ".entry-section",
            arrow: ".entry-section .btn-scroll",
            cookie: "main-section",
            afterCb: function(a, b) {
                hp.scrollDebounceStop(), b.remove(), a.removeClass("overflow").addClass("header-active header-white-active"), p(), window.destroyMainCanvas(), o(), m(), l()
            }
        }), a({
            cnt: ".how-we-work-page .title-box",
            arrow: ".how-we-work-page .title-box .btn-scroll",
            beforeCb: function(a, b) {
                $("header").css("margin-right", hp.getScrollSize())
            },
            afterCb: function(a, b) {
                hp.scrollDebounceStop(), a.removeClass("overflow").addClass("show-main"), b.remove(), $("header").css("margin-right", 0), o(), s.check()
            }
        })
    }

    function r() {
        function a() {
            function a() {
                return hp.scrollTo(0), !1
            }
            var b = $("#footer"),
                c = b.find(".arrow-up");
            c.bind("click", a)
        }
        a()
    }
    var s = b();
    $(function() {
        s.init(), e(), q(), r(), n(), k(".contact-form input, .contact-form textarea"), j(), hljs.initHighlightingOnLoad(), g(), c(), d(".gallery-text > div"), a(), h({
            box: ".add-sidebar .holder",
            cnt: ".post-container",
            cls: "fixed-sidebar",
            btmCls: "fixed-sidebar-lock",
            offsetBottom: 184
        })
    }), window.initMap = function() {
        var a, b, c, d = $(".map-box .map");
        if (d.length) return c = {
            position: {
                lat: 49.98423,
                lng: 36.21712
            },
            markerUrl: "images/marker.png"
        }, a = new google.maps.Map(d.get(0), {
            scrollwheel: !1,
            mapTypeControl: !1,
            zoom: 14,
            center: c.position,
            draggable: !0,
            styles: [{
                elementType: "geometry",
                stylers: [{
                    saturation: -100
                }]
            }]
        }), b = new google.maps.Marker({
            position: c.position,
            icon: c.markerUrl,
            map: a
        }), a
    }
}();
//# sourceMappingURL=custom.js.map