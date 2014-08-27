/**
 * @hua pos widget
 * @module zepto
 */
;
(function($) {
    $.fn.evtPos = function(opts) {
        this.each(function() {
            init.call(this, opts);
        });
        return this;
    };

    function init(opts) {
        var defaultOption = {
            bgElement: '', //background element
            exWidth: $(window).width(), //wanted width,default window width
            originalWidth: 320 //original page width
            //allowResize: false //change the attribute when resize
        };
        var options = $.extend(defaultOption, opts);
        options.bgEle = $(options.bgElement);
        options.btnEle = $(this);
        //variables
        //var exWidth = options.exWidth;
        //methods
        var methods = {};
        methods.getScale = function() {
            var oWidth = options.originalWidth;
            var exWidth = options.exWidth;
            var gScale = exWidth / oWidth;
            return gScale;
        }
        methods.getBgScale = function() {
            var bgWidth = options.bgEle.width();
            var bgHeight = options.bgEle.height();
            var bgScale = bgWidth / bgHeight;
            return bgScale;
        }
        methods.getStyles = function() {
            var btnWidth = options.btnEle.width();
            var btnHeight = options.btnEle.height();
            //var exWidth = options.exWidth;
            //var btnPosH = window.getComputedStyle(options.btnEle[0], null)['left'] != 'auto' ? options.btnEle.position().left : options.exWidth - options.btnEle.position().left - btnWidth;
            var btnPosH = options.btnEle.position().left;
            var btnPosV = options.btnEle.position().top;
            var gScale = methods.getScale();
            var btnAttr = [btnWidth, btnHeight, btnPosH, btnPosV];
            var btnAttrLen = btnAttr.length;
            for (var i = 0; i < btnAttrLen; i++) {
                btnAttr[i] = btnAttr[i] * gScale;
            }
            //bgScale = (bgWitdh >= bgHeight) ? (bgHeight / bgWitdh) : (bgWitdh / bgHeight);
            return btnAttr;
        }
        methods.setScale = function() {
            var btnAttr = methods.getStyles();
            var bgScale = methods.getBgScale();
            var newBgHeight = options.exWidth * bgScale;
            options.bgEle[0].style.cssText += 'width:' + options.exWidth + 'px;height:' + newBgHeight + 'px;' + 'background-size:' + options.exWidth + 'px ' + newBgHeight + 'px;';
            options.btnEle[0].style.cssText += 'width:' + btnAttr[0] + 'px;height:' + btnAttr[1] + 'px;left:' + btnAttr[2] + 'px;top:' + btnAttr[3] + 'px;right:auto;bottom:auto;';
        }
        /*methods.resizeAttr = function() {
            $(window).resize(function() {
                methods.setScale();
            });
        }*/
        methods.init = function() {
            methods.setScale();
            /*if (options.allowResize) {
                methods.resizeAttr();
            }*/
        }
        methods.init.call(methods);
    }
})(Zepto);