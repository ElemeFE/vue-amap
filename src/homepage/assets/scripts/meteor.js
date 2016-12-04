window.meteor = function() {
  let stars = [];
  let starNum = 5;
  let width = 900;
  let height = 321;

  let ele = document.getElementById('meteor');
  if (!ele) return;
  let ctx = ele.getContext('2d');

  ele.setAttribute('height', height);
  ele.setAttribute('width', width);

  let setStar = function(index) {
    stars[index] = [
      Math.random() * width, Math.random() / 10 * height,
      (Math.random() * 20 + 80) / 100,
      (Math.random() + 1) / 2 * 6,
      Math.sin(Math.random() * Math.PI / 8)
    ];

    return stars[index];
  };

  let descending = function(former, latter) {
    return latter[0] - former[0];
  };

  let reqAnimFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || window.requestAnimationFrame;

  let animate = function() {
    reqAnimFrame(animate);

    let i, j, k, l, newX, newY, p, randomYDiff, ratio, ref, ref1, speed;
    ctx.clearRect(0, 0, width, height);
    for (i = j = 0, ref = starNum; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) { //eslint-disable-line
      if (stars[i] == null) {
        setStar(i);
      }
      if (!(stars[i][0] < width && stars[i][1] < height)) {
        setStar(i);
      }
      ratio = stars[i][4];
      speed = stars[i][3];
      newX = stars[i][0] += speed * ratio;
      newY = stars[i][1] += speed;
      randomYDiff = stars[i][2];
      for (p = k = 0; k <= 100; p = ++k) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(97,124,160,' + (1 - p / 100) + ')';
        ctx.moveTo(newX - randomYDiff * p * ratio, newY - randomYDiff * p);
        ctx.lineTo(newX - randomYDiff * (p - 1) * ratio, newY - randomYDiff * (p - 1));
        ctx.stroke();
      }
    }
    stars.sort(descending);
    for (i = l = 0, ref1 = starNum - 1; 0 <= ref1 ? l < ref1 : l > ref1; i = 0 <= ref1 ? ++l : --l) { //eslint-disable-line
      if (Math.abs(stars[i][0] - stars[i + 1][0]) < 3) {
        if (Math.abs(stars[i][1] - stars[i + 1][1]) < 3) {
          setStar(i);
          setStar(i + 1);
        }
      }
    }
  };
  animate();
};
