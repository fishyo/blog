---
title: "FreshRss过滤器"
pubDatetime: 2024-11-03
description: FreshRss filiter
slug: freshrss_filiter
featured: true
ogImage: ""
tags:
  - rss
  - FreshRSS
draft: false
---

# freshrss 过滤器

> [FreshRSS](https://freshrss.org/index.html) 是一个自托管的 RSS 和 Atom 提要聚合器。它轻便、易于使用、功能强大且可定制。

在inoreader和feedly付费版价格越来越贵、功能限制越来越多的情况下，我选择在vps上自托管FreshRSS来继续我的rss使用之旅，搭配[reeder classic](https://reederapp.com/classic/)。依然能满足我的日常需求，今年FreshRSS已经迎来了10周年，是一个稳定更新的服务。

今天分享一下FreshRSS自带的过滤功能，这在日常订阅一些**更新频率非常高但是想看的内容只有某一个条目时可以有效节省时间**。比如：

- 华尔街见闻的RSS每天都会推送上百信息，但其实我想看的只有华尔街见闻早餐这一篇了解一下昨天的市场整体信息就够了。

- 端传媒每日会更新日報以及Whatsnew，这两篇文章是免费的可以订阅了解时事新闻，收费的过滤掉。

- 某个源比较有及时性，超过几天看不看都无所谓了，可以自动标记已读将这些文章过滤掉。

这个需求设计到的功能就是过滤标题，可以使用以下的方法：

## 设置路径：

**订阅管理-过滤动作-何时将文章标记为已读-输入框输入过滤条件**

![示例](/images/freshrss-filter/示例.png)

> 1. intitle表示标题名包含某个关键字，在这里我们需要不包含这个关键字的标题文章自动标记为已读所以前面要加！表示相反的条件：即不符合这个标题的文章都标记已读
> 2. intitle后面冒号跟关键字
> 3. 多个条件跟加空格继续写就可以，图中文本框下面提示：ℹ️ 每行写一条过滤规则，过滤规则可见文档。似乎会引起规则失效。

一个条件示例：标题不包含华尔街见闻早餐的自动标记为已读

```txt
!(intitle:华尔街见闻早餐)`
```

多个条件示例：标题不包含Whatsnew以及日報的自动标记为已读

```txt
!(intitle:Whatsnew) !(intitle:日報)
```

只保留规定时间内的文章：数字可以根据需求自行修改

`date:P1Y/` or `date:P1Y` (past year) 日期：P1Y/ 或日期：P1Y（去年）

`date:P2M/` (past two months) 日期：P2M/（近两个月）

`date:P3W/` (past three weeks) 日期：P3W/（过去三周）

date:P4D/` (past four days) 日期：P4D/（过去四天）

```txt
!date:P1W
```

以上两种条件可以满足我大部分的需求，也可以参考[官方文档](https://freshrss.github.io/FreshRSS/en/users/10_filter.html#with-the-search-field)创建更多规则。创建规则前可以在FreshRSS的搜索框内验证以下是否有效以防无法看到更新。

## 验证前

![验证前](/images/freshrss-filter/验证前.png)

## 验证后

![验证后](/images/freshrss-filter/验证后.png)

---

以上为个人使用心得，作为非码农出身对表达式不甚了了，如有错误请轻喷。
​
