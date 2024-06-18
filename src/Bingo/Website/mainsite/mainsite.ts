// bingo.ts
document.addEventListener('DOMContentLoaded', () => {
    const bingoGrid = document.getElementById('bingoGrid');
    if (bingoGrid !== null) {
        // Rest of the code

        // Beispiel-Daten, ersetze dies durch tatsächliche Daten aus deiner Datenbank
        const squares = [
            { value: 'B1', checked: false },
            { value: 'I1', checked: true },
            // Füge hier weitere Quadrate hinzu, insgesamt 16 für ein 4x4-Feld
        ];

        squares.forEach((square) => {
            const squareElement = document.createElement('div');
            squareElement.classList.add('bingoSquare');
            if (square.checked) {
                squareElement.classList.add('checked');
            }
            squareElement.textContent = square.value;
            bingoGrid.appendChild(squareElement);
        });
    }
});
