define('app', ['public', 'p0', 'p1', 'loading', 'gbmobile'], function (publicc, p0, p1, loading, mb) {
    var siteConfig = {
        dom: '.gb-site',
        lockScreen: 1,
        tplPath: 'tpl/'
    };
    var imgs = ['img/sprite/0.png', 'img/sprite/1.png'];

    var app = {
        init: function () {
            console.log('app init');
            mb.init(siteConfig, function () {
                console.log('mb inited', loading);
                loading.sgComplete.add(app._onLoaded);
                mb.startLoading(imgs, loading);
            });
        },
        _onLoaded: function () {
            mb.removePage(loading);
            mb.add2Sceen(p0);
            mb.add2Public(publicc);
        }
    };
    return app;
});