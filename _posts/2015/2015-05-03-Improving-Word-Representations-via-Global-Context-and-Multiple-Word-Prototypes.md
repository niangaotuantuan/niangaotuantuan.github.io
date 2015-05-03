---
layout: post
title: Improving Word Representations via Global Context and Multiple Word Prototypes
description: 本篇论文意在用全文信息辅助局部信息和多个词向量共同表示一个词的方法，增强语义。不止如此，在我看来，这篇论文最重要的地方有四个：首先的思想是 word disambiguation 在 context level；第二个是用 C&W 的 ranking loss 会比以前的 log-likelihood 训练速度快。第三个是把 local 和 global 的两种 score 设计成 NN 中的两个 part，分别用一层 hidden layer 学习。但是这里他们只用了简单的加法，而没有线性权重参数 $\alpha$。后人许多改进了 $\alpha$，还做了些参数对比展示实验结果。不过本质没区别。第四个是他们并没有直接用 SGD，二是用了 1000 的 mini-batch L-BFGS，这点好像追随的人不多。

image:
  feature: MultipleVectorWordEmbedding_bg.png

comments: true
share: true

category:
- peppypapers

tags:
- deep learning
- natural language processing
- representaion
- paper
---

《Improving Word Representations via Global Context and Multiple Word Prototypes》这篇论文意在用全文信息辅助局部信息和多个词向量共同表示一个词的方法，增强语义。不止如此，在我看来，这篇论文最重要的地方有四个：首先的思想是 word disambiguation 在 context level；第二个是用 C&W 的 ranking loss 会比以前的 log-likelihood 训练速度快。第三个是把 local 和 global 的两种 score 设计成 NN 中的两个 part，分别用一层 hidden layer 学习。但是这里他们只用了简单的加法，而没有线性权重参数 $\alpha$。后人许多改进了 $\alpha$，还做了些参数对比展示实验结果。不过本质没区别。第四个是他们并没有直接用 SGD，二是用了 1000 的 mini-batch L-BFGS，这点好像追随的人不多。


逐一展开：


###第一点：word disambiguation

虽然 word disambiguation 的问题在 2010年 就有学者关注到了（也是因此激发了本篇论文作者的 idea），但是应该说是这篇论文以后，这个问题才被更多人重视起来。把一词多义的表达加入到了更多任务中。本文的观点是常见的 VSM（vector-space model）中一个词只能表示为一个向量，无法解决同音异义词（发音相同但意义不同）和一词多义的词。针对这一点，本文才提出新的模型，试图解决这个问题。

该模型使用不同的 representation 来描述某个词的多组意义。即将多义词用多个词向量来表示。首先针对每个词出现的位置设定一个固定大小的窗口（前后各5），得到一个短句，对窗口中的词求其平均权重。然后使用 spherical k-means 聚类方法对这些短句进行聚类，最后每个词在其所属的类别中被重新打上标签（不同类中的同一个词，当作不同的词处理），用于训练类别中的词向量。

但是这里要提请的是，(Liu et al., 2015) 在他们的 AAAI'15 工作中也指出了 Huang 的工作的 limitation。虽然 Huang 试图超越 word-level 的 disambiguation，上升到 context-level（比如设计了新的 dataset），但是他们还是基于 isolated word 来生成的，而且 cluster 也没有 overlap。




###第二点：C&W

C&W 是 Ronan Collobert 和 Jason Weston 在 2008 年的 ICML 上发表的《A Unified Architecture for Natural Language Processing: Deep Neural Networks with Multitask Learning》中提出的词向量计算模型。特别之处就在于它的设计函数，它并不是像语言模型里那样去近似求估计的某个位置的词的条件概率，而是求窗口中的连续打分，本质是一种 ranking-typed loss。

这种 ranking-typed loss 显然会适用于一些需要考虑上下文连续性（local context）的任务，同时，在 (Huang et al., 2012) 这篇论文中还提到了一个优点，就是其训练速度会比优化 log-likelihood 的方法快。



###第三点：local + global

从题目中就可以看出这是这篇论文的重点。Huang 认为 C&W 的工作只利用了“局部上下文（Local Context）”。Huang 直接使用 C&W 的网络结构计算出一个得分，作为 local score（也就是说，Huang 认为 C&W 是他们的模型的一个 “special case”）。　

然后在此基础上，考虑了 global 信息。他们通过类似词袋模型的方法，把文章中的全部词的词向量放在一起，求歌权重的平均（这里他们用的 IDF 权重）。由此得到的这个平均后的向量，当做文档的语义向量。语义向量和当前词的词向量拼在一起，成为两倍长度的输入，同样进入一个 C&W 的网络，得到一个得分。这个得分就是 global score。

于是其实就是把 local 和 global 的两种 score 设计成 NN 中的两个 part，分别用一层 hidden layer 学习。但是这里他们只用了简单的加法，而没有线性权重参数 $\alpha$。最后两种 score 加起来的最终 score 使用 C&W 提出的 pair-wise 目标函数来优化。



###第四点：mini-batch 

这个没什么好说的，只不过没什么人 follow。大多数后续工作主要还是直接用 SGD 优化。




#####References
[1] Eric H Huang, Richard Socher, Christopher D Manning, and Andrew Y Ng. 2012. Improving word representations via global context and multiple word prototypes. In Proceedings of the 50th Annual Meeting of the Association for Compu- tational Linguistics: Long Papers-Volume 1, pages 873–882. Association for Computational Linguis- tics.
[2] Yu Zhao, Zhiyuan Liu, Maosong Sun. Phrase Type Sensitive Tensor Indexing Model for Semantic Composition. The 29th AAAI Conference on Artificial Intelligence (AAAI'15).
