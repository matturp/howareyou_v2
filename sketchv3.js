var gui;
var gui2;
var Mood = 0;
var MoodMin = -10;
var MoodMax = 10;
var MoodStep = 1;
var Interest = 0;
var InterestMin = -10;
var InterestMax = 10;
var InterestStep = 1;
var Appetite = 0;
var AppetiteMin = -10;
var AppetiteMax = 10;
var AppetiteStep = 1;
var Brain_Fog = false;
var Energy = 0;
var EnergyMin = -10;
var EnergyMax = 10;
var EnergyStep = 1;
var Self_Worth = 0;
var Self_WorthMin = -10;
var Self_WorthMax = 10;
var Self_WorthStep = 1;
var Physical_Slowness;
var Suicidal_Ideation = false;
var Insomnia = false;
var Irritability = 0;
var Anxiety = 0;
var Physical_Pain = 0;
var Night = false;
var Day = true;
var Notes = '';
var txtFont;

let button;
let button2;
var wave, wave2, wave3, wave4, wave5, wave6, wave7, wave8, wave9, wave10, wave11;
var playing;
// var env;

function preload(){
  txtFont = loadFont('assets/IBM_Plex_Mono/IBMPlexMono-Regular.ttf');
}


function setup() {
  createCanvas(900, 900);
  textFont(txtFont);

  // GUI ELEMENTS

  button = createButton('Download Pictogram');
  button.position(1050, 850);
  button.mousePressed(downloadImage);
  button.touchEnded(downloadImage);

  gui = createGui('How are you?').setPosition(1050, 220);
  sliderRange(0, 10, 1);
  gui.addGlobals('Mood', 'Interest', 'Energy', 'Appetite', 'Self_Worth', 'Physical_Pain', 'Irritability', 'Anxiety', 'Insomnia', 'Suicidal_Ideation', 'Brain_Fog', 'Notes');

  gui2 = createGui('Time of Day').setPosition(1050, 100);
  gui2.addGlobals('Day', 'Night');

  // AUDIO ELEMENTS

  // env = new p5.Env();
  // env.setADSR(0.5, 0.25, 0.5, 0.1);
  // env.setRange(0.8,0); 

  wave = new p5.Oscillator();
  wave2 = new p5.Oscillator();
  wave3 = new p5.Oscillator();
  wave4 = new p5.Oscillator();
  wave5 = new p5.Oscillator();
  wave6 = new p5.Oscillator();
  wave7 = new p5.Oscillator();
  wave8 = new p5.Oscillator();
  wave9 = new p5.Oscillator();
  wave10 = new p5.Oscillator();
  wave11 = new p5.Oscillator();

  button2 = createButton('Audio');
  button2.position(1050,900);
  button2.mousePressed(toggle);
}

