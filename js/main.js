const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]

const validateCred = array => {
    let doubledIt = [];
    let sum = 0;
    
    for(let i = (array.length - 1); i >= 0; i--) {
        if(i % 2 !== 0) {
            doubledIt.push(array[i]);
        } else if(i % 2 === 0) {
            doubledIt.push(array[i] * 2);
        }
    }

    for(let j = 0; j < doubledIt.length; j++) {
        if(doubledIt[j] > 9) {
            doubledIt[j] -= 9; 
        }
    }
    
    for(let k = 0; k < doubledIt.length; k++) {
        sum += doubledIt[k];
    }

    return sum % 10 === 0
};


console.log(validateCred(valid1));
console.log(validateCred(valid2));
console.log(validateCred(valid3)); // this array is not valid
console.log(validateCred(valid4));
console.log(validateCred(valid5));

console.log(validateCred(invalid1));
console.log(validateCred(invalid2));
console.log(validateCred(invalid3));
console.log(validateCred(invalid4));
console.log(validateCred(invalid5));

console.log(validateCred(mystery1));
console.log(validateCred(mystery2));
console.log(validateCred(mystery3));
console.log(validateCred(mystery4));
console.log(validateCred(mystery5));

const findInvalidCards = array => {
    let invalidCards = [];
    for(let a = 0; a < array.length; a++) {
        if(validateCred(array[a]) === false) {
            invalidCards.push(array[a]);       
        }
    }
    return invalidCards;
};

console.log(findInvalidCards(batch)); // return 8 arrays

const idInvalidCardCompanies = array => {
    const companyCards = [{company: 'American Express', firstDigit: 3}, {company: 'Visa', firstDigit: 4}, {company: 'MasterCard', firstDigit: 5}, {company: 'Discover', firstDigit: 6}];
    const arrayIndex = 0;
    const invalidCards = findInvalidCards(array);
    let invalidCardCompanies = [];
    let countingCards = [0, 0, 0, 0];
    

    for(let y = 0, z = 0; y < invalidCards.length, z < 4; y++, z++) {
        if(invalidCards[y][arrayIndex] === companyCards[z].firstDigit) {
            countingCards[0]++;
        } if(invalidCards[y][arrayIndex] === companyCards[z].firstDigit) {
            countingCards[1]++;
        } if(invalidCards[y][arrayIndex] === companyCards[z].firstDigit) {
            countingCards[2]++;
        } if(invalidCards[y][arrayIndex] === companyCards[z].firstDigit) {
            countingCards[3]++;
        }
    }
    
    if(countingCards[0] > 0) {
        invalidCardCompanies.push('Amex (American Express)');
    } if(countingCards[1] > 0) {
        invalidCardCompanies.push('Visa');
    } if(countingCards[2] > 0) {
        invalidCardCompanies.push('MasterCard');
    } if(countingCards[3] > 0) {
        invalidCardCompanies.push('Discover');
    } else if(countingCards[0] < 1 || countingCards[1] < 1 || countingCards[2] < 1 || countingCards[3] < 1) {
        console.log('Company not found');
    }

    return invalidCardCompanies;
};

console.log(idInvalidCardCompanies(batch)); // returns all companies since all cards includes at least one card from each company