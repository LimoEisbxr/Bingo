import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

app.post('/create-bingo-card', async (req, res) => {
    const board = req.body.board;

    const newCard = await prisma.bingoCard.create({
        data: {
            board: JSON.stringify(board),
        },
    });

    res.json(newCard);
});

app.get('/bingo-cards', async (req, res) => {
    const cards = await prisma.bingoCard.findMany();
    res.json(cards);
});

app.post('/click-card', async (req, res) => {
    const { userId, bingoCardId, row, col } = req.body;

    // Add the click to the database
    await prisma.click.create({
        data: {
            userId,
            bingoCardId,
            row,
            col,
        },
    });

    // Count the number of users who have clicked this card
    const totalUsers = await prisma.user.count();
    const clickedUsers = await prisma.click.count({
        where: {
            bingoCardId,
            row,
            col,
        },
    });

    // If at least 50% of users have clicked this card, mark it as clicked for all users
    if (clickedUsers >= totalUsers / 2) {
        await prisma.click.createMany({
            data: Array.from({ length: totalUsers }, (_, i) => ({
                userId: i + 1,
                bingoCardId,
                row,
                col,
            })),
            skipDuplicates: true,
        });
    }

    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
