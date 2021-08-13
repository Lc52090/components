// 深拷贝
function deepcopy(obj) {
    if (typeof obj === 'object' && obj !== null) {
        let objClone = Array.isArray(obj) ? [] : {}
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                // 判断obj[key]是否为对象，如果是对象需要递归，不是直接赋值
                objClone[key] = typeof obj[key] === 'object' ? deepcopy(obj[key]) : obj[key]
            }
        }
        return objClone
    }
}
// 实现call，apply
Function.prototype.Funcall = function (context) {
    let content = context || window
    content.fn = this
    let args = [...arguments].slice(1)
    const result = content.fn(...args)
    delete content.fn
    return result
}
//apply
Function.prototype.Funapply = function (context, arguments) {
    let content = context || window
    content.fn = this
    let result
    if (!arguments) {
        result = content.fn()
    } else {
        if (!(arguments instanceof Array)) throw new Error('params must be array')
        result = content.fn(...arguments)
    }
    delete content.fn
    return result
}
//bind
Function.prototype.Funbind = function (context) {
    //返回一个绑定this的函数，我们需要在此保存this
    let self = this
    // 可以支持柯里化传参，保存参数
    let arg = [...arguments].slice(1)
    // 返回一个函数
    return function () {
        //同样因为支持柯里化形式传参我们需要再次获取存储参数
        let newArg = [...arguments]
        //返回函数绑定this，传入两次保存的参数
        //考虑返回函数有返回值做了return
        return self.apply(context, arg.concat(newArg))
    }
}
/* const obj = {
    a: 1,
    b: 2
}

function add(c, d) {
    return this.a + this.b + c + d;
}
console.log(add.Funcall(obj, 3, 4))

console.log(add.Funapply(obj, [3, 4]))
console.log(add.Funbind(obj, 3, 4)()) */


