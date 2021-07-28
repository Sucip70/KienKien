var active = 1;
window.isPause = false;

cc.Class({
    extends: cc.Component,

    properties: {
        key: cc.Integer,
        frame: [cc.SpriteFrame],
        prefabAdded: cc.Prefab
    },

    start () {
        this.node.on('mousedown', function (event) {
            switch(this.key){
                case 0:this.selectDifficulty();break;
                case 1:this.closeParent();isPause = false;break;
                case 2:this.node.parent.parent.addChild(cc.instantiate(this.prefabAdded),1,"popup");isPause = true;break;   
                case 4:cc.sys.openURL('https://kevinlim.carrd.co/');break;
            }
        }, this);
    },

    closeParent: function(){
        this.node.parent.parent.destroy();
    },

    selectDifficulty: function(){
        this.node.getChildByName("select").getComponent(cc.Sprite).spriteFrame = this.frame[active];
        active = (active+1)%2;
    },

    // update (dt) {},
});
