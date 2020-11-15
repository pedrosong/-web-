import Yase from './yase.js';
import luban from './luban.js';
export default class Player{
    constructor(username){
        this.name = username;
        this.heroes = [new Yase,new luban];
    }
}