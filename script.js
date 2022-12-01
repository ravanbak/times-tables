// idea: give each number a different color

"use strict";

// import { createElement } from "./dom-util";

let questionCount = 0;

const FACTOR_1_MIN = 2;
const FACTOR_1_MAX = 12;
const FACTOR_2_MIN = 2;
const FACTOR_2_MAX = 12;

const DEFAULT_FACTORS = [2, 3, 4, 5, 6, 7, 8, 9, 11, 12];

let minProduct = 15; // avoid showing factors with a product less than this number
let factors1 = [...DEFAULT_FACTORS];
let factors2 = [...DEFAULT_FACTORS];
let currentFactors = getRandomFactors();

const header = document.querySelector('#header');
const page = document.querySelector('#page');
const footer = document.querySelector('#footer');

// question/answer state, either 'q' or 'a'
let state = 'q'; 

function createElements() {
    createHeader();
    createCard();
    createSettings();
    createFooter();
    
    function createHeader() {
        const headingProps = {
            tag: 'h1',
            textContent: 'Mathinator 2000',
        };
        header.appendChild(createElement(headingProps));
        header.appendChild(createElement({tag: 'div', classList:['question-number']}));
    }

    function createCard() {
        const card = createElement({tag: 'div', classList: ['card']});
        card.addEventListener('mousedown', (e) => { updateCard(); e.preventDefault(); });
        page.appendChild(card);
        
        addQuestionElements(card);
        addAnswerElements(card);
        // addNextButton();
    
        state = 'q';
        updateQuestion();

        function addQuestionElements(card) {
            const questionContainer = createElement({tag: 'div', classList: ['question-container']});

            const num1El = createElement({
                tag: 'div',
                classList: ['question-num1'],
            });
            questionContainer.appendChild(num1El);
        
            const opEl = createElement({
                tag: 'div',
                classList: ['question-op'],
                textContent: '×',
            });
            questionContainer.appendChild(opEl);
        
            const num2El = createElement({
                tag: 'div',
                classList: ['question-num2'],
            });
            questionContainer.appendChild(num2El);
        
            card.appendChild(questionContainer);
        }

        function addAnswerElements(card) {
            const answerContainer = createElement({tag: 'div', classList: ['answer-container', 'hidden']});
            answerContainer.appendChild(createElement({tag: 'div', classList: ['answer']}));
            
            card.appendChild(answerContainer);
        }
    
        function addNextButton() {
            const buttonProps = {
                tag: 'input',
                type: 'button',
                value: 'next',
                classList: ['btn-next'],
            };
            const button = createElement(buttonProps);
            button.addEventListener('click', updateCard);
            page.appendChild(button);
        }
    }

    function createSettings() {
        const settingsContainer = createElement({tag: 'div', classList: ['settings-container', 'hidden']});

        const labelFactor1 = createElement({tag: 'label', for: 'factor1input', textContent: 'Factor list 1:'});
        settingsContainer.appendChild(labelFactor1);
        const intputFactor1 = createElement({tag: 'input', type: 'text', classList: ['settings-input1'], value: factors1.toString()});
        intputFactor1.addEventListener('focusout', getFactorsFromUserInput);
        settingsContainer.appendChild(intputFactor1);

        const labelFactor2 = createElement({tag: 'label', for: 'factor2input', textContent: 'Factor list 2:'});
        settingsContainer.appendChild(labelFactor2);
        const intputFactor2 = createElement({tag: 'input', type: 'text', classList: ['settings-input2'],  value: factors2.toString()});
        intputFactor2.addEventListener('focusout', getFactorsFromUserInput);
        settingsContainer.appendChild(intputFactor2);
        
        page.appendChild(settingsContainer);
    }

    function createFooter() {
        const footerProps = {
            tag: 'span',
            textContent: 'copyright poopoobumbum productions, inc.'
        };
        
        footer.appendChild(createElement(footerProps));        
    }
}

function updateCard() {
    state = (state === 'q') ? 'a' : 'q'; // toggle state
    
    switch (state) {
        case 'a':
            showAnswer();
            break;
        
        case 'q':
            updateQuestion();
            break;
    }

    let answerContainer = document.querySelector('.answer-container');
    answerContainer.classList.toggle('hidden');    
}

function showAnswer() {
    let answer = document.querySelector('.answer');
    answer.textContent = getAnswer();
}

function getProduct(factors) {
    return factors.f1 * factors.f2;
}

function getAnswer() {
    return getProduct(currentFactors).toString();
}

function checkFactors(factors) {
    if (factors1.length > 1 && factors.f1 === currentFactors.f1) {
        return false;
    }

    if (factors2.length > 1 && factors.f2 === currentFactors.f2) {
        return false;
    }
    
    const maxFactor1 = factors1.reduce((a, b) => Math.max(a, b));
    const maxFactor2 = factors2.reduce((a, b) => Math.max(a, b));
    const maxProduct = maxFactor1 * maxFactor2;
    if (maxProduct >= minProduct) {
        if (getProduct(factors) < minProduct) {
            return false;
        }
    }

    return true;
}

function updateQuestion() {
    questionCount++;
    const questionNumber = document.querySelector('.question-number');
    questionNumber.textContent = `Question ${questionCount}`;

    let factors = getRandomFactors();

    // check for repeats or product too small
    for (let i = 0; i < 20; i++) {
        if (checkFactors(factors)) {
            break;
        }
        factors = getRandomFactors();
    }

    currentFactors = factors;

    const questionNum1 = document.querySelector('.question-num1');
    questionNum1.textContent = currentFactors.f1;

    const questionNum2 = document.querySelector('.question-num2');
    questionNum2.textContent = currentFactors.f2;
}

function getRandomNumberInclusive(start, end) {
    return start + Math.floor(Math.random() * (end - start + 1))
}

function getRandomIndex(arr) {
    return Math.floor(Math.random() * arr.length);
}

function fillFactorArrays() {
    for (let i = FACTOR_1_MIN; i <= FACTOR_1_MAX; i++) {
        if (i !== 10) {
            factors1.push(i);
        }
    }
    for (let i = FACTOR_2_MIN; i <= FACTOR_2_MAX; i++) {
        if (i !== 10) {
            factors2.push(i);
        }
    }
}

function fixFactorArray(factors) {
    // Remove non-integer elements. If there are no
    // elements remaining, reset the array to default values.
    //
    // Return the modified array.

    if (!factors) {
        return [...DEFAULT_FACTORS];
    }

    // Filter out any non-integer array elements
    let inputFactors = factors.filter((el) => Number.isInteger(+el)).map(el => +el);
    if (inputFactors.length > 0) {
        return inputFactors;
    } else {
        return [...DEFAULT_FACTORS];
    }
}

function getFactorArrayFromUserInput(arrayNumber) {
    let factors = [];
    
    const textInput = document.querySelector(`.settings-input${arrayNumber}`);
    if (textInput) {
        factors = textInput.value.replaceAll(' ', '').split(',');
    }

    factors = fixFactorArray(factors)

    if (textInput) {
        textInput.value = factors.toString();
    }

    return factors;
}

function getFactorsFromUserInput() {
    factors1 = getFactorArrayFromUserInput(1);
    factors2 = getFactorArrayFromUserInput(2);
}

function getRandomFactors() {
    getFactorsFromUserInput();

    return {
        f1: factors1[getRandomIndex(factors1)], 
        f2: factors2[getRandomIndex(factors2)]
    };
}

// fillFactorArrays();

createElements();