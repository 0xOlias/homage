const drawSquare = (coords, params, context) => {
  const { parentTopLeftX, parentTopLeftY, parentSideLength } = coords;
  const { centerX, centerY, step, tension, deviation } = params;

  let topLeftX;
  let topLeftY;
  let sideLength;
  let h = Math.random() * 360;
  let s = Math.random() * 100;
  let l = Math.random() * 100;
  let m = centerY / centerX;

  topLeftX = parentTopLeftX + step + deviation;
  topLeftY = topLeftX * m + deviation;
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

const draw = () => {
  const context = document.getElementById("c").getContext("2d");

  // get params, some random
  const params = {
    centerX: 150 + Math.random() * 340,
    centerY: 150 + Math.random() * 340,
    step: 20 + Math.random() * 55,
    tension: 15 + Math.random() * 15,
    deviation: Math.random() * 10,
  };

  topLeftX = 0;
  topLeftY = 0;
  sideLength = 640;
  let h = Math.random() * 360;
  let s = 10 + Math.random() * 55;
  let l = 35 + Math.random() * 35;

  context.fillStyle = `hsl(${h}, ${s}%, ${l}%)`;
  context.fillRect(topLeftX, topLeftY, sideLength, sideLength);

  const coords = {
    parentTopLeftX: topLeftX,
    parentTopLeftY: topLeftY,
    parentSideLength: sideLength,
  };

  // start recursive shit
  drawSquare(coords, params, context);
};

window.addEventListener("load", draw);
