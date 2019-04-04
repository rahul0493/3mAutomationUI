module.exports = function (grunt) {

       grunt.loadNpmTasks('grunt-war');
       // Project configuration.
       grunt.initConfig({
           pkg: grunt.file.readJSON('package.json'),
           war: {
               target: {
                   options: {
                       war_dist_folder: 'D:/', /* Folder where to generate the WAR. */
                       war_name: 'sample' ,                   /* The name fo the WAR file (.war will be the extension) */
                       webxml_welcome: 'index.html',
                       webxml_display_name: 'Grunt WAR',
                       webxml_mime_mapping: [ { extension: 'woff', mime_type: 'application/font-woff' } ]
    },
                   files: [
                       {
                           expand: true,
                           cwd: 'dist',
                           src: ['**'],
                           dest: ''
                       }
                   ]
               }
           }
       });
   
       grunt.registerTask('default', ['war']);
   };
