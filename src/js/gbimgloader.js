/**
 * Created by gitbong on 9/3/15.
 */
(function (exportName_) {
    function _getCode(Class_, Signal_) {
        var _ins = window[exportName_] || {};

        _ins.ImgLoader = Class_.extend({
            _imgArr: [],
            _loadId: 0,
            _$img: -1,

            _isLoading: false,

            _timer: -1,

            _pObj: {},
            progress: 0,

            sgProgress: null,
            sgComplete: null,

            ctor: function (imgArr_) {
                this._imgArr = imgArr_;
                this._loadId = 0;
                this._$img = $(new Image);
                this._$img.on('load', {self: this}, this._onLoaded);

                this.sgProgress = new Signal_;
                this.sgComplete = new Signal_;

                this._pObj = {p: 0};
            },
            start: function () {
                var self = this;
                if (this._isLoading)return;
                if (this._imgArr.length != 0) {
                    this._loadId = 0;
                    this._isLoading = true;
                    this._pObj.p = this.progress = 0.01;
                    this._timer = setInterval(function () {
                        self._pObj.p += (self.progress - self._pObj.p) * .5;
                        self._pObj.p = Math.floor(self._pObj.p);
                        self.sgProgress.dispatch(self._pObj.p);
                        if (self._pObj.p > 95) {
                            self._pObj.p = 1;
                            clearInterval(self._timer);
                            self.sgProgress.dispatch(100);
                            self.sgComplete.dispatch(100);
                        }
                    }, 1000 / 30);
                    this.progress = 0;
                    this._loadImg();
                } else {
                    throw ("The number of imgs is 0");
                }
            },
            _loadImg: function () {
                this._$img.attr('src', '');
                this._$img.attr('src', this._imgArr[this._loadId]);
            },
            _onLoaded: function (e) {
                var self = e.data.self;
                self._loadId++;
                self.progress = self._loadId * 100 / self._imgArr.length;
                if (self._loadId < self._imgArr.length) {
                    self._loadImg();
                } else {
                }
            }
        });
        return _ins;
    }

    if (typeof define === 'function' && define.amd) {
        define('gbimgloader', ['gbclass', 'gbsignal'], function (Class_, Signal_) {
            return _getCode(Class_, Signal_).ImgLoader;
        });
    } else {
        window[exportName_] = _getCode(window[exportName_].ImgLoader);
    }
})('gb');