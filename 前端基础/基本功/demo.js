// 测试代码
function Person(name,age){
    this.name = name
    this.age = age
    console.log('i am alive!')
}

let p1 = new Person('小明',24)

function create() {
    // 创建一个空的对象
    let obj = new Object()
    // 拿到传参
    let Con = [].shift.call(arguments)
    console.log(arguments,Con)
    // 链接到原型
    obj.__proto__ = Con.prototype
    // 绑定 this，执行构造函数
    let result = Con.apply(obj, arguments)
    // 确保 new 出来的是个对象
    return typeof result === 'object' ? result : obj
}
let p2 = create(Person,'小三',19)