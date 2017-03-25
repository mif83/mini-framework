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


var $ = (function () {
    this.eventMemorizer = {};
    function myPlugin(params) {
        if (!(this instanceof myPlugin)) {
            return new myPlugin(params);
        }
        this.init.apply(this, arguments);
    }
    function flatten(arr, param){
        console.log("flatten ",arr);
        let result = [];
        arr.forEach( item => {
            if(Array.isArray(item)){
                result = result.concat(item);
            } else{
                result.push(item);
            }
        });
        if (!param){
            result.forEach(item => {
                if(Array.isArray(item)){
                    result = flatten(result);
                }
            });
        }
        return result;
    }
    myPlugin.prototype = {
        init: function (str) {
            this.elems = Array.prototype.slice.call(document.querySelectorAll(str));
        },
        find : function (str) {
          this.elems = flatten(this.elems
                                .map( item => Array.prototype.slice.call( item.querySelectorAll(str) ) )
                        );

            return this;
        },
        on : function (strEvent , callback){

            this.elems.forEach(item => {
                if(!item.memorize){
                    item.memorize = {};
                }
                if (!item.memorize[strEvent]){
                    item.memorize[strEvent] = [];
                }
                item.memorize[strEvent].push(callback);

                item.addEventListener(strEvent, callback)
            });
            return this;
        },
        off : function (strEvent) {
            this.elems.forEach(item => {
                if (item.memorize[strEvent]){
                    item.memorize[strEvent].forEach( arrFunc => {
                        item.removeEventListener(strEvent, arrFunc);
                    });
                    item.memorize[strEvent].length = 0;
                }
            })
            return this;
        },
        each : function(callback){
            this.elems.forEach(item => {
                callback(item);
            });
            return this;
        },
        attr : function (attrName, attrProp) {
            this.elems.forEach(item => item.setAttribute(attrName, attrProp));
            return this;
        }
    };
    return myPlugin;
}());


