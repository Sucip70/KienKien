cc.Class({
    extends: cc.Component,

    properties: {
        resFrame : [cc.SpriteFrame],
        view: [cc.Prefab],
        resource: cc.JsonAsset
    },

    start () {
        wrong += not-complete;
        var right = not - wrong;
        if(right < 0){
            right = 0;
            wrong = not;
        }

        var vv = cc.instantiate(this.view[gameType]);
        this.node.removeAllChildren();
        this.node.addChild(vv, 1, "view");
 
        if(gameType == 0){
            var gg = (complete == not?1:0);
            alert("res", gg, complete, not);
            vv.getChildByName("title").getComponent(cc.Sprite).spriteFrame = this.resFrame[gg];
            vv.getChildByName("chara").getComponent(cc.Sprite).spriteFrame = this.resFrame[gg+2];
            vv.getChildByName("getter").getChildByName("res").getComponent(cc.Label).string = right +" G";
            this.resource.json["koin"] += right;
        }else{
            vv.getChildByName("getter").getChildByName("res").getComponent(cc.Label).string = right +" Soal";
            var sc = vv.getChildByName("score");
            if(wrong == 0){
                sc.getChildByName("alpha").getComponent(cc.Sprite).spriteFrame = this.resFrame[14];
                sc.getChildByName("st0").getComponent(cc.Sprite).spriteFrame = this.resFrame[9];
                sc.getChildByName("st1").getComponent(cc.Sprite).spriteFrame = this.resFrame[10];
                sc.getChildByName("st2").getComponent(cc.Sprite).spriteFrame = this.resFrame[11];
                sc.getChildByName("st3").getComponent(cc.Sprite).spriteFrame = this.resFrame[12];
                sc.getChildByName("st4").getComponent(cc.Sprite).spriteFrame = this.resFrame[13];
                this.resource.json["star"] += 5;
            }else if(wrong < 5){
                sc.getChildByName("alpha").getComponent(cc.Sprite).spriteFrame = this.resFrame[15];
                sc.getChildByName("st0").getComponent(cc.Sprite).spriteFrame = this.resFrame[9];
                sc.getChildByName("st1").getComponent(cc.Sprite).spriteFrame = this.resFrame[10];
                sc.getChildByName("st2").getComponent(cc.Sprite).spriteFrame = this.resFrame[11];
                this.resource.json["star"] += 3;
            }else if(wrong < 8){
                sc.getChildByName("alpha").getComponent(cc.Sprite).spriteFrame = this.resFrame[16];
                sc.getChildByName("st0").getComponent(cc.Sprite).spriteFrame = this.resFrame[9];
                sc.getChildByName("st1").getComponent(cc.Sprite).spriteFrame = this.resFrame[10];
                this.resource.json["star"] += 2;
            }else if(wrong < not){
                sc.getChildByName("alpha").getComponent(cc.Sprite).spriteFrame = this.resFrame[17];
                sc.getChildByName("st0").getComponent(cc.Sprite).spriteFrame = this.resFrame[9];
                this.resource.json["star"] += 1;
            }else{
                sc.getChildByName("alpha").getComponent(cc.Sprite).spriteFrame = this.resFrame[18];
            }
        }
        wrong = 0;
    },
});
