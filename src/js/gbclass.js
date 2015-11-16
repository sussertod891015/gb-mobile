/**
 * Created by gitbong on 9/3/15.
 */
(function (exportName_) {
    function _getCode() {
        var _ins = window[exportName_] || {};
        _ins.Class = (function () {
            var initializing = false;
            var fnTest = /xyz/.test(function () {
                xyz;
            }) ? /\b_super\b/ : /.*/;
            this.Class = function () {
            };
            Class.extend = function (prop) {
                var _super = this.prototype;
                initializing = true;
                var pty = new this();
                initializing = false;
                for (var name in prop) {
                    pty[name] = typeof prop[name] == "function" &&
                    typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                        (function (name, fn) {
                            return function () {
                                var tmp = this._super;
                                this._super = _super[name];
                                var ret = fn.apply(this, arguments);
                                this._super = tmp;
                                return ret;
                            };
                        })(name, prop[name]) : prop[name];
                }
                function Class() {
                    if (!initializing && this.ctor)
                        this.ctor.apply(this, arguments);
                }

                Class.prototype = pty;
                Class.prototype.constructor = Class;
                Class.extend = arguments.callee;
                return Class;
            };
            return Class;
        })();
        return _ins;
    }

    if (typeof define === 'function' && define.amd) {
        define('gbclass', function () {
            return _getCode().Class;
        });
    } else {
        window[exportName_] = _getCode();
    }
})("gb");