import fs from 'fs';

interface Card {
    id: number,
    cardNumbers: number[],
    yourNumbers: number[],
}

export const day4 = () => {
    const lineToCard = (line: string) => {
        const idDataStr = line.split(':');
        const id = Number.parseInt(idDataStr[0].split(' ').filter(s => s !== '')[1]);
        const numbersStr = idDataStr[1].split('|');
        const card: Card = {
            id,
            cardNumbers: numbersStr[0].split(' ').filter(v => v !== '').map(n => Number.parseInt(n)),
            yourNumbers: numbersStr[1].split(' ').filter(v => v !== '').map(n => Number.parseInt(n)),
        };
        return card;
    };

    const cardGetNumMatches = (card: Card) => {
        let matches = 0;
        for (let i = 0; i < card.yourNumbers.length; i++) {
            if (card.cardNumbers.includes(card.yourNumbers[i])) matches += 1;
        }
        return matches;
    };

    const cardToPointsWon = (card: Card) => {
        const matches = cardGetNumMatches(card);
        return matches > 0 ? Math.pow(2, matches - 1) : 0;
    };

    const part1 = (cards: Card[]) => {
        return cards.map(c => cardToPointsWon(c)).reduce((total, current) => total + current, 0);
    };

    const part2 = (cards: Card[]) => {
        // misunderstood rules, the result is the number of cards you had + all cards won
        interface CardWithMatchCount extends Card {
            matches: number
        }
        const pointCards: CardWithMatchCount[] = cards.map(c => ({...c, matches: cardGetNumMatches(c) }));
        const cardMap = new Map<number, CardWithMatchCount>();
        for (let i = 0; i < pointCards.length; i++) cardMap.set(pointCards[i].id, pointCards[i]);
        // reuse card input as stack
        let result = 0;
        while (pointCards.length > 0) {
            const card = pointCards.pop()!;
            result++;
            if (card.matches > 0) {
                for (let cardId = card.id + 1; cardId <= card.id + card.matches; cardId++) {
                    const cardToPush = cardMap.get(cardId);
                    if (cardToPush !== undefined) pointCards.push(cardToPush);
                }
            }
        }
        return result++;
    };

    fs.readFile('input/day4.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const lines = data.split('\r\n');
        const cards = lines.map(line => lineToCard(line));
        console.log('part 1:', part1(cards));
        console.log('part 2:', part2(cards));
    });
};
