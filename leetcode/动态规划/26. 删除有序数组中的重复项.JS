/**
 * @param {number[]} nums
 * @return {number}
 */
 var removeDuplicates = function(nums) {
    let k=0
    for(let i=0;i<nums.length;i++){
        if(nums[i] !== nums[k-1]){
            nums[k++] = nums[i]
        }
    }
    return k
};

nums = [1,1,2]
console.log(removeDuplicates(nums))
nums2 = [0,0,1,1,1,2,2,3,3,4]
console.log(removeDuplicates(nums2))