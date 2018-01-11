'use strict';
var $ = require('jquery');

$(document).ready(function () {
	$('.menu-dropdown.menu-multiselect .dropdown-menu .dropdown-item').on({
		"click": function (e) {
			$(this).toggleClass("selected");
			e.stopPropagation();
		}
	});
});