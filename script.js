const site = document.querySelector('#site');
const heading = document.createElement('h1');
heading.textContent = "Super Awesome Multiplication Practicinator"
site.appendChild(heading);

const FACTOR_1_MIN = 2;
const FACTOR_1_MAX = 12;
const FACTOR_2_MIN = 2;
const FACTOR_2_MAX = 12;

const factors1 = [];
const factors2 = [];

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

function testRandomness() {
    let count = [];

    for (let i = 0; i < 12000; i++) {
        idx = getRandomNumberInclusive(0, 11);

        if (count[idx]) {
            count[idx] += 1;
        }
        else {
            count[idx] = 1;
        }
    }

    console.table(count);
}

fillFactorArrays();

console.log(getFactors());