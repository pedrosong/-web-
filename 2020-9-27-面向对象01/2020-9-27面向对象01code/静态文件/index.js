// console.log("index");
// 1.研究对象（需求）2.共性问题，抽象成类（复用性）3.抽象类的共性问题---》基类（父类）4.研究类之间逻辑关系；

import Game from './game/game.js';

// 对象： 鲁班、亚瑟、玩家、技能、游戏管理类；
let game = new Game();
// console.log(game);
document.querySelector(".sub").onclick = function(){
    let username = document.querySelector(".username").value;
    // console.log(username);
    game.login(username);
    console.log(game);
    // 隐藏login 显示选择；
    document.querySelector(".login").style.display = "none";
    document.querySelector(".game").style.display = "block";
    // 修改名称
    document.querySelector(".chioseusername").innerHTML = username;
    renderHeroes(game.player.heroes);
}

function renderHeroes(heroes){
    console.log(heroes);
    document.querySelector(".heroView").innerHTML = "";
    heroes.forEach(hero=>{
      let heroItem =   document.createElement("div");
      heroItem.classList.add("heroItem");
      heroItem.innerHTML = `<img src="${hero.ico}" />
      <span>${hero.name}</span>`;
      document.querySelector(".heroView").appendChild(heroItem);
      heroItem.onclick = function(){
          document.querySelector(".heroShow").innerHTML = `<img src="${hero.ico}" />`
        //  渲染技能
        renderSkills(hero.skills);
      }
    })
}

function renderSkills(skills){
    document.querySelector(".skillsView").innerHTML = "";
    skills.forEach(skill=>{
        let img = document.createElement("img");
        img.src = skill.ico;
        document.querySelector(".skillsView").appendChild(img);
    })
}