const drawSquare = (coords, params, context) => {
  const { parentTopLeftX, parentTopLeftY, parentSideLength } = coords;
  const { centerX, centerY, step, tension } = params;

  let topLeftX;
  let topLeftY;
  let sideLength;
  let h = Math.random() * 360;
  let s = Math.random() * 100;
  let l = Math.random() * 100;
  let m = centerY / centerX;
  let deviation = Math.random() * 15;

  topLeftX = parentTopLeftX + step - deviation;
  topLeftY = topLeftX * m - deviation;
  sideLength = parentSideLength * 0.8;

  console.log("bout to draw", {
    parentTopLeftX,
    parentTopLeftY,
    topLeftX,
    topLeftY,
    sideLength,
  });

  // if theres a collision, stop
  if (
    parentTopLeftX + parentSideLength < topLeftX + sideLength ||
    parentTopLeftY + parentSideLength < topLeftY + sideLength ||
    //sideLength < 100 ||
    parentTopLeftX + parentSideLength - topLeftX - sideLength < tension ||
    parentTopLeftY + parentSideLength - topLeftY - sideLength < tension
    // parentTopLeftX + tension <= topLeftX
    // parentTopLeftY + tension < topLeftY
  ) {
    return;
  }

  context.fillStyle = `hsl(${h}, ${s}%, ${l}%)`;
  context.fillRect(topLeftX, topLeftY, sideLength, sideLength);

  drawSquare(
    {
      parentTopLeftX: topLeftX,
      parentTopLeftY: topLeftY,
      parentSideLength: sideLength,
    },
    params,
    context
  );
};

const drawInitialSquare = (params, context) => {
  const { maxSideLength } = params;

  let topLeftX = 0;
  let topLeftY = 0;
  let h = Math.random() * 360;
  let s = 10 + Math.random() * 55;
  let l = 35 + Math.random() * 35;

  context.fillStyle = `hsl(${h}, ${s}%, ${l}%)`;
  context.fillRect(topLeftX, topLeftY, maxSideLength, maxSideLength);

  return {
    parentTopLeftX: topLeftX,
    parentTopLeftY: topLeftY,
    parentSideLength: maxSideLength,
  };
};

const draw = () => {
  const canvas = document.getElementById("c");
  const context = canvas.getContext("2d");

  const params = {
    maxSideLength: 640,
    centerX: 150 + Math.random() * 340,
    centerY: 150 + Math.random() * 340,
    step: 20 + Math.random() * 55,
    tension: 15 + Math.random() * 15,
    // deviation: Math.random() * 10,
  };

  const coords = drawInitialSquare(params, context);

  drawSquare(coords, params, context);
};

window.addEventListener("load", draw);
