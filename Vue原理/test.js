function copy(content) {
    if (typeof content === 'object' && content !== null) {
        let cloneObj = content.isArray() ? [] : {}
        for (const key in content) {
            if (Object.hasOwnProperty(key)) {
                cloneObj[key] = typeof content[key] === 'object' ? copy(content[key]) : content[key]
            }
        }
        return cloneObj
    }
}

// apply call bind
Function.prototype.mycall = function (content) {
    let context = content || window
    context.fn = this
    let args = [...arguments].slice(1)
    let result = context.fn(...args)
    delete context.fn
    return result
}
// apply
Function.prototype.myapply = function (content, arguments) {
    let context = content || window
    context.fn = this
    let result
    if (arguments.length > 0) {
        result = context.fn(...arguments)
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}

//bind
Function.prototype.mybind = function (content) {
    let self = this
    console.log(this)
    let arg = [...arguments].slice(1)
    return function () {
        let newArg = [...arguments]
        return self.apply(content, arg.concat(newArg))
    }
}
let obj3 = {
    c: 3,
    d: 4
}

function add(a, b) {
    return a + b + this.c + this.d
}
console.log(add.mycall(obj3, 1, 2))
console.log(add.myapply(obj3, [1, 2]))
console.log(add.mybind(obj3, 1, 2)())