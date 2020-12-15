/* eslint-disable jsx-a11y/alt-text */
import img4 from "../img/img4.png"
import img_1 from "../img/img_1.png";
import img_2 from "../img/img_2.png";

export default function Index() {
  return (
    <>
      <img src={img4} class="banner" />
      <div class="wrap">
        <img src={img_1} />
        <img src={img_2} />
      </div>
    </>
  );
}
