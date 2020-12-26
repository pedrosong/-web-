# 移动端事件
## 本节课目标
- 掌握 touchEvent
- 实现移动端幻灯片
- 初步认识 better-scroll

## 本节课知识点
- 移动端touch事件 
  - touchstart
  - touchmove
  - touchend
  - touch 事件 和 mouse 事件的区别
  - 事件点透
    - mouse 事件的延迟问题
  - 阻止默认事件
    - 阻止 touchstart 事件带来的影响
    - 阻止 touchmove 事件带来的影响
- TouchEvent 对象详解
  - touches
  - targetTouches
  - changedTouches
- 案例：移动端滑屏切换的幻灯片
- better-scroll 使用
https://better-scroll.github.io/docs/zh-CN/

## anywhere 
提供了一个 node 服务器
安装：npm i anywhere -g
使用，在当前目录下，使用命令行 anywhere

## better-scroll 2.x:

安装：
基础功能：
安装better-scroll 的所有代码：npm i @better-scroll
/*
  import BScroll from '@better-scroll/core'
  import Slide from '@better-scroll/slide'
*/
安装better-scroll 的核心代码： npm i @better-scroll/core

## 下次课内容
- orientationchange
- devicemotion 监听手机加速度发生变化
- 函数防抖和函数节流
- 摇一摇功能实现


## 本节课练习
任务1：参加直播课，学习时长需>=60%
任务2：
    基于 Better-scroll 完成幻灯片纵向切换效果
    1. 滑屏切换图片
    2. 图片无缝切换 
    3. 要求添加自动播放，手指摁下阻止自动播放，手指抬起继续自动播放
通过标准：完成以上所有任务及要求，方可通过。备注：允许有逻辑错误，不允许有语法错误























