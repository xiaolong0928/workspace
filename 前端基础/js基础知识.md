# 基础知识
## js执行上下文
    * 全局执行上下文：任何不在函数内的代码都在全局上下文中，主要干俩事儿：1.创建全局window对象（浏览器），并且设置this等于它，全局对象有且仅有一个
    * 函数执行上下文：每当函数创建时，都会创建一个新的函数执行上下文
    * eval执行上下文：暂时不做讨论
    this的理解： 谁调用我，我就指向谁！

## 作用域
  作用域就是定义变量的区域，也就是确定当前变量的访问权限，js采用的是词法作用域，也就是静态作用域，函数的作用域基于函数创建的位置
  * 静态作用域和动态作用域区别：区别就是静态在代码定义的那一刻就决定了，动态的要执行的时候才能知道，下面我们看个例子就知道了
  ```js
    var key = 'global';
    function foo() {
        console.log(key);
    }
    function bar() {
        var key = 'inner';
        foo();
    }
    bar(); // 打印出啥？
  ```   
  哈哈哈，当然打印出‘global’啦   
  执行 foo 函数，先从 foo 函数内部查找是否有局部变量 key，如果没有，就根据书写的位置，查找上面一层的代码，也就是 key 等于 global，所以结果会打印 global。

假设JavaScript采用动态作用域，让我们分析下执行过程：

执行 foo 函数，依然是从 foo 函数内部查找是否有局部变量 key。如果没有，就从调用函数的作用域，也就是 bar 函数内部查找 key 变量，所以结果会打印 inner。

## 作用域链
    一句话就是每一个作用域都保存着父级的作用域，形成一个链条

## js的基本数据类型
* Number String Boolean undefined null  Symbol Bigint
* 复杂数据类型Object   
Object 包含了一些子类型：Date Function RegExp Array 等

## settimeout的小知识
* 由于消息队列的机制，不一定会准时执行
* settimeout嵌套settimeout时，系统会设置最短时间为4ms
* 未激活的页面 settimeout最短为1000ms
* 延时执行时间最大值为2147483647(32bit)，溢出这个值会导致定时器立即执行
```js
        setTimeout(()=> {
            console.log('这里会立即执行')
        } ,2147483648)
```

## 类数组变成数组
类数组是指具有length属性，但是不具有数组原型上的方法，比方说arguments和dom操作返回的就是类数组   
*  ```Array.from(document.querySelectorAll('span'))```
* ``` Array.prototype.slice.call(document.querySelectorAll('span'))```
* ```[...document.querySelectorAll('span')] ``` 

## 数据类型监测
用``` typeof ``` 来判断，但是引用类型无法判别，所以还是用 ```instanceof``` 基于原型链来判断比较好
```js
function checkType(param) {
  return Object.prototype.toString.call(param)
}

console.log(checkType(123)) //[object Number]
console.log(checkType("123")) //[object String]
console.log(checkType(true)) //[object Boolean]
console.log(checkType({ a: 123 })) //[object Object]
console.log(checkType(() => {})) //[object Function]
console.log(Symbol(1)) //Symbol(1)
console.log(null) //null
console.log(undefined) //undefined
```
进一步改进
```js
function checkType(param) {
  return Object.prototype.toString.call(param).slice(8, -1).toLowerCase()
}

console.log(checkType(1)) // number
```
这样子就什么类型都可以判断啦

