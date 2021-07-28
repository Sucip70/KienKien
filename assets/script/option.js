cc.Class({
    extends: cc.Component,

    properties: {
        type: cc.Integer,
        frame: [cc.SpriteFrame]
    },

    start () {
        this.node.children.forEach((value, index) => {
            value.on('mousedown', function (event) {
                this.selecting(index);
            }, this);
        });
    },

    selecting: function(index){
        for(var i=0; i<4; i++){
            var obj;
            switch(this.type){
                case 0:obj = this.node.getChildByName("op"+(i+1));break;
                case 1:obj = this.node.getChildByName("kt"+(i+1)).getChildByName("select");break;
            } 
            obj.getComponent(cc.Sprite).spriteFrame = this.frame[index == i?1:0];
        }
    }
});
