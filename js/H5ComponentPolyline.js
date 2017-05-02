/* 柱图组件对象 */

var H5ComponentPolyline=function(name,cfg){
  var  a=new Array();//用来控制说明文字ABCDE的输出次数
  var component=new H5ComponentBase(name,cfg) ;
  var w=cfg.width;
  var h=cfg.height;
  var cns=document.createElement("canvas");

  var ctx=cns.getContext('2d');
  cns.width=ctx.width=w;
  cns.height=ctx.height=h;
  component.append(cns);
  var step=10;
  ctx.beginPath();//此句可省略
    //画表格

  ctx.lineWidth=1;
  ctx.strokeStyle="#AAAAA";
  for(var i=0; i<step+1;i++){
    var y=h/step*i;
    ctx.moveTo(0,y);
    ctx.lineTo(w,y);
  }
  step=cfg.data.length+1;
  for( var i=0;i<step+1;i++){
    var x=w/step*i;
    ctx.moveTo(x,0);
    ctx.lineTo(x,h);
  }
  ctx.stroke();
  //绘制折线的点
  var cns=document.createElement("canvas");
  var ctx=cns.getContext('2d');
  cns.width=ctx.width=w;
  cns.height=ctx.height=h;
    component.append(cns);





  //模块化画点
  var  draw=function(per){
    ctx.clearRect(0,0,w,h);//清空画布
  ctx.beginPath();
  ctx.lineWidth=3;
  ctx.strokeStyle="#ff8878";

  step=cfg.data.length+1;
  for(var i in cfg.data){
    ctx.beginPath();
  var  item=cfg.data[i];
    x=w/step*i+w/step;
    y=h*(1-(item[1]*per));
    ctx.arc(x,y,5,0,2*Math.PI);
    ctx.stroke();
    //输出下方的说明文字 ,之所以没用画布来实现，是因为这些文字是出现在画布外的
    if(cfg.data&&a[i]!==i){//保证说明文字只会输出一次
    a[i]=i;
    var  text=$("<div class='text'>");
      text.text(cfg.data[i][0]);
      text.css('width',w/step/2).css('left',x/2-w/step/4).css('text-align','center')
      component.append(text);

    }
  }
  //将折线的点连线
  ctx.moveTo(w/step,h*(1-cfg.data[0][1]*per));
  for( var i in cfg.data){
  var  item=cfg.data[i];
  var  x=w/step*i+w/step;
  var  y=h*(1-(item[1]*per));
    ctx.lineTo(x,y);

  }
    ctx.stroke();
    //绘制阴影
    ctx.lineTo(x,h);
    ctx.lineTo(w/step,h);
    ctx.fillStyle="rgba(255,136,120,0.2)";
    ctx.fill();

    //添加数据
    for(var i in cfg.data){
       var item=cfg.data[i];
    var  x=w/step*i+w/step;
    var  y=h*(1-(item[1]*per));

        ctx.fillStyle="black";
      ctx.font="25px  Arial";
      ctx.fillText(item[1]*100+'%',x-10,y-10)
    }


}
// 生长动画
//用setInterval也可以，但是效果没那么好，图表一出现就已经动画完成一半啦
// component.on('afterLoad',function(){
//   var s=0;
//
//   var p=  setInterval(function(){
//       s+=0.01;
//       draw(s);
//       if(s>1){
//       clearInterval(p)  ;
//       }
//       }
//     ,10);
//
//
// });
//一个事件可以绑定多个处理函数，后绑定的先执行
component.on('afterLoad',function(){
  var s=0;
  for(var i=0;i<100;i++){
    setTimeout(function(){
      s+=0.01;
      draw(s);
      }
    ,i*10+500);

  }
});
// 退场动画
component.on('onLeave',function(){
  var s=1;
  for(var i=0;i<100;i++){
    setTimeout(function(){
      s-=0.01;
      // debugger
      draw(s);
    },i*10);

  }
});
  return component;
}
