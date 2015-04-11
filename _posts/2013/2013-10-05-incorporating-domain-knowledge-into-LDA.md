---
layout: post
title: Incorpating Domain Knowledge into LDA

comments: true
share: true


category:
- PeppyPapers
tags:
- paper
- domain knowledge
- dirichlet forest
- LDA
---


Recent years, there has been emerging research on knowledge-based models and methods. Researchers have tried in various ways to express/embed/structure the knowledge and then incorporating them into some existing models, among which is LDA (Latent Dirichlet Allocation). 

For further detailed about LDA, please investigate through [Blei el al., 2003].  The basic idea and foundation of LDA is handling **word co-occurrence** pattern to discover the latent semantic meaning. The simple model has limited resolution to deeper latent sementics and thus the variations of LDA are bursting. One focus to expand LDA is how to incorporating more **prior knowledge** into it.

##  Types of Prior Knowledge

Basically, all types of knowledge incorporation is to change the prior distribution of Dirichlet setting in LDA. 

a.	在传统 LDA 里，有两组先验，一种是文档~主题的先验，来自于一个对称的$$ \mathcal Dir(\alpha) $$；一种是主题~词汇的先验，来自于一个对称的$$ \mathcal Dir(\beta) $$ ——都是 symmetric Dirichlet Distribution。所以按理，可以把这两种先验分别改成不对称的——这样就加入了更多的 knowledge 信息。

b.	在 Rethinking LDA 里一文[^1]中，结合两种先验与两种不同的先验设定方法，可以得到以下四种组合：

* AA：文档~主题分布和主题~词汇分布都采用非对称；
* AS：文档~主题分布采用非对称的先验，而主题~词汇分布采用对称的先验；
* SA：文档~主题分布采用对称的先验，而主题~词汇采用非对称；
* SS：文档~主题分布和主题~词汇分布都采用对称的先验。

他们的实验发现其中 AS 的方法可以更高地提高 LDA 对于文本建模的能力。

c.  典型的打破“对称”文档~主题分布先验（AS）的几个model，有很好理解的 Twitter-LDA，也有 Behavior-LDA。同时，supervised-LDA 也可以看做一个非结构化的打破先验的方式，变形后有 SeededLDA（在两个层次的先验都通过设计加入了不对称信息）。

d.	除了通过**直接**地改变概率分布来加入先验的方法，这几年来开始有越来越多的研究者想将结构化的先验知识加入 LDA 。这种结构化的先验，不再是简单的 prior distribution，更可以倾向于称为“knowledge”。这样的研究之所以盛行，一方面是长期以来的结构化知识库已有很多（且因为还要继续建立知识图谱等，结构化仍将是未来的趋势），另一方面形式语言（逻辑语言）的表示的研究一直都没有停止。这种结构化的引入 knowledge 的方法，本质也是通过打破先验设定的 symmetric Dirichlet Distribution。下文将重点总结这方面的工作。

##  Domain-dependent Model：
* CIKM’13 里，Zhiyuan Chen（也在 Bing Liu那里）的一篇 Discovering Coherent Topics[^3] 里将 incorporating knowledge 的研究分成了 domain-dependent 的和 domain-independent：前者是 expert 知道（普通人不一定熟悉，需要 expert 来参与编辑）的知识而且有知识领域限制，后者是各领域通用的一些知识。

* 同样是上述文章，提到了[^2],[^4],[^5],[^6],[^7] 的论文都是 domain-dependent knowledge-based 的。

* 其中，Dirichlet Forest[^2] 和 Jerry Zhu 的 First-Order Logic[^4] 的形式化加入 domain-knowledge 的方法还是比较有代表性。前者是将领域内一定会一起出现（两个词的出现概率都很大或者都很小）的词和一定不能一起出现的词分别表示为 Must-Link 和 Cannot-Link，然后表示成树中的结点和结点之间的连接关系。但这个 Link 关系是可传递的，所以会导致“错误”的先验知识加入（CIKM'13 中提到了这点）。         


##  Domain-independent Model：

* 按照 Zhiyuan Chen 的说法，他们在 CIKM’13 里提出的 GK-LDA[^3] 应该是第一个 domain-independent model。所以这个部分只谈他们的那篇论文（GK-LDA 是 General Knowledge 的缩写，即 domain-independent 的 knowledge）。
	
* 在这篇论文里，他们的假设是，*there is a vast amount of available in online dictionaries or other resources that can be exploited in a model to generate more coherent topic*. 而通过 extract，就可以把这样的 lexical knowledge 提取成 a general knowledge base.

* 他们采取的知识表达结构是 lexical relationships on words. 简称 **LR-sets**。LR-sets 有很多种关系，比如同义词、反义词，这篇文章中重点讲的是 adjective-attribute 这种 relationship，e.g. (expensive-price).

* 他们提出的 GK-LDA 依然是 一种 LDA 的变形，而且是基于他们组再之前的工作——IJCAI’13 的 Leveraging Multi-Domain Prior Knowledge[^8] 里的 MDK-LDA。


##  从 MDK-LDA (b) 到 MDK-LDA 到 GK-LDA：

