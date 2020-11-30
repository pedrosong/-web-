import Yase from './yase.js';
import luban from './luban.js';
export default class Player{
    constructor(username){
        //拿到用户名，并生成heroes对象
        this.name = username;
        this.heroes = [new Yase,new luban];
    }
}