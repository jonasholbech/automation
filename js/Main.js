var Main = {
    plugins:[],
    init: function(){
        Observer.subscribe('pluginsLoaded', Main.ready);
        Observer.publish('loaded');
        
        Main.addScript("HTMLValidator", 'Validate HTML');
        Main.addScript("CSSValidator", 'Validate CSS');
        Main.loadScripts();


    },
    ready:function(){
        app.DOM.elements['form'].onsubmit=function(){
            return Main.executePlugin();
        }
    },
    executePlugin:function(e){
        var s = app.DOM.elements.select;
        var plugin = s.options[s.selectedIndex].value;
        console.log(plugin);
        app.plugins[plugin].execute();
        return false;
    },
    loadScripts:function(){

        var s;
        //console.log("script loaded", s);
        if (!(s = Main.plugins.pop())) {
            Observer.publish('pluginsLoaded');
        } else {
            var tag = document.createElement('script');
            tag.src = "js/plugins/"+s.script+".js?r="+Date.now();

            tag.onload = Main.loadScripts;
            tag.onreadystatechange = function () {
                if (tag.readyState === 4) {
                    Main.loadScripts();
                }
            };
            document.body.appendChild(tag);
            app.DOM.addOption(s.name, s.script);
        }

    },
    addScript:function(s, n){
        this.plugins.push({script:s, name:n});
        console.log(this.plugins);
    }

};