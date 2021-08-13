function Snake() {
    this.body = [{
            row: 3,
            col: 6
        },
        {
            row: 3,
            col: 5
        },
        {
            row: 3,
            col: 4
        },
        {
            row: 3,
            col: 3
        }
    ];
    this.direction = "R"
}
// 渲染蛇
Snake.prototype.render = function () {
    game.setColor(this.body[0].row, this.body[0].col, 'pink')
    for (let i = 1; i < this.body.length; i++) {
        game.setColor(this.body[i].row, this.body[i].col, 'cyan')
    }
}

// 蛇的运动
Snake.prototype.update = function () {
    switch (this.direction) {
        case "R":
            this.body.unshift({
                row: this.body[0].row,
                col: this.body[0].col + 1
            })
            break;
        case "L":
            this.body.unshift({
                row: this.body[0].row,
                col: this.body[0].col - 1
            })
            break;
        case "U":
            this.body.unshift({
                row: this.body[0].row - 1,
                col: this.body[0].col
            })
            break;
        case "D":
            this.body.unshift({
                row: this.body[0].row + 1,
                col: this.body[0].col
            })
            break;
        default:
            break;
    }
    // 蛇碰到边界死亡
    if (this.body[0].col > game.col - 1 || this.body[0].row > game.row - 1 || this.body[0].col < 0 || this.body[0].row < 0) {
        alert("游戏结束")
        clearInterval(game.timer)
    }
    // 蛇碰到自己死亡
    for (let i = 1; i < this.body.length; i++) {
        if (this.body[0].row === this.body[i].row && this.body[0].col === this.body[i].col) {
            alert("游戏结束")
            clearInterval(game.timer)
        }
    }
    // 蛇吃到食物
    if (this.body[0].row===game.food.row&&this.body[0].col===game.food.col) {//吃到食物
        game.f=0
        game.score++
        game.food = new Food(game)
    }else{
        this.body.pop()
    }
}