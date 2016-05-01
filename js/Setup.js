app = (function(ns , undefined){

    ns.Setup = {

        init: function () {
            ns.DOM.addForm();
        }

    };
    Observer.subscribe('loaded', function(){ns.Setup.init()});
    return ns;
}(app || {}));