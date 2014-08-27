/**
 * @hua drag组件
 * @module zepto
 */
;
(function($) {
	$.fn.simulateDrag = function(opts) {
		this.each(function() {
			init.call(this, opts);
		});
		return this;
	};

	function init(opts) {
		var defaultOption = {
			dragTarget: null, //drag目标地
			callback: function(){} //drag完成后回调
		};

		var options = $.extend(defaultOption, opts);
		options.dTarget = $(options.dragTarget);
		//options.panelWidth = 0;
		//变量区
		var sTarget = this;
		var cssPrefix = $.fx.cssPrefix,
			transitionEnd = $.fx.transitionEnd;
		var transform = cssPrefix + "transform";
		var startPos = [];
		var targetAttr = [];
		var startAttr = [];
		//函数区
		var methods = {};
		methods.getTargetAttr = function(t) {
			targetAttr.push(t.offset().left, t.offset().top, t.width(), t.height());
			return targetAttr;
		}
		methods.getStartAttr = function(s) {
			startAttr.push(s.offset().left, s.offset().top, s.width(), s.height());
			return startAttr;
		}
		methods.touchStart = function() {
			var $el = $(sTarget);
			$el.on('touchstart', function(e) {
				startAttr = methods.getStartAttr($el);
				var touche = e.touches ? e.touches[0] : e;
				startPos.push(touche.pageX, touche.pageY);
				methods.touchMove();
			})
		}
		methods.touchMove = function() {
			var $el = $(sTarget);
			$el.on('touchmove', function(e) {
				var touche = e.touches ? e.touches[0] : e;
				$el[0].style.cssText += 'transform: translate3d(' + (touche.pageX - startPos[0]) + 'px,' + (touche.pageY - startPos[1]) + 'px,0);';
				methods.ifArea();
			})
			methods.touchEnd();
		}
		methods.touchEnd = function() {
			var $el = $(sTarget);
			$el.on('touchend', function(e) {
				options.dTarget.removeClass('on');
				methods.ifArea();	
			});
		}
		//边界处理
		methods.ifArea = function() {
			var $el = $(sTarget);
			var e = e || event;
			targetAttr = methods.getTargetAttr(options.dTarget);
			if (($el.offset().left + $el.width() / 2) >= targetAttr[0] && ($el.offset().top + $el.height() / 2) >= targetAttr[1] && ($el.offset().left + $el.width() / 2) <= targetAttr[0] + targetAttr[2] && ($el.offset().top + $el.height() / 2) <= targetAttr[1] + targetAttr[3]) {
				if (e.type == 'touchend') {
					$el[0].style.cssText = 'transform: translate3d(' + ((targetAttr[0] - startAttr[0]) + ((targetAttr[2] - startAttr[2]) / 2)) + 'px,' + ((targetAttr[01] - startAttr[1]) + ((targetAttr[3] - startAttr[3]) / 2)) + 'px,0);';
					methods.callBack();
				} else {
					options.dTarget.addClass('on');
				}
			} else {
				if (e.type == 'touchend') {
					$el[0].style.cssText = 'transform: translate3d(' + 0 + 'px,' + 0 + 'px,0);';
				} else {
					options.dTarget.removeClass('on');
				}
			}
		}
		methods.callBack = function(){
			options.callback();
		}
		methods.init = function() {
			methods.touchStart();
		}
		methods.init.call(methods);
	}
})(Zepto);