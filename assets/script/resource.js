cc.Class({
    extends: cc.Component,

    properties: {
       data: cc.JsonAsset,
       label: [cc.Label],
       type: [cc.String]
    },

    start () {
        // cc.sys.localStorage.clear();
        var list = this.data.json;
        for(var i=0; i<this.label.length; i++){
            var tmp = JSON.parse(cc.sys.localStorage.getItem(this.type[i])) || list[this.type[i]];
            alert(tmp);
            this.label[i].string = tmp;
            cc.sys.localStorage.setItem(this.type[i], tmp);
        }
    },

    setDefaultData: function(){
        var js = this.data.json;
        for(var key in js){
            cc.sys.localStorage.setItem(key, js[key]);
        }
    }
});
