import S1 from './skills/yase/s1.js'
import S2 from './skills/yase/s2.js'
import S3 from './skills/yase/s3.js'

export default class Yase {
    constructor(){
        // 构建亚瑟对象的属性
        this.name = "亚瑟";
        this.ico = "./sources/heros/yase1.png";
        this.skills = [new S1,new S2,new S3];
    }
}