* 主要总结 Zhiyuan Chen 的两篇工作，之前提过的 MDK-LDA 和 GK-LDA。

* MDK-LDA 是 multi-domain knowledge 的缩写，从思想上来看是一种 Transfer Learning 的想法，prior from other domain can help topic model in new domain.

* 所谓的 multi-domain 可以通过 **s-set** 表示，比如 “light” has 2 s-set {light, heavy, weight} 和 {light, bright, luminanee}，表示出了 light 的两个词义。那么这个工作就是去 leverage 这个 s-sets。

* 他们在 IJCAI’13 的那篇里[^8] 主要分析了 之前的 domain-knowledge 会遇到的两个大问题，MDK-LDA 解决了其中一个 adverse effect 的问题，而 GK-LDA 两个都解决了（还有一个是错误先验知识带来的问题）。MDK-LDA 解决的主要在 LDA 问题里，如何使得一些少见的词但是确实是同一个 set 里的词的低频不会影响 topic modeling 的学习（不仅仅用 TF-IDF 消除影响），那么他们认为 *the words in an s-set share a similar semantic meaning in the model should redistribute the probability masses over words in the s-set to ensure that they have similar probability under the same topic*. 这个思想使得他们在 MDK-LDA(basic) 之上加入了 GPU [^9]：像抽出小球再放回同颜色的球的思想一样，去改变同一个 s-set 里的 word 的dist.

* 在 MDK-LDA 之上，解决第二个问题的就是 GK-LDA，也就是在 CIKM’13 里的那篇[^3]。MDK-LDA 没法避免当我们的先验 s-set 是错误的（这也是其他许多 domain-dependent model 的问题，必须保证我们的先验知识都是正确的）对 performance 的影响。 GK-LDA 加入了一个 word correlation matrix 的计算 和 加入一个 threshold，减少了 wrong LR-set 的的影响。

* 其中加入 GPU 的思想，和 CRP 中如何改变人坐在具体某个餐桌的概率的思想是一致的（只是一个模型的不同解释）。

## Footnotes

* Transfer Learning 和 Active Learning、Online Learning 等等都有关系。这部分内容还没有系统学习过，之前一篇[文章](http://yanran.li/2013/07/covariate-shift-correction/)也有提到这里的一个小坑。

* GPU[^9]，是 Generalized Polya Urn 的简称。搞懂 LDA 必须先学习的模型。将这个过程generalized, 可以推向Polya Urn's Process。Polya Urn's Model 是比较直观的理解 Dirichlet Process 的一种解释模型。模型中抽出球再放回就是对当前的多项分布进行抽样（同时不改变该分布），又放回一个同样的球就是依当前多项分布产生新的多项分布。假设从$$ \mathcal Dir(\alpha, K) $$中抽样，那么新产生的多项分布共有 K 个，其概率质量与当前多项分布成比例。K 个新产生的多项分布的加权平均与原多项分布是同分布的。而在之前的 CIKM'13 论文[^3]中就是通过改变每次放回的“球”（LR-set 里同一个 set 的词）的“颜色”和数量来改变 prior knowledge 的。这种思想感觉还是很赞的。


## Reference
[^1]:Hanna Wallach, David Mimno and Andrew McCallum. Rethinking LDA: Why Priors Matter. NIPS, 2009, Vancouver, BC.
  
[^2]:Andrzejewski, D., Zhu, X. and Craven, M. 2009. Incorporating domain knowledge into topic modeling via Dirichlet Forest priors. ICML, 25–32.

[^3]:Zhiyuan Chen, Arjun Mukherjee, Bing Liu, Meichun Hsu, Malu Castellanos, and Riddhiman Ghosh. Discovering Coherent Topics using General Knowledge. Proceedings of the ACM Conference of Information and Knowledge Management (CIKM'13). October 27 - November1, Burlingame, CA, USA.
  
[^4]:Andrzejewski, D., Zhu, X., Craven, M. and Recht, B. 2011. A framework for incorporating general domain knowledge into latent Dirichlet allocation using first-order logic. IJCAI, 1171–1177.
  
[^5]:Burns, N., Bi, Y., Wang, H. and Anderson, T. 2012. Extended Twofold-LDA Model for Two Aspects in One Sentence. Advances in Computational Intelligence. Springer Berlin Heidelberg. 265–275.
  
[^6]:Jagarlamudi, J., III, H.D. and Udupa, R. 2012. Incorporating Lexical Priors into Topic Models. EACL, 204–213

[^7]:Mukherjee, A. and Liu, B. 2012. Aspect Extraction through SemiSupervised Modeling. ACL, 339–348.
  
[^8]:Zhiyuan Chen, Arjun Mukherjee, Bing Liu, Meichun Hsu, Malu Castellanos, and Riddhiman Ghosh. Leveraging Multi-Domain Prior Knowledge in Topic Models. Proceedings of the 23rd International Joint Conference on Artificial Intelligence (IJCAI'13). August 3-9, 2013, Beijing, China.
  
[^9]:David Mimno, Hanna Wallach, Edmund Talley, Miriam Leenders, Andrew McCallum. Optimizing Semantic Coherence in Topic Models. EMNLP (2011).
  

