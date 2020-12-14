import img from "../img.jpg";
// const img2 = require("../img.jpg");
// console.log(img2);
function AboutDetailsPage() {
  return <div>
      <h1>关于 - 详情</h1>
      <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1558015471,1702835840&fm=26&gp=0.jpg" />
      {/* <img src={require("../img.jpg").default} /> */}
      <img src={img} />
  </div>
}

export default AboutDetailsPage;