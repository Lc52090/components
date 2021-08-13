function Food(gameSnake) {
    let myself = this
    do {
        this.row = parseInt(Math.random() * (gameSnake.row))
        this.col = parseInt(Math.random() * (gameSnake.col))

    } while ((function () {
            for (let i = 0; i < gameSnake.snake.body.length; i++) {
                if (myself.row === gameSnake.snake.body[i].row && myself.col === gameSnake.snake.body[i].col) {
                    return true
                }
            }
            return false
        })());

}
Food.prototype.render = function () {
    game.setFood(this.row, this.col, "❤")
}