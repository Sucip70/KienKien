window.not = 10;
window.complete = 0;
window.wrong = 0;
window.time = 0;
window.active_not = false;
var dis = 0;

cc.Class({
    extends: cc.Component,

    start () {
        isPause = false;
        if(gameType == 0){
            var obj = this.node.getChildByName("fill");
            dis = obj.width/not;
            obj.width = 0;
    
            var lab = this.node.getChildByName("label");
            lab.getComponent(cc.Label).string = "0/"+not;
    
        }else{
            var lab = this.node.getChildByName("label");
            switch(gameDifficulty){
                case 0:time = 12;break;
                case 1:time = 8;break;
                case 2:time = 6;break;
                case 3:time = 4.8;break;
            }
            lab.getComponent(cc.Label).string = time+"s";
            
            var obj = this.node.getChildByName("fill");
            dis = obj.width;
            obj.width = dis*Math.ceil(time);
        }
        complete = 0;    
    },

    update (dt) {
        if(isPause)return;
        if(gameType == 0){
            if(active_not){
                active_not = false;
                
                var obj = this.node.getChildByName("fill");
                obj.width += dis;  
                
                var lab = this.node.getChildByName("label");
                lab.getComponent(cc.Label).string = complete+"/"+not;   
    
                if(complete >= not){
                    cc.director.loadScene("finish");
                }
            }
        }else{
            var tmp = time;
            time -= dt;
            
            var obj = this.node.getChildByName("fill");
            obj.width = dis*time/12;
            if(obj.width > dis)obj.width = dis;  
            if(obj.width < 0 )obj.width = 0;

            if(Math.floor(tmp)!=Math.floor(time)){
                var lab = this.node.getChildByName("label");
                lab.getComponent(cc.Label).string = Math.ceil(time)+"s";
                
                if(Math.ceil(time) == 0){
                    cc.director.loadScene("finish");
                }
            }

            if(active_not){
                active_not = false;
                
                if(complete >= not){
                    cc.director.loadScene("finish");
                }
            }
        }
    },
});
