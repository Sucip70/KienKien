cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    play: function(){
        this.node.getComponent(cc.AudioSource).play();
    }

});
