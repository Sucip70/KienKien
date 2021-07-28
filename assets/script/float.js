cc.Class({
    extends: cc.Component,

    properties: {
        float: [cc.Prefab],
        body: cc.Node,
        answer: cc.SpriteFrame,
        data: [cc.JsonAsset]
    },

    start () {
        this.addFloat(0);
    },

    addFloat: function(index){
        var obj = cc.instantiate(this.float[index]);
        this.node.removeAllChildren();
        this.node.addChild(obj, 1, "float");
        obj.on('mousedown', function (event) {
            switch(index){
                case 0:this.checkAnswer();break;
                case 1:this.nextTask(true);break;
                case 2:this.nextTask(false);break;
            }
        }, this);
    },

    checkAnswer: function(){
        var flag = true;
        var view = this.body.getChildByName("view");
        
        var ch = view.getChildByName("question");
        var qqq = ch.getComponent(cc.Label).string;
        var qq = "";
        if(qqq.includes("“")){
            qq = qqq.substring(qqq.indexOf("“")+1, qqq.length-2);
        }else{
            var ch1 = view.getChildByName("sound").getChildByName("label");
            qq = ch1.getComponent(cc.Label).string;
        }

        var isThere = false;
        var op = view.getChildByName("option");
        for(var i=0; i<4; i++){
            var lb = op.getChildByName("op"+(i+1));
            if(lb.getComponent(cc.Sprite).spriteFrame.name.localeCompare(this.answer.name)==0){
                isThere = true;
                var diff = "";
                switch(selectDif){
                    case 0:diff = "mudah";break;
                    case 1:diff = "sedang";break;
                    case 2:diff = "sulit";break;
                    case 3:diff = "sangat_sulit";break;
                }
                var dataIndo = this.data[gameCategory].json[diff]["indo"];
                var indexIndo = dataIndo.indexOf(qq);
                var hok = this.data[gameCategory].json[diff]["hokkien"][indexIndo];
                var ans = lb.getChildByName("label").getComponent(cc.Label).string;
                // alert(":", indexIndo, hok, ans, qq, gameDifficulty, dataIndo);
                if(ans.localeCompare(hok) == 0){
                    flag = true;
                }else flag = false;
            }
        }
        if(!isThere)return;

        if(flag){
            this.addFloat(1);
            tasks[0][selectDif].splice(0, 1);
            tasks[1][selectDif].splice(0, 1);
            if(gameType == 1)time += 3;
            complete++;
        }else{
            this.addFloat(2);
            var tmp = tasks[0][selectDif][0];
            var tmp2 = tasks[1][selectDif][0];
            tasks[0][selectDif].splice(0, 1);
            tasks[1][selectDif].splice(0, 1);
            if(gameType == 0){
                tasks[0][selectDif].push(tmp);
                tasks[1][selectDif].push(tmp2);
            }else {
                wrong++;
                complete++;
            }
        }
    }, 

    nextTask: function(res){
        this.addFloat(0);
        if(res){
            active_not = true;
        }
        active_task = true;
    }

    // update (dt) {},
});
