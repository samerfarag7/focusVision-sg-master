// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/
var ProgressBar = require('progressbar.js')
require('popper.js')

var $ = require('jquery')


$(document).ready(function () {
    var element = "#progress-line";

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

    waitForEl(element, function () {
        var bar = new ProgressBar.Line(element, {
            color: 'url(#gradient)',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 1,
            trailWidth: 1,
            easing: 'easeInOut',
            duration: 1400
        });

        bar.animate(.75);  // Number from 0.0 to 1.0

        let linearGradient = `
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
                <stop offset="5%" stop-color="#00c753"/>
                <stop offset="70%" stop-color="#00d4e8"/>
              </linearGradient>
            </defs>
          `
        bar.svg.insertAdjacentHTML('afterBegin', linearGradient);
    });
})