/* 内容管理对象 */
var H5=function(){
  this.id=('h5_'+Math.random()).replace('.','_');
  this.el=$("<div class='h5' id='"+this.id+"'>").hide();

  $('body').append(this.el);
  this.page=[];
this.addPage=function(name,text){
    var page=$('<div class="h5_page section">');
    if(name!=undefined){
      page.addClass('h5_page_'+name);
    };
    if(text!=undefined){
        page.text(text)
  };
  this.el.append(page);
  this.page.push(page);
  return this
 };


 this.addComponent=function(name,cfg){
   var cfg=cfg||{};
   var cfg=$.extend({type:"base"},cfg);//如果没有指定type，就默认为base
  var  page=this.page.slice(-1)[0];//这是为了选中所要添加的页
   switch(cfg.type){
     case 'base':
     var component=new H5ComponentBase(name,cfg);
     break;
     case 'polyline':
     var component=new H5ComponentPolyline(name,cfg);
     break;
     case 'pie':
     var component=new H5ComponentPie(name,cfg);
     break;
     case 'bar':
     var component=new H5ComponentBar(name,cfg);
     break;
     case 'bar_v':
     var component=new H5ComponentBar_v(name,cfg);
     break;
     case 'radar':
     var component=new H5ComponentRadar(name,cfg);
     break;
     case 'ring':
     var component=new H5ComponentRing(name,cfg);
     break;
     case 'point':
     var component=new H5ComponentPoint(name,cfg);
     break;
   };
   page.append(component);
   return this;
 };

 this.loader=function(firstPage){
   this.el.fullpage({
     onLeave:function(index,nextIndex,diretion){
        $(this).find(".h5_component").trigger('onLeave')//此处的this指向的是当前页
     },
   afterLoad:function(anchorLink,index){
         $(this).find(".h5_component").trigger('afterLoad')
   }
   });
   this.page[0].find(".h5_component").trigger('afterLoad');
   this.el.show();//此举是为了等元素全部加载完成后再显示页面
   if(firstPage){
     $.fn.fullpage.moveTo(firstPage);
   }
 };
this.loader=typeof H5Loading =='function'?H5Loading:this.loader;
return this;
}
