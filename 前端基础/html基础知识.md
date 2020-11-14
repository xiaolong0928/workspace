#HTML 基础知识

###DNS预解析   
DNS Prefetch 应该尽量的放在网页的前面，推荐放在 ```<meta charset="UTF-8">``` 后面。具体使用方法如下:
```html
    <meta http-equiv="x-dns-prefetch-control" content="on">
    <link rel="dns-prefetch" href="//www.eqx.net">
    <link rel="dns-prefetch" href="//api.eqx.zhix.net">
    <link rel="dns-prefetch" href="//bdimg.eqx.zhix.net">
```
预解析的实现：    
　　*  用meta信息来告知浏览器, 当前页面要做DNS预解析:<meta http-equiv="x-dns-prefetch-control" content="on" />   
　　* 在页面header中使用link标签来强制对DNS预解析: <link rel="dns-prefetch" href="http://bdimg.share.baidu.com" />
　　禁用预解析：
```html
    <meta http-equiv="x-dns-prefetch-control" content="off">
```