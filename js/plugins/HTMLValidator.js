app.plugins = (function(ns , undefined){

    ns.HTMLValidator = {
        section:null,
        execute:function(){
            console.log("EXECUTING HTML VALIDATOR");
            var links = app.DOM.getLinks();
            ns.HTMLValidator.section=app.DOM.addSection("HTML validation");
            var length = links.length;
            var i=0;
            for(;i<length; i++){
                app.Ajax.getJSON('http://validator.w3.org/nu/?out=json&doc='+links[i], function(e){
                    var j = JSON.parse(e);
                    console.log(j, j.url);
                    var i=0;
                    var html = [];
                    var length=j.messages.length;
                    html.push("<h2>"+j.url+"</h2>");
                    html.push("<h3>Messages: "+length+"</h3>");
                    html.push('<ul>');

                    for(; i<length; i++){
                        html.push("<li>"+j.messages[i].type+": "+j.messages[i].message+"</li>");
                    }

                    html.push('</ul>');
                    app.DOM.addMessage(app.plugins.HTMLValidator.section, html.join(""));
                });
            }
        }
    };
    return ns;
}(app.plugins || {}));

//TODO service worker?