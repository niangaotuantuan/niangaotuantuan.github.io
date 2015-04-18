---
layout: post
title: DeepWalk Online Learning of Social Representations
description: 这是一篇我个人非常喜欢的论文，不仅提出了一个想法，更展示了这个想法的可行性和可能空间。提出的想法是利用网络结构信息将用户表示为低维实值向量，学出来的表示是最重要的，因为有了表示就可以用来加在许多其他任务上。

comments: true
share: true

category:
- peppypapers

tags:
- deep learning
- natural language processing
- representaion
- social networks
- paper
---

《**DeepWalk: Online Learning of Social Representations**》是一篇我个人非常喜欢的论文，不仅提出了一个想法，更展示了这个想法的可行性和可能空间。提出的想法是利用网络结构信息将用户表示为低维实值向量，学出来的表示是最重要的，因为有了表示就可以用来加在许多其他任务上。

而这个想法本身也是来自于一个有趣的观察和迁移。

- 观察是：

![frequency vertics appear in random walks also follow power-low](/images/deepwalk_obs.png)

>
If the degree distribution of a connected graph follows a power law (is scale-free), we observe that the frequency which vertices appear in the short random walks will also follow a power-law distribution

- 迁移是：源于这个 frequency，作者想到了 NLP 中的 word frequency。word frequency 在 NLP 中有一个基本的假设是，在同一个文本语料中是同分布的。由此带来了 frequency -> distribution 的一种关联，作者将这种关联“迁移”到了他的模型中，进而将 NLP 中的 distributed word representation 思想用在了 social network 中的节点表示上。

> A core contribution of our work is the idea that techniques which have been used to model natural language (where the symbol frequency follows a power law distribution (or Zipf ’s law)) can be re-purposed to model community structure in
networks.


本文除了想法和各种迁移的顺畅外，我觉得还有论文写法和实验设计值得学习。写法上，本文并不算完全的中规中矩，且有各种对广为流传的算法的改进。越多这样的改进越可能造成描述的混乱，让人摸不清主线，但是这篇论文并没有这样的感觉。基本方法就是在 method 的不同 part 之前，加入连接段，`having ..., we now need` 这样的表示；同时还有在描述自己如何改进算法前，先说这个算法的 basic idea, why fit, why not fit and that is the part we should modify；第三个就是善用加粗/斜体和全部大写，从格式上强调。

本文实验部分是我觉得非常 solid 的：（1）用的是标准公开数据集，不是自己 deliberately selected data；（2）baseline 选的都很合适，没有 feature design；（3）自己的实验，不同参数的 sensitivity 讨论。唯一缺乏的可能是 existing methods 但是无妨。


源码：https://github.com/phanein/deepwalk

P.S.:作者这个实验室我发过几次邮件，非常热情细致，回复得特别仔细，好实验室啊。