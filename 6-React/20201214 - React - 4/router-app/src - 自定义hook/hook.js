// function getScroll() {
//   return window.scrollY;
// }

import { useEffect, useState } from "react";

function useScroll() {
    const [Y,setY] = useState(0);
    useEffect(()=>{
      setY(window.scrollY);
      window.onscroll = ()=>{
          setY(window.scrollY);
      };
      return ()=>{
        window.onscroll = null;
      }
    },[]); 
    return [Y,(Y)=>{
      window.scrollTo(0,Y);
      setY(Y);
    }];
}

export {useScroll};