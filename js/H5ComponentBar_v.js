/* 垂直柱图组件对象 */

var H5ComponentBar_v=function(name,cfg){
   var component=new H5ComponentBase(name,cfg) ;
     var h=cfg.height;
   $.each(cfg.data,function(idx,item){
     var line=$("<div class='line'>");
     var name=$("<div class='name'>");
     var rate=$("<div class='rate'>");
     var per=$("<div class='per'>");
     var  bgStyle='';
     if(item[2]){
       bgStyle='style="background-color:'+item[2]+' "';

     }
     line.css('padding-top',(1-item[1])*h/4);
     name.text(item[0]);
     var height=item[1]*100+'%';
     var height1=item[1]*100*0.5+'%';//这里再乘以一个0.5，是为了让rate的宽度的参照点为 1/2line的宽度，这样子即使width为100%，也不会把line给撑破了
     rate.html("<div class='bg'" +bgStyle+"></div>");

     rate.css('height',height1);
     per.text(height);
     line.append(per).append(rate).append(name);
     component.append(line);
   })
   return component;
}
