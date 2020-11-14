/** 
 * 给定一个 没有重复 数字的序列，返回其所有可能的全排列。

示例:

输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]

*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    if(nums.length <= 1) return [nums]
    if(nums.length === 2) return [nums,[nums[1],nums[0]]]
    let total = []
    for(let i=0;i<nums.length;i++){
        let item = [nums[i]]
        let rest = JSON.parse(JSON.stringify(nums))
        rest.splice(i,1)
        getAllSelect(item,rest)
    }
    function getAllSelect(current,rest){
        if(rest.length === 2){
            total.push([...current,rest[0],rest[1]])
            total.push([...current,rest[1],rest[0]])
            // console.log(total)
        } else {
            for(let i=0;i<rest.length;i++){
                current.push(rest[i])
                let newRest = JSON.parse(JSON.stringify(rest))
                newRest.splice(i,1)
                getAllSelect(current,newRest)
            }
        }
    }
    return total
};                                                                                 
console.log(permute([1,2,3,4]))