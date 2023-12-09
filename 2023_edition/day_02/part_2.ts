import puzzle_input from './input.txt';

const stringsList = puzzle_input.split('\n');

type Set = {
    blue?: number;
    green?: number;
    red?: number;
}

type Game = {
    id: number;
    sets: Set[];
}

const stringSetToSet = (stringSet: string): Set => {
    const set: Set = {};
    const picks = stringSet.split(', ').map((p) => p.trim());
    picks.forEach((pick) => {
        const [number, color] = pick.split(' ');
        set[color as keyof Set] = Number(number);
    });
    return set;
}

const stringsListIntoGames = (strings: string[]): Game[] => {
    const listOfGames: Game[] = [];

    strings.forEach((s) => {
        const [game, sets] = s.split(':');
        const idGame = Number(game.replace('Game ', ''));
        const stringSets = sets.trim().split(';');
        const gameSets = stringSets.map(stringSetToSet);
        listOfGames.push({
            id: idGame,
            sets: gameSets,
        });
    });
    return listOfGames;
};

const getFewestNumberOfColorCubesNeededByGame = (game: Game): number[] => {
    const colorsCubesNeeded = game.sets.reduce((total, currentSet) => {
        const newTotal = { ...total };
        if (currentSet.blue) newTotal.blue = currentSet.blue > total.blue! ? currentSet.blue : total.blue;
        if (currentSet.green) newTotal.green = currentSet.green > total.green! ? currentSet.green : total.green;
        if (currentSet.red) newTotal.red = currentSet.red > total.red! ? currentSet.red : total.red;
        return newTotal;
    }, { blue: 1, red: 1, green: 1 });

    return Object.values(colorsCubesNeeded);
}

const formattedGames = stringsListIntoGames(stringsList);

const factors: number[] = [];
formattedGames.forEach((game) => {
    const fewestColorCubes = getFewestNumberOfColorCubesNeededByGame(game);
    factors.push(fewestColorCubes.reduce((sum, current) => sum * current, 1));
})

console.log('RESULT', factors.reduce((sum, current) => sum + current, 0));
