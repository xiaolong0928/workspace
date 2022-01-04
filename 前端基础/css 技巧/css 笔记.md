## text-transform
text-transform : 把文字大小写的转变

## css 性能优化
    will-change:transform; -提高页面动画性能
    transform:translateZ(0); 开启硬件加速

## 隐藏元素常用汇总
```css
    display:none;#直接隐藏，移出文档流
    opacity:0;#透明度为0，仍在文档流中，点击事件仍然有效
    visibility:hidden;#透明度为0，仍在文档流中，但是点击事件无效
    content-visibily:hidden;#移出文档流
    position:absolute;#取巧，移出可视区域
    top:-9999px;
    left:-9999px;
    font-size:0;#只针对于文字
```
