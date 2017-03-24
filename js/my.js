/**
 * Created by dima on 24.03.2017.
 */
/*// addEventListener, closure, setAttribute, removeAttribute, removeEventListener, querySelectorAll, querySelector

$('.items').find('.items--subitems').on('click', function (event) {
    console.log(event.target.textContent);
}).each(function (elem, index) {
    elem.textContent = index;
}).attr('title', 'qwewqeqe');

$('.delete-button').on('click', function () {
    $('.items--subitems').off('click');
});


// find, on, off, each, attr, toggleClass, addClass, removeClass*/


function $(str){
    let arr = document.querySelectorAll(str);

    if (arr.length > 1) return arr;
    if (arr.length === 1) return arr[0];
    if (arr.length === 0) return null;

}