module.exports = function (grunt) {

    var srcPath = 'src/';
    var releasePath = 'dest/';
    var file = {
        css: [],
        js: []
    };

    var packpath = (grunt.packdir || '') + 'package.json';
    grunt.initConfig({
        pkg: grunt.file.readJSON(packpath),
        //清空开始生成的文件夹及最后清理工作
        clean: {
            all: [releasePath + '*'],
            done: [releasePath + 'tpl', releasePath + "css/*.scss", releasePath + "css/*.css", '!' + releasePath + 'css/app.min.css', releasePath + "js/*.js", '!' + releasePath + 'js/require.js', releasePath + "img/sprite/", releasePath + ".DS_Store"]
        },
        htmlConvert: {
            options: {
                // custom options, see below
            },
            mytemplate: {
                src: ['src/tpl/*.html'],
                dest: releasePath + 'js/html.js'
            },
        },
        // 自动雪碧图
        sprite: {
            options: {
                // sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
                imagepath: srcPath + 'img/sprite/',
                // 映射CSS中背景路径，支持函数和数组，默认为 null
                imagepath_map: null,
                // 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
                spritedest: releasePath + 'img/',
                // 替换后的背景路径，默认 ../images/
                spritepath: '../img/',
                // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
                padding: 2,
                // 是否使用 image-set 作为2x图片实现，默认不使用
                useimageset: false,
                // 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
                newsprite: false,
                // 给雪碧图追加时间戳，默认不追加
                spritestamp: false,
                // 在CSS文件末尾追加时间戳，默认不追加
                cssstamp: true,
                // 默认使用二叉树最优排列算法
                algorithm: 'binary-tree',
                // 默认使用`pixelsmith`图像处理引擎
                engine: 'pixelsmith'
            },
            autoSprite: {
                files: [{
                    // 启用动态扩展
                    expand: true,
                    // css文件源的文件夹
                    cwd: srcPath + 'css/',
                    // 匹配规则
                    src: '*.css',
                    // 导出css和sprite的路径地址
                    dest: releasePath + 'css/',
                    // 导出的css名
                    ext: '.sp.css'
                }]
            }
        },
        concat: {   //JS、CSS合并
            options: {
                separator: ';',
                stripBanners: true
            },
            js: {
                //src: file.js,
                src: [releasePath + 'js/require.js', releasePath + 'js/rmain.js', releasePath + 'js/html.js'],
                dest: releasePath + "js/append-all.js"
            },
            css: {
                src: file.css,
                dest: releasePath + "css/app.css"
            }
        },
        uglify: {   //JS压缩
            options: {
                //banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                banner: ''
            },
            build: {
                src: releasePath + 'js/append-all.js',
                dest: releasePath + 'js/require.js'
            }
        },
        cssmin: {   //CSS文件压缩
            css: {
                files: {
                    'dest/css/app.min.css': file.css
                }
            }
        },
        copy: {     //素材文件复制
            main: {
                files: [
                    //复制src目录文件到release目录
                    {expand: true, cwd: srcPath, src: '**', dest: releasePath}
                    //{expand: true, cwd: srcPath, src: '**.html', dest: releasePath}
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true, // 去注析
                    collapseWhitespace: true // 去换行
                },
                files: {
                    'dest/index.html': [releasePath + 'index.html']
                }
            }
        },
        usemin: {
            html: [releasePath + '*.html']
            //options: {
            //    assetsDirs: [releasePath + 'js']
            //}
        },
        'font-spider': {
            option: {
                'backup': true,
                silent: true
            },
            main: {
                src: srcPath + 'index.html'
            }
        },
        requirejs: {
            compile: {
                options: {
                    name: "rconfig",
                    baseUrl: "src/js",
                    mainConfigFile: "src/js/rconfig.js",
                    out: "dest/js/rmain.js"
                }
            }
        },
        search: {
            css: {
                files: {
                    src: [srcPath + 'index.html']
                },
                options: {
                    searchString: /href\=[\"\']([^\"]+\.css)[\"\']/,
                    logFormat: "custom",
                    customLogFormatCallback: function (params) {
                        for (var i = 0; i < params.numResults; i++) {
                            if (i % 2 != 0) {
                                file.css.push(releasePath + params.results[params.filePaths[0]][i].match);
                            }
                        }
                    }
                }
            }
        }
    });


    // Load the plugin that provides the "uglify" task.
    grunt.task.loadTasks(grunt.nmpath + 'grunt-contrib-cssmin/tasks');
    grunt.task.loadTasks(grunt.nmpath + 'grunt-contrib-concat/tasks');
    grunt.task.loadTasks(grunt.nmpath + 'grunt-contrib-uglify/tasks');
    grunt.task.loadTasks(grunt.nmpath + 'grunt-contrib-clean/tasks');
    grunt.task.loadTasks(grunt.nmpath + 'grunt-contrib-copy/tasks');
    grunt.task.loadTasks(grunt.nmpath + 'grunt-search/tasks');
    grunt.task.loadTasks(grunt.nmpath + 'grunt-usemin/tasks');
    grunt.task.loadTasks(grunt.nmpath + 'grunt-contrib-htmlmin/tasks');
    grunt.task.loadTasks(grunt.nmpath + 'grunt-font-spider/tasks');
    grunt.task.loadTasks(grunt.nmpath + 'grunt-css-sprite/tasks');
    grunt.task.loadTasks(grunt.nmpath + 'grunt-contrib-requirejs/tasks');
    grunt.task.loadTasks(grunt.nmpath + 'grunt-html-convert/tasks');

    // Default task(s).
    //grunt.registerTask('step1-spiderFont', ['font-spider']);
    //grunt.registerTask('step2-default', ['clean:all' ,'search' , 'sprite', 'cssmin', 'concat', 'uglify', 'copy', 'usemin', 'clean:done']);
    //grunt.registerTask('step3-htmlMin', ['htmlmin']);
};