// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/
var ProgressBar = require('progressbar.js')
require('popper.js')

var $ = require('jquery')


$(document).ready(function () {

    // Wait until the progress radial selector is on the view. This will happen when the loading page is loaded.
    var waitForEl = function (selector, callback) {
        if ($(selector).length) {
            callback();
        } else {
            setTimeout(function () {
                waitForEl(selector, callback);
            }, 100);
        }
    };

    waitForEl("#progress-radial", function () {
        var bar = new ProgressBar.Circle('#progress-radial', {
            strokeWidth: 8,
            easing: 'easeInOut',
            duration: 1400,
            color: '#00cc52',
            trailColor: '#e4e8eb',
            trailWidth: 2,
            svgStyle: null
        });

        bar.animate(.75);  // Number from 0.0 to 1.0
    });
});




