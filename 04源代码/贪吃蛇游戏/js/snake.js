function Snake() {
    this.body = [{
            "row": 3,
            "col": 5
        },
        {
            "row": 3,
            "col": 4
        },
        {
            "row": 3,
            "col": 3
        },
        {
            "row": 3,
            "col": 2
        }
    ];
    // 蛇的运动放心
    this.direction = "R"
    // 即将改变的方向：为了防止出现原地掉头的情况
    this.willDirection = "R"
}

// 蛇的运动
Snake.prototype.update = function () {
    // 当前的direction接收
    this.direction = this.willDirection
    switch (this.direction) {
        case "R":
            this.body.unshift({
                "row": this.body[0].row,
                "col": this.body[0].col + 1
            })
            break;
        case "D":
            this.body.unshift({
                "row": this.body[0].row + 1,
                "col": this.body[0].col
            })
            break;
        case "L":
            this.body.unshift({
                "row": this.body[0].row,
                "col": this.body[0].col - 1
            })
            break;
        case "U":
            this.body.unshift({
                "row": this.body[0].row - 1,
                "col": this.body[0].col
            })
            break;

        default:
            break;
    }
    //蛇死亡的判定方式 超出table边缘部分
    if (this.body[0].col > game.col - 1 || this.body[0].row > game.row - 1 || this.body[0].col < 0 || this.body[0].row < 0) {
        // alert('结束了')
        clearInterval(game.timer)
    }
    // 自己撞到自己
    for (let i = 1; i < this.body.length; i++) {
        if (this.body[0].row === this.body[i].row && this.body[0].col === this.body[i].col) {
            // alert('死亡了')
            clearInterval(game.timer)
        }
    }
    // 蛇吃食物
    /**
     * 若没吃
     * else 若吃到食物不进行尾部删除，
     */
    if (this.body[0].row === game.food.row && this.body[0].col === game.food.col) {
        game.food= new Food(game)
        game.score++
        // 让帧编号归0,因为蛇吃到食物会猛蹿一下
        game.f = 0
    } else {
        this.body.pop()
    }

}

// 蛇的方向改变，防止在一次渲染之前会出现掉头情况
Snake.prototype.changeDirection = function (d) {
    this.willDirection = d
}

Snake.prototype.render = function () {
    // 蛇头渲染
    game.setColor(this.body[0].row, this.body[0].col, 'pink')
    // 身体渲染
    for (let i = 1; i < this.body.length; i++) {
        game.setColor(this.body[i].row, this.body[i].col, 'cyan')
    }
}