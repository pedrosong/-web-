import Player from './player.js';
export default class Game{
    constructor(){
        this.player = null;
    }
    login(username){
        this.player = new Player(username);
        //实例化player对象，并吧username作为参数传入
    }
}

// 暗号 
// 扩展一个鲁班类 实现亚瑟的功能；