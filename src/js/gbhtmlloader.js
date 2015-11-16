/**
 * Created by gitbong on 10/21/15.
 */
/**
 * Created by gitbong on 9/3/15.
 */
(function (exportName_) {
    function _getCode($) {
        var _ins = window[exportName_] || {};

        var htmlMap = {};
        var htmlLoader = {
            init: function () {

            },
            load: function (url_, fn_) {
                if (htmlMap[url_] == null) {
                    $.ajax({
                        url: url_,
                        dataType: 'html',
                        type: 'GET',
                        myData: {url: url_, callBack: fn_},
                        success: function (html_) {
                            var url = this.myData.url;
                            var callBack = this.myData.callBack;
                            htmlMap[url] = html_;
                            if (callBack)callBack(html_);
                        }
                    });
                } else {
                    if (fn_)fn_(htmlLoader.getHtml(url_));
                }
            },
            getHtml: function (url_) {
                return htmlMap[url_];
            }
        };
        _ins.htmlLoader = htmlLoader;
        return _ins;
    }

    if (typeof define === 'function' && define.amd) {
        define('gbhtmlloader',['jquery'], function ($) {
            return _getCode($).htmlLoader;
        });
    } else {
        window[exportName_] = _getCode(window[exportName_].htmlLoader);
    }
})("gb");