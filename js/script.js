isthegameOver = false;
var ctx;
var can = 3; // ayarla
var skor = 0;
var ziplama = false;
var jhiz = 0;
var gravity = 0.5;
var imgKarakter1 = new Image();
var imgKarakter2 = new Image();
var imgKarakter3 = new Image();
var imgKarakter4 = new Image();
var imgKarakter5 = new Image();
var imgKarakter6 = new Image();
var imgKarakter7 = new Image();
var imgKarakter8 = new Image();
imgKarakter1.src = "image/pngegg.png";
imgKarakter2.src = "image/dusman1.2.png";
imgKarakter3.src = "image/mermi.png";
imgKarakter4.src = "image/dusman1.png";
imgKarakter5.src = "image/mermi2.png";
imgKarakter6.src = "image/mermi2.png";
imgKarakter7.src = "image/ucak.png";
imgKarakter8.src = "image/patlama.png";
const karakter1 = {
  x: 600,
  y: 600,
  w: 100,
  h: 120,
  jh: 12,
  color: "black",
};
const dusman1 = {
  x: 1330,
  y: 610,
  w: 60,
  h: 100,
  xHareket: 3,
};
const dusman2 = {
  x: -100,
  y: 610,
  w: 60,
  h: 100,
  xHareket: 1,
};
const mermi = {
  x: dusman1.x,
  y: 660,
  w: 15,
  h: 10,
  xHareket: 8,
};
const mermi2 = {
  x: dusman2.x,
  y: 660,
  w: 15,
  h: 10,
  xHareket: 8,
};
let mermiAktif = false;
const mermiA = {
  x: karakter1.x,
  y: karakter1.y + karakter1.h / 2 - 5,
  w: 15,
  h: 10,
  xHareket: 10,
  yon: "sag",
};
const ucak = {
  x: -100,
  y: 300,
  w: 250,
  h: 100,
  xHareket: 13,
  aktif: false,
};
const patlama = {
  x: 50,
  y: 650,
  w: 1200,
  h: 120,
};
function init() {
  var canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  setInterval(ciz, 20);
  ucakGecisi();
  canGuncelle();
}
function rastgeleInterval() {
  var rastgeleSure = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;
  setTimeout(function () {
    ciz();
    rastgeleInterval();
  }, rastgeleSure);
}
function ucakGecisi() {
  setTimeout(function () {
    ucak.x = -100;
    ucak.aktif = true;
    ucakGecisi();
  }, Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000);
}

const carpisma = (a, b) => {
  a.sag = a.x + (a.w + -40);
  a.sol = a.x + 15;
  a.ust = a.y;
  a.alt = a.y + a.h;

  b.sag = b.x;
  b.sol = b.x + -10;
  b.ust = b.y;
  b.alt = b.y + b.h;
  return a.sag > b.sol && a.sol < b.sag && a.ust < b.alt && a.alt > b.ust;
};
const mermicarpisma = (a, b) => {
  a.sag = a.x + a.w;
  a.sol = a.x;
  a.ust = a.y;
  a.alt = a.y + a.h;

  b.sag = b.x + b.w;
  b.sol = b.x;
  b.ust = b.y;
  b.alt = b.y + b.h;
  return a.sag > b.sol && a.sol < b.sag && a.ust < b.alt && a.alt > b.ust;
};

function atesEt() {
  if (karakter1.h < 120) return;
  if (!mermiAktif) {
    mermiAktif = true;
    mermiA.x = karakter1.x;
    mermiA.y = karakter1.y + karakter1.h / 2 - 5;
    mermiA.yon = yon ? "sol" : "sag";
  }
}
function canGuncelle() {
  document.getElementById("can1").innerHTML = "Can : " + can;
}
function gameOver() {
  alert("Ölüm\nOyunu Kaybettiniz");
  isthegameOver = true;
  window.location.reload();
}
function dusmanHizlandirma(skor) {
  if (skor == 5) {
    dusman1.xHareket += 1;
    can += 3;
    canGuncelle();
  } else if (skor == 10) {
    dusman2.xHareket += 1;
    can += 1;
    canGuncelle();
  } else {
    // skor = 15
    dusman1.xHareket += 1;
    dusman2.xHareket += 1;
  }
}

