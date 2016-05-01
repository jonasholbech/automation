var Observer = (function(){
    var events = {};
    return {
        subscribe: function(ev, callback){
            if(!events.hasOwnProperty(ev)){
                events[ev]=[]
            }
            events[ev].push(callback);
        },
        publish: function(ev){
            console.log("Broadcasting: ",ev)
            var data = Array.prototype.slice.call(arguments, 1),
                index=0,
                length=0;
            if(events.hasOwnProperty(ev)){
                length = events[ev].length;
                for(; index<length; index++){
                    events[ev][index].apply(this, data);
                }
            }
        }
    }
}());