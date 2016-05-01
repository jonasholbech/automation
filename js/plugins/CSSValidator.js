app.plugins = (function(ns , undefined){

    ns.CSSValidator = {
        section:null,
        execute:function(){
            console.log("EXECUTING CSS VALIDATOR, v 2");
            var links = app.DOM.getLinks();
            ns.HTMLValidator.section=app.DOM.addSection("CSS validation");
            var length = links.length;
            var i=0;
            for(;i<length; i++){
                setTimeout(
                    app.Ajax.getJSON('proxy.php?path=http://jigsaw.w3.org/css-validator/validator&output=json&uri='+links[i], function(e){
                        var j = JSON.parse(e);
                        console.log(j, j.cssvalidation);
                        var i=0;
                        var html = [];
                        html.push("<h2>"+j.cssvalidation.uri+"</h2>");
                        if(j.cssvalidation.validity){
                            html.push("<h3>Valid</h3>");
                        } else {
                            html.push("<h3>Errors: "+j.cssvalidation.result.errorcount+"</h3>");
                            if(j.cssvalidation.errors) {
                                html.push('<ul>');
                                var errorLength = j.cssvalidation.errors.length;
                                for (; i < errorLength; i++) {
                                    html.push("<li>" + j.cssvalidation.errors[i].message + "</li>");
                                }
                                html.push('</ul>');
                            }
                            if(j.cssvalidation.warnings){
                                html.push("<h3>Warnings: "+j.cssvalidation.result.warningcount+"</h3>");
                                html.push('<ul>');
                                var warningLength=j.cssvalidation.warnings.length;
                                for(i=0;i<warningLength; i++){
                                    html.push("<li>"+j.cssvalidation.warnings[i].message+"</li>");
                                }
                                html.push('</ul>');
                            }
                        }
                        app.DOM.addMessage(app.plugins.HTMLValidator.section, html.join(""));
                    }), i*1000);

            }
        }
    };
    return ns;
}(app.plugins || {}));



//TODO service worker?
//http://jigsaw.w3.org/css-validator/validator
//https://jigsaw.w3.org/css-validator/validator?uri=http://kea-alt-del.dk/tribeca/&output=json
//TODO 1 sec pause between each call (as stated in the api, play fair, be nice)
/*
//a validating document
 {
     "cssvalidation" : {
         "uri"       : "http://kea-alt-del.dk/tribeca/",
         "checkedby" : "http://www.w3.org/2005/07/css-validator",
         "csslevel"  : "css3",
         "date"      : "2016-05-01T08:05:54Z",
         "timestamp" : "1462133154759",
         "validity"  : true,
         "result"    : {
             "errorcount"   : 0,
             "warningcount" : 0
         }
     }
 }

 */