//Practice
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

function LightGallery(element){
	var _this = this;
	_this.element = element;
	_this.items = [];
	_this.items = element.children;
	for (var i = 0; i < _this.items.length; i++) {
		(function(index) {
			_this.items[index].addEventListener('click',(e) => {

        
				e.preventDefault();
				if (!document.body.classList.contains('LG_Open')) {
					_this.init(index);
					document.body.classList.add('LG_Open');
				}
			},false);

		})(i);

	}
}

LightGallery.prototype.init = function(index){
	var _this = this;
	_this.core(index);
};
LightGallery.prototype.core = function(index){
    var _this = this;
    var list = '',action = '',template;
    //insertAdjacentHTML() 将指定的文本解析为HTML或XML，并将生成的节点插入到指定位置的DOM树中。它不会重新解析它正在使用的元素，因此它不会破坏元素内的现有元素。这避免了额外的序列化步骤，使其比直接innerHTML操作更快。
    document.body.insertAdjacentHTML('beforeend', '<div class="LG_BG"></div>');

    for (var i = 0; i < _this.items.length; i++) {
        list += '<div class="LG_Item"><div class="LG_Imgwrap"><img class="LG_image" src="'+_this.items[i].getElementsByTagName("img")[0].getAttribute("src")+'"/></div></div>';    
    }

    if (_this.items.length > 1) {
    	action = '<div class="LG_Actions">' +
    	'<div class="LG_PrevArrow"> < </div>' +
    	'<div class="LG_NextArrow"> > </div>' +
    	'</div>';
    }
    template = '<div class="LG_Wrap">' +
    '<div class="LG" style="width:100%; height:100%">' +
    '<div class="LG_List">' + list + '</div>' +
    '<div class=LG_Bar><span id="LG_CloseBtn">X</span>' +
    '</div>' +
    action +
    '</div>' +
    '</div>';

    document.body.insertAdjacentHTML('beforeend', template);
    
    _this.Wrap = document.querySelector('.LG_Wrap');
    _this.Items = _this.Wrap.querySelectorAll('.LG_Item');
document.getElementById('LG_CloseBtn').addEventListener('click',(e)=>{
        document.getElementsByClassName('LG_BG')[0].parentNode.removeChild(document.getElementsByClassName('LG_BG')[0]);
        document.getElementsByClassName('LG_Wrap')[0].parentNode.removeChild(document.getElementsByClassName('LG_Wrap')[0]);
        document.body.classList.remove('LG_Open');
    })
    _this.Items[index].classList.add('LG_Current');
    if(index == _this.Items.length-1){
        _this.Items[0].classList.add('LG_Next');
    }else{
       _this.Items[index+1].classList.add('LG_Next');
   }
   if(index == 0){
    _this.Items[_this.Items.length-1].classList.add('LG_Pre');
}else{
   _this.Items[index-1].classList.add('LG_Pre');
}
document.getElementsByClassName("LG_PrevArrow")[0].addEventListener('click',(e)=>{
        if(_this.Items.length <=1){
          return;
        }

        var Pre = document.getElementsByClassName("LG_Pre")[0];
        var Current = document.getElementsByClassName("LG_Current")[0];
        var Next = document.getElementsByClassName("LG_Next")[0];

        if(Pre.previousElementSibling!=null){
            Pre.previousElementSibling.classList.add("LG_Pre");
        }else{
            _this.Items[_this.Items.length-1].classList.add("LG_Pre");
        }
        Pre.classList.add("LG_Current");
        Pre.classList.remove("LG_Pre");
        Current.classList.add("LG_Next");
        Current.classList.remove("LG_Current");
        Next.classList.remove("LG_Next")

    });
document.getElementsByClassName("LG_NextArrow")[0].addEventListener('click',(e)=>{
        //TODO只有一张图的时候
        if(_this.Items.length<=1){
          return;
        }
        var Pre = document.getElementsByClassName("LG_Pre")[0];
        var Current = document.getElementsByClassName("LG_Current")[0];
        var Next = document.getElementsByClassName("LG_Next")[0];

        if(Next.nextElementSibling!=null){
            Next.nextElementSibling.classList.add("LG_Next");
        }else{
            _this.Items[0].classList.add("LG_Next");
        }
        Next.classList.add("LG_Current");
        Next.classList.remove("LG_Next");
        Current.classList.add("LG_Pre");
        Current.classList.remove("LG_Current");
        Pre.classList.remove("LG_Pre")

    });
};
function setVendor(el,property,value){
         if(!el){
            return;
         }
         //charAt() 方法可返回指定位置的字符。从0开始，参数传入的是多少返回的就是相应位置的字符，超过字符串的长度则返回''
         el.style[property.charAt(0).toLowerCase() + property.slice(1)] = value;
         el.style['webkit'+property] = value;
         el.style['moz'+property] = value;
         el.style['ms'+property] = value;
         el.style['o'+property] = value;
};
window.lightGallery = function (element) {
   if(!element){
      console.error('没有正确传入参数！');
      return;
  }else{
      new LightGallery(element);
  }
}