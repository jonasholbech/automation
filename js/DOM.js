app = (function(ns , undefined){
    
    ns.DOM = {
        elements:{},
        addForm:function(){
            var f =document.createElement('form');
            ns.DOM.elements['form']=f;

            var t = document.createElement('textarea');
            ns.DOM.elements['textarea']=t;
            f.appendChild(t);

            var s = document.createElement('select');
            ns.DOM.elements['select']=s;
            f.appendChild(s);

            var b = document.createElement('button');
            var i = document.createTextNode('Go');
            b.appendChild(i);
            f.appendChild(b);
            ns.DOM.elements['button']=b;

            document.body.appendChild(f);
        },
        getLinks:function(){
            return ns.DOM.elements.textarea.value.split("\n");
        },
        addOption:function(name, value){
            var o = document.createElement('option');
            var t = document.createTextNode(name);
            o.value=value;
            o.appendChild(t);
            ns.DOM.elements['select'].appendChild(o)
        },
        get:function(el){
            //TODO get from elements
            return document.querySelector(el);
        },
        addSection:function(header){
            var s = document.createElement('section');

            var h = document.createElement('header');

            var h1 = document.createElement('h1');
            var t = document.createTextNode(header);

            h1.appendChild(t);
            h.appendChild(h1);
            s.appendChild(h);//can be one line (nested appends)
            document.body.appendChild(s);
            return s;
        },
        addMessage:function(section, html){
            var p = document.createElement('div');
            p.innerHTML = html;
            section.appendChild(p);
        }
    };
    return ns;
}(app || {}));