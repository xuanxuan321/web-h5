var H5Loading = function(images, firstPage) {
  var id = this.id;
  if (this._images===undefined)
   {
    this._images = (images || []).length;
    this._load = 0;
    window.id = this; //把当前对象存储在全局变量中，用来进行某个图片加载完成后的回调
    for (var s in images)
    {
      var item = images[s];
      var img = new Image;

      img.onload = function()
        {
          window.id.loader();



        };
      img.src = item;
    }
      $('#rate').text('0%');
      return this;

     } else
  {
    (this._load)++;
    $('#rate').text(((this._load / this._images * 100) >> 0) + '%');
    //线面为进度条的实现方法
      // $(".progress").css('width',((this._load / this._images * 100) >> 0) + '%');
    if (this._load < this._images)
     {
       window[id] = null;//此处的window[id] 不能用window.id代替
      return this;
     }
  }


  this.el.fullpage({
    onLeave: function(index, nextIndex, diretion) {
      $(this).find(".h5_component").trigger('onLeave') //此处的this指向的是当前页
    },
    afterLoad: function(anchorLink, index) {
      $(this).find(".h5_component").trigger('afterLoad')
    }
  });
  this.page[0].find(".h5_component").trigger('afterLoad');
  this.el.show(); //此举是为了等元素全部加载完成后再显示页面
  if (firstPage) {
    $.fn.fullpage.moveTo(firstPage);
  }
}
