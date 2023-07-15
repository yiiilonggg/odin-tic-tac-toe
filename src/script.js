const symbolMap = (() => {
    const getSymbol = (symbol) => {
        const symbolImg = document.createElement("img");
        symbolImg.src = `img/alpha-${symbol}.svg`;
        return symbolImg;
    };
    return { getSymbol };
})();

const playerFactory = (id) => {
    return { id };
}

const gameboard = (() => {
    const board = [['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']];
    const playerOne = playerFactory('x');
    const playerTwo = playerFactory('o');
    let playerOneTurn = true;
    const placeSymbol = (id) => {
        let row = Math.floor((id - 1) / 3), col = (id - 1) % 3;
        if (board[row][col] == '.') {
            board[row][col] = (playerOneTurn) ? playerOne.id : playerTwo.id};
            playerOneTurn = !playerOneTurn;
            displayController.updateBoard();
        }
    ;
    return { board, playerOne, playerTwo, placeSymbol };
})();

const displayController = (() => {
    const filled = new Set();
    const updateBoard = () => {
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const idx = `#c${r * 3 + c + 1}`;
                if (filled.has(idx)) continue;
                const targetCell = document.querySelector(idx);
                if (gameboard.board[r][c] == gameboard.playerOne.id) {
                    targetCell.appendChild(symbolMap.getSymbol(gameboard.playerOne.id));
                    filled.add(idx);
                } else if (gameboard.board[r][c] == gameboard.playerTwo.id) {
                    targetCell.appendChild(symbolMap.getSymbol(gameboard.playerTwo.id));
                    filled.add(idx);
                }
            }
        }
    }
    return { updateBoard };
})();
const cells = document.querySelectorAll(".cell");
cells.forEach(cell => {
    cell.addEventListener('click', (event) => {
        console.log(event);
        gameboard.placeSymbol(Number(event.target.id[1]));
    })
})