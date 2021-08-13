function Game() {
    this.row = 20
    this.col = 20
    this.score = 0
    this.init()
    this.snake = new Snake()
    this.food = new Food(this)
    this.bindEvent()
    this.start()

}
Game.prototype.init = function () {
    this.dom = document.getElementById('box')
    this.table = document.createElement('table')
    for (let i = 0; i < this.row; i++) {
        let tr = document.createElement('tr')
        this.table.appendChild(tr)
        for (let j = 0; j < this.col; j++) {
            let td = document.createElement('td')
            tr.appendChild(td)
        }
    }
    this.dom.appendChild(this.table)
}
// 设置颜色
Game.prototype.setColor = function (row, col, color) {
    this.table.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].style.background = color
}
// 设置食物
Game.prototype.setFood = function (row, col, html) {
    this.table.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].innerHTML = html
}
// 清除颜色
Game.prototype.clear = function () {
    for (let i = 0; i < this.row; i++) {
        for (let j = 0; j < this.col; j++) {
            this.table.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].style.backgroundColor = "#eee"
            this.table.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML = ""
        }

    }
}
// 监听键盘事件
Game.prototype.bindEvent = function () {
    let self = this
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 37:
                self.snake.direction = "L"
                break;
            case 38:
                self.snake.direction = "U"
                break;
            case 39:
                self.snake.direction = "R"
                break;
            case 40:
                self.snake.direction = "D"
                break;

            default:
                break;
        }
    }

}
// 执行渲染
Game.prototype.start = function () {
    this.f = 0
    this.timer = setInterval(function () {
        game.f++
        document.getElementById("score").innerHTML = "分数:" + game.score
        game.clear()
        // 蛇运动
        let during = game.snake.body.length < 30 ? 30 - game.snake.body.length : 1
        if (game.f % during === 0) {
            game.snake.update()
        }
        // 食物和蛇渲染
        game.snake.render()
        game.food.render()
    }, 20)
}
let game;
game = new Game()