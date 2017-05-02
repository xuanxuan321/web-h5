/* 饼图组件对象 */


var H5ComponentPie=function(name,cfg){
  var component=new H5ComponentBase(name,cfg) ;
  var w=cfg.width;
  var h=cfg.height;
  // 绘制底层 这里其实没必要绘制底层
  // var cns=document.createElement("canvas");
  // var step=cfg.data.length
  // var ctx=cns.getContext('2d');
  // cns.width=ctx.width=w;
  // cns.height=ctx.height=h;
  // $(cns).css('z-index',1);
  // component.append(cns);
  // var r=w/2;
  // ctx.strokeStyle="#eee";
  // ctx.fillStyle="#eee";
  // ctx.beginPath();
  // ctx.arc(r,r,r,0,2*Math.PI);
  // ctx.fill();
  // ctx.stroke();

  // 绘制数据
  var cns=document.createElement("canvas");
  var step=cfg.data.length
  var ctx=cns.getContext('2d');
  cns.width=ctx.width=w;
  cns.height=ctx.height=h;
  $(cns).css('z-index',2);
  component.append(cns);
  var sAngle=3/2*Math.PI;
  var aAngle=2*Math.PI;
  var color=['red','green','grey','blue','yellow'];
  var  rad=0;
  for(var i=0;i<step;i++){
  var  item=cfg.data[i];
    var r=w/2;
    ctx.strokeStyle="#eee";
    ctx.fillStyle="#eee";
    ctx.beginPath();
    eAngle=sAngle+aAngle*item[1];
    ctx.moveTo(r,r);
    ctx.arc(r,r,r,sAngle,eAngle);
    ctx.fillStyle=item[2]||color.pop();
    ctx.fill();
    ctx.stroke();
    sAngle=eAngle;
    //插入数据
    var text=$("<div class='text'>")
    text.text(item[0]);
    component.append(text);
    var rate=$("<div class='rate'>")
    rate.text(item[1]*100+'%');
    text.append(rate);

       rad+=2*Math.PI*item[1]/2;
    var  x=r+r*Math.cos(rad-1/2*Math.PI);
    var  y=r+r*Math.sin(rad-1/2*Math.PI);
    ctx.beginPath();
    ctx.strokeStyle='black';
    ctx.stroke();
    if(x>w/2){
    text.css('left',x/2+10);
   }else{
    text.css('right',(w-x)/2+10);
   }
   if(y>h/2){
   text.css('top',y/2+10);
  }else{
   text.css('bottom',(h-y)/2+10);
  }
  rad+=2*Math.PI*item[1]/2;

    // console.log(item[1]);
  }
  //绘制遮罩层
  var cns=document.createElement("canvas");
  var step=cfg.data.length
  var ctx=cns.getContext('2d');
  cns.width=ctx.width=w;
  cns.height=ctx.height=h;
  $(cns).css('z-index',3);// 不能写成cns.css('width',3);除非cns是这样创建的  cns=$("<canvas>")
  component.append(cns);
  var r=w/2;
  ctx.strokeStyle="#eee";
  ctx.fillStyle="#eee";

  var  draw=function(per){
    ctx.clearRect(0,0,w,h);
    ctx.beginPath();
    ctx.moveTo(r,r);
    sAngle=3/2*Math.PI;
    //yi开始先画一个大圆把他全部遮住
    if(per<=0){
        ctx.arc(r,r,r,0,2*Math.PI);
    }else{
    ctx.arc(r,r,r,sAngle,sAngle+2*Math.PI*per,true);
    }
    ctx.fill();
    ctx.stroke();
};
draw(0);
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
      draw(s);
    },i*10);
  }
});
  return component;
}