## == 和 === 区别和隐式数据转化
=== ： 是严格相等，不仅要求值相等，而且俩边的数据类型也必须一致 比如：``` '1' === 1 // false ```   
== : 只要求值相等即可，这个时候就会发生隐式数据转换，为什么呢？当js编译器遇到俩边类型不一致时，cpu无法计算（因为类型不同，占据的字节不同），这个时候编译器就会自动把俩边的数据类型转换为一致进行比较   
* 转换为String型‘+’： 比如：``` '1'+1 = '11' ```    
* 转换为number类型：++、--(自增自减运算符) + 、-、*、/、%(加减乘除取余算术运算符) >、 <、 >=、 <=、 ==、 !=、 ===、 !== (关系运算符) 简单来记就是除了+ 其余都会转为bumber
* 转换为boolean类型：只有这八种转换为false其余都为true   
```js
     0、-0、NaN、undefined、null、“”(空字符串)、false、document.all()
```
* 如果其中一方为Object，且另一方为String、Number或者Symbol，会将Object转换成字符串，再进行比较
```js
    // 常用坑爹面试题
    //字符串连接符
console.log(1 + 'true')// +是字符串连接符, String(1) + 'true'，打印出'1true'

//算术运算符
console.log(1 + true) // +是算术运算符,true被Number(true)->1,打印出2
console.log(1 + undefined) // 1 + Number(undefined) -> 1 + NaN, 打印NaN
console.log(1 + null) // 1 + Number(null) -> 1 + 0,打印出1

//关系运算符
// 一边数字一边字符串,Number("2")
// 2 > 5,打印false
console.log("2" > 5)
// 两边字符串,调用"2".charCodeAt() -> 50 
// "5".charAtCode()-> 53, 打印false
console.log("2" > "5") 

//多个字符串从左往右匹配,也是调用charCodeAt方法进行比较
//比较"a".charCodeAt() < "b".charCodeAt(),打印false
console.log("abc" > "b") 

// 左边第一个"a"和右边第一个"a"的unicode编码相等
// 继续比较两边第二个字符, "b" > "a",打印true
console.log("abc" > "aaa") 

//无视上述规则自成体系
console.log(NaN == NaN) // NaN和任何数据比较都是 false
console.log(undefined == undefined) //true
console.log(undefined === undefined) //true
console.log(undefined == null) //true
console.log(undefined === null) //false
```
然而对于复杂的数据类型，比如数组和对象，对象和字符串比较：还需要绕一点，先用valueOf取得原始值，然后根据需要是否需要调用toString，然后再进行比较
```js
    //发生了a.valueOf().toString()的转化，打印true
    console.log([1,2] == "1,2") 

    // 发生了a.valueOf().toString()的转化，打印true
    let a = {}
    console.log(a == "[object Object]") 
```
对象转原始类型，会调用内置的```[ToPrimitive]```函数，对于该函数而言，其逻辑如下：   
* 如果有设置Symbol.toPrimitive()方法，会优先调用并返回数据
* 调用valueOf()，如果转换为原始类型，则返回
* 调用toString()，如果转换为原始类型，则返回
* 如果没有返回原始类型，则报错   
之前有小伙伴遇到一个面试题，如下：
```js
    //  如何让下列等式成立？
    if(a ==1 && a == 2 && a == 3)
```
哈哈，懵逼了吧，不多说，上代码：
```js
    let a = {
        value: 0,
    // toString(){
    //     return ++a.value
    // },
    // [Symbol.toPrimitive]() {
    //     return ++a.value
    // },
    valueOf() {
        return ++a.value
    },
    }
    console.log(a == 1 && a == 2 && a == 3) //true
```
如果是数组和对象与number类型比较，先用valueOf取得原始值，原始值不是number类型则调用toString，然后再将字符串类型用Number转成数字类型，调用顺序```valueOf() -> toString() -> Number()   ```   
空数组的toString()方法会得到空字符串，而空对象的toString()方法会得到字符串[object Object]
```js
    //发生了这样的转化：Number([].valueOf().toString())，打印true
console.log([] == 0) 

//逻辑非运算符优先级大于关系运算符
//空数组转布尔得到true，然后取反得到false
//false = 0 ，打印true
console.log(![] == 0) 

//左边：{}.valueOf().toString()得到”[object Object]“,Number(”[object Object]“)->NaN
//右边：!{}得到false ,Number(false) -> 0
//两边不相等，打印false
console.log({} == !{})

//左边：[].valueOf().toString()得到空字符串
//右边：![] 得到false
// Number("") = Number(false) 两边都为0
//打印true
console.log([] == ![])

//因为引用数据类型存储在堆中的地址，左边和右边分别属于两块不同的空间
//他们地址不相同，所以两边不相等
//下面两种情况都打印false
console.log([] == [])
console.log({} == {})
```
这儿有一道之前的面试题
```js
    //typof null返回的是object
    console.log(typeof null)

    //从右往左看，先看右边的typeof null整体，返回object之后
    //再将整体看成typeof object
    //打印结果为string,原因是typeof null返回的是object字符串
    console.log(typeof typeof null)

    //到这里也是从右往左看，相当于typeof string
    //结果打印是string
    console.log(typeof typeof typeof null)
```