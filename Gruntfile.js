module.exports = function (grunt) {

    //package.json相对地址
    grunt.packdir = '../../';

    grunt.nmpath = '../../node_modules/';

    //引入公用gruntfile.js,地址须带./或../
    require('../../Gruntfile_require.js')(grunt);


    //grunt.registerTask('htmlpack', function () {
    //    var dir = "src/tpl/"; //源文件的路径
    //    var destFile = "dest/html.js"; //要保存的路径
    //    var variable = "var Htmls = ";
    //
    //    var htmls = {};
    //    // 读取源文件
    //    //var fs = require('fs');
    //    //var files = fs.readdirSync(dir);
    //    //console.log(files);
    //    //files.forEach(function (filename) {
    //    //    console.log(filename);
    //    //    var file = fs.readFileSync(dir + filename, 'utf-8');
    //    //    htmls[filename.split(".html")] = file;
    //    //});
    //    //// 输出文件
    //    //fs.writeFileSync(destFile, variable + JSON.stringify(htmls));
    //});


    // Default task(s).
    //grunt.registerTask('htmlpack', ['htmlConvert']);
    grunt.registerTask('html2js', ['htmlConvert']);
    grunt.registerTask('require', ['search', 'clean:all', 'copy', 'sprite', 'htmlConvert', 'requirejs', 'concat', 'cssmin', 'uglify', 'usemin', 'clean:done', 'htmlmin']);
    //grunt.registerTask('require', ['search','clean:all', 'copy', 'requirejs',  'cssmin', 'uglify', 'usemin']);
    grunt.registerTask('step1-spiderFont', ['font-spider']);
    grunt.registerTask('step2-default', ['search', 'clean:all', 'copy', 'sprite', 'concat', 'cssmin', 'uglify', 'usemin', 'clean:done']);
    //grunt.registerTask('step2-default', ['search','clean:all', 'copy' , 'concat', 'cssmin', 'uglify', 'usemin', 'clean:done']);
    grunt.registerTask('step3-htmlMin', ['htmlmin']);

};