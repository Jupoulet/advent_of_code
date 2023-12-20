import puzzle from './puzzle_input.txt';

const formattedInput = puzzle.split('\n').map((row) => row.split(' ')).map((row) => [row[0], row[1].split(',').map(Number)]);

const [row] = formattedInput;

const mess = row[0] as string;
const rules = row[1] as number[];

type SophisticatedRule = {
    value: number;
    satisfied: boolean;
    counter: number;
};

let possibilities: string[] = [];

const sophisticatedRules = rules.map((rule) => ({
    value: rule,
    satisfied: false,
}));

const isSatisfyingRule = (string: string, rule: number, index: number) => {
    const regexPattern = /#+/g;
    const matches = string.match(regexPattern)?.map((match) => match.length);

    if (!matches) return false;
    return matches[index] === rule;
}

const generatePossibilities = (string: string, rules: number[], index: number) => {
    const rule = rules[index];
    if (rules.length === index + 1) return possibilities;

    if (isSatisfyingRule(string, rule, index)) return generatePossibilities(string, rules, index + 1);  
};


const generatePossibility = (string: string, rules: number[]) => {
    // ?###????????
    // ['?', '###', '?']
    let possibility = string;
    rules.forEach((rule, index) => {
        if (isSatisfyingRule(string, rule, index)) {
            const stringToReplace = '#'.repeat(rule);
            possibility.replace(stringToReplace,'x');

            const splitedPossibility = possibility.split('');
            const index = splitedPossibility.indexOf('x');
            if (splitedPossibility[index - 1] === '?') {
                splitedPossibility[index - 1] = '.';
            }
            if (splitedPossibility[index + 1] === '?') {
                splitedPossibility[index + 1] = '.';
            }
            possibility.replace('x', stringToReplace);

        }
    });

}

 // ?###???????

console.log(possibilities);
