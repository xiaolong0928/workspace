# print('hello py!!!sdsd')

# print(48/6)
# print(48//6)

# # \会转义
# print('"Isn\'t," they said.')

# # 如果不希望字符串被转义  则使用 r
# print('C:\some\name')
# print(r'C:\some\name')

# 字符串字面值可以跨行连续输入。一种方式是用三重引号："""...""" 或 '''...'''。
# 字符串中的回车换行会自动包含到字符串中，如果不想包含，在行尾添加一个 \ 即可
# 注意 最开始的 换行没算
# print("""\
# Usage: thingy [OPTIONS]
#      -h                        Display this usage message
#      -H hostname               Hostname to connect to
# """)

# 字符串可以用 + 进行连接（粘到一起），也可以用 * 进行重复:
# print(3*'kk' + '测试')

# 相邻的字符串会自动连接在一起
# print('sd''sd')

# word = '我是大富豪'

# 打印斐波那契数列
# a, b = 0, 1
# while a < 10:
#     print(a)
#     a, b = b, a+b

# if语句的学习
# x = int(input('请输入一个值：'))
# if x < 45:
#     print('小于45')
# elif x == 0:
#     print('zero')
# else:
#     print('nothing')

# for 语句的学习
# words = ['ceshi1', 'ceshi2', 'sksjs']
# for item in words:
#     print(item, len(item))

# range 函数
# for i in range(-10, -100, -30):
#     print(i)

# sum
# print(sum(range(5)))

# list 返回一个数组
# print(list(range(10)))

# 循环语句可能带有else
# for n in range(2, 20):
#     for i in range(2, n):
#         if n % i == 0:
#             print(n, 'is not a prime number')
#             break
#     else:
#         print('the prime num is ', n)

# 定义函数
# def fib(n):
#     a, b = 0, 1
#     while a < n:
#         print(a, end=' ')
#         a, b = b, a + b
#     print()

# fib(2000)


# 函数直接共享参数
# def share(value, arr=[]):
#     arr.append(value)
#     return arr

# print(share(3,[]))
# print(share(5,[]))
# print(share(7,[]))

# def share(value, arr=None):
#     # 如果不想共享默认值
#     if arr is None:
#         arr = []
#     arr.append(value)
#     return arr