// idea: give each number a different color

"use strict";

// import { createElement } from "./dom-util";

const FACTOR_1_MIN = 2;
const FACTOR_1_MAX = 12;
const FACTOR_2_MIN = 2;
const FACTOR_2_MAX = 12;

const factors1 = [2, 4, 6, 8, 12];
const factors2 = [3, 5, 7, 9, 11];
let currentFactors = getFactors();

const header = document.querySelector('#header');
const page = document.querySelector('#page');
const footer = document.querySelector('#footer');

let state = 'q'; // question/answer state, either 'q' or 'a'

function createElements() {
    createHeader();
    createCard();
    createFooter();
    
    function createHeader() {
        const headingProps = {
            tag: 'h1',
            textContent: 'Mathinator 2000',
        };

        header.appendChild(createElement(headingProps));
    }

    function createCard() {
        const card = createElement({tag: 'div', classList: ['card']});
        card.addEventListener('click', updateCard);
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

function getAnswer() {
    return (currentFactors.f1 * currentFactors.f2).toString();
}

function updateQuestion() {
    let factors = getFactors();

    // check for repeats
    if ((factors.f1 === currentFactors.f1) || (factors.f2 === currentFactors.f2)) {
        factors = getFactors();           
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

function getFactors() {
    return {
        f1: factors1[getRandomIndex(factors1)], 
        f2: factors2[getRandomIndex(factors2)]
    };
}

// fillFactorArrays();

// let {f1, f2} = getFactors();

createElements();