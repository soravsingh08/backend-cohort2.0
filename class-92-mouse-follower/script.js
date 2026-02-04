const mouseFollower =  document.querySelector(".mouse-follower")
addEventListener("mousemove",(e)=>{
   const {clientX, clientY} = e
   
   mouseFollower.style.top = clientY + "px"
   mouseFollower.style.left = clientX + "px"
})