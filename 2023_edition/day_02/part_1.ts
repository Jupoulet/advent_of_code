import puzzle_input from './input.txt';

const stringsList = puzzle_input.split('\n');

const bagConfiguration: Record<keyof Set, number> = {
    green: 13,
    blue: 14,
    red: 12,
};

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

const isGameMatchingBagConfig = (game: Game): boolean => {
    return game.sets.every((set) => (set.red || 0) <= 12) &&
        game.sets.every((set) => (set.blue || 0) <= 14) &&
        game.sets.every((set) => (set.green || 0) <= 13);
}

const formattedGames = stringsListIntoGames(stringsList);

const result = (games: Game[]) => {
    return games.filter(isGameMatchingBagConfig).map((g) => g.id).reduce((sum, current) => sum + current, 0);
}

console.log('Result', result(formattedGames));