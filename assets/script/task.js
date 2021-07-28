window.tasks = [];
window.active_task = false;
window.selectDif = 0;

cc.Class({
    extends: cc.Component,

    properties: {
        data: [cc.JsonAsset],
        view: [cc.Prefab],
        frame: [cc.SpriteFrame],
        sound: [cc.AudioClip]
    },

    start () { 
        var js = this.data[gameCategory].json;
        tasks = [[],[],[]];
        not = 0;
        switch(gameDifficulty){
            case 3:this.setLevel(js["sangat_sulit"]);
            case 2:this.setLevel(js["sulit"]);
            case 1:this.setLevel(js["sedang"]);
            case 0:this.setLevel(js["mudah"]);
        }
        this.setTask(tasks, js);
    },

    setLevel: function(diff){
        var tmpTask = this.setRandom(diff);
        if(tmpTask[0].length<1)return;
        tasks[0].unshift(tmpTask[0]);
        tasks[1].unshift(tmpTask[1]);
        tasks[2].unshift(diff["type"]);
        not += diff["indo"].length;
    },

    setTask: function(task, js){
        //set difficulty
        var dif = 0;
        do{
            dif = Math.floor(Math.random()*task[0].length);
        }while(task[0][dif].length < 1 && complete != not);


        //set type
        var type = task[2][dif][Math.floor(Math.random()*task[2][dif].length)];

        //set view
        var vv = cc.instantiate(this.view[type]);
        this.setView(vv);

        //set question
        var q = this.setQuestion(task, dif, type, vv);

        //set answer
        this.setAnswer(q, js, dif, vv, type);

        //set object
        if(type == 0)this.setObject(vv, q, "object");

        //set Audio
        this.setAudio(vv, q);
    },

    setAudio: function(view, quest){
        var clip = this.sound.find((value) => {
            return value.name.localeCompare(quest) == 0;
        });
        view.getChildByName("sound").getComponent(cc.AudioSource).clip = clip;
    },

    setObject: function(view, quest, str){
        var flame = this.frame.find((value) => {
            return value.name.localeCompare(quest) == 0;
        });
        if(flame == undefined)return;
        var size = flame.getOriginalSize();
        var ob = view.getChildByName(str);
        ob.getComponent(cc.Sprite).spriteFrame = flame;
        ob.width = size.width;
        ob.height = size.height;
    },

    setAnswer: function(quest, js, dif, vv, type){
        var str = "";
        switch(dif){
            case 0: str = "mudah";break;
            case 1: str = "sedang";break;
            case 2: str = "sulit";break;
            case 3: str = "sangat_sulit";break;
        }
        var difData = js[str];
        var index = difData["indo"].indexOf(quest);
        var hokTmp = difData["hokkien"].slice();
        hokTmp.splice(index, 1);
        var aaa = [difData["hokkien"][index]];
        // alert(index, str, quest, aaa[0], hokTmp);
        for(var i=0; i<3; i++){
            var r = Math.floor(Math.random()*hokTmp.length);
            var p = Math.floor(Math.random()*2);
            
            if(p == 0){
                aaa.push(hokTmp[r]);
            }else{
                aaa.unshift(hokTmp[r]);
            }
            hokTmp.splice(r, 1);
        }

        var op = vv.getChildByName("option");
        for(var i=0; i<aaa.length; i++){
            var opi = op.getChildByName("op"+(i+1))
            if(type == 1){
                var index = difData["hokkien"].indexOf(aaa[i]);
                // alert(difData["indo"][index]);
                this.setObject(opi, difData["indo"][index], "icon");
            }
            var lb = opi.getChildByName("label");
            lb.getComponent(cc.Label).string = aaa[i];
        }
    },

    setQuestion: function(task, dif, type, vv){
        var _q = task[0][dif][0];
        selectDif = dif;
        if(type == 0){
            var ch = vv.getChildByName("sound").getChildByName("label");
            ch.getComponent(cc.Label).string = _q;
        }else if(type == 1){
            var ch = vv.getChildByName("question");
            ch.getComponent(cc.Label).string = "Berikut mana yang merupakan “"+_q+ "”?";
        }
        return _q;
    },

    setView: function(vv){
        this.node.removeAllChildren();
        this.node.addChild(vv, 1, "view");
    },

    setRandom: function(arr){
        var ln = arr["indo"].length;
        var curr = Array.from(Array(ln).keys());
        var tmp = [];
        var tmp2 = [];
        for(var i=0; i<ln; i++){
            var r = Math.floor(Math.random()*curr.length);
            var index = curr[r];
            tmp.push(arr["indo"][index]);
            tmp2.push(arr["hokkien"][index]);
            curr.splice(r, 1);
        }
        return [tmp, tmp2];
    },

    update (dt) {
        if(active_task){
            active_task = false;
            this.setTask(tasks, this.data[gameCategory].json);
        }
    },
});
