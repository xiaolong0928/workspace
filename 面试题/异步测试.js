/**
 * 请写出两种或两种以上实现方法满足: execute 对应的id按顺序打印
 * PS: 尝试只修改start函数体
 *
 * 输出结果参考:
 * id 0
 * id 1
 * id 2
 * id 3
 * id 4
 */

  
  // 测试代码 (请勿更改):
  
  for (let i = 0; i < 5; i++) {
    start(i);
  }
  
  function sleep() {
    const duration = Math.floor(Math.random() * 500);
    return new Promise(resolve => setTimeout(resolve, duration));
  }
  
  function execute(id) {
    return sleep().then(() => {
      console.log("id", id);
    });
  }

//   function start(id) {
//     execute(id).catch(console.error);
//   }

// 用promise
function start(id){
    start.kk = !start.kk
    ? execute(id)
    : start.kk.then(() => execute(id));
}
  
// function start(id) {
//   if (id === 0) {
//       const exc = (id) => {
//           execute(id).then(() => {
//               if (id < 4) {
//                   exc(++id)
//               }
//           })
//       }
//       exc(id)
//   }
// }
