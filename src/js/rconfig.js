/**
 * Created by gitbong on 10/22/15.
 */
requirejs.config({
    baseUrl: 'js',
    paths: {
        touch: 'touch-0.2.14',
        jquery: 'jquery-2.1.4.min',
        public: 'pages',
        p0: 'pages',
        p1: 'pages',
        loading:    'pages'
    },
    shim: {
        dateUtil: {
            deps: [],
            exports: 'DateUtils'
        }
    }
});

require(['app'], function (app) {
    app.init();
});