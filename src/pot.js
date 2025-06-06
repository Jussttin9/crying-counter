import { sad_pot, happy_pot } from "./pot_data.js";

let curDropper = null;
let sadDropperOut = false;
let happyDropperOut = false;

document.getElementById(sad_pot.potID).addEventListener('click', () => {
    curDropper = sad_pot;
    toggleSadDropper();
    if (sadDropperOut && happyDropperOut === sadDropperOut) toggleHappyDropper(true);
});

document.getElementById(happy_pot.potID).addEventListener('click', () => {
    curDropper = happy_pot;
    toggleHappyDropper();
    if (happyDropperOut && happyDropperOut === sadDropperOut) toggleSadDropper(true);
});

function toggleSadDropper(hideCursor = false) {
    if (sadDropperOut) {
        document.removeEventListener('mousemove', trackSad);
        if (!hideCursor) document.body.style.cursor = "default";
        reset(sad_pot);
    } else {
        const pot = document.getElementById(sad_pot.potID);
        const dropper = document.getElementById(sad_pot.dropperID);

        document.addEventListener('mousemove', trackSad);
        document.body.style.cursor = "none";
        dropper.style.display = "block";
        pot.src = sad_pot.dropperEmptysrc;
        pot.style.height = "6.5rem";
        pot.style.width = "6.5rem";
        pot.style.left = sad_pot.potID === "happy_pot" ? "10.2rem" : "0.15rem";
    }
    sadDropperOut = !sadDropperOut;
}

function toggleHappyDropper(hideCursor = false) {
    if (happyDropperOut) {
        document.removeEventListener('mousemove', trackHappy);
        if (!hideCursor) document.body.style.cursor = "default";
        reset(happy_pot);
    } else {
        const pot = document.getElementById(happy_pot.potID);
        const dropper = document.getElementById(happy_pot.dropperID);

        document.addEventListener('mousemove', trackHappy);
        document.body.style.cursor = "none";
        dropper.style.display = "block";
        pot.src = happy_pot.dropperEmptysrc;
        pot.style.height = "6.5rem";
        pot.style.width = "6.5rem";
        pot.style.left = happy_pot.potID === "happy_pot" ? "10.2rem" : "0.15rem";
    }
    happyDropperOut = !happyDropperOut;
}

function reset(pot) {
    const curPot = document.getElementById(pot.potID);
    const dropper = document.getElementById(pot.dropperID);
    dropper.style.display = "none";
    dropper.style.left = pot.potID === "happy_pot" ? "10.5rem" : "0.5rem";
    curPot.src = pot.dropperFilledsrc;
    curPot.style.height = "";
    curPot.style.width = "";
    curPot.style.left = "";
}

function trackHappy(e) {
    document.getElementById(happy_pot.dropperID).style.left = e.pageX - 60 + 'px';
    document.getElementById(happy_pot.dropperID).style.top = e.pageY - 60 + 'px';
}

function trackSad(e) {
    document.getElementById(sad_pot.dropperID).style.left = e.pageX - 60 + 'px';
    document.getElementById(sad_pot.dropperID).style.top = e.pageY - 60 + 'px';
}