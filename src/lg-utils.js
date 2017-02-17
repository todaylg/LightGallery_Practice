window.set = function(lable,value){
    window[lable] = value;
}
window.get = function (label) {
    return window[lable];
}
document.set = function(lable,value){
    document[lable] = value;
}
document.get = function (label) {
    return document[lable];
}
if(!document.getElementsByClassName){
    var res = new Array;
    document.getELementsByClassName = function(className){
        var allTag = document.getELementsByTagName('*');
        for(var i=0;i<allTag.length;i++){
            var allClass = allTag[i].className.split(' ');
           for (var j in allClass){
               if(allClass[j] == className){
                   res.push(allTag[i]);
                   break;
               }
           } 
        }
        return res;
    }
}
var utils = {
    wrap:function(el,className){
        if(!el){
            return;
        }
        var wrapper = document.createElement("div");
        wrapper.className = className;
        el.parentNode.insertBefore(wrapper,el);//确保位置不乱
        el.parentNode.removeChild(el);
        wrapper.appendChild(el);//裹上了
    },
    addClass:function(el,className){
        if(!el){
            return;
        }

        if(el.classList){
            el.classList.add(className);
        }else{
            el.className += '' +className;
        }
    },
    removeClass:function(el,className){
        if(!el){
            return;
        }

        if(el.classList){
            el.classList.remove(className);
        }else{
            //String.prototype.replace (searchValue, replaceValue)
            //new RegExp(pattern, attributes); 其中g表示全局匹配而不是找到第一个匹配就停止了，i表示对大小写不敏感的匹配
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),' ')
        }
    },
    hasClass:function(el,className){
        if(el.classList){
            return el.classList.contains(className);
        }else{
            return new RegExp('(^|)' +className +'(|$)','gi').test(el.className);
        }
        return false;
    },
    setVendor:function(el,property,value){
         if(!el){
            return;
         }
         //charAt() 方法可返回指定位置的字符。从0开始，参数传入的是多少返回的就是相应位置的字符，超过字符串的长度则返回''
         el.style[property.charAt(0).toLowerCase() + property.slice(1)] = value;
         el.style['webkit'+property] = value;
         el.style['moz'+property] = value;
         el.style['ms'+property] = value;
         el.style['o'+property] = value;
    },
    trigger:function(el,event,detail=null){
        if(!el){
            return;
        }
        let customEvent = new CustomEvent(event,{
            detail:detail
        });
        el.dispatchEvent(customEvent);
    },

    Listener: {//用于解除事件
        uid: 0
    },
    on: function(el, events, fn) {
        if (!el) {
            return;
        }

        events.split(' ').forEach(event => {
            var _id = el.getAttribute('lg-event-uid') || '';
            utils.Listener.uid++;
            _id += '&' + utils.Listener.uid;//all event
            el.set('lg-event-uid', _id);
            utils.Listener[event + utils.Listener.uid] = fn;//解除监听事件的唯一标识
            el.addEventListener(event, fn, false);
        });
    },

    off: function(el, event) {
        if (!el) {
            return;
        }

        var _id = el.getAttribute('lg-event-uid');//all event
        if (_id) {
            _id = _id.split('&');
            for (var i = 0; i < _id.length; i++) {//这肯定不是最优的办法啊，删除一个事件就要把所有的事件全部遍历一遍，但是好像也没想到其他的办法
                if (_id[i]) {
                    var _event = event + _id[i];
                    el.removeEventListener(event, utils.Listener[_event]);
                    el.set('lg-event-uid', el.getAttribute('lg-event-uid').replace('&' + _id[i], ''));
                    delete utils.Listener[_event];// delete 操作符用来删除一个对象的属性。
                }
            }
        }
    },

    param: function(obj) {//URL param
        //Object.keys() 方法会返回一个由给定对象的所有可枚举自身属性的属性名组成的数组，数组中属性名的排列顺序和使用for-in循环遍历该对象时返回的顺序一致 (顺序一致不包括数字属性)（两者的主要区别是 for-in 还会遍历出一个对象从其原型链上继承到的可枚举属性）。
        return Object.keys(obj).map(function(k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
        }).join('&');
    }
};

export
default utils;
