cc.Class({
    extends: cc.Component,

    properties: {
       day: cc.Integer,
       prefab: [cc.Prefab]
    },

    start () {
        for(var i=0; i<this.day-1; i++){
            var nude = cc.instantiate(this.prefab[0]);
            this.node.addChild(nude, 1, "day"+i);
            nude.x += 180*i - 40;
            nude.getChildByName("label").getComponent(cc.Label).string = ""+(i+1);
        }
        var last = cc.instantiate(this.prefab[1]);
        this.node.addChild(last, 1, "day6");
        last.x += 180*6 - 20;
    },

    // update (dt) {},
});
