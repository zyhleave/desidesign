# 2026-07-30 Canonical 修复日志

## 问题
GSC 显示 Wedding 页面仍未被 Google 收录：
- https://desidesign.me/wedding-invitation-wording
- https://desidesign.me/wedding-invitation-maker

## 根因分析
```bash
# 检查线上页面 HTML
curl https://desidesign.me/wedding-invitation-maker | grep canonical
```
发现所有页面的 canonical 都指向首页：
```html
<link rel="canonical" href="https://desidesign.me">
```

**后果**：Google 认为所有页面是首页的副本，不会单独收录。

## 根本原因
`src/app/layout.tsx` 根布局设置了全局 canonical：
```ts
alternates: { canonical: "/" }
```
所有子页面继承这个 canonical，全部指向首页。

## 修复方案
1. 移除根布局的全局 canonical
2. 为每个页面显式设置自己的 canonical

## 执行
- `src/app/layout.tsx` — 注释掉 `alternates: { canonical: "/" }`
- `src/app/wedding-invitation-maker/layout.tsx` — 添加 `alternates: { canonical: "/wedding-invitation-maker" }`
- `src/app/wedding-invitation-wording/layout.tsx` — 新建，添加 canonical
- `src/app/haldi-ceremony-invitation/layout.tsx` — 添加 canonical
- `src/app/happy-diwali-post-generator/page.tsx` — 添加 canonical

Commit: `606ee34 fix(seo): add per-page canonical URLs to fix indexing`

## 验证步骤
Vercel 部署完成后（5-10 分钟）：
1. 打开 https://desidesign.me/wedding-invitation-maker
2. F12 查看 HTML，确认 canonical 已变成 `/wedding-invitation-maker`
3. GSC 重新提交 sitemap + 手动请求索引

## 预期结果
4-7 天后 Wedding 页面被 Google 收录。

## 教训
- **新增落地页必须检查 canonical**——不能依赖全局设置
- **SEO 诊断优先级**：robots.txt → sitemap → canonical → noindex → 内容质量
