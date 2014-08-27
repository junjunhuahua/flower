/**
 * @hua panel组件
 * @module zepto
 */
;
(function($) {
    $.fn.panelNav = function(opts) {
        this.each(function() {
            init.call(this, opts);
        });
        return this;
    };

    function init(opts) {
        var defaultOption = {
            btnElement: '',
            panelElement: '', //panel侧边
            fatherElement: '', //页面主体
            maskElement: '', //遮罩层
            direction: 'left', //panel 位置,默认 左边
            panelMode: 'push', //panel 出现方式,默认push
            panelWidth: 200, //panel 宽度,如果宽度小于1，如果小于0，默认200
            transTime: 500, //动画时间
            onFunc: function() {}, //打开时
            offFunc: function() {} //收回时
        };

        var options = $.extend(defaultOption, opts);
        options.btnEle = $(options.btnElement);
        options.panelEle = $(options.panelElement);
        options.fatherEle = $(options.fatherElement);
        options.maskEle = $(options.maskElement);
        //options.panelWidth = 0;
        //变量区
        var cssPrefix = $.fx.cssPrefix,
            transitionEnd = $.fx.transitionEnd;
        var $wd = $(window);
        var winWidth = $wd.width();
        var winHeight = $wd.height();
        var transform = cssPrefix + "transform";
        //函数区
        var panelfunc = {};

        panelfunc.judgeDirection = function(dir) {
            if (dir == 'left') {
                return 1;
            } else {
                return -1;
            }
        }
        panelfunc.checkWidth = function(pw) {
            if (pw > 1) {
                return pw;
            } else if (pw > 0 && pw <= 1) {
                pw = parseFloat(pw) * parseInt(winWidth);
                return pw;
            } else if (pw < 0) {
                pw = parseInt(winWidth) + parseInt(pw);
                return pw;
            } else {
                return false;
            }
        }
        panelfunc.panelStart = function() {
            var getWidth = panelfunc.checkWidth(options.panelWidth);
            var pos = panelfunc.getPosition();
            var pm = options.panelMode;
            var pes = options.panelEle[0].style;
            pes.cssText += 'width:' + getWidth + 'px;' + 'z-index:' + '12;' + options.direction + ':0;' + transform + ':' + "translate3d(" + pos[pm].panel[0] + "px,0,0);";
            options.fatherEle.css({
                "z-index": 10
            });
            options.maskEle.css({
                "z-index": 11
            });
            options.btnEle.css({
                "z-index": 9
            });
        }
        panelfunc.getPosition = function() {
            var getWidth = Math.abs(panelfunc.checkWidth(options.panelWidth));
            var judgeDir = panelfunc.judgeDirection(options.direction);
            getWidth = getWidth * judgeDir;
            return {
                push: {
                    panel: [-getWidth, 0],
                    cont: [0, getWidth]
                },
                overlay: {
                    panel: [-getWidth, 0],
                    cont: [0, 0]
                }
            }
        }
        panelfunc.panelMove = function(i) {
            var pos = panelfunc.getPosition();
            var pm = options.panelMode;
            var pes = options.panelEle[0].style;
            var fes = options.fatherEle[0].style;
            options.panelEle.show();
            setTimeout(function() {
                pes.cssText += cssPrefix + "transition:" + options.transTime + "ms;" + cssPrefix + "transform:" + "translate3d(" + pos[pm].panel[i] + "px,0,0);";
            }, 0);
            setTimeout(function() {
                fes.cssText += cssPrefix + "transition:" + options.transTime + "ms;" + cssPrefix + "transform:" + "translate3d(" + pos[pm].cont[i] + "px,0,0);";
            }, 0);
        }
        panelfunc.EventStart = function() {
            options.btnEle.bind('click', function() {
                panelfunc.panelMove(1);
                options.maskEle.show();
                options.onFunc();
            });
            options.maskEle.bind('click', function() {
                panelfunc.panelMove(0);
                options.maskEle.hide();
                options.offFunc();
            });
        }
        panelfunc.init = function() {
            panelfunc.panelStart();
            panelfunc.EventStart();
        }
        panelfunc.init.call(panelfunc);
    }
})(Zepto);