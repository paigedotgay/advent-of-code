import fs from "fs";

let rawInput;

// Load raw input
fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    rawInput = data;
})

// This is the string included in the problem, used for testing
const testString = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"

/** 
 * Find anything matching mul(NUMBER,NUMBER), get the NUMBER pairs as match groups
 */
const findMulFuncArgs = /mul\((\d+),(\d+)\)/gs;

/**
 * This one is used for replacing matches (with an empty string).
 * Finds all things that start with `don't()` and go until `do()` or the end of string
 */
const findIgnoredSections = /don't\(\)(?:.*?do\(\)|.*?$)/gs;

/**
 * Performs all `mul` functions, then sums the results
 * @param {string} str
 * @returns {int} 
 */
function mullItOver(str) {
    return [...str.matchAll(findMulFuncArgs)] // get match groups
    .map(match => [match[1], match[2]]) // get just the args
    .map(([x, y]) => x * y) // multiply the args, this also converts string->number
    .reduce((acc, cv) => acc + cv); // sum the products
}

const answerOne = mullItOver(rawInput);
const answerTwo = mullItOver(rawInput.replace(findIgnoredSections, ""))