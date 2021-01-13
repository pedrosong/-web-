export default class Ball{
  constructor(r=20,color='#00acec'){
    this.r=r
    this.color=color
    this.x=0
    this.y=0
  }
  draw(ctx){
    const {x,y,r,color}=this;
    ctx.save()
    ctx.fillStyle=color
    ctx.beginPath()
    ctx.arc(x,y,r,0,Math.PI*2)
    ctx.fill()
    ctx.restore()

  }
}