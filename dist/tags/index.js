"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFieldValues = setFieldValues;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var tags = "a,abbr,address,area,article,aside,audio,b,base,bdi,bdo,big,blockquote,body,br,button,canvas,caption,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dialog,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,kbd,keygen,label,legend,li,link,main,map,mark,marquee,menu,menuitem,meta,meter,nav,noscript,object,ol,optgroup,option,output,p,param,picture,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strong,style,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,u,ul,var,video,wbr,circle,clipPath,defs,ellipse,foreignObject,g,image,line,linearGradient,marker,mask,path,pattern,polygon,polyline,radialGradient,rect,stop,svg,text,tspan";
tags.split(',').forEach(function (tag) {
  exports[tag] = function (attrs, children) {
    var kids = children ? _objectSpread({}, children) : {};
    return {
      tag: tag,
      attrs: attrs || {},
      children: kids || {}
    };
  };
});

function setFieldValues() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var fields = props;

  var setValue = function setValue(event) {
    fields[event.target.id] = event.target.value;
  };

  return {
    fields: fields,
    setValue: setValue
  };
}