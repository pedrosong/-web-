{
    loadAnmt();
	
	// 3D适配
	let view = document.querySelector("#view");
	let main = document.querySelector(".main");
	let deg = 52.5;
	toSize();
	window.addEventListener("resize",toSize);
	window.addEventListener("orientationchange",toSize);
	function toSize(){
		let h = window.innerHeight;
		let R = Math.tan(deg*Math.PI/180)*(h/2);
		view.style.perspective = R + "px";
		css(main,"translateZ",R);
	}
}
// 图片预加载
function loadAnmt(){
    let loading1 = document.querySelector("#loading-1");
    let img = [];
    let loading1Text = loading1.querySelector(".loadText")
    for(let s in imgData){
        img=[...img,...imgData[s]]
    }
    let nub = 0;// 已经加载了几张图
    img.forEach(src=>{
        let newImg = new Image;
        newImg.onload = ()=>{
            nub++;
            loading1Text.innerHTML = `已加载 ${Math.round(nub/img.length*100)} %`;
            if(nub >= img.length){
                loading1.addEventListener("transitionend",()=>{
                    //console.log("开始执行下一个动画");
                    loadAnmt2();
                });
                loading1.style.opacity = "0";
            }
        };
        newImg.src = src;
    });   
}
function loadAnmt2(){
    let loading2 = document.querySelector("#loading-2");
    loading2.addEventListener("animationend",()=>{
        loading2.classList.remove('loadimg-show');
        loadAnmt3()
    });
    loading2.classList.add('loadimg-show');
}
function loadAnmt3(){
    let loading3 = document.querySelector("#loading-3");
    loading3.addEventListener("animationend",()=>{
        loading3.classList.remove('loadimg-show');
        loadAnmt4();
    });
    loading3.classList.add('loadimg-show');
}

function loadAnmt4(){
    let loading = document.querySelector("#loading-4");
    let loadicos = loading.querySelector(".loadicos");
    let length = 27;
    let icons = imgData["logoIco"];
    for(let i = 0; i < length; i++){
        let span = document.createElement("span");
        let z = Math.random()*200 + 30;
        let degY = i*360/9 + ((Math.random()-.5)*20);
        let y = Math.random()*360 - 180;
        let degX = Math.random() * 360;
        span.style.backgroundImage = `url(${icons[i%icons.length]})`;
        span.style.transform = `rotateX(${degX}deg) translateY(${y}px) rotateY(${degY}deg) translateZ(${z}px)`;
        loadicos.appendChild(span);
    }
    loading.addEventListener("animationend",()=>{
        loading.classList.remove('loading-4-show');
        loadend();
    });
    loading.classList.add('loading-4-show');
}
// loading 动画完结，开始圆柱入场
function loadend(){
	let logos = document.querySelectorAll(".logo");
	let tz = document.querySelector(".tz");
    logos.forEach(logo=>{
        logo.remove();   
	});
	createCloud();
	css(tz,"translateZ",-2000);
	mTween({
		el: tz,
		duration: 3000,
		attr: {
			translateZ: -160
		},
		fx: "easeBoth"
	});
	setTimeout(()=>{
		createPanoBg();
		anmtPanoBg();
	},500);
	setTimeout(()=>{
		createPano();
		anmtPano();
	},2400);
}



// 创建背景
function createPanoBg(){
    let panoBg = document.querySelector(".pano-bg");
    let {bg} = imgData;
    let outDeg = 360/bg.length;
    let innerDeg = (180 - outDeg)/2;
    let w = 129;
    let R = Math.tan(innerDeg*Math.PI/180)*(w/2);
    panoBg.innerHTML = bg.map((item,index)=>{
        return `<span style="background:url(${item});transform:rotateY(${180 - index*outDeg}deg) translateZ(-${R}px)"></span>`;
    }).join("");
}

// 背景圆柱的出场动画

function anmtPanoBg(){
	let panoBg = document.querySelector(".pano-bg");
	let panoBgs = panoBg.querySelectorAll("span");
	let timer = 0;
	let nub = 0;
	css(panoBg,"rotateX",0);
	css(panoBg,"rotateY",-650);
	timer = setInterval(()=>{
		css(panoBgs[nub++],"display","block");
		if(nub == panoBgs.length){
			clearInterval(timer);
		}
	},50);
	mTween({
		el: panoBg,
		duration: 2600,
		attr: {
			rotateY: 25
		},
		fx: "linear"
	});
}

// 创建云朵
function createCloud(){
    let cloudWrap = document.querySelector(".cloud");
	let {cloud} = imgData;
    for(let i = 0; i < 9; i++){
        let newCloud = document.createElement("span");
        let R = 200 + Math.random()*150;
        let deg = i*360/9;
        let x = Math.cos(deg*Math.PI/180)*R;
        let y = (Math.random()-.5)*150; 
        let z = Math.sin(deg*Math.PI/180)*R;
        newCloud.style.cssText = `
            background: url(${cloud[i%cloud.length]});
            display: none;
        `;
        css(newCloud,"translateX",x);
        css(newCloud,"translateY",y);
        css(newCloud,"translateZ",z);
        css(newCloud,"rotateY",0);
        cloudWrap.appendChild(newCloud);
	}
	anmtCloud();
}
// 云朵出场动画
function anmtCloud(){
    let cloudWrap = document.querySelector(".cloud");
	let cloud = cloudWrap.querySelectorAll("span");
	let timer = 0;
	let nub = 0;
	css(cloudWrap,"translateZ",0);
	css(cloudWrap,"rotateY",0);
	timer = setInterval(()=>{
		css(cloud[nub++],"display","block");
		if(nub == cloud.length){
			clearInterval(timer);
		}
	},50);
	mTween({
		el: cloudWrap,
		attr: {
			translateZ: -400,
			rotateY: 540
		},
		duration: 2600,
		fx: "linear",
		moveing(){
			let deg = css(cloudWrap,"rotateY");
			cloud.forEach(item=>{
				css(item,"rotateY",-deg);
			});
		},
		cb(){
			cloudWrap.parentNode.removeChild(cloudWrap);
		}
	})
}

/* 生成漂浮层 */
function createPano(){
	var pano = document.querySelector('.pano');
	var deg = 18;
	var R = 406;
	var nub = 0;
	var startDeg = 180;
	var pano1 = document.createElement("div");
	pano1.className = "pano-item";
	css(pano1,"translateX",1.564);
	css(pano1,"translateZ",-9.877);
	for(var i = 0; i < 2; i++){
		var span = document.createElement("span");
		span.style.cssText = "height:344px;margin-top:-172px;";
		span.style.background = "url("+imgData.pano[nub]+")";
		css(span,"translateY",-163);
		css(span,"rotateY",startDeg);
		css(span,"translateZ",-R);
		nub++;
		pano1.appendChild(span);
		startDeg -= deg;
	}
	pano.appendChild(pano1);

	var pano2 = document.createElement("div");
	pano2.className = "pano-item";
	css(pano2,"translateX",20.225);
	css(pano2,"translateZ",-14.695);
	for(var i = 0; i < 3; i++){
		var span = document.createElement("span");
		span.style.cssText = "height:326px;margin-top:-163px;";
		span.style.background = "url("+imgData.pano[nub]+")";
		css(span,"translateY",278);
		css(span,"rotateY",startDeg);
		css(span,"translateZ",-R);
		nub++;
		pano2.appendChild(span);
		startDeg -= deg;
	}
	pano.appendChild(pano2);

	var pano3 = document.createElement("div");
	pano3.className = "pano-item";
	css(pano3,"translateX",22.275);
	css(pano3,"translateZ",-11.35);
	for(var i = 0; i < 4; i++){
		var span = document.createElement("span");
		span.style.cssText = "height:195px;margin-top:-97.5px;";
		span.style.background = "url("+imgData.pano[nub]+")";
		css(span,"translateY",192.5);
		css(span,"rotateY",startDeg);
		css(span,"translateZ",-R);
		nub++;
		pano3.appendChild(span);
		startDeg -= deg;
	}
	pano.appendChild(pano3);

	var pano4 = document.createElement("div");
	startDeg = 90;
	css(pano4,"translateX",20.225);
	css(pano4,"translateZ",14.695);
	pano4.className = "pano-item";
	for(var i = 0; i < 5; i++){
		var span = document.createElement("span");
		span.style.cssText = "height:468px;margin-top:-234px;";
		span.style.background = "url("+imgData.pano[nub]+")";
		css(span,"translateY",129);
		css(span,"rotateY",startDeg);
		css(span,"translateZ",-R);
		nub++;
		pano4.appendChild(span);
		startDeg -= deg;
	}
	pano.appendChild(pano4);

	var pano5 = document.createElement("div");
	startDeg = 18;
	css(pano5,"translateX",-11.35);
	css(pano5,"translateZ",22.275);
	pano5.className = "pano-item";
	for(var i = 0; i < 6; i++){
		var span = document.createElement("span");
		span.style.cssText = "height:582px;margin-top:-291px;";
		span.style.background = "url("+imgData.pano[nub]+")";
		css(span,"translateY",256);
		css(span,"rotateY",startDeg);
		css(span,"translateZ",-R);
		nub++;
		pano5.appendChild(span);
		startDeg -= deg;
	}
	pano.appendChild(pano5);

	var pano6 = document.createElement("div");
	startDeg = 18;
	css(pano6,"translateX",-4.54);
	css(pano6,"translateZ",8.91);
	pano6.className = "pano-item";
	for(var i = 0; i < 6; i++){
		var span = document.createElement("span");
		span.style.cssText = "height:444px;margin-top:-222px;";
		span.style.background = "url("+imgData.pano[nub]+")";
		css(span,"translateY",-13);
		css(span,"rotateY",startDeg);
		css(span,"translateZ",-R);
		nub++;
		pano6.appendChild(span);
		startDeg -= deg;
	}
	pano.appendChild(pano6);
}

/* 漂浮层出场动画 */
function anmtPano(){
	var pano = document.querySelector('.pano');
	css(pano,"rotateX",0);
	css(pano,"rotateY",-180);
	css(pano,"scale",0);
	mTween({
		el: pano,
		attr: {
			rotateY: 25,
			scale: 1
		},
		duration: 1200,
		cb(){
			anmtPageBg();
		}
	});
}


function anmtPageBg(){
	let pageBg = document.querySelector("#pageBg");
	css(pageBg,"opacity",1);
}