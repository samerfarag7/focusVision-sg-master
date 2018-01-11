'use strict';
var $ = require('jquery');

export function toggleSelected(event) {
    var tag = event.srcElement;
    tag.classList.toggle('selected');
}

export function deleteTag(event) {
    if (event.target.classList.contains('icon-cancel-s')) {
        this.remove();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var tagSelectableList = document.getElementsByClassName('label-tag tag--selectable');
    Array.prototype.forEach.call(tagSelectableList, tag => {
        tag.addEventListener('click', toggleSelected);
    });

    var tagDeletableList = document.getElementsByClassName('label-tag tag--action');
    Array.prototype.forEach.call(tagDeletableList, tag => {
        tag.addEventListener('click', deleteTag);
    });

}, false);