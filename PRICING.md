# desidesign.me 积分制定价方案
> 定稿版本：2026-07-20
> 原则：不免费，按需购买，美元计价

---

## 一、定价结构

### 积分命名：Credits

### 免费策略：不提供免费 Credits

- 用户可以免费使用 **每日 3 次预览**（预览版有水印）
- Credits 只用于解锁**高清无水印下载**
- 逻辑：先用预览建立信任，再让用户为高清付费

---

## 二、付费档位

### $4.99 — Starter Pack

| 内容 | 数量 |
|:--|:--|
| Credits | 20 |
| 平均单价 | $0.25/张 |
| 可用次数 | 高清下载约 10 次（2 Credits/张）|

### $9.99 — Value Pack ⭐ 推荐

| 内容 | 数量 |
|:--|:--|
| Credits | 50 |
| 平均单价 | $0.20/张 |
| 可用次数 | 高清下载约 25 次（2 Credits/张）|
| 额外权益 | 无 |

---

## 三、Credits 消耗规则

| 操作 | Credits 消耗 | 备注 |
|:--|:--|:--|
| 每日免费预览 | 0 | 每天 3 次，有水印 |
| 高清下载（标准）| 2 Credits / 张 | 推荐默认 |
| 高清下载（高清 Plus）| 5 Credits / 张 | 2K 分辨率 |
| AI 编辑（单张）| 1 Credit / 张 | Edit 功能 |
| 批量生成（5 张）| 8 Credits / 组 | 一次生成 5 张供选择 |

---

## 四、与免费预览的关系

```
用户打开工具
        ↓
每天可以免费生成 3 次预览（低分辨率，有水印）
        ↓
"想要无水印高清版？" → 用 Credits 解锁
```

**为什么这样设计：**
- 3 次预览足够用户判断"好不好用"
- 不给免费 Credits = 每个人都要付费才能用完整功能
- 高清无水印 = 真实使用场景（发朋友圈/发 IG/打印）

---

## 五、权益对比（未来扩展用）

| 功能 | 免费用户 | Starter | Value Pack |
|:--|:--|:--|:--|
| 每日预览 | ✅ 3次/天 | ✅ 3次/天 | ✅ 3次/天 |
| 高清下载 | ❌ | ✅ | ✅ |
| 无水印 | ❌ | ✅ | ✅ |
| 批量生成 | ❌ | ❌ | ✅（未来）|
| 优先队列 | ❌ | ❌ | ✅（未来）|
| API 访问 | ❌ | ❌ | ✅（未来）|

---

## 六、技术实现

### Stripe 配置

- 两个产品：
  - `price_starter` — $4.99 USD
  - `price_value` — $9.99 USD
- Webhook 接收 `checkout.session.completed` → 给用户加 Credits

### Credits 存储（Supabase）

```sql
Table: user_credits
- user_id (text, 匿名用 localStorage key)
- credits_balance (integer)
- created_at
- updated_at

Table: credit_transactions
- id
- user_id
- amount (正=加，负=扣)
- reason ('purchase'|'download'|'refund')
- created_at
```

### 扣积分逻辑

```typescript
// 下载时
async function deductCredits(userId: string, amount: number) {
  const user = await supabase
    .from('user_credits')
    .select('credits_balance')
    .eq('user_id', userId)
    .single();
  
  if (user.credits_balance < amount) {
    throw new Error('Not enough credits');
  }
  
  await supabase.from('user_credits').update({
    credits_balance: user.credits_balance - amount
  }).eq('user_id', userId);
  
  await supabase.from('credit_transactions').insert({
    user_id: userId,
    amount: -amount,
    reason: 'download'
  });
}
```

---

## 七、支付流程（用户视角）

```
1. 用户生成预览 → 满意
2. 点击"Download HD" → 提示"需要 2 Credits"
3. 点击"Buy Credits" → Stripe Checkout（$4.99 或 $9.99）
4. 支付完成 → Credits 到账（自动）
5. 回到工具 → 下载高清无水印版
```

---

## 八、上线步骤

| 步骤 | 任务 | 优先级 |
|:--|:--|:--|
| 1 | 创建 Stripe 产品（$4.99 / $9.99）| P0 |
| 2 | Stripe Webhook 配置 | P0 |
| 3 | Supabase user_credits 表创建 | P0 |
| 4 | 前端购买按钮 + Checkout 跳转 | P0 |
| 5 | 扣积分 + 下载逻辑 | P0 |
| 6 | Credits 余额显示 UI | P1 |
| 7 | Stripe 测试模式验证 | P1 |
| 8 | Stripe 切换正式模式 | P2 |

---

## 九、注意事项

- **Stripe 账户**：需要验证后才可收款（个人可用，但需要银行卡）
- **匿名用户**：先用 localStorage 生成 anonymous_id，等未来有了账号体系再对接
- **退款政策**：Diwali 期间（10-11月）可考虑"7天退款"，淡季不建议开放
- **印度用户**：暂时用 Stripe，不接入 Razorpay（需要印度公司）

---

*创建时间：2026-07-20*
