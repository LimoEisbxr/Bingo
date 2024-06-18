import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getBingoGameById(gameId: string) {
    return await prisma.bingoGame.findUnique({
        where: { id: gameId },
        include: { squares: true },
    });
}

async function displayBingoField(gameId: string) {
    const game = await getBingoGameById(gameId);
    if (!game) {
        console.log('Spiel nicht gefunden.');
        return;
    }
    console.log(`Bingo-Spiel: ${game.name}`);
    game.squares.forEach((square, index) => {
        console.log(
            `${index + 1}: ${square.value} - ${
                square.checked ? 'Geprüft' : 'Nicht geprüft'
            }`
        );
    });
}

// Beispielaufruf, ersetze 'deine_spiel_id' mit einer tatsächlichen Spiel-ID
displayBingoField('deine_spiel_id').catch(console.error);
