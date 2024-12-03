// I'm being super lazy with this cos I forgot about advent and head ouch

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

/**
 * Separates the raw input into both lists
 * @param {str} input The Puzzle input
 * @returns {Array<Array<int>>} Lists one and two.
 */
function buildLists(input) {
    let listOne = [];
    let listTwo = [];

    // Separate the input into the number groups.
    let elements = input.split(/\D+/);

    // Unzip the elements into lists one and two
    // Also parses str->int for each element
    while(elements.length) {
        listOne.push(parseInt(elements.shift()));
        listTwo.push(parseInt(elements.shift()));
    }

    return [listOne, listTwo];
}

/**
 * Sorts both lists,
 * then finds the difference between the items at each index
 * @param {Array<int>} listOne 
 * @param {Array<int>} listTwo 
 * @returns {int}
 */
function questionOne(listOne, listTwo) {
    listOne.sort();
    listTwo.sort();
    let totalDifference = 0;
    for (i = 0; i < listOne.length; i++) {
        totalDifference += Math.abs(listOne[i] - listTwo[i]);
    }
    return totalDifference;
}

/**
 * Returns the sum of the products of each element of listOne
 * and the number of times that element appears in listTwo
 * 
 * Could probably be faster with a lookup table but I'm lazy
 * @param {Array<int>} listOne 
 * @param {Array<int>} listTwo 
 * @returns {int}
 */
function questionTwo(listOne, listTwo) {
    return listOne.map(i => i * listTwo.filter(j => j == i).length)
        .reduce((acc, cv) => acc + cv, 0);
}

// Pretty print the answers
console.log(`Question One: ${questionOne(...buildLists(rawInput))}\n`+
            `Question Two: ${questionTwo(...buildLists(rawInput))}`)