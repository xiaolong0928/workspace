/*** 
 * 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。
示例：
给定一个链表: 1->2->3->4->5, 和 n = 2.
当删除了倒数第二个节点后，链表变为 1->2->3->5.
说明：
给定的 n 保证是有效的。
进阶：
你能尝试使用一趟扫描实现吗？
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
// 思路 遍历list 一次把所有的节点都存到数组 然后找到倒数第N个执行
var removeNthFromEnd = function(head, n) {
    let total = []
    let current = head
    while(current.next){
        total.push(current)
        current = current.next
    }
    // 最后一个push进去
    total.push(current)
    if(total.length === 1 && n === 1){
        return null
    }
    // 判断倒数第n+1 在不在
    let previous = total[total.length - n-1]
    let next = total[total.length -n +1]
    if(previous){
        previous.next = next
        return total[0]
    } else {
        // 这种情况是删除第一个
        if(n === total.length){
            return total[1]
        } 
        return total[total.length -n]
    }
};

// 思路：保存一份fist 和 second 都一样 然后first先走N步 最后遍历到末尾 刚好相差N个
var removeNthFromEnd2 = function(head, n) {
    let first = head, second = head;
    while (n > 0) {
      first = first.next
      n--
    }
    if (!first) return head.next;     // 删除的是头节点
    while (first.next) {
      first = first.next;
      second = second.next;
    }
    second.next = second.next.next;
    return head
  

function ListNode(val, next) {
         this.val = (val===undefined ? 0 : val)
         this.next = (next===undefined ? null : next)
}
