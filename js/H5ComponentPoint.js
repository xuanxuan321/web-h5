/* 散点图表组件对象 */

var H5ComponentPoint=function(name,cfg){
   var component=new H5ComponentBase(name,cfg) ;
   var base=cfg.data[0][1];//第一个圆撑满整个容器，其他的圆照着他按比例缩放
   $.each(cfg.data,function(idx,item){
     var point=$('<div class="point point_'+idx+' ">');
     component.append(point);
     point.css('z-index',3);
     var per=(item[1]/base*100)+'%';
     var name=$('<div class="name">'+item[0]+"</div>");
     var rate=$('<div class="per">'+(item[1]*100)+'%'+"</div>");
     name.append(rate);
     point.append(name);
     point.width(per).height(per);
     if(item[2]){
       point.css('background-color',item[2]);
     };
     if(item[3]!==undefined&&item[4]!==undefined){
       point.css('left',item[3]).css('top',item[4]);
     }
   });
   //动画层的绘制
   $.each(cfg.data,function(idx,item){
     var point=$('<div class="point point_'+idx+' ">');
     component.append(point);
     var per=(item[1]/base*100)+'%';

     point.width(per).height(per);
     if(item[2]){
       point.css('background-color',item[2]);

       point.addClass('shine');
     };
     if(item[3]!==undefined&&item[4]!==undefined){
       point.css('left',item[3]).css('top',item[4]);
     }
   });
   return component;
}
