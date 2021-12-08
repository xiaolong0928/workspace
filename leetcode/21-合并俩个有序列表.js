/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
  function ListNode(val, next) {
      this.val = (val===undefined ? 0 : val)
     this.next = (next===undefined ? null : next)
  }
  let li4 = new ListNode(4,null)
  let li2 = new ListNode(2,li4)
  let li1 = new ListNode(1,li2)

  let ll4 = new ListNode(4,null)
  let ll3 = new ListNode(3,ll4)
  let ll1 = new ListNode(1,ll3)
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
 var mergeTwoLists = function(list1, list2) {
     let newList = null
     let tmpNode = null
    while(list1||list2){
        let newNode = null
        if(list1 && list2){
            if(list1.val >= list2.val){
                newNode = new ListNode(list2.val) 
                list2 = list2.next
            } else {
                newNode = new ListNode(list1.val)
                list1 = list1.next
            }
        }else if(!list1 && list2){
            // list1 为空
            newNode = new ListNode(list2.val) 
            list2 = list2.next
        } else if(!list2 && list1){
            // list2 为空
            newNode = new ListNode(list1.val)
            list1 = list1.next
        }
        if(newList){
            tmpNode.next= newNode
            tmpNode = newNode
        } else {
            newList = newNode
            tmpNode = newNode
        }
    }
    return newList
};
console.log(mergeTwoLists(li1,ll1))