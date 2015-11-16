define('public', ['gbmobile'], function (mb) {
    var ins = mb.createPage('public', {});
    return ins;
});

define('p0', ['gbmobile'], function (mb) {
    var ins = mb.createPage('p0', {});
    return ins;
});

define('p1', ['gbmobile'], function (mb) {
    var ins = mb.createPage('p1', {});
    return ins;
});

define('loading', ['gbmobile'], function (mb) {
    var ins = mb.createLoading('loading', {
        onProgress: function (pro) {
            this.$view.find('.loading-txt').text(pro + '%');
        },
        onComplete: function () {
            console.log('complete');
            this.sgComplete.dispatch();
        },
        remove: function () {
            ins.$view.animate({opacity: 0}, 500, function () {
                ins.destroy();
            });
        }
    });
    return ins;
});
