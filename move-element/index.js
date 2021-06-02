window.onload = function () {
  var root = document.getElementById('root');
  var isMove = false;

  var handleMouseDown = (event) => {
    isMove = true;
  };

  var handleMouseUp = (event) => {
    isMove = false;
  };

  var handleMouseMove = (event) => {
    if (isMove) {
      root.style.left = event.clientX;
      root.style.top = event.clientY;
    }
  };

  window.addEventListener('mousemove', handleMouseMove);
  root.addEventListener('mousedown', handleMouseDown);
  root.addEventListener('mouseup', handleMouseUp);
};
