function diceRoll() {
    return Number.parseFloat((Math.random() * 100).toFixed(2));
}
export function rollOver(rollOverNum = 50) {
    let randomNumber = diceRoll();

    if (randomNumber >= rollOverNum) {
        return {
            isLoser: false,
            previousRollOver: rollOverNum,
            result: randomNumber,
            amountWon: -1,
        };
    } else {
        return {
            isLoser: true,
            previousRollOver: rollOverNum,
            result: randomNumber,
            amountWon: -1,
        };
    }
}
