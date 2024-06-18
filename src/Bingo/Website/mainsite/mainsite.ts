document.getElementById('generate-card').addEventListener('click', async () => {
    const response = await fetch('/create-bingo-card', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ board: generateBingoBoard() }),
    });

    const newCard = await response.json();
    displayBingoBoard(JSON.parse(newCard.board), newCard.id);
});

function generateBingoBoard() {
    const board = [];
    for (let i = 0; i < 5; i++) {
        const row = [];
        for (let j = 0; j < 5; j++) {
            row.push(Math.floor(Math.random() * 100) + 1);
        }
        board.push(row);
    }
    return board;
}

function displayBingoBoard(board, bingoCardId) {
    const bingoBoard = document.getElementById('bingo-board');
    bingoBoard.innerHTML = '';
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('bingo-cell');
            cellElement.textContent = cell;
            cellElement.addEventListener('click', async () => {
                cellElement.classList.toggle('marked');
                await fetch('/click-card', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: 1, // Replace with the actual user ID
                        bingoCardId,
                        row: rowIndex,
                        col: colIndex,
                    }),
                });
            });
            bingoBoard.appendChild(cellElement);
        });
    });
}