function ciz() {
  if (isthegameOver) return;
  ctx.clearRect(0, 0, 1280, 720);

  if (ziplama) {
    karakter1.y -= jhiz;
    jhiz -= gravity;
    if (karakter1.y >= 600) {
      karakter1.y = 600;
      ziplama = false;
      jhiz = 0;
    }
  }
  ctx.drawImage(
    imgKarakter1,
    karakter1.x,
    karakter1.y,
    karakter1.w,
    karakter1.h
  );
  ctx.drawImage(imgKarakter2, dusman1.x, dusman1.y, dusman1.w, dusman1.h);
  ctx.drawImage(imgKarakter4, dusman2.x, dusman2.y, dusman2.w, dusman2.h);
  ctx.drawImage(imgKarakter3, mermi.x, mermi.y, mermi.w, mermi.h);
  ctx.drawImage(imgKarakter5, mermi2.x, mermi2.y, mermi2.w, mermi2.h);
  if (mermiAktif) {
    if (mermiA.yon === "sag") {
      mermiA.x += mermiA.xHareket;
    } else {
      mermiA.x -= mermiA.xHareket;
    }
    ctx.drawImage(imgKarakter6, mermiA.x, mermiA.y, mermiA.w, mermiA.h);
    if (mermiA.x > 1300 || mermiA.x < 0) {
      mermiAktif = false;
    }
  }
  if (ucak.aktif) {
    ucak.x += ucak.xHareket;
    ctx.drawImage(imgKarakter7, ucak.x, ucak.y, ucak.w, ucak.h);
    if (ucak.x > 1000) {
      ctx.drawImage(imgKarakter8, patlama.x, patlama.y, patlama.w, patlama.h);
      if (ucak.x > 1050 && karakter1.y > 580) {
        gameOver();
      }
    }
    if (ucak.x > 1250) {
      patlama.aktif = true;
      ucak.x = -100;
      ucak.aktif = false;
    }
  }
  if (mermicarpisma(mermiA, dusman1) || mermicarpisma(mermiA, dusman2)) {
    if (mermiA.yon === "sag") {
      dusman1.x = 1280;
      dusman1.y = 620;
      skor += 1;
      document.getElementById("skor").innerHTML = "Skor : " + skor;
    } else {
      dusman2.x = -100;
      dusman2.y = 610;
      skor += 1;
      document.getElementById("skor").innerHTML = "Skor : " + skor;
    }
    if (skor == 5 || skor == 10 || skor == 15) {
      dusmanHizlandirma(skor);
    }
    mermiAktif = false;
  }
  if (carpisma(karakter1, dusman1) || carpisma(karakter1, dusman2)) {
    gameOver();
  }
  if (carpisma(karakter1, mermi)) {
    mermi.x = -1;
    can -= 1;
    canGuncelle();
    if (can == 0) {
      gameOver();
    }
  }
  if (carpisma(karakter1, mermi2)) {
    mermi2.x = 1281;
    can -= 1;
    canGuncelle();
    if (can == 0) {
      gameOver();
    }
  }

  dusman1.x -= dusman1.xHareket;
  dusman2.x += dusman2.xHareket;
  mermi.x -= mermi.xHareket;
  mermi2.x += mermi2.xHareket;
  if (mermi.x < 0) {
    mermi.x = dusman1.x;
  }
  if (mermi2.x > 1280) {
    mermi2.x = dusman2.x;
  }
  if (dusman1.x < 0) {
    dusman1.x = 1280;
    dusman1.y = 620;
  }
  if (dusman2.x > 1280) {
    dusman2.x = 0;
    dusman2.y = 620;
  }
  if (karakter1.x > 1200) {
    karakter1.x = 0;
  }
}
document.onkeyup = function (e) {
  var key = e.keyCode;
  if (key == 40) {
    if (!ziplama) {
      karakter1.h = 120;
      karakter1.y = 600;
    }
  }
};
var yon = false;
document.onkeydown = function (e) {
  var key = e.keyCode;
  if (key == 37) {
    if (karakter1.x > 30) {
      imgKarakter1.src = "image/pngegg2.png";
      karakter1.x += -15;
      yon = true;
    }
  }
  if (key == 40) {
    if (!ziplama) {
      karakter1.h = 50;
      karakter1.y = 670;
    }
  }
  if (key == 39) {
    if (karakter1.x < 1280) {
      imgKarakter1.src = "image/pngegg.png";
      karakter1.x += +15;
      yon = false;
    }
  }
  if (key == 32 && !jhiz) {
    ziplama = true;
    jhiz = karakter1.jh;
  }
  if (key == 65) {
    atesEt();
  }
};
const wrap = document.getElementById("game-wrap");

// Başlangıç ölçek (1 = %100, 0.8 = %80)
let scaleFactor = 0.8;
function applyScale() {
  wrap.style.transform = `scale(${scaleFactor})`;
}
applyScale();
