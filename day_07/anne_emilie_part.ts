import recordDataDay7 from './puzzle_input.txt';
import { getHandType as workingGetHandType } from './part_2';

const hands = recordDataDay7
    .split('\n')
    .map((s) => s.split(' '));
let result = 0;
const orderHands = ['high_card', 'one_pair', 'two_pair', 'three_of_a_kind', 'full_house', 'four_of_a_kind', 'five_of_a_kind'];
const orderCards = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];

function getHandType(cards) {
    let sameCardsCount = {};
    let handType = [];
    let higherChar = [];

    higherChar = cards.split('').sort((a, b) => {
        for (let i = 0; i < 5; i++) {
            return orderCards.indexOf(a[i]) - orderCards.indexOf(b[i]);  
        }
    });
    for (let i = 4; i > -1; i--) {
        if (higherChar[i] !== "J"){
            higherChar = higherChar.map(h => (h === "J" ? higherChar[i] : h));
            break;
        }
    }
    cards = higherChar.join('');
    for (let char of cards) {
        sameCardsCount[char] = (sameCardsCount[char] || 0) + 1;
    }
    for (let char in sameCardsCount) {
        if (sameCardsCount[char] > 1) {
            if (sameCardsCount[char] === 2)
            {
                sameCardsCount[char] = "one_pair";
            }
            if (sameCardsCount[char] === 3)
            {
                sameCardsCount[char] = "three_of_a_kind";
            }
            if (sameCardsCount[char] === 4)
            {
                sameCardsCount[char] = "four_of_a_kind";
            }
            if (sameCardsCount[char] === 5)
            {
                sameCardsCount[char] = "five_of_a_kind";
            }
            handType.push(sameCardsCount[char]);
        } 
    }
    if (handType.indexOf("one_pair") !== -1){
        if (handType.indexOf("one_pair") !== handType.lastIndexOf("one_pair")){
            handType=["two_pair"];
        }
        if (handType.indexOf("three_of_a_kind") !== -1){
            handType=["full_house"];
        }
    }
    if (handType.toString() === ''){
        handType="high_card";
    }
    return handType.toString();
}

const goodTypes = hands.map((hand) => [...hand, workingGetHandType(hand[0].split(''))]);
const badTypes = hands.map((hand) => [...hand, getHandType(hand[0])]);

const deltas = [];
badTypes.forEach((hand, index) => {
    if (hand[2] !== goodTypes[index][2]) {
        deltas.push({ index, hand, hand2: goodTypes[index] });
    }
});
console.log('Deltas', deltas);
console.log('Deltas', deltas.length);

function getOrdered(hands) {
    hands.sort((a, b) => {
        if (a[2] !== b[2]) {
            return orderHands.indexOf(a[2]) - orderHands.indexOf(b[2]);
        }
        for (let i = 0; i < 5; i++) {
            if (a[0][i] !== b[0][i]){
                return orderCards.indexOf(a[0][i]) - orderCards.indexOf(b[0][i]);
            }
        }
        return 0;
    });
    return hands;
}
hands.forEach(hand => {
   hand[2] = getHandType(hand[0]);
});
console.log('hands', hands[0]);
getOrdered(hands);
hands.forEach((hand, index) => {
    result += hand[1] * (index+1);
});
