function Game() {
    // 创建表格 背景
    this.col = 20
    this.row = 20
    this.score = 0
    // 初始化节点
    this.init()
    // 实例化蛇类
    this.snake = new Snake()
    // 执行定时器任务
    this.start()
    // 监听键盘事件
    this.bindEvent()
    // 实例化食物  传入参数是为了让食物刷新的位置不在蛇身上
    this.food = new Food(this)
}
Game.prototype.init = function () {
    // 创建table节点
    this.dom = document.createElement('table')
    let tr, td;
    // 遍历行和列
    for (let i = 0; i < this.row; i++) {
        // 创建tr节点
        tr = document.createElement('tr')
        this.dom.appendChild(tr)
        for (let j = 0; j < this.col; j++) {
            // 创建td节点
            td = document.createElement('td')
            tr.appendChild(td)
        }
    }
    let containerBody = document.getElementById('app')
    containerBody.appendChild(this.dom)
}

// table设置颜色
Game.prototype.setColor = function (row, col, color) {
    this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].style.backgroundColor = color
}

// table清除颜色
Game.prototype.clear = function () {
    for (let i = 0; i < this.row; i++) {
        for (let j = 0; j < this.col; j++) {
            this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].style.backgroundColor = "white"
            this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML = ""
        }
    }
}

// 渲染食物
Game.prototype.setFood = function (row, col, html) {
    this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].innerHTML = html
}
// 设置键盘设置监听
Game.prototype.bindEvent = function () {
    let self
    self = this
    // 键盘事件
    document.onkeydown = function (e) {

        switch (e.keyCode) {
            // 37 left
            case 37:
                // 先进行判断，如果位置是右，则不能向左
                if (self.snake.direction === "R") return
                self.snake.changeDirection("L")
                break;
                // 38 up
            case 38:
                if (self.snake.direction === "D") return
                self.snake.changeDirection("U")
                break;
                // 39 right
            case 39:
                if (self.snake.direction === "L") return
                self.snake.changeDirection("R")
                break;
                // 40 down
            case 40:
                if (self.snake.direction === "U") return
                self.snake.changeDirection("D")
                break;
            default:
                break;
        }
    }
}
Game.prototype.start = function () {
    //帧编号
    this.f = 0
    this.timer = setInterval(function () {
        // 定时器里面的本质就是游戏的渲染本质 :清屏-更新-渲染
        game.f++
        document.getElementById('f').innerHTML = "帧编号:" + game.f
        //渲染分数
        document.getElementById("score").innerHTML = "分数:" + game.score
        //清除屏幕
        game.clear()
        // 蛇的更新
        // 蛇的更新速度，当蛇变长的时候速度加快
        let during
        if (game.snake.body.length < 30) {
            during = 30 - game.snake.body.length
        } else {
            during = 1
        }
        // 蛇的渲染更新 蛇的身体越长，during越小，game.f % during为0的速度越快
        if (game.f % during === 0) {
            game.snake.update()
        }
        /* game.clear()
        game.snake.update() */
        // 蛇的渲染
        game.snake.render()
        // 渲染食物
        game.food.render()

    }, 20);
}
let game
game = new Game()