window.activePage = false;
cc.Class({
    extends: cc.Component,

    properties: {
        index: cc.Integer,
        on: cc.SpriteFrame,
        off: cc.SpriteFrame,
        content: cc.Node,
        header: cc.Node,
        view: cc.Prefab,
        head: cc.Prefab
    },

    start () {
        this.node.on('mouseup', function(event){
            indexPage = this.index;
            activePage = true;
            this.content.removeAllChildren();
            this.content.addChild(cc.instantiate(this.view), 1, "view");
            this.header.getChildByName("head").destroy();
            this.header.addChild(cc.instantiate(this.head), 1, "head");
        }, this);
    },

    update (dt) {
        if(activePage){
            var logo = this.node.getChildByName("logo");
            if(indexPage == this.index){
                logo.getComponent(cc.Sprite).spriteFrame = this.on;
            }else logo.getComponent(cc.Sprite).spriteFrame = this.off;
        }
    },
});
