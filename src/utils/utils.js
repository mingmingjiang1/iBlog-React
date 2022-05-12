export function preProcess(url) {
    const o = url.replace('/pics', '').replace('/static', '');
    return o;
}

export function formatTime() {
    const date=new Date();
    
    if(date.getHours()>=0 && date.getHours() < 12){
    
        return "上午好";
    
    } else if (date.getHours()>=12 && date.getHours() < 18){
    
        return "下午好";
    
    } else {
        return "晚上好";
    }
}

const updateTime = 1000 / 60  //设定动画为每秒60帧
const rAF = window.requestAnimationFrame || function(cb) {
  setTimeout(cb, updateTime)
}

export function animate (startValue, endValue, during, easingFunc, stepCb) {
  const changeValue = endValue - startValue
  const updateCount = during / updateTime
  const perUpdateDistance = 1 / updateCount
  let position = 0

  return new Promise(resolve => {
    function step () {
      const state = startValue + changeValue * easingFunc(position)
      stepCb(state)
      position += perUpdateDistance
      if (position < 1) {
        rAF(step)
      } else {
        resolve()
      }
    }
    step()
  })
}

const c4 = (2 * Math.PI) / 3
export function easeOutElastic (x) {
  return x === 0 ? 0 : x === 1 ? 1 :
    Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1
}