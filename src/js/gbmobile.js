/**
 * Created by gitbong on 9/3/15.
 */
(function (exportName_) {
    window.mytemplate = -1;
    function _getCode($, Class_, Signal_, htmlLoader_, imgLoader_, touch_) {
        var _ins = window[exportName_] || {};

        var config;

        var pageIdArr = [];

        var mb = {
            $view: null,
            swipeEnabled: true,
            swipeSignal: null,

            init: function (config_, initFn_) {
                config = config_;

                mb.$view = $(config.dom);
                mb.swipeSignal = new Signal_;

                if (config_.lockScreen == 0) {

                } else {
                    $(window).bind("touchmove", function (evt) {
                        if (evt.cancelable) evt.preventDefault();
                    });
                }

                _initSwipe();
                _initLayer(mb.$view);
                _initTpl(initFn_);
            },
            startLoading: function (imgs_, pageLoading_) {
                mb._addPage(pageLoading_, $loading);
                pageLoading_.startLoading(imgs_);
            },
            createLoading: function (pageId_, obj_) {
                var C = Loading.extend(obj_);
                pageIdArr.push(pageId_);
                return new C(pageId_);
            },
            createPage: function (pageId_, obj_) {
                var C = Page.extend(obj_);
                pageIdArr.push(pageId_);
                return new C(pageId_);
            },
            removePage: function (page_) {
                page_.remove();
            },
            add2Sceen: function (page_) {
                mb._addPage(page_, $scene);
            },
            add2Pop: function (page_) {
                mb._addPage(page_, $pop);
            },
            add2Public: function (page_) {
                mb._addPage(page_, $public);
            },
            removePage: function (page_) {
                page_.remove();
            },
            _addPage: function (page_, $layer_) {
                getHtml(page_._pageId, function (html_) {
                    page_._html = html_;
                    $layer_.before(page_._html);
                    page_._init();
                });
            },
            getWidth: function () {
                return document.documentElement.clientWidth;
            },
            getHeight: function () {
                return document.documentElement.clientHeight;
            }
        };

        //========================================================================= touch
        var dir = {swipeup: 'U', swipedown: 'D', swipeleft: 'L', swiperight: 'R'};

        function _initSwipe() {
            touch_.on($('html'), 'swipeup swipedown swipeleft swiperight', function (e) {
                if (mb.swipeEnabled)
                    mb.swipeSignal.dispatch(dir[e.type]);
            });
        }

        //========================================================================= view & layer
        var $scene, $pop, $loading, $public, $temp;

        function _initLayer($view_) {
            $view_.empty();
            $view_.append('<layer id="-gb-scene-"></layer>');
            $view_.append('<layer id="-gb-public-"></layer>');
            $view_.append('<layer id="-gb-pop-"></layer>');
            $view_.append('<layer id="-gb-loading-"></layer>');
            $view_.append('<layer id="-gb-temp-" style="display: none"></layer>');
            $scene = $('#-gb-scene-');
            $public = $('#-gb-public-');
            $pop = $('#-gb-pop-');
            $loading = $('#-gb-loading-');
            $temp = $('#-gb-temp-');
        }

        //========================================================================= model class

        var Page = Class_.extend({
            _pageId: -1,
            _html: -1,
            $view: null,
            ctor: function (pageId_) {
                var self = this;
                this._pageId = pageId_;
            },
            _init: function () {
                this.$view = $('#' + this._pageId);
                this.init();
                this.add();
            },
            init: function () {
            },
            add: function () {

            },
            remove: function () {

            },
            destroy: function () {
                this.$view.remove();
            }
        });
        var Loading = Page.extend({
            _imgArr: -1,
            _imgLoader: -1,
            sgComplete: -1,
            ctor: function (pageId_) {
                this._super(pageId_);

                this.sgComplete = new Signal_;
            },
            startLoading: function (imgs_) {
                this._imgLoader = new imgLoader_(imgs_);
                this._imgLoader.sgProgress.add(this.onProgress, this);
                this._imgLoader.sgComplete.add(this.onComplete, this);
                this._imgLoader.start();
            },
            onProgress: function (pro_) {
            },
            onComplete: function () {

            }
        });
        //========================================================================= init tpl

        function _initTpl(fn_) {
            console.log('mytemplate:', mytemplate);
            if (window.mytemplate === -1) {
                var loadedNum = 0;
                for (var i in pageIdArr) {
                    var url = getHtmlUrl(pageIdArr[i]);
                    //tplNum++;
                    htmlLoader_.load(url, function () {
                        loadedNum++;
                        if (loadedNum == pageIdArr.length) {
                            fn_();
                        }
                    });
                }
            } else {
                fn_();
            }
        }

        function getHtml(pageId_, fn_) {
            if (window.mytemplate === -1) {
                htmlLoader_.load(getHtmlUrl(pageId_), function (html_) {
                    fn_(html_);
                })
            } else {
                var tplId = getHtmlUrl(pageId_);
                fn_(mytemplate[tplId]);
            }
        }

        function getHtmlUrl(pageId_) {
            return config.tplPath + pageId_ + '.html';
        }

        //========================================================================= amd
        _ins.mobile = mb;
        window.gbdebug = {mobile: _ins.mobile};
        return _ins;
    }

    if (typeof define === 'function' && define.amd) {
        define('gbmobile', ['jquery', 'gbclass', 'gbsignal', 'gbhtmlloader', 'gbimgloader', 'touch'], function ($, Class_, Signal_, htmlLoader_, imgLoader_, touch_) {
            return _getCode($, Class_, Signal_, htmlLoader_, imgLoader_, touch_).mobile;
        });
    } else {
        window[exportName_] = _getCode(window[exportName_].mobile);
    }
})('gb');