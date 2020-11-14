/*** 
 * 给定一个字符串，逐个翻转字符串中的每个单词。

说明：

无空格字符构成一个 单词 。
输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
 

示例 1：

输入："the sky is blue"
输出："blue is sky the"
示例 2：

输入："  hello world!  "
输出："world! hello"
解释：输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
*/
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    //遍历s 然后吧连续的空格全部去掉
    let newStr = ''
    let returnStr = ''
    for(let i =0;i<s.length;i++){
        if(!(s.charAt(i) === ''&& newStr.charAt(newStr.length-1) === '')){
            newStr+=s.charAt(i)
        }
    }
    let arr = newStr.split(' ')
    for(let i =0;i<arr.length;i++){
        returnStr += arr[arr.length-1-i]+' '
    }
    return returnStr.trim()
};
console.log(reverseWords('the sky is blue'))
console.log(reverseWords('  hello world!  '))