import puzzle_input from './puzzle_input.txt';

const hands = puzzle_input.split('\n')
.map((hand) => hand.split(' '));

type Card = 'J' |
'2'|
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
    'J',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'T',
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
    'J': 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    'T': 0,
    'Q': 0,
    'K': 0,
    'A': 0
};

const isFullHouse = (counts: [key: string, value: number][], JCount: number) => {
    const [matchThreeKey] = counts.find(([key, value]) => value === (3 - JCount)) || [0, 0];
    const matchTwoKey = counts.find(([key, value]) => value === 2 && key !== matchThreeKey);
    if (matchThreeKey && matchTwoKey) return true;

    const [matchTwoKeyBis] = counts.find(([key, value]) => value === (2 - JCount)) || [0, 0];
    const matchThreeKeyBis = counts.find(([key, value]) => value === 3 && key !== matchThreeKey);
    if (matchThreeKeyBis && matchTwoKeyBis) return true;

    return false;

}

const getHandType = (cards: Card[]): HandType => {
    const mapCount = cards.reduce((total, current) => {
        total[current] += 1;
        return total;
    }, { ...DEFAULT_HAND_TYPE_OBJECT })
    const JCount = mapCount.J
    // @ts-ignore
    delete mapCount.J;
    // @ts-ignore
    const counts = Object.entries(mapCount);


    const isFiveOfKind = counts.find(([key, value]) => value === (5 - JCount));
    if (isFiveOfKind) return 'five_of_kind';

    const isFourOfKind = counts.find(([key, value]) => value === (4 - JCount));
    if (isFourOfKind) return 'four_of_kind';

    const isFullHouse_ = isFullHouse(counts, JCount)
    if (isFullHouse_) return 'full_house';

    const isThreeOfKind = counts.find(([key, value]) => value === (3 - JCount));
    if (isThreeOfKind) return 'three_of_kind';

    const isTwoPairs = counts.filter(([key, value]) => value === 2).length === 2;
    if (isTwoPairs) return 'two_pair';

    const isPair = counts.find(([key, value]) => value === (2 - JCount));
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