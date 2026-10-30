(function(){
window.React={createRef:function(){return {current:null}}};
window.DCLogic=class DCLogic{
  constructor(){this.props={};}
  setState(s){this.state=Object.assign({},this.state,typeof s==='function'?s(this.state):s);this.__render();}
  __vals(){return (this.renderVals&&this.renderVals())||{};}
  __render(){
    const v=this.__vals();
    document.querySelectorAll('[data-tpl]').forEach(el=>{
      const t=JSON.parse(el.getAttribute('data-tpl'));
      for(const a in t){el.setAttribute(a,t[a].replace(/\{\{\s*(\w+)\s*\}\}/g,(m,k)=>v[k]==null?'':v[k]));}
    });
  }
  __mount(){
    this.__render();
    const v=this.__vals();
    document.querySelectorAll('[data-ref]').forEach(el=>{
      const r=v[el.getAttribute('data-ref')];
      if(typeof r==='function') r(el); else if(r&&typeof r==='object') r.current=el;
    });
    this.componentDidMount&&this.componentDidMount();
    this.__render();
  }
};
})();