module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                files: {
                    'public/css/styles.css': 'less/all.less'
                }
            },
            production: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    'src/index.css': 'less/all.less'
                }
            },
        },
        watch: {
            styles: {
                files: 'less/**/*.less', // which files to watch
                tasks: ['less:development'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less']);
};