#CSS 基础知识
### 哪些元素可以开启GPU加速，而不是用浏览器自带的比较慢的渲染器？
```css
    transform filter opacity
```
如何欺骗浏览器开启GPU加速呢？
```css
    transform:translateZ(0);
```
### 一个div 起码可以当几个div来用？   
+ div 
+ after或者before
+ box-shadow