# JS常用code集合

### 1.获取文字的宽高-便于计算
```js
    function getTextWidthAndHeight(text, fontSize, fontWeight, fontFamily) {
            const node = document.createElement('span')
            node.innerHTML = text
            node.style.fontSize = fontSize
            node.style.fontWeight = fontWeight
            node.style.fontFamily = fontFamily
            document.body.appendChild(node)
            const info = node.getBoundingClientRect()
            document.body.removeChild(node)
            return info
        }
```
### 2. 图片load
```js
    function imageLoad(src){
            return new Promise((resolve,reject)=>{
                const image = new Image()
                image.crossOrigin = 'anonymous'
                image.onload = () => {
                    resolve()
                }
                image.onerror = () => {
                    reject()
                }
                image.src = src
            })
        }
```

### 3. 文件下载--普通下载
```js
    function downloadFile(fileName, url) {
        const a = document.createElement('a')
        a.download = fileName
        a.href = url
        if (typeof a.download === 'undefined') {
            a.setAttribute('target', '_blank')
        }
        a.trigger('click')
    }
```

### 4. 文件下载--MP4、gif下载 -贼好使
```js
    function downloadFileByReq(fileName, url) {
        return new Promise((resolve, reject) => {
            var x = new XMLHttpRequest()
            x.open('GET', url, true)
            x.responseType = 'blob'
            x.onload = function (e) {
                var url = window.URL.createObjectURL(x.response)
                var a = document.createElement('a')
                a.href = url
                a.download = fileName
                if (typeof a.download === 'undefined') {
                    a.setAttribute('target', '_blank')
                }
                a.click()
                resolve()
            }
            x.onerror = function (e) {
                resolve()
            }
            x.send()
        })
}
```
### 5. RGB 转为16进制
```js
    const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
```

### 6. 按需加载js
```js
    function delayLoadJS(path) {
        if (!path) {
            return Promise.reject()
        }
        return new Promise((resolve, reject) => {
            let dom = null
            const scripts = document.querySelectorAll('script')
            for (const item of scripts) {
                if (new RegExp(path).test(item.src)) {
                    dom = item
                    onload(dom, () => resolve())
                    return
                }
            }
            if (!dom) {
                const script = document.createElement('script')
                script.src = path
                script.onload = () => {
                    resolve()
                    script.onload = null
                }
                script.onerror = () => reject()
                document.body.appendChild(script)
            }
        })
    }
```

### 6. 按需加载css
```js
    function delayLoadCSS(path) {
        if (!path) {
            return Promise.reject()
        }
        return new Promise((resolve, reject) => {
            let dom = null
            const links = document.querySelectorAll('link')
            for (const item of links) {
                if (new RegExp(path).test(item.href)) {
                    dom = item
                    onload(dom, resolve)
                    return
                }
            }
            if (!dom) {
                const link = document.createElement('link')
                link.rel = 'stylesheet'
                link.href = path
                link.onload = () => {
                    resolve()
                    link.onload = null
                }
                link.onerror = () => reject()
                document.head.appendChild(link)
            }
        })
    }
```