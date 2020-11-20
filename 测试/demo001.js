// 测试aysn await
 function sleep(time,word){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log(word)
            resolve()
        }, time);
    })
}
function sleep2(time,word){
    
}
async function test(){
    await sleep(500,'1111')
    await sleep(500,'2222')
    console.log('3333333333')
}
test()