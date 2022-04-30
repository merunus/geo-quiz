
// Elements 
const nextBtn = document.getElementById("next-btn");
const btnStart = document.getElementById("btn-start");
const btnHint = document.getElementById("btn-hint");
const hint = document.getElementById("hint");
const hintAnswer = document.getElementById("hintAnswer");
const container = document.getElementById("container");
const score = document.getElementById("score");
const answersContainer = document.getElementById("answers");
const correctIncorrect = document.getElementById("correctIncorrect");
const var1 = document.getElementById("var1"); // 'option1' is more preferable
const var2 = document.getElementById("var2");
const var3 = document.getElementById("var3");
const var4 = document.getElementById("var4");
const main = document.getElementById("main");
const img = document.getElementById("img");
const nativeName = document.getElementById("nativeName");
 
let isHidden = true;
 
// Api components 
const API_URL = "https://restcountries.com/v3.1/all";
 
let correct, incorrectAnswers;
 
// Event listeners 
 
btnStart.addEventListener("click", async () => {
    btnStart.classList.add("hidden");
    container.classList.remove("hidden");
    ({ correct, incorrectAnswers } = await getCountries(API_URL));
    placingDataOnScreen();
});
 
nextBtn.addEventListener("click", async event => {
    event.preventDefault();
    ({ correct, incorrectAnswers } = await getCountries(API_URL));
    placingDataOnScreen();
    resetClasses();
});
 
btnHint.addEventListener("click", ()=>{
    hint.classList.toggle("hide-hint");
});
 
const placingDataOnScreen = () => {
    //  Placing data on screen.
    hintAnswer.textContent = correct.continents;
    img.src = correct.flags.png;
 
    var1.dataset.answer = incorrectAnswers[0];
    var1.innerHTML = `<span>A</span>${incorrectAnswers[0]}
    <span class = "correct-incorrect ${isHidden ? "hidden" : null}">
        <i class="fa-regular fa-circle-check"></i>
        <i class="fa-regular fa-circle-xmark"></i>
    </span>`;
 
    var2.dataset.answer = incorrectAnswers[1];
    var2.innerHTML = `<span>B</span>${incorrectAnswers[1]}
    <span class = "correct-incorrect hidden">
        <i class="fa-regular fa-circle-check"></i>
    </span>`;
 
    var3.dataset.answer = incorrectAnswers[2];
    var3.innerHTML = `<span>C</span>${incorrectAnswers[2]}
    <span class = "correct-incorrect hidden">
        <i class="fa-regular fa-circle-check"></i>
    </span>`;
 
    var4.dataset.answer = incorrectAnswers[3];
    var4.innerHTML = `<span>D</span>${incorrectAnswers[3]}
    <span class = "correct-incorrect hidden">
        <i class="fa-regular fa-circle-check"></i>
    </span>`;
}
 
answersContainer.addEventListener('click', event => {
    event.preventDefault();
 
    const { target } = event;

    

    if (!target.matches('a.answer[data-answer]') || target.matches('a.answer.correct')) return;
    
    if (target.dataset.answer === correct.name.common) {
        console.log("correct!");
        score.value = parseInt(score.value) + 100;
        target.classList.add("correct");
    } else {
        target.classList.add("incorrect");
        
    }
});
 
async function getCountries(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
 
        const randomNumberFormCountries = Math.floor(Math.random() * 250);
        const country = data[randomNumberFormCountries];
        // const { flags, continents, name } = country;
       
        const randomCountryName1 = data[Math.floor(Math.random() * data.length)].name.common;
        const randomCountryName2 = data[Math.floor(Math.random() * data.length)].name.common;
        const randomCountryName3 = data[Math.floor(Math.random() * data.length)].name.common;
        const randomCountryName4 = data[Math.floor(Math.random() * data.length)].name.common;
        
        console.log('name.common: ', country.name.common);
 
        // correct = country;
        const incorrectAnswers = [
            randomCountryName1,
            randomCountryName2,
            randomCountryName3,
            randomCountryName4
        ];
 
        // Replacing 1 incorrect answer with correct one.
        incorrectAnswers.splice(Math.floor(Math.random() * 4), 1, country.name.common);
 
        console.log('incorrectAnswers: ', incorrectAnswers);
 
        return {
            correct: country,
            incorrectAnswers
        };
 
    } catch (error) {
        console.log(error);
    }
}
 
function resetClasses() {
    var1.classList.remove("correct");
    var2.classList.remove("correct");
    var3.classList.remove("correct");
    var4.classList.remove("correct");
    var1.classList.remove("incorrect");
    var2.classList.remove("incorrect");
    var3.classList.remove("incorrect");
    var4.classList.remove("incorrect");
}







