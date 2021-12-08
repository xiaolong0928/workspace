/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
 var convert = function(s, numRows) {
     if(numRows === 1){
         return s
     }
    let data = {}
    let row = 0
    let col = 0
    let result=''
     let iteratorCount = numRows>2?(numRows*2-2):numRows
    for(let i=1 ;i<=s.length;i++){
        // 拼接行和列
        let iterator = i%iteratorCount===0?iteratorCount:i%iteratorCount
        if(iterator<=numRows){
            row++
            if(iterator ===1){
                col++
                row=1
            }
        } else {
            row--
            col++
        }
        data[row+''+col] = s[i-1]
    }
    // 遍历输出结果
    for(let i=1;i<=numRows;i++){
        for(let j=1;j<=col;j++){
            if(data[i+''+j]){
                result+=data[i+''+j]
            }
        }
    }
    return result
};

console.log(convert('Apalindromeisaword,phrase,number,orothersequenceofunitsthatcanbereadthesamewayineitherdirection,withgeneralallowancesforadjustmentstopunctuationandworddividers.',2))
console.log(convert('PAYPALISHIRING',4))
// console.log(convert('A',1))