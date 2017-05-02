/* 雷达图组件对象 */

var H5ComponentRadar=function(name,cfg){
  var component=new H5ComponentBase(name,cfg) ;
  var w=cfg.width;
  var h=cfg.height;
  var cns=document.createElement("canvas");
  var step=cfg.data.length
  var ctx=cns.getContext('2d');
  cns.width=ctx.width=w;
  cns.height=ctx.height=h;
  component.append(cns);
  var r=w/2;
  //计算多边形的顶点坐标,绘制底图
  var isBlue=false;

  for(var s=10;s>0;s--){
    ctx.beginPath();
    for(var i=0;i<step;i++){
      var  rad=2*Math.PI/360*(360/step)*i;
      var  x=r+r*Math.sin(rad)*(s/10);

      var  y=r+r*Math.cos(rad)*(s/10);
      ctx.lineTo(x,y);

    }
    ctx.closePath();
      ctx.stroke();

    isBlue=!isBlue;
    ctx.fillStyle=isBlue?'#99c0ff':'white';
    ctx.fill();
  }
  //绘制伞骨
  for(var i=0;i<step;i++){

    var  rad=2*Math.PI/360*(360/step)*i;
    var  x=r+r*Math.sin(rad);
    var  y=r+r*Math.cos(rad);
    ctx.beginPath();
    ctx.moveTo(r,r);
    ctx.lineTo(x,y);
    ctx.strokeStyle="#e0e0e0"
    ctx.stroke();
    //插入数据
    var text=$("<div class='text'>");
    text.text(cfg.data[i][0]);
    component.append(text);
    text.css('transition','all 1s '+i*0.1+'s');
    if(x>w/2){
    text.css('left',x/2+5);
   }else{
    text.css('right',(w-x)/2+5);
   }
   if(y>h/2){
   text.css('top',y/2+5);
  }else{
   text.css('bottom',(h-y)/2+5);
  }
   text.css('opacity',0);
  }


  //模块化画点，绘制展示层
  var cns=document.createElement("canvas");
  var ctx=cns.getContext('2d');
  cns.width=ctx.width=w;
  cns.height=ctx.height=h;
    component.append(cns);
  var  draw=function(per){
    //之所以这样设置而没有用css去设置，是为了让动画结束之后自动就能出现文字，而不是去算动画的执行时间，去设置文字过渡的delay
    if(per>=1){
      $('.h5_component_radar').find('.text').css('opacity',1)
    }
    if(per<1){
      $('.h5_component_radar').find('.text').css('opacity',0)
    }
    ctx.clearRect(0,0,w,h);
   ctx.beginPath();
    for(var i=0;i<step;i++){
    var rate=cfg.data[i][1]*per;
    var  rad=2*Math.PI/360*(360/step)*i;
    var  x=r+r*Math.sin(rad)*rate;
    var  y=r+r*Math.cos(rad)*rate;
    ctx.strokeStyle='#ff7676'
    ctx.lineTo(x,y);

  }
  ctx.closePath();
  ctx.fillStyle='#ff7676'
  ctx.fill();
  ctx.stroke();
};
// 生长动画
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

//退场动画
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
