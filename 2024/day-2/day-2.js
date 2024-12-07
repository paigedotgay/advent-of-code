import fs from "fs";

let rawInput;

// Load raw input
fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    rawInput = data.split("\n");
    Object.freeze(rawInput);
})

/**
 * Parses the report string into an Array of numbers
 * @param {str} report 
 * @returns {Array<number>}
 */
function parseReport(report) {
    return report.split(" ").map(i => parseInt(i));
}

// Apparently JS can't even fucking sort correctly????
// These next two we need to explicitly tell it how to sort
// Super fucking annoying to debug, btw
// Not to mention the fact that you can't compare arrays without turning them into strings???

/**
 * Checks if all items in the report are going up in sequence
 * @param {Array<int>} report 
 */
function areElementsIncreasing(report) {
    return report.toString() == report.toSorted((a,b) => a-b).toString();
}

/**
 * Checks if all items in the report are going down in sequence
 * @param {Array<int>} report 
 * @returns {boolean}
 */
function areElementsDecreasing(report) {
    return report.toString() == report.toSorted((a,b) => b-a).toString();
}

/**
 * Verifies all numbers in the report sequence have a difference between 1 and 3.
 * @param {Array<int>} report 
 */
function areDeltasSafe(report) {
    let prior = undefined;
    for (let level of report) {
        if (!!prior) {
            if ([1, 2, 3].includes(Math.abs(level - prior))) {
                prior = level;
            } else {
                return false;
            }
        } else {
            prior = level;
        }
    }
    return true;
}

/**
 * Checks that the Array both has safe deltas and that all elements increase or decrease
 * @param {Array<number>} report 
 * @returns {boolean}
 */
function isReportSafe(report) {
    return (areDeltasSafe(report)
        && (areElementsIncreasing(report)
            || areElementsDecreasing(report)))
}

/**
 * Returns the count of how many reports are considered safe
 * @param {string} reports 
 * @returns {number}
 */
function questionOne(reports) {
    return reports.filter(report => isReportSafe(parseReport(report))).length;
}

questionOne(rawInput);
