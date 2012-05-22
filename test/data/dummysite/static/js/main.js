(function () {

    var modules,
        // Modules used on every page
        global_modules = [
            'jquery-ui',
            //'easyXDM',
            'jquery-html5-placeholder-shim',
            //'order!jquery-watermark',
            //'order!jquery-overlabel'
        ],
        // Per-page modules - defined in individual templates
        page_modules = window.page_modules || [];

    // Combine the two arrays
    if (page_modules.constructor === Array) {
        modules = global_modules.concat(page_modules);
    } else {
        modules = global_modules;
    }

    require.config({
        paths: {
            // This is the version we'll use if we move to loading jQuery with RequireJS, rather than bundling them together
            'jquery': '/static/js/lib/jquery/jquery-1.7.2.min.js',

            'jquery': '/static/js/require-jquery.js',
            'jquery-ui': '/static/js/lib/jquery-ui/jquery-ui-1.8.14.custom.min.js',


             /* OG jQuery Plugins - must be loaded using the order plugin, unless they're
              * wrapped in a define function that declares their dependencies

                Ex:
                require(["order!one.js", "order!two.js", "order!three.js"], function () {
                    // This callback is called after the three scripts finish loading.
                });

                http://requirejs.org/docs/api.html#order
            */

            /* jQuery Plugins wrapped in define statements that don't need to be loaded in order */

            'jquery-cookie': '/static/js/lib/jquery/plugins/jquery.cookie.js',
            'jquery-serialize-object': '/static/js/lib/jquery/plugins/jquery.ba-serializeobject.js',

        }
    });


    require(modules, function () {
        // callback
    });

})();
