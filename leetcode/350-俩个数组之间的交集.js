/*** 
 * 输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2,2]
输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[4,9]
*/
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
    let result = []
    nums1.map(item=>{
        let index = nums2.indexOf(item)
        if(index !== -1){
            result.push(item)
            nums2.splice(index,1)
        }
    })
    return result
};
// 哈希表法
const intersect = (nums1, nums2) => {
    const map = {};
    const res = [];
    for (const num1 of nums1) { // 存下nums1数字的出现次数
      if (map[num1]) {
        map[num1]++;  
      } else {         
        map[num1] = 1; 
      }
    }
    for (const num2 of nums2) { // 遍历nums2看看有没有数字在nums1出现过
      const val = map[num2];
      if (val > 0) {            // 出现过
        res.push(num2);         // 推入res数组
        map[num2]--;            // 匹配掉一个，就少了一个
      }
    }
    return res;
  };
  
 
let nums1 = [1,2,2,1]
let nums2 = [2,2]
console.log(intersect(nums1,nums2))
let nums3 = [4,9,5]
let nums4 = [9,4,9,8,4]
console.log(intersect(nums3,nums4))