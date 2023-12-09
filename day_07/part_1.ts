import puzzle_input from './puzzle_input.txt';

const hands = puzzle_input.split('\n')
.map((hand) => hand.split(' '));

type Card = '2'|
'3'|
'4'|
'5'|
'6'|
'7'|
'8'|
'9'|
'T'|
'J'|
'Q'|
'K'|
'A';

const CARD_STRENGTH = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'T',
    'J',
    'Q',
    'K',
    'A',
];

type HandType = 'high_card' | 'one_pair' | 'two_pair' | 'three_of_kind' | 'full_house' | 'four_of_kind' | 'five_of_kind'

const HAND_TYPE = [
    'high_card',
    'one_pair',
    'two_pair',
    'three_of_kind',
    'full_house',
    'four_of_kind',
    'five_of_kind'
]

const DEFAULT_HAND_TYPE_OBJECT: Record<Card, number> = {
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    'T': 0,
    'J': 0,
    'Q': 0,
    'K': 0,
    'A': 0
};

const getHandType = (cards: Card[]): HandType => {
    // @ts-ignore
    const counts = Object.entries(cards.reduce((total, current) => {
        total[current] += 1;
        return total;
    }, { ...DEFAULT_HAND_TYPE_OBJECT }));

    const isFiveOfKind = counts.find(([key, value]) => value === 5);
    if (isFiveOfKind) return 'five_of_kind';

    const isFourOfKind = counts.find(([key, value]) => value === 4);
    if (isFourOfKind) return 'four_of_kind';

    const isFullHouse = counts.find(([key, value]) => value === 3) && counts.find(([key, value]) => value === 2);
    if (isFullHouse) return 'full_house';

    const isThreeOfKind = counts.find(([key, value]) => value === 3);
    if (isThreeOfKind) return 'three_of_kind';

    const isTwoPairs = counts.filter(([key, value]) => value === 2).length === 2;
    if (isTwoPairs) return 'two_pair';

    const isPair = counts.find(([key, value]) => value === 2);
    if (isPair) return 'one_pair';

    return 'high_card';
}

// Add handType to hand
hands.forEach((hand, index) => {
    const cards = hand[0].split('') as Card[];

    const handType = getHandType(cards);
    hands[index][2] = handType; 
});

hands.sort((a, b) => {
    const handTypeA = a[2];
    const handTypeB = b[2];
    if (handTypeA !== handTypeB) {
        return HAND_TYPE.indexOf(handTypeA) - HAND_TYPE.indexOf(handTypeB)
    }

    const handA = a[0]
    const handB  =b[0]
    for (let index = 0; index < handA.length; index++) {
        if (handA[index] !== handB[index]) {
            return CARD_STRENGTH.indexOf(handA[index]) - CARD_STRENGTH.indexOf(handB[index]);
        }
    }
    return 0;
});

const result = hands.reduce((sum, current, index) => {
    const bid = Number(current[1]);
    const rank = index + 1;
    return sum += bid * rank;
}, 0)

console.log('Result', result);