cc.Class({
    extends: cc.Component,

    properties: {
       editbox: cc.EditBox,
       data: [cc.SpriteFrame],
       prefab: cc.Prefab,
       sound: [cc.AudioClip]
    },

    onLoad: function () {
        this.editbox.node.on('editing-did-began', this.callback, this);
    },
 
    callback: function (editbox) {
        var list = this.search(this.editbox.string);
        this.setWord(list);
    },

    search: function(text){
        var list = this.data.filter((tmp) => {
            return tmp.name.includes(text);
        });
        return list;
    },

    setWord: function(list){
        this.node.removeAllChildren();
        for(var i=0; i<list.length; i++){
            var nd = cc.instantiate(this.prefab);
            this.node.addChild(nd, 1, list[i].name);
            nd.getComponent(cc.Sprite).spriteFrame = list[i];
            nd.x *= Math.pow(-1, i%2);
            nd.y -= 210*(Math.floor(i/2));
            nd.getComponent(cc.AudioSource).clip = this.sound[i];
        }
    },

    start () {
    },

    // update (dt) {},
});
