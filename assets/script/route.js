window.gameType = 0;
window.gameCategory = 2;
window.gameDifficulty = 3;

cc.Class({
    extends: cc.Component,

    properties: {
        key: cc.Integer,
        extra: cc.Integer
    },

    start () {
        this.node.on('mousedown', function (event) {
            switch(this.key){
                case 0:cc.director.loadScene("main");break;
                case 1:cc.director.loadScene("category");gameType = this.extra;break;
                case 2:cc.director.loadScene("difficulty");gameCategory = this.extra;break;
                case 3:cc.director.loadScene("in-game");break;
                case 4:
                    if(this.extra == 1){
                        wrong = not;
                        // complete = not;
                    }
                    cc.director.loadScene("finish");
                    break;
                case 5:cc.director.loadScene("setting");break;
            }
        }, this);
    },

    // update (dt) {},
});
