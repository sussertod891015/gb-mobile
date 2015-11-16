/**
 * Created by gitbong on 9/3/15.
 */
(function (exportName_) {

    function _getCode(Class_) {

        var _ins = window[exportName_] || {};

        _ins.Signal = Class_.extend({
            _callBackFunArr: [],
            _callBackSelfArr: [],

            ctor: function () {
                this._callBackFunArr = [];
                this._callBackSelfArr = [];
            },
            add: function (callBackFn_, domain_) {
                var $have = false;
                for (var i = 0; i < this._callBackFunArr.length; i++) {
                    if (this._callBackFunArr[i] == callBackFn_ && this._callBackSelfArr[i] == domain_) {
                        $have = true;
                        break;
                    }
                }
                if (!$have) {
                    this._callBackFunArr.push(callBackFn_);
                    this._callBackSelfArr.push(domain_);
                }
            },
            addOnce: function (callBackFn_, domain_) {

            },
            remove: function (callBackFun_) {
                var index = this._callBackFunArr.indexOf(callBackFun_);
                if (index != -1) {
                    this._callBackFunArr.splice(index, 1);
                    this._callBackSelfArr.splice(index, 1);
                }
            },
            dispatch: function () {
                for (var i = 0; i < this._callBackFunArr.length; i++) {
                    var $self = this._callBackSelfArr[i];
                    var $fun = this._callBackFunArr[i];
                    $fun.apply($self, arguments);
                }
            }
        });

        return _ins;
    }

    if (typeof define === 'function' && define.amd) {
        define('gbsignal', ['gbclass'], function (Class_) {
            return _getCode(Class_).Signal;
        });
    } else {
        window[exportName_] = _getCode(window[exportName_].Signal);
    }
})('gb');