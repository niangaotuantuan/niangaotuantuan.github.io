---
layout: post
title: Collections of Tips for Real World Machine Learning
description:收集了一些我觉得真的有用实战机器学习的文章。比如如何调参，比如会遇到什么真实数据带来的问题，如何 debug，如何 speed-up。长期更新。

comments: true
share: true

category:
- machinelearning

tags:
- machine learning
- deep learning
---

收集了一些我觉得真的有用实战机器学习的文章。比如如何调参，比如会遇到什么真实数据带来的问题，如何 debug，如何 speed-up。长期更新。

1. [Advice for applying Machine Learning](https://jmetzen.github.io/2015-01-29/ml_advice.html)
主要集中在如何观察数据来选择方法。

2. [How to Debug Learning Algorithm for Regression Model](http://vitalflux.com/machine-learning-debug-learning-algorithm-regression-model/)
主要都是讲回归中遇到的各种“预期不符”的结果。配合 ESL 第二章和第三章内容看效果加成。

3. [训练深度神经网络的时候需要注意的一些小技巧](http://www.weibo.com/p/1001603816330729006673)
这篇是综合翻译，没给出都从哪节选的。我收集的英文版在下面：

4. [Training Tricks from Deeplearning4j](http://deeplearning4j.org/trainingtricks.html)
deeplearning4j 的 googlegroups 也很推荐。这篇其实干货不多，但是也有一些了。包括对于训练的理解，并不全是干货般的总结。

5. [Suggestions for DL from Llya Sutskeve](http://www.weibo.com/p/1001603799166017998138)
Hinton 亲传弟子介绍深度学习的实际 tricks，包括data, preprocessing, minibatches, gradient normalization, learning rate, weight initialization, data augmentation, dropout和ensemble。

6. [Large-scale L-BFGS using MapReduce](http://papers.nips.cc/paper/5333-large-scale-l-bfgs-using-mapreduce.pdf)
NIPS'14 的论文，简单并行化 LBFGS里面的双循环（最耗时，计算量巨大）。

7.[特征工程选择系列](http://blog.datadive.net/selecting-good-features-part-iv-stability-selection-rfe-and-everyting-side-by-side/)
特征工程系列文章：Part1.单变量选取 Part2.线性模型和正则化 Part3.随机森林 Part4.稳定性选择法、递归特征排除法(RFE)及综合比较。有 Python 代码。

8.[机器学习代码心得之​有监督学习的模块](http://www.weibo.com/p/1001603795687165852957)
[机器学习代码心得之迭代器和流水处理](http://www.weibo.com/p/1001603795714256832384)
新一代大神陈天奇怪的系列文章，有兴趣的直接顺着看吧。

9.[STOCHASTIC GRADIENT BOOSTING: CHOOSING THE BEST NUMBER OF ITERATIONS](http://yanirseroussi.com/2014/12/29/stochastic-gradient-boosting-choosing-the-best-number-of-iterations/)
Kaggle达人YANIR SEROUSSI告诉你如何选择Stochastic Gradient Boosting的训练最佳iteration超参数。不过我比较存疑，因为如果条件允许，当然迭代的越多越好……

10.[Large-Scale High-Precision Topic Modeling on Twitter](http://www.eeshyang.com/papers/KDD14Jubjub.pdf)
Twitter 高级研究员的 KDD'14论文。有不少实用技巧，比如短文本特征，LR结果概率化修正，正样本抽样，PU学习后负样本选取。

11.[How transferable are features in deep neural
networks?](http://papers.nips.cc/paper/5347-how-transferable-are-features-in-deep-neural-networks.pdf)
也是争议比较大的一篇文章，finetuning 有一定帮助，但是不够细致。

12.[Dark Knowledge from Hinton](http://blog.csdn.net/yihaizhiyan/article/details/41359957)
有心人整理的 Hinton 提到的 Dark Knowledge 的一些资源。