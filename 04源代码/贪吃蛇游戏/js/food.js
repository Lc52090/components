function Food(gameSnake) {
    // 食物的位置
    // do-while 先创建 后判断
    let myself = this
    do {
        this.row = parseInt(Math.random() * (gameSnake.row))
        this.col = parseInt(Math.random() * (gameSnake.col))
    } while ((function () {
        for (let i = 0; i < gameSnake.snake.body.length; i++) {
            if (gameSnake.snake.body[i].row===myself.row&&gameSnake.snake.body[i].col===myself.col) {
                return true
            }
        }
        return false
    })());
}
Food.prototype.render = function () {
    game.setFood(this.row, this.col, '❤')
}