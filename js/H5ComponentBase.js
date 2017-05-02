/* 基本图文组件对象 */
var H5ComponentBase=function(name,cfg){
  var cfg=cfg||{};
  var cls=" h5_component_"+cfg.type;
  var  id=('h5_c_'+Math.random()).replace('.','_')
  var component=$("<div class='h5_component "+cls+"  h5_component_name_"+name+"' id='"+id+"'>");

  cfg.text&&component.text(cfg.text);

  cfg.width&&component.width(cfg.width/2);
  cfg.height&&component.height(cfg.height/2);
  cfg.css&&component.css(cfg.css);
  cfg.bg&&component.css('background-image','url('+cfg.bg+')');
  if(cfg.center){

    component.css({
      'left':'50%',
      'marginLeft':(cfg.width/4 * -1)+'px'
    })//千万别把'marginLeft'写成margin-left
  }
  if(typeof cfg.onclick==='function'){
    component.on('click',cfg.onclick)
  }

  component.on('afterLoad',function(){
      setTimeout(function(){
        component.addClass(cls+'_load').removeClass(cls+'_leave');
        cfg.animationIn&&component.animate(cfg.animationIn)
      return false;//这一句是为了防止事件冒泡，把trigger改成triggerHandler也可以解决这个问题
    },cfg.delay||0)

    });
  component.on('onLeave',function(){
     component.addClass(cls+'_leave').removeClass(cls+'_load');
     cfg.animationOut&&component.animate(cfg.animationOut)
    return false;
  });


  return component;
}
