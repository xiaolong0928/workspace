### 1. 空值合并运算符
```js
    if(val !== null && val !== undefined && val !==''){
    }
    // 转变后
    if((val??'')!==''){
    }
```

### 2. 可选链式操作符
```js
    const name = target.file?.obj?.name
```