function draw() {
  background(255);
  strokeWeight(15);

  // COLOURS

  let black = color('#001219');
  let nightBlue = color('#003440');
  let darkBlue = color('#005f73');
  let green = color('#0a9396');
  let lightBlue = color('#94d2bd');
  let cream = color('#e9d8a6');
  let yellow = color('#ee9b00');
  let orange = color('#ca6702');
  let burntOrange = color('#bb3e03');
  let red = color('#ae2012');
  let wine = color('#9b2226');


  // NOTES

  let D2 = 73;
  let D3 = 146;
  let D4 = 293;

  let E2 = 82;
  let E3 = 164;
  let E4 = 329;

  let F2 = 87;
  let F3 = 174;
  let F4 = 349;

  let Fs2 = 92;
  let Fs3 = 185;
  let Fs4 = 369;

  let G2 = 98;
  let G3 = 196;
  let G4 = 392;

  let A2 = 110;
  let A3 = 220;
  let A4 = 440;

  let Bf2 = 116;
  let Bf3 = 233;
  let Bf4 = 466;

  let B2 = 123;
  let B3 = 246;
  let B4 = 493;

  let C2 = 65;
  let C3 = 130;
  let C4 = 261;

  let Cs2 = 69;
  let Cs3 = 138;
  let Cs4 = 277;

  // MOVMENT WAVES

  let sinWave = sin(radians(frameCount));
  let cosWave = cos(radians(frameCount));
  let tanWave = tan(radians(frameCount));

  // SHAPES

  // TIME OF DAY
  if ((Night === true) && (Day === false)) {
    //filter(INVERT);
    background(nightBlue);
  }

  // MOOD
  push();
  translate(width / 2, height / 2);
  var moodAmount = map(Mood, -10, 10, 180, 0);
  rotate(radians(moodAmount));
  noStroke();
  var moodColAmt = map(Mood, -10, 10, 1, 0);
  var moodCol = lerpColor(cream, darkBlue, moodColAmt);
  fill(moodCol);
  translate(Mood * tanWave * 10, Mood * cosWave * 10);
  triangle(148 - width / 2, 625 - height / 2, 450 - width / 2, 100 - height / 2, 752 - width / 2, 625 - height / 2);

  var moodWave = map(Mood,-10,10,D2,D4);
  wave.freq(moodWave);
  wave.amp(0.5,1);
  pop();

  // PHYSICAL PAIN
  push();
  var painAmount = map(Physical_Pain, 0, 10, 0, 255);
  noStroke();
  fill(187, 62, 3, painAmount);
  var painMoveX = Physical_Pain*random(-10,10);
  var painMoveY = Physical_Pain*random(-10,10);
  translate(painMoveX,painMoveY);
  beginShape();
  vertex(450, 200);
  vertex(525, 275);
  vertex(625, 275);
  vertex(625, 377);
  vertex(697, 450);
  vertex(625, 525);
  vertex(625, 625);
  vertex(525, 625);
  vertex(450, 700);
  vertex(375, 625);
  vertex(275, 625);
  vertex(275, 525);
  vertex(200, 450);
  vertex(275, 375);
  vertex(275, 275);
  vertex(375, 275);
  vertex(450, 200);
  endShape();

  var painWave = map(Physical_Pain,0,10,0,0.5);
  wave2.freq(E3);
  wave2.amp(painWave, 1);
  pop();

  // ENERGY
  push();
  var energyAmount = map(Energy, -10, 10, 0, 1);
  var energyColor = lerpColor(wine, green, energyAmount);
  //fill(155,34,38, energyAmount);
  fill(energyColor);
  noStroke();
  ellipse(width / 2, height / 2, 300 + (sinWave*Energy)*10, 300 + (sinWave*Energy)*10);

  var energyWave = map(Energy, -10, 10, Fs2, Fs4);
  wave3.freq(energyWave);
  wave3.amp(0.5,1);
  pop();

  // INTEREST
  beginShape();
  stroke(black);
  noFill();
  vertex(275 - (sinWave*Interest)*10, 450 - Interest * 25);
  vertex(450, 450 - Interest * 40);
  vertex(625 + (sinWave*Interest)*10, 450 - Interest * 25);

  var interestWave = map(Interest,-10,10,G2,G4);
  wave4.freq(interestWave);
  wave4.amp(0.5,1);
  endShape();

  // APPETITE
  push();

  if (Appetite === 0) {
    noStroke();
  } else {
    var appetiteAmt = map(Appetite, -10, 10, 0, 1);
    var appetiteColor = lerpColor(green, yellow, appetiteAmt);
    stroke(appetiteColor);
  }

  rotate(radians(Appetite*sinWave));

  beginShape(POINTS);
  vertex(106, 106);
  vertex(146, 106);
  vertex(187, 106);
  vertex(228, 106);
  vertex(268, 106);

  vertex(106, 147);
  vertex(146, 147);
  vertex(187, 147);
  vertex(228, 147);
  vertex(268, 147);

  vertex(106, 188);
  vertex(146, 188);
  vertex(187, 188);
  vertex(228, 188);
  vertex(268, 188);

  vertex(106, 229);
  vertex(146, 229);
  vertex(187, 229);
  vertex(228, 229);
  vertex(268, 229);

  vertex(106, 270);
  vertex(146, 270);
  vertex(187, 270);
  vertex(228, 270);
  vertex(268, 270);
  endShape();

  var appetiteWave = map(Appetite,-10,10,A2,A4);
  wave5.freq(appetiteWave);
  wave5.amp(0.5,1);
  pop();


  // SELF_WORTH
  push();
  if (Self_Worth === 0) {
    noStroke();
  } else {
  }

  if (Self_Worth < 0) {
    var worthAmount = map(Self_Worth, -10, 0, 255, 0);
    stroke(0, 18, 25, worthAmount);
    translate(sinWave * Self_Worth * 10,0);
    line(100, 625, 275, 800);
    translate(cosWave * Self_Worth * 20,0);
    line(100, 800, 275, 625);
  }

  if (Self_Worth > 0) {
    var worthAmount2 = map(Self_Worth, 0, 10, 0, 255);
    stroke(0, 18, 25, worthAmount2);
    //line(100,700,150,800);
    //line(150,800,275,625);
    translate(0,sinWave * Self_Worth * 10);
    line(187, 600, 187, 825);
    line(75, 712, 300, 712);
  }

  var worthWave = map(Self_Worth,-10,10,B2,B4);
  wave6.freq(worthWave);
  wave6.amp(0.5,1);
  pop();

  // IRRITABILITY
  push();
  if (Irritability === 0) {
    noStroke();
  } else {
    var irrColAmt = map(Irritability, 0, 10, 0, 1);
    var irrColor = lerpColor(cream, wine, irrColAmt);
    stroke(irrColor);
  }
  noFill();
  var irrAmount = map(Irritability, 0, 10, 0, -180);
  arc(625, 167, 80, 80, radians(irrAmount / 2) * sinWave, PI + radians(irrAmount / 2));
  arc(705, 167, 80, 80, PI + radians(irrAmount / 2) * cosWave, radians(irrAmount / 2));

  var irrWave = map(Irritability,0,10,0,0.5);
  wave7.freq(Cs3);
  wave7.amp(irrWave,1);
  pop();

  // ANXIETY
  push();
  noFill();
  if (Anxiety === 0) {
    noStroke();
  } else {
    stroke(wine);
  }
  beginShape();
  vertex(756 + (Anxiety * 10 * sinWave), 636);
  vertex(691 - (Anxiety * 10 * cosWave), 677);
  vertex(740 + (Anxiety * 10 * sinWave), 718);
  vertex(691 - (Anxiety * 10 * cosWave), 759);
  vertex(756 + (Anxiety * 10 * sinWave), 800);
  endShape();

  var anxWave = map(Anxiety,0,10,0,0.5);
  wave8.freq(F4);
  wave8.amp(anxWave,1);
  pop();

  // SUICIDAL IDEATION
  if (Suicidal_Ideation === true) {
    push();
    fill(red);
    noStroke();
    ellipse(450, 450, 100, 100);
  }

  // BRAIN FOG
  if (Brain_Fog === true) {
    filter(BLUR, 5);
  }

  // INSOMNIA
  if (Insomnia === true) {
    filter(GRAY);
  }

push();
noStroke();
fill(orange);
textSize(20);
textAlign(CENTER);
  text(Notes, width/2, height-50);
pop();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (keyCode === ENTER) {
    //saveCanvas('pattern','jpg');
  }
}

function downloadImage() {
  saveCanvas('pictogram_' + day() + '_' + hour() + '_' + minute(), 'jpg');
}

function toggle(){
  if (!playing) {
    playing = true;
    wave.setType('sine');
    wave.start();

    wave2.setType('sine');
    wave2.start();

    wave3.setType('sine');
    wave3.start();

    wave4.setType('sine');
    wave4.start();

    wave5.setType('sine');
    wave5.start();

    wave6.setType('sine');
    wave6.start();

    wave7.setType('sine');
    wave7.start();

    wave8.setType('sine');
    wave8.start();

    // wave9.setType('sine');
    // wave9.start();

    // wave10.setType('sine');
    // wave10.start();

    // wave11.setType('sine');
    // wave11.start();
    

  } else {
    wave.stop();
    wave2.stop();
    wave3.stop();
    wave4.stop();
    wave5.stop();
    wave6.stop();
    wave7.stop();
    wave8.stop();
    wave9.stop();
    wave10.stop();
    wave11.stop();
    playing = false;
  }
}