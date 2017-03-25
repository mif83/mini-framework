/**
 * Created by dima on 24.03.2017.
 */

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
        },
        addClass : function (className) {
            this.elems.forEach(item => item.classList.add(className));
            return this;
        },
        removeClass : function (className) {
            this.elems.forEach(item => item.classList.remove(className));
            return this;
        },
        toggleClass : function (className) {
            this.elems.forEach(item => item.classList.toggle(className));
            return this;
        }
    };
    return myPlugin;
}());

// проверки
$(".d2").find(".i1").toggleClass("active");
$(".d2").find(".i1").on("click", function(){alert("1111")}).on("click", function(){console.log("click")}).each(item => item.innerHTML += "!!!!!").addClass("cccca");
$(".d2").find(".i1").off("click");


