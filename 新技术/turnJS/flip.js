const Flip = {
    constant:{
        pageWrapperNode:1,
        pageBoxNode:2,
        pageNode:3,
        specialWrapperNode:4,
        specialBoxNode:5,
        specialPage:6
    },
    // 初始化参数
    init(option){
        this.$el = option.$el
        this.width = option.width
        this.height = option.height
        this.display = option.display
        this.pageSrc = option.src
        this.pageRange = [] // 需要展示的index 
        // 额外参数
        this.isDrag = false
        // 当前展示页面的索引
        this.currentIndex = 1
        this.allPageData= []
        this.specialPageData = []
        // 将Flip 对象绑定到window上 便于调用
        window.Flip = this
        this.initBook()
    },
    // 初始化整本书
    initBook(){
        // 初始化 book节点
        this.setCss(this.$el,{
            width:this.width+'px',
            height:this.height+'px',
            position:'relative',
            transform:'translate3d(0px, 0px, 0px)'
        })
        // 初始化 page层的页面
        this.renderPages()
        this.bindEvent()
    },
    // 给book节点绑定事件
    bindEvent(){
        this.$el.addEventListener('mousedown',this.mousedown)
        this.$el.addEventListener('mousemove',this.mousemove)
        this.$el.addEventListener('mouseup',this.mouseup)
    },
    /**
     * 根据坐标算出位置
     *  lt rt
     *  lb rb
     */
    calculateOriginPosition(point){
        // 拿到book左上角的位置 计算改点在书中的想对位置
        const bookData = this.$el.getBoundingClientRect()
        const x = point.x - bookData.left
        const y = point.y - bookData.top
        const lr = x > this.width/2?'r':'l'
        const tb = y > this.height/2?'b':'t'
        return {
            x,
            y,
            type:lr+tb
        }
    },
    mousedown(e,self){
        Flip.isDrag = true
        const position = Flip.calculateOriginPosition(Flip.setPoint(e.clientX,e.clientY))
        Flip.foldPageByPoint(position)
    },
    mousemove(e){
        if(Flip.isDrag){
            // console.log('move',e.clientX,e.clientY)
        }
    },
    mouseup(){
        Flip.isDrag = false
    },
    updatePageZindex(index){
        // 不在当前展示和下一页预备 都为-1 当前展示的层级最高
        let resultIndex = -1
        this.allPageData.map(wrapperNode=>{

        })
    },
    // 根据点位折叠 page
    foldPageByPoint(point){
        // 折叠部分为右下角
        if(point.type === 'rb'){
            // 算出折叠角度 以右下角为原点
            const rel = {
                x:Math.abs(point.x - Flip.width),
                y:Math.abs(point.y - Flip.height)
            }
            const middle = {
                x: point.x- Flip.width/2 + rel.x/2,
                y: rel.y/2
            }
            // 获取旋转角度
            const radius = Math.PI/2 - Math.atan2(rel.y,rel.x )
            const angle = Flip.deg(radius)
            gamma = radius - Math.atan2(middle.y, middle.x),
            distance =  Math.max(0, Math.sin(gamma) * Math.sqrt(Math.pow(middle.x, 2) + Math.pow(middle.y, 2)));
            let pageWrapperNode = Flip.allPageData[0]
            let pageBoxNode = pageWrapperNode.firstChild
            let pageNode = pageBoxNode.firstChild
            
            // 计算偏移量
            const tr = {
                x:distance * Math.sin(radius),
                y:distance * Math.cos(radius)
            }
            const dis = Flip.calculateDistance(Flip.point2D(-tr.x,-tr.y), [0,1,1,0], [0, 100], angle)
        //    console.log(dis.x,dis.y,angle)
            console.log(radius,gamma,distance)
            // pageBoxNode 和pageNode 配置的旋转参数 必须相反
            Flip.setCss(pageBoxNode,{
                transformOrigin:'0% 100%',
                transform :`translate3d(${dis.x}px, ${dis.y}px, 0px) rotate(${-angle}deg)`,
            })
            Flip.setCss(pageNode,{
                transformOrigin:'0% 100%',
                transform :`rotate(${angle}deg) translate3d(${-dis.x}px, ${-dis.y}px, 0px) `,
            })

        }
    },
    calculateDistance(tr,c,x,a){
        var f = ['0', 'auto'], mvW = (Flip.width/2-597)*x[0]/100, mvH = (Flip.height-597)*x[1]/100
        // cssA = {left: f[c[0]], top: f[c[1]], right: f[c[2]], bottom: f[c[3]]},
        // cssB = {},
        aliasingFk = (a!=90 && a!=-90) ? 1 : 0
        // origin = x[0] + '% ' + x[1] + '%';
        return {
            x:-tr.x + mvW-aliasingFk,
            y:-tr.y + mvH
        }
    },
    // 渲染page层页面页面
    renderPages(){
        if(Array.isArray(this.pageSrc)){
            // 渲染page层节点
            for(let i=0;i<this.pageSrc.length;i++){
                const imgSrc = this.pageSrc[i]
                // 创建page-wrapper 节点 页数计数从1开始
                const pageWrapperNode = this.generateNode(this.constant.pageWrapperNode,i+1)
                // 创建page-box节点
                const pageBoxNode = this.generateNode(this.constant.pageBoxNode,i+1)
                // 最后创建page节点
                const pageNode = this.generateNode(this.constant.pageNode,i+1,imgSrc)
                
                pageBoxNode.append(pageNode)
                pageWrapperNode.append(pageBoxNode)
                this.$el.append(pageWrapperNode)
                // 将节点信息保存到data 中去 便于取用
                this.allPageData.push(pageWrapperNode)
            }
            const specialWrapperNode = this.generateNode(this.constant.specialWrapperNode)
            this.$el.append(specialWrapperNode)
            // 渲染特效层节点
            for(let i =0;i<this.pageSrc.length;i++){
                const imgSrc = this.pageSrc[i]
                // 创建special 节点 页数计数从1开始
                const specialBoxNode = this.generateNode(this.constant.specialBoxNode,i+1)
                // 最后创建special page节点
                const pageNode = this.generateNode(this.constant.specialPage,i+1,imgSrc)
                specialBoxNode.append(pageNode)
                specialWrapperNode.append(specialBoxNode)
            }
        }
    },
    // 节点生成器 提供3种类型的节点 type:1 page-wrapper 2 page-box 3 eqc-page
    // isOdd 是奇数还是偶数
    generateNode(type,index,imgSrc){
        let node = document.createElement('div')
        if(type === this.constant.pageWrapperNode){
            // 生成page-wrapper节点
            node.classList.add('page-wrapper')
            // 设置页面index
            this.setAttr(node,{page:index})
            this.setCss(node,{
                position:'absolute',
                overflow:'hidden',
                width:this.width/2 +'px',
                height:this.height+'px',
                top:0,
                right:index%2===1?0:'auto',
                left:index%2===1?'auto':0,
                zIndex:index === this.currentIndex?1:-1
            })
        } else if(type === this.constant.pageBoxNode){
            node.classList.add('page-box')
            const width = Math.sqrt(Math.pow(this.width/2,2)+Math.pow(this.height,2))
            this.setCss(node,{
                position:'absolute',
                overflow:'hidden',
                width:width +'px',
                height:width +'px',
                top:0,
                left:0,
            })
        } else if(type === this.constant.pageNode){
            node.classList.add('eqc-page')
            this.setCss(node,{
                position:'absolute',
                width:this.width/2 +'px',
                height:this.height+'px',
                inset:'0px auto auto 0px',
                boxShadow:'rgb(0 0 0 /0%) 0 0 20px'
            })
            const gradientNode = document.createElement('div')
            gradientNode.classList.add('gradient')
            const pageContendNode = document.createElement('div')
            pageContendNode.classList.add('page-content')
            this.setCss(pageContendNode,{
                width:'100%',
                height:'100%',
                background:`url('${imgSrc}') center/cover no-repeat`
            })
            node.append(gradientNode)
            node.append(pageContendNode)
        } else if(type === this.constant.specialWrapperNode){
            // 生成speccial page-wrapper节点
            node.classList.add('special-wrapper')
            this.setCss(node,{
                position:'absolute',
                overflow:'visible',
                top:0,
                left:0,
                zIndex:'auto',
                display:'block',
                pointerEvents:'none'
            })
        } else if (type === this.constant.specialBoxNode){
            node.classList.add('special-box')
            const width = Math.sqrt(Math.pow(this.width/2,2)+Math.pow(this.height,2))
            this.setCss(node,{
                position:'absolute',
                overflow:'hidden',
                width:width +'px',
                height:width +'px',
                top:0,
                left:0,
            })
        } else if (type === this.constant.specialPage){
            node.classList.add('special-eqc-page')
            this.setCss(node,{
                position:'absolute',
                width:this.width/2 +'px',
                height:this.height+'px',
                inset:'0px auto auto 0px',
                boxShadow:'rgb(0 0 0 /0%) 0 0 20px'
            })
            const gradientNode = document.createElement('div')
            gradientNode.classList.add('gradient')
            const pageContendNode = document.createElement('div')
            pageContendNode.classList.add('page-content')
            this.setCss(pageContendNode,{
                width:'100%',
                height:'100%',
                background:`url('${imgSrc}') center/cover no-repeat`
            })
            node.append(gradientNode)
            node.append(pageContendNode)
        }
        return node
    },
    
    // 设置dom的css
    setCss(dom,style){
        if(dom&&style){
            Object.assign(dom.style,style)
        }
    },
    // 设置dom的属性
    setAttr(dom,attr){
        if(dom&&attr){
            for(const key in attr){
                dom.setAttribute(key,attr[key])
            }
        }
    },
    setPoint(x,y){
        return{
            x,y
        }
    },
    deg(radians) {
        return radians/Math.PI*180;
    },
    point2D(x,y){
        return {x: x, y: y}; 
    }
}
