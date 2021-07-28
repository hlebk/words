// returns random number between 0 and max argument
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
// This function could really use more work
function validateFile(file) {
    if (filefield.files.length === 1 && filefield.files[0].name.includes(".txt")) {
    return true;
    }
    return false;
}
// reads content of filefield variable and assigns proper values to words object
function importWords() {
    let reader = new FileReader();
    reader.onload = () => {
        lines = reader.result.trim().split("\n");
        words = {
            firstLang : [],
            secondLang : []
            }
        for (i = 0; i < lines.length; i++) {
            let splitted = lines[i].split(":");
            if (!reverse.checked) {
                words.firstLang[i] = splitted[0].split(",").map(s => s.trim());
                words.secondLang[i] = splitted[1].split(",").map(s => s.trim());
            } else {
                words.firstLang[i] = splitted[1].split(",").map(s => s.trim());
                words.secondLang[i] = splitted[0].split(",").map(s => s.trim());
            }
        }
        len = words.firstLang.length;
        indexes = [...Array(len).keys()];
        if (practice) {
            practicewindow.style.display = "block";
            execPractice();
        } else {
            testwindow.style.display = "block";
            execTest();
        }
    };
    reader.onerror = () => {
    console.error("File could not be read!");
    };
    reader.readAsText(filefield.files[0]);
}

function displayTestResult() {
    testheader.innerText = "Your result:";
    answer.style.display = "none";
    checkbtn.style.display = "none";
    testgobackbtn.style.display = "block";
    question.innerText = Math.round(goodanswers / len * 100) + "%";
}

function validateAnswer() {
    if (secondLangWord.includes(answer.value.trim())) {
        confirmationtext.innerText = "Correct!";
        goodanswers++;
    } else {
        confirmationtext.innerText = "Wrong!\nThe correct answer is: " + secondLangWord.join(", ");
    }
}

function execTest() {
   randomIndex = getRandomInt(indexes.length);
    let randomWordIndex = indexes[randomIndex];
    let firstLangWord  = words.firstLang[randomWordIndex];
    secondLangWord = words.secondLang[randomWordIndex]; //CORRECT ANSWER
    question.innerText = firstLangWord.join(", ");
    indexes.splice(randomIndex, 1);
}

function execPractice() {
    if (indexes.length > 0) {
        randomIndex = getRandomInt(indexes.length);
        let randomWordIndex = indexes[randomIndex];
        practicewords.innerText = words.firstLang[randomWordIndex];
        secondLangWord = words.secondLang[randomWordIndex]; //CORRECT ANSWER
    } else {
        practiceheader.innerText = "Good job!";
        practicewords.innerText = "You've memorized all words.";
        nobutton.style.display = "none";
        yesbutton.style.display = "none";
        practicegobackbtn.style.display = "block";
    }
}

// documents elements which are accessed
const importwindow = document.querySelector("#importwindow");
const testwindow = document.querySelector("#testwindow");
const practicewindow = document.querySelector("#practicewindow");
const practiceheader = document.querySelector("#practicewindow h1");
const testheader = document.querySelector("#testwindow h1");
const practicewords = document.querySelector("#words");
const nobutton = document.querySelector("#no");
const yesbutton = document.querySelector("#yes");
const filefield = document.querySelector("#file");
const startbtn = document.querySelector("#submitfile");
const practicebtn = document.querySelector("#practicebtn");
const testbtn = document.querySelector("#testbtn");
const question = document.querySelector("#question");
const answer = document.querySelector("#answer");
const checkbtn = document.querySelector("#check");
const confirmdialog = document.querySelector("#confirmation-dialog");
const confirmationtext = document.querySelector("#confirmation-text");
const confirm = document.querySelector("#confirm");
const testgobackbtn = document.querySelector("#testwindow .goback");
const practicegobackbtn = document.querySelector("#practicewindow .goback");
const reverse = document.querySelector("#reverse");

// necessary global variables
let data = "";
let words;
let len;
let indexes;
let randomIndex
let secondLangWord;
let practice;
let goodanswers = 0;

// Events and other crap

answer.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    event.preventDefault();
    checkbtn.click();
    }
});

confirm.onclick = () => {
    if (practice) {
            practicewindow.style.display = "block";
        } else {
            testwindow.style.display = "block";
        }
    confirmdialog.style.display = "none";
}

practicebtn.onclick = () => {
    practicebtn.style.backgroundColor = "var(--secondary)";
    testbtn.style.backgroundColor = "var(--primary)";
    testbtn.style.fontWeight = "normal";
    practicebtn.style.fontWeight = "bold";
    practice = true;
}

nobutton.onclick = () => {
    practicewindow.style.display = "none";
    confirmdialog.style.display = "block";
    confirmationtext.innerText = secondLangWord.join(", ");
    execPractice();
}

yesbutton.onclick = () => {
    practicewindow.style.display = "none";
    confirmdialog.style.display = "block";
    confirmationtext.innerText = secondLangWord.join(", ");
    indexes.splice(randomIndex, 1);
    execPractice();
}

testbtn.onclick = () => {
    testbtn.style.backgroundColor = "var(--secondary)";
    practicebtn.style.backgroundColor = "var(--primary)";
    testbtn.style.fontWeight = "bold";
    practicebtn.style.fontWeight = "normal";
    practice = false;
}

filefield.onchange = () => {
    filefield.style.borderColor = "var(--primary)";
}

let files = filefield.files;

let submitFile = document.querySelector("#submitfile");
submitFile.onclick = () => {
    if (validateFile(files[0])) {
        console.log(files[0].name);
    } else {
        console.log("invalid file");
    }
}

practicegobackbtn.onclick = () => {
    window.location.reload();
}

testgobackbtn.onclick = () => {
    window.location.reload();
}

startbtn.onclick = () => {
    if (validateFile()) {
        if (practice === undefined) {
            document.querySelector("#flexboi").style.border = "solid red 1px";
            console.log("please select practice or test");
            return;
        }
        importwindow.style.display = "none";
        importWords();
        answer.value="";
    } else {
        filefield.style.borderColor = "red";
        console.log("invalid file");
    }
}

checkbtn.onclick = () => {
    testwindow.style.display = "none";
    confirmdialog.style.display = "block";
    validateAnswer();
    if (indexes.length > 0) {
        execTest();
    }
    else {
        displayTestResult();
    }
    answer.value = "";
}
