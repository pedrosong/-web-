import { Application } from "pixi.js";

export const game = new Application({
  width: 750,
  height: 1080,
});

document.body.append(game.view);

// 需要返回一个根容器
export function getRootContainer() {
  // eslint-disable-next-line no-debugger
  debugger;
  return game.stage;
}
