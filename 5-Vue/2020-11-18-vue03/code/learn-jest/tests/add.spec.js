const { add } = require("../index");
// 测试是活文档
test("1+1 应该等于 2 ", () => {
  // 测试三部曲

  // 分析单元的输入以及输出
  // 1. given 输入input
  // 2. then output

  // 如果这个测试可以给你带来巨大的收益的话,那么你就写

  // given -> 准备测试数据
  // 1,1
  const a = 1;
  const b = 1;

  // when -> 触发测试动作
  const result = add(a, b);
  // console.log(result === 2)
  // jest-> 匹配器
  // then -> 验证
  expect(result).toBe(2);
});
