# Chrome 开发工具笔记 - console篇

## <font color="#FF3232">$0-$4</font>
在chrome的console面板中，$0表示对当前选中html节点的引用
$1 就是上一次选择节点的引用，以此类推一直到$4

## <font color="#FF3232">$_</font>
我们平时在调试的过程中，经常会打印查看一些变量，但是如果我们想看上一次的表达式的值呢？
$_ 表示对上一次结果的引用

### <font color="#FF3232">log输出</font>
平时我们打印log时，都是直接console.log(index),试试下面的这种方式呢
```js
        console.log(targetIndex, value) // 1.常用方式
        console.log({ targetIndex, value }) // 2.推介使用
        console.table({ targetIndex, value }) // 3.推介使用
```
![log](http://asset.eqh5.com//material/h2/e4caee3bd70f411d92aef1e91ae1aebf/f077175cef03d24216aace0db0353a0aced5?imageMogr2/auto-orient/quality/75/format/webp)