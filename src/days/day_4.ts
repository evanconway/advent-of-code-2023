import fs from 'fs';

interface Card {
    id: number,
    cardNumbers: number[],
    yourNumbers: number[],
    points?: number
}

export const day4 = () => {
    const lineToCard = (line: string) => {
        const idDataStr = line.split(':');
        const id = Number.parseInt(idDataStr[0].split(' ')[1]);
        const numbersStr = idDataStr[1].split('|');
        const card: Card = {
            id,
            cardNumbers: numbersStr[0].split(' ').filter(v => v !== '').map(n => Number.parseInt(n)),
            yourNumbers: numbersStr[1].split(' ').filter(v => v !== '').map(n => Number.parseInt(n)),
        };
        return card;
    };

    const cardToPointsWon = (card: Card) => {
        let matches = -1;
        for (let i = 0; i < card.yourNumbers.length; i++) {
            if (card.cardNumbers.includes(card.yourNumbers[i])) matches += 1;
        }
        return matches >= 0 ? Math.pow(2, matches) : 0;
    };

    const part1 = (cards: Card[]) => {
        return cards.map(c => cardToPointsWon(c)).reduce((total, current) => total + current, 0);
    };

    const part2 = (cards: Card[]) => {
        const pointCards = cards.map(c => ({...c, points: cardToPointsWon(c) }));
        const cardMap = new Map<number, Card>();
        for (let i = 0; i < pointCards.length; i++) cardMap.set(cards[i].id, cards[i]);
        // reuse card input as stack
        let cardsWithNoWin = 0;
        while (cards.length > 0) {
            const card = pointCards.pop()!;
            if (card.points === 0) cardsWithNoWin++;
            else {
                let cardId = card?.id + 1;
            }
        }
    };

    fs.readFile('input/day4.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const lines = data.split('\r\n');
        const cards = lines.map(line => lineToCard(line));
        console.log('part 1:', part1(cards));
    });
};
