
const startImageNumber = 1000;
const imageCount = 299;
const lastImageNumber = startImageNumber + imageCount;

let canvas,
  ctx,
  image,
  timer,
  count = startImageNumber;


const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

startBtn.addEventListener("click", function () {
  start();
});

stopBtn.addEventListener("click", function () {
  stop();
});

resetBtn.addEventListener("click", function () {
  reset();
});

function start() {
  image = new Image();
  canvas = document.getElementById("image-sequence");
  ctx = canvas.getContext("2d");
  animate();
}

function animate() {
  count++;

  image.src = `assets/images/dreamer_${count}.jpg`;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  };
  timer = setTimeout(animate, 10);

  if (count === lastImageNumber) {
    stop();
  }
}

function stop() {
  count = startImageNumber;
  clearTimeout(timer);
}

function reset() {
  count = startImageNumber;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Scroll Image Sequence

let scrollCanvas,
  scrollCtx,
  scrollImage, 
  scrollCount = startImageNumber, 
  lastScrollTop = 0,
  positionSet = false,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;

function scrollAnimate(direction) {
  scrollImage = new Image();
  scrollCanvas = document.getElementById('scroll-image-sequence');
  scrollCtx = scrollCanvas.getContext("2d");

  if(direction === 'down') {
    if(scrollCount === lastImageNumber) {
      // scrollCanvas.style.position = 'relative';
      // if(!positionSet) {
      //   scrollCanvas.style.top = (scrollTop -720) + 'px';
      //   positionSet = true;
      // }
      return;
    }
    scrollCount++;
  } else {
    if(scrollCount === startImageNumber) {
      return;
    }
    // if(isInView('#scroll-image-sequence')) {
    //   scrollCanvas.style.position = 'sticky';
    //   if(positionSet) {
    //     scrollCanvas.style.top = 0 + 'px';
    //     if(scrollCount === startImageNumber) {
    //       positionSet = false;
    //     }

    //   }

    // }
    scrollCount--;
  }

  scrollImage.src = `assets/images/dreamer_${scrollCount}.jpg`;
  scrollImage.onload = function () {
    scrollCtx.drawImage(scrollImage, 0, 0, scrollCanvas.width, scrollCanvas.height);
  };
}

window.addEventListener("scroll", function() {
   scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  //  if(!isInView('#scroll-image-sequence')) {
  //   return;
  //  }
   if (scrollTop > lastScrollTop) {
      scrollAnimate('down');
   } else {
      scrollAnimate('up');
   }
   lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);


function isInView(selector) {
  const el = document.querySelector(selector); 
  const rect = el.getBoundingClientRect();

  const isInViewport = rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth);

  return isInViewport;
}