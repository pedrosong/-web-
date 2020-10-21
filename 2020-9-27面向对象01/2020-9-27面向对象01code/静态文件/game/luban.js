import Skill3 from './skills/luban/skill3.js'
import Skill2 from './skills/luban/skill2.js'
import Skill1 from './skills/luban/skill1.js'

export default class luban{
    constructor(){
        this.name = '鲁班七号';
        this.ico = './sources/heros/luban1.png';
        this.skills = [new Skill1, new Skill2, new Skill3];
    }
}

