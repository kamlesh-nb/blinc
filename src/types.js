const types = [
  {isSvg: false, tagNames: "a,abbr,address,area,article,aside,audio,b,base,bdi,bdo,big,blockquote,body,br,button,canvas,caption,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dialog,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,kbd,keygen,label,legend,li,link,main,map,mark,marquee,menu,menuitem,meta,meter,nav,noscript,object,ol,optgroup,option,output,p,param,picture,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strong,style,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,u,ul,var,video,wbr"},
  {isSvg: true, tagNames: "circle,clipPath,defs,ellipse,foreignObject,g,image,line,linearGradient,marker,mask,path,pattern,polygon,polyline,radialGradient,rect,stop,svg,text,tspan"},
];
const spreadKids = (kids) => {
  let _kids = {};
  for (let i = 0; i < kids.length; i++) { _kids[i] = kids[i];}
  return _kids;
};
types.forEach((t) => {
  t.tagNames.split(",").forEach((tag) => {
    exports[tag] = (...args) => {
      let kids,
        attrs,
        elem,
        key,
        isSvg = t.isSvg;
      Array.isArray(args[0])
        ? (kids = spreadKids(args[0]))
        : typeof args[0] === "object"
        ? (attrs = args[0])
        : null;
      Array.isArray(args[1])
        ? (kids = spreadKids(args[1]))
        : typeof args[1] === "object"
        ? (attrs = args[1])
        : null;
      return { tag, attrs: attrs || {}, children: kids || {}, elem, key, isSvg };
    };
  });
})

let activeLink;
export function Link(props = {}) {
  return a({
    ...props,
    onclick: (e) => {
      if (activeLink) activeLink.classList.remove("active");
      activeLink = e.target;
      activeLink.classList.add("active");
      e.preventDefault();
      history.pushState({path: e.target.pathname}, "", e.target.pathname)
    },
  });
}