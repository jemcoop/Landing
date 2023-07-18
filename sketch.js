let img;
let scaleFactor = 0.05; // Adjust this value to change the size of the image (60% smaller)
let x, y;
let dx, dy;
let navbarText;
let navbarTextX;
let textTimer;
let navbarTextWidth;

function preload() {
  img = loadImage('JClogo.png');
  MontserratSB = loadFont('Montserrat-SemiBold.ttf');
}

function setup() {
  createCanvas(375, 667); // Set canvas size to match iPhone dimensions (iPhone 6/7/8)
  x = width / 2;
  y = height / 2;
  dx = random(-2, 2);
  dy = random(-2, 2);

  navbarText = "Take a breath with me                       Inhale                     Exhale"; // Updated scrolling text
  navbarTextX = width;
  textFont(MontserratSB);
  textSize(15);
  navbarTextWidth = textWidth(navbarText);

  textTimer = millis();
}

function draw() {
  const m = 100;

  const topR = 150 + 105 * noise(frameCount / m);
  const topG = 200 + 55 * noise(1000 + frameCount / m);
  const topB = 255 + 55 * noise(2000 + frameCount / m);
  const bottomR = 0 + 100 * noise(3000 + frameCount / m);
  const bottomG = 0 + 100 * noise(4000 + frameCount / m);
  const bottomB = 100 + 55 * noise(5000 + frameCount / m);

  const topColor = color(topR, topG, topB);
  const bottomColor = color(bottomR, bottomG, bottomB);

  background(220); // Clear the background

  // Draw the background gradient
  for (let y = 0; y < height; y++) {
    const lineColor = lerpColor(topColor, bottomColor, y / height);
    stroke(lineColor);
    line(0, y, width, y);
  }

  const imgWidth = img.width * scaleFactor;
  const imgHeight = img.height * scaleFactor;

  x += dx;
  y += dy;

  if (x + imgWidth / 2 >= width || x - imgWidth / 2 <= 0) {
    dx *= -1;
  }

  if (y + imgHeight / 2 >= height || y - imgHeight / 2 <= 0) {
    dy *= -1;
  }

  // Draw the logo
  image(img, x - imgWidth / 2, y - imgHeight / 2, imgWidth, imgHeight);

  // Draw the navbar
  fill(219, 225, 32);
  noStroke();
  rect(0, 0, width, 30); // Adjusted navbar size

  // Draw the scrolling text in the navbar
  fill(255);
  textSize(15); // Set navbar text size to 15
  text(navbarText, navbarTextX, 22); // Adjusted text position
  navbarTextX -= 0.4; // Adjust the scrolling speed by changing the decrement value

  if (navbarTextX < -navbarTextWidth + width) {
    navbarTextX = width; // Reset the position when text goes off-screen
  }

  // Draw the main text with pulsing effect
  const currentTime = millis() - textTimer;
  const pulseSize = map(sin(currentTime * 0.001), -1, 1, 0, 5); // Adjust the pulsing intensity

  textSize(30 + pulseSize); // Set main text size with pulsing effect
  textAlign(CENTER);
  fill(35, 63, 137); // Navy text
  text("Jemaine Cooper", width / 2, height / 2 - 30);
  text("Coming Soon", width / 2, height / 2 + 30);
}
