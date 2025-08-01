import { sad_pot, happy_pot } from "./pot_data.js";
import app from "./vue.js";

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
        if (!hideCursor) {
            document.body.style.cursor = "default";
            app.cursorHidden = null;
        }
        reset(sad_pot);
    } else {
        const pot = document.getElementById(sad_pot.potID);
        const dropper = document.getElementById(sad_pot.dropperID);

        document.addEventListener('mousemove', trackSad);
        document.body.style.cursor = "none";
        app.cursorHidden = "sad";

        dropper.style.display = "block";
        pot.src = sad_pot.dropperEmptysrc;
        pot.classList.add('sad-pot-visible');
    }
    sadDropperOut = !sadDropperOut;
}

function toggleHappyDropper(hideCursor = false) {
    if (happyDropperOut) {
        document.removeEventListener('mousemove', trackHappy);
        if (!hideCursor) {
            document.body.style.cursor = "default";
            app.cursorHidden = null;
        }
        reset(happy_pot);
    } else {
        const pot = document.getElementById(happy_pot.potID);
        const dropper = document.getElementById(happy_pot.dropperID);

        document.addEventListener('mousemove', trackHappy);
        document.body.style.cursor = "none";
        app.cursorHidden = "happy";
        dropper.style.display = "block";
        pot.src = happy_pot.dropperEmptysrc;
        pot.classList.add('happy-pot-visible');
    }
    happyDropperOut = !happyDropperOut;
}

function reset(pot) {
    const curPot = document.getElementById(pot.potID);
    const dropper = document.getElementById(pot.dropperID);
    dropper.style.display = "none";
    dropper.style.left = pot.potID === "happy-pot" ? "10.5rem" : "0.5rem";
    curPot.src = pot.dropperFilledsrc;
    curPot.classList.remove(`${pot.potID}-visible`);
}

function trackHappy(e) {
    document.getElementById(happy_pot.dropperID).style.left = e.pageX - 60 + 'px';
    document.getElementById(happy_pot.dropperID).style.top = e.pageY - 60 + 'px';
}

function trackSad(e) {
    document.getElementById(sad_pot.dropperID).style.left = e.pageX - 60 + 'px';
    document.getElementById(sad_pot.dropperID).style.top = e.pageY - 60 + 'px';
}