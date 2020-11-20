/****
 * 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

示例 1：

输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。
示例 2：

输入: "cbbd"
输出: "bb"
 */
/**
 * @param {string} s
 * @return {string}
 */
// 思路：暴力解决 提交答案超时 难受
var longestPalindrome = function(s) {
    if(s.length <= 1) return s
    let maxStr = ''
    for(let i=0;i<s.length;i++){
        for(let j=i+1;j<s.length;j++){
            if(s.charAt(i) === s.charAt(j)){
                let newStr = s.substring(i,j+1) 
                let tranStr = newStr.split('').reverse().join('')
                if(newStr === tranStr){
                    if(newStr.length > maxStr.length){
                        maxStr = newStr
                    }
                }
            }
        }
    }
   
    if(maxStr === ''){
        return s.charAt(0)
    } else {
        return maxStr
    }
};
// 版本2
var longestPalindrome2 = function(s) {
    const len = s.length;
    if (len <= 1) {
      return s;
    }
    let maxLength = 1;
    let maxStr = s.substring(0, 1);   
    const p = [];
    for (let i = 0; i < len; i++) {
      p[i] = new Array(len);
    }
    for (let r = 1; r < len; r++) {
      for (let l = 0; l < r; l++) {
        if (s[l] === s[r] && (r - l <= 2 || p[l + 1][r - 1])) {
          p[l][r] = true;
          if (r - l + 1 > maxLength) {
            maxLength = r - l + 1;
            maxStr = s.substring(l, r + 1);
          }
        }
      }
    }
    return maxStr;
  }

//   方法2（中心扩展法，顾名思义，找对称中心，来进行查询该对称中心的回文数有多长，对称中心总共有2n-1个（因为包含奇对称和偶对称的情况），然后保存最长的起止位置，最后返回，这种算法时间复杂度也是O(n^2)，代码如下
var longestPalindrome = function(s) {
    if (s == null || s.length < 1) return "";
    let start = 0, end = 0;
    for (let i = 0; i < s.length; i++) {
    	// 查询以i为中心和以（i+1+1）/2为中心的长度
        let len1 = expandAroundCenter(s, i, i);
        let len2 = expandAroundCenter(s, i, i + 1);
        let len = Math.max(len1, len2);
        // 如果此位置为中心的回文数长度大于之前的长度，则进行处理
        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);
        }
    }
    return s.substring(start, end + 1);
}
// 查询s在left，right位置的对称长度
function expandAroundCenter(s, left, right) {
    let L = left, R = right;
    while (L >= 0 && R < s.length && s[L] == s[R]) {
        L--;
        R++;
    }
    return R - L - 1;
}

// 方法3(manacher算法)：
var longestPalindrome = function(s) {
    let str = '#' + s.split('').join('#') + '#';
    let len = str.length, maxRight = 0, p = [];
    let maxIndex = 0, maxLenIndex = 0;
    p[0] = 0;

    for(let i = 1; i < len; i++) {
    let j = 2*maxIndex -i;
    if (i < maxRight) {
        if (i + p[j] < maxRight) {
        p[i] = p[j];
        continue;
        } else if(i + p[j] > maxRight) {
            p[i] = maxRight - i;
        continue;
        }
    }
    let right = maxRight + 1;
    let left = 2*i - maxRight - 1;
    while(left >=0 && right < len && str[left]===str[right]) {
        left --;
        right ++;
    }
    p[i] = right-i-1;
    maxIndex = i;
    maxRight = p[i] + i;
    if(p[i] > p[maxLenIndex]) {
        maxLenIndex = i;
    }
    }
    return str.substring(maxLenIndex-p[maxLenIndex]+1,maxLenIndex + p[maxLenIndex]).split('#').join('');
};
console.log(longestPalindrome('ba'))
console.log(longestPalindrome('b'))
console.log(longestPalindrome('babab'))
console.log(longestPalindrome('cbba'))