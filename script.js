const nav=document.getElementById("nav");
const solidify=()=>nav.classList.toggle("solid",window.scrollY>40);
window.addEventListener("scroll",solidify,{passive:true});
solidify();

document.querySelectorAll(".faq-q").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const item=btn.closest(".faq-item");
    const was=item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach(i=>i.classList.remove("open"));
    if(!was)item.classList.add("open");
  });
});

(function(){
  const cvs=document.getElementById("cvs");
  const ctx=cvs.getContext("2d");
  const COLORS=["#ec3750","#ff8c37","#33d6a6","#338eda","#a633d6","#f1c40f"];
  let W,H,dpr,pts=[];
  const N=55;
  function resize(){
    dpr=window.devicePixelRatio||1;
    W=window.innerWidth;H=window.innerHeight;
    cvs.width=W*dpr;cvs.height=H*dpr;
    cvs.style.width=W+"px";cvs.style.height=H+"px";
    ctx.scale(dpr,dpr);
  }
  function rand(a,b){return a+Math.random()*(b-a)}
  function init(){
    pts=[];
    for(let i=0;i<N;i++){
      pts.push({x:rand(0,W),y:rand(0,H),vx:rand(-.25,.25),vy:rand(-.25,.25),r:rand(1,2.2),col:COLORS[Math.floor(Math.random()*COLORS.length)],a:rand(.2,.6)});
    }
  }
  function h2(n){return Math.round(n*255).toString(16).padStart(2,"0")}
  function frame(){
    ctx.clearRect(0,0,W,H);
    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<110){
          ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);
          ctx.strokeStyle="rgba(132,146,166,"+(.15*(1-d/110))+")";ctx.lineWidth=.5;ctx.stroke();
        }
      }
    }
    pts.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;
      if(p.y<0)p.y=H;if(p.y>H)p.y=0;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.col+h2(p.a);ctx.fill();
    });
    requestAnimationFrame(frame);
  }
  resize();init();frame();
  window.addEventListener("resize",()=>{resize();init()});
})();
