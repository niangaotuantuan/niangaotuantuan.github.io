---
layout: post
title: Covariate Shift Correction


comments: true
share: true

category:
- statistics
tags:
- DSP
- CTR
- covariate shift
---

[江申](http://weibo.com/bit9)在《DSP中的算法初探》中提到了一个 Covariate Shift 的问题，第一次听说，查了一下，发现是一个非常重要的问题。

在 DSP 中，这个问题叫做 Bid Adjustment: 
	
	在线上生产环境进行实际竞价时，通常需要对竞价模型的参数做调整。

原因：1）线上的数据分布与线下用的训练数据的分布不一样，需要对参数做调整；
2）线上的环境是动态变化的，得让参数也随之变化。

**Covariate Shift** 就是说， training and test data were so different，**我们在 training 过程中 sampling 假设的 distribution 和实际真实的 distribution 差异太大了**导致我们最后的training 是 waste。

解决办法是通过两步：

* Step 1: 得到真实分布 q 和假设的分布 p 之间的 ratio
* Step 2: reweight training set

Step 1就需要考虑如何去衡量两个分布之间的差异。直观的方法是：训练一个 LR 模型，数据为“训练+待预测”数据，Label 为是否属于训练集。分得准，差异大。分不准，差异小。
理论上这里 用 任意learning方法出来的 classifier 都是可以的（见 paper: [Discriminative Learning Under Covariate Shift](http://jmlr.org/papers/volume10/bickel09a/bickel09a.pdf最后的conclusion) conclusion 的部分）。
	

特别的，如果用LR的话，简单的推导见 Alex Smola 的一篇 [blog](http://blog.smola.org/post/4110255196/real-simple-covariate-shift-correction)。



* Step 2 学到了这个 ratio 就可以做 reweight。

re-weight each instance by the ratio of probabilities that it would have been drawn from the correct distribution, that is, we need to reweight things by p(xi)q(xi). This is the ratio of how frequently the instances would have occurred in the correct set vs. how frequently it occurred with the sampling distribution q. 

很多 Transfer Learning 的方法都和这个类似。