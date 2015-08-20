---
layout: post
title: “后 Word Embedding ”的热点会在哪里？
description: 随着 ACL 2015 大会的落幕，SIGIR/KDD 2015 大会的召开，以及 EMNLP 2015 accepted papers 的公布，“后 word embedding”时期出现端倪。小S 个人认为未来可能有四个小方向，分别是：interpretable relations, lexical resources, beyond words, beyond English。

image:
  feature: MultipleVectorWordEmbedding_bg.png

comments: true
share: true

category:
- peppypapers

tags:
- natural language processing
- representaion
- word2vec
- paper
---

随着 ACL 2015 大会的落幕，SIGIR/KDD 2015 大会的召开，以及 EMNLP 2015 accepted papers 的公布，“后 word embedding”时期初现端倪。个人认为未来可能有四个小方向，分别是：**interpretable relations, lexical resources, beyond words, beyond English**。在分别展开这四个小方向之前，另一个问题是，那 word embedding models 的改进已经画上句号了么？

对于这个问题，我的答案几乎是肯定的。就好像曾经的 topic model 小浪潮，几乎可以认为是印度美女 S. Moghaddam 发表了两篇“集大成”的 topic model 变形大汇总[^[1][2]]，把圈圈框框画到了极致，抵达了“艺术之巅峰”——从此 topic model variants 鲜有新作。最近， pre-print 了一篇 word embedding 的论文，个人认为也初有这样的风范。这篇论文就是《**How to generate a good word embedding**》[^3]，有源码，还有博客自动导读。一作就是因一篇[《Deep Learning in NLP(一)》](http://licstar.net/archives/328)博文备受瞩目的@licstar。篇幅有限，建议大家直接查看作者本人的[论文导读](http://licstar.net/archives/620)。他的这篇论文：先把从 NNLM，到 GloVe 的各种常见 word embedding model / NN 按两大方面分了类：aspect (i) 是如何 model relation between target word and contexts words 的；aspect (ii) 是如何 represent contexts 的。具体可以见 Table 1 和 Table 2. 同时作者指出，aspect (ii) 严重关系到了是否保留了 word order 这一重要信息。保留与否几乎损失 20% information[^4]。为了更公平的比较各大 model，他除了比较了 2.1 中的常见的几大模型，还自创了一个“Virtual Order”模型，去完成单一变量下的比较。同时有一个问题，既然是在不同的任务下比较，那么performance的 metric 最好统一。他们就搞了个 **Performance Gain Ratio, PGR** 的东西。意思有点像 negative sampling。把你的 embedding 随机替换一个 random embedding，分别测试，然后看你比人家好出多少。Conclusion 其实粗看没什么意义，但是细看 Section 4的 每一部分还是有点东西的。比如 C&W 虽然原始论文中展现的结果是可以刻画 Paradigmatic relation between words，但其实是因为他们 fine-tune for extrinsic NLP tasks 的结果。具体几个 conclusions 可以见 Introduction 最后。

也就是说，之前[总结过的 word embedding 的一些变形](http://yanran.li/peppypapers/2015/05/23/Adapations-and-Variations-of-Word2Vec.html)，几乎都能归为他论文中讨论到的两类。那么回到最初的问题，如果 word embedding model 的变形已经鲜有新意，未来的 word embedding 研究热点在哪里？Interpretable relations, lexical resources, beyond words, beyond English，都分别是什么意思？

## Interpretable Relations

众所周知，word embedding / distributed embeddings 虽然效果显著，甚至被人称为“magic”，但其随之而来的就是“不可解释性”，或者说太笼统。把语料扔进去，跑出来的 dense vectors，虽然是基于 statistics，也就是 distributional hypothesis 的，但离 lexical/linguistic 的解释还差得很远。ACL 主席 Christopher Manning 在 ACL 2015 开幕式上的致辞中也提到，我们 NLPer 不能抛弃 linguistics！于是乎，许多研究者已经开始了这一方向的研究。

最熟悉的可能还是 morphology 的研究，这个主要在[上次的 word embedding 变形中](http://yanran.li/peppypapers/2015/05/23/Adapations-and-Variations-of-Word2Vec.html)提了一些。除此以外，比如 NAACL 2015 Best Paper 之一，《**Unsupervised Morphology Induction Using Word Embeddings**》[^5]。Google 出品的，个人感觉是他们在工作中真的有这个需求。整个文章做法虽然宏观上很直观，很简洁，但是细节处，各种 threshold 也比较多，总的来说是一篇偏 linguistic 的论文。Model: 基于 SkipGram 改造的。Motivation: a) 基于 Mikolov 等人的 semantic relation （king-man+woman=queen），作者认为 word embeddings space 里也可以 induce 出 morphological relation；b) 传统的 morphological induction 或者 generation 的方法，基本基于 linguistic rule，而 linguistic rule 的不符合的案例太多，不太 robust，且费时费力；他们这个方法可以说依然是基于统计的（frequency）。Algorithm: a) frequency-ranked equation，挑选出 candidates。这一步用了两种 metric，rank+cosine。个人理解这是基于 word analogy 的一种改造，比如 king-man+woman=queen这种 word analogy，那么 king-man的这个距离，就可以认为是一种已知的衡量标杆，把它们分别认为是 w 和 w'。我们就可以通过 w 和 w' 的距离来衡量 w1（queen）和 w2（woman）的距离。由此他们自己定义了一个公式（Equation 1）；b) 第二步，有了 rank 和 cosine 两个 metric，才能保证这些候选的 morphological rule candidates 是既常见的（lexicalized）和符合当前带评测 w1, w2 的真实关系的（meaning preservation）；c) 这个多种的 candidates，在他们论文里叫 multiple directions，有点像 Huang'12 年的一词多义问题。Task: a) 很自然的，有了 candidates，就去 induce 1-1 的map；b) 之后就更可以运用到 unseen/rare words 和 OOV 上。Evaluation: 用 word similarity 的 datasets 做评测，涉及到了6种语言，9个 datasets。这里也可以一定程度证明这个方法的简单有效，因为多种语言的话，去 handmade morphological rule 就很繁琐耗时。整体来看，文章思路直观，而且我感觉应用很广。毕竟 relation 这个东西，不仅存在于 semantic 和 morphological 上，还存在于各种问题上。这也是为什么现在 relation embedding 也是一个比较热的方向的原因。PS. 文章中说他们是使用自己实现的（slightly different）版本的 SkipGram，不是原始 word2vec 里面的。

比如这次 ACL 2015 上的：《**SensEmbed: Learning Sense Embeddings for Word and Relational Similarity**》[^6]。这篇主要解决两个问题，

> However, word embeddings inherit two important limitations from their antecedent corpus-based distributional models: (1) they are unable to model distinct meanings of a word as they conflate the contextual evidence of different meanings of a word into a single vector; and (2) they base their representations solely on the distributional statistics obtained from corpora, ignoring the wealth of information provided by existing semantic resources.

所以针对第一个，他们基于 BabelNet 这个 lexical resources，建立了初步的 multi senses，然后又基于别人的算法把 corpora 给自动标记成多 senses 的。后面又改造了不同种的 similarity metrics，为了增强 similarity performances。都是“修修补补”的工作。比较有意思的就是我发现越来越多的人都在用 BabelNet 了。

再比如依然是 ACL 2015 上的：《**Revisiting Word Embedding for Contrasting Meaning**》[^7]。这篇论文我个人非常喜欢，因为感到文章中的闪光点很多，能看到作者认认真真思考过这个工作，而不是随便想到什么赶紧做点差不多的实验就发出来。文章主要是针对基于 distributional hypothesis 假设的 word embedding models 无法解决的 contrasting meaning word pairs 提出自己的一个 embedding 框架。这个框架乍看有点复杂，但其是完全使用 lexical resources，而没有 distributional hypothesis/corpora statistics 的：

> Unlike what was suggested in previous work, where relatedness statistics learned from corpora is often claimed to yield extra gains over lexicon-based models, we obtained this new state-of-the-art result relying solely on lexical resources (Roget’s and WordNet), and corpus statistics does not seem to bring further improvement. To provide a comprehensive understanding, we constructed our study in a framework that exam- ines a number of basic concerns in modeling contrasting meaning. We hope our efforts would help shed some light on future directions for this basic semantic modeling problem.

主要建模思想依然和 word2vec 无异，就是用更符合 main goal 的 pair 应该更”近“，其他更不近就好——

> The general aim of the models is to enforce that in the embedding space, the word pairs with higher degrees of contrast will be put farther from each other than those of less contrast.

但是这也不是他们的唯一思想，他们参考了许多相关建模工作，对于被 word embedding 刷屏的各位是一股清流，看看以前的人都是怎么做 relation embedding 的。也就是文章 Section 3.2-3.5 的不不分。比如他们就考虑到，虽然一对 constrasting word，比如 good 和 bad，意思是完全相反的，但是他俩很可能出现在相同的语境中。也就是说，他俩都可能和另一个词语比如说 C semantically closed。所以这时候我们就要考虑 constrasting + semantic 两种相关距离。与此同时，nonlinearity 也非常重要。最后作者也验证了一下到底 distributional hypothesis 下的 model 能做到什么程度，又为什么不能超过 lexical based。结论和 DAN（Deep Averaging Networks） 那篇[^8]还蛮像的。

还有 ACL 2015 的《**Hubness and Pollution: Delving into Cross-Space Mapping for Zero-Shot Learning**》[^9]。这篇论文很有意思，讨论的有点像上面提到的 constrasting meaning 那篇相反的问题——在 space 中，离的很近的点，往往很难区分，也就很难准确得出它们的表达（它们之间的区别）——这种点一般叫 hubness，是一个从至少 10年（ref 中有两篇）就被人提出过的问题。大概就是一些非常 general 的 items。这种 hubness 的 cause 和初步解决方法都在 Section 3 中提到，大概是我们常用的 LS 的 objective function 是会加剧这种效应的（十分好理解，毕竟公式就放在那里，ignore low variance），solution 也已经被“不经意地”发现了，那就是 Socher 等人用 max-margin loss “误打误撞”解决了这种效应。本篇论文中用实验证明了是 max-margin helps。

##Lexical Resources

说完第一个方向，第二个方向则更直观一点。lexical relation 的很多过往研究都是基于 high quality 的 human annonatation 的，那么我们有没有办法把基于 statistical/distributional 的 word embedding model 的方法和已有的人工标注的 lexical resources 结合在一起呢？用 lexical resources 的高质量信息/知识，来完善、提高 word embedding 质量呢？

这方面其实在 NAACL 2015 上已有相关的工作，比如 NAACL 2015 Best Paper 得主之一，《**Retrofitting Word Vectors to Semantic Lexicons**》[^10]。Motivation 是将 lexicon relations （比如 synset 等等同义词啊这些的 relation 作为 additional information）去“supervised” word vectors。注意，supervised 这个词，通篇都没有出现，是我自己加的。而且这个 idea 不是他们首创的，他们自己在论文里也说了，是 follow 14年的很多 short 工作（比如 Mo Yu 等人的工作），他们只是把它们变得通用了一点。这个工作有 Two Approaches: 一种是如题目一样，retrofit，就是任何已经 pre-trained 的 word vectors，别管你咋 train 出来的，我都可以再给你增强一下。另一种是从头开始，用另一种 learning method，边增强 lexicon relation constraints 边学 word vectors。使用的 Method: 可以直接看 Figure 1，就是用 relation dictionary（knowledge base）中的 counterpart words，作为一种镜像的映射。用 dictionary/knowledge base 中的词和词之间的 connection 关系，让需要 inferred 的 word vectors 中的对应的词更 closed——从而认为提升了语义表达。关于 Two Algorithms: 对应于 retrofit，因为是 convex 的，所以直接求解就好；对应于边 learn 边 retrofit，则比较麻烦，他们叫 lazy method of MAP + periodic method + NCE + AdaGrad。

再比如这次的 ACL 2015 Best Student Paper Awards 得主，《**AutoExtend: Extending Word Embeddings to Embeddings for Synsets and Lexemes**》[^11]。论文想探究的是三种 data type，word, synset, lexeme，这三种 data type 都常见于 Lexical Resources，比如 WordNet，Freebase, Wiktionary 等等。作者想通过他们在 这种 resources 中的关系，来作为 constraints，去把 word embedding，synset embedding, lexeme embedding 一起学在同一个空间里。同时，论文基于我们任何已有的 word embedding，和任何已有的 resources，不需要额外的 training corpus，就可以得到 synset, lexeme embedding。先来说三种 data type：word，不用说了。synset，一组同义词，由多个与不同 word 有关的 lexeme 组成；lexeme，不知道中文叫啥，反正既有一词多义的意思，也有一词多种形态的意思（syntactic）。具体举例可以见 Section 2 的第二段。基于三种 data type，作者给出了两个 motivation 和 两个 observation 和两个 assumption（都是一个东西），然后这个东西就可以用来做 constraints 了，就是公式（1）（2），也是 Figure 1 架构的主要顺序。word->lexeme->synset->lexeme->word。除了这俩 motivation 和 这俩 constraints，作者还有第三个 motivation 和 第三个 constraints，而 constraints 第三个则是基于 resources 的性质，在 Section 2.4，用于解决的是当 word 没有 synset 时的问题。所以重新整理一下就是：

Motivation: 1) 公式（1），一个 word 由多个 lexeme 组成；2) 公式（2），一个 synset 也由多个 lexeme 组成；3) 一个 word embedding 也可以认为是它不同 sense 的 embedding 的加和。
Constraints: 1) 公式（1），一个 word 由多个 lexeme 组成；2) 公式（2），一个 synset 也由多个 lexeme 组成；3) 公式（25），相关联的 synset 应该有相近的 embedding，这个 constraints 用于解决 word 没有 synset 或者只有一个 synset word 时的问题。
Model: 基于这几种 constraints，就可以设计一个 encoding - decoding autoencoder 的 NN，从 input 到 output，把 synsets 当 words 的 encoding。然后公式（10）到公式（17）就是整个 autoencoder 的 NN 的每一步骤的公式。可以看出，encoding - decoding 的两种表达之间的差值就是我们的 objective 函数了，即公式 （17）。
Implementation: 这个论文的另一个卖点除了这种很优美的 relation constraints 外，是他充分利用了 sparseness 去加速求解。他们把 word synset 之间，用 autoencoder 的 encoding 和 decoding part 中的 lexeme 为中间体，分别组成了一个 rank 4 的 tensor，即 E 和 D。E 和 D 也是 autoencoder 中要 learned 的 parameter。但是他们假设了 E 和 D 中的每一个维度之间是 no interaction 的，且又由于很多 lexeme 并不存在，所以更增加了 E 和 D 的 sparseness——最后的结果就是 E 和 D 的实际有效的维度大大降低——计算大大提速。但是我现在没想清楚这个 assumption 是否合理。另外还有一个实现细节是 Section 2.6。
Problem: 1) 就是上面说到的 no interaction 假设；2) 另一个不太优雅的地方是他们把 三种 constraints 用线性加权组合起来，即 Section 2.5 的地方，这个东西在他们这个框架下是比其他人的线性加权要合理的，因为他们假设 word, synset, lexeme 三者都是在同一个 embedding space。而且他们在实验中也讨论了这三个的权重，还算 OK 了。

还比如上面第一个方向中提到的 ACL 2015 的《**Revisiting Word Embedding for Contrasting Meaning**》[^7]，内容简介见上方。

##Beyond Words

这个方向相信大家已经不陌生了，从 Mikolov 2013 年放出 word2vec toolkit 源码并同时发表两篇 word2vec 连环弹鼻祖 paper 后，研究者们就开始群策群力地纷纷发表了 paragraph2vector, sentence2vector, document2vector。众所周知，这些工作和原始的 word2vec 差异不大，几乎是完全 follow 的 idea，变换一下 apply 的 unit。这样“粗略”的改进并不能达到真正的好效果。所以可以说，beyond words 这个方向依然有待研究。

最近一篇名字很 fancy 也很“囧”（被 Gordberg 说是个烂名字）的 paper 就是相关的工作，叫 thought vector，“思想向量”——来自 arXiv pre-print 论文《**Skip-Thought Vectors**》[^12]。Motivation: 很简单，想像 skip-gram 用中心词预测周围词一样，用中心句子预测周围句子。Model: 直接看 Figure 1，具体使用是 RNN-RNN 的 encoder-decoder 模型；其中两个 RNN 都用了 GRU 去“模拟” LSTM 的更优表现。在 encoder 阶段，只是一个 RNN；在 decoder 阶段，则是两个（分别对应前一个句子和后一个句子——也就是说不能预测多个前面的句子和后面的句子）。这样的模型可以保留一个 encoding for each sentence，这个 encoding 会很有用，就被称为 skip-thoughts vector，用来作为特征提取器，进行后续 task。注意是 Figure 1 中所谓的 unattached arrows，对应在 decoder 阶段，是有一个 words conditioned on previous word + previous hidden state 的 probability 束缚。同时，因为 decoder 也是 RNN，所以可用于 generation（在论文结尾处也给出了一些例子）。Mapping: 本文的另一个贡献是 vocabulary mapping。因为 RNN 的复杂性，但作者又不希望不能同时 learn word embedding，所以只好取舍一下——我们 learn 一部分 word embedding（words in training vocabulary）；对于没出现的部分，我们做一个 mapping from word embedding pre-trained from word2vec。这里的思想就是 Mikolov'13 年那篇 word similarity for MT 的，用一个没有正则的 L2 学好 mapping。在实验中，他们用此方法将 20K 的 vocabulary 扩充到了 930K。Experiments: 实验做的很多，我觉得做得还挺 solid 的，没什么 unfair 的（但我对实验一向不太了解，请大家了解的多看看）。

> In our experiments we consider 8 tasks: semantic-relatedness, paraphrase detection, image-sentence ranking and 5 standard classification benchmarks. In these experiments, we extract skip-thought vectors and train linear models to evaluate the representations directly, without any additional fine-tuning. As it turns out, skip-thoughts yield generic representations that perform robustly across all tasks considered.

首先是他们有三种 feature vectors，uni-skip/bi-skip/combine-skip。分别对应 encoder 是 unbidirectional，bidirectional，和 combine 的。分别都是 4800 dimensions。对于不同的 task，可能用不同的 feature indicator，比如把两个 skip-thoughts-vectors u 和 v，点乘或者相减，作为两个 feature，再用 linear classifier (logistic)。


##Beyond English

最后来说第四个方向，这个方向也是 ACL 2015 workshop 上，Yoav Goldberg 在其 talk 《**word embeddings: what, how and whither**》上重点提及的，那就是现有的 word embedding 工作，放出来的已经 train 好的 vectors，绝绝绝绝绝大多数都是 English 的。可是即便是按照大的语系划分，世界上的语言也有太多不共通的性质。所以如果仅仅去研究 English 上的 word embedding 的改进，比如 compositional, morphological, 是远远不够的。

其实，beyond English 有两种分支，一种是完全抛弃 English，用另一种语言的语料，做一个新问题或者老问题。第二种分支就是 cross-lingual，都知道 English 是 rich-resource 的语言，也就是所谓的富语料，有充足的资源，cross-lingual 的一大优点就是可以用 rich-resource 的性质去弥补 low-resource 这边的不足。这也是为什么，cross-lingual 从来都会占据各大会议的一席之地的原因。

关于 beyond English 这个方向的研究除了 Yoav Goldberg 给的 talk 里提到的一些 Hebrew 的性质外，还有比如这次 ACL 2015 上的《**A Generalisation of Lexical Functions for Composition in Distributional Semantics**》[^13]。一作是 relation embedding 的“鼻祖”，贡献了一堆 relation embedding 的 paper。这篇论文的一大贡献是他们给出了两组 datasets，一个是 adj-noun 的，一个是 noun-noun 的。分别是英文和法语的。

另外，也有一些中文研究者开始了中文的 distributed representation 的研究，如初步发表在 EMNLP 2015 上的[《**Comonent-Enhanced Chinese Character Embeddings**》](/files/emnlp2015comp.pdf)[^14]。



### References


[^1]: Samaneh Moghaddam and Martin Ester. 2013. On the design of LDA models for aspect-based opinion mining. CIKM.
[^2]: Samaneh Moghaddam Martin Ester. 2013. The FLDA model for aspect-based opinion mining: addressing the cold start problem. WWW.
[^3]: Siwei Lai, Kang Liu, Liheng Xu, Jun Zhao. 2015. How to Generate a Good Word Embedding? arXiv pre-print.
[^4]: T. K. Landauer. 2002. On the computational basis of learning and cognition: Arguments from lsa. Psychology of learning and motivation, 41:43–84.
[^5]: Radu Soricut and Franz Och. 2015. Unsupervised Morphology Induction Using Word Embeddings. NAACL.
[^6]: Ignacio Iacobacci, Mohammad Taher Pilehvar and Roberto Navigli. 2015. SensEmbed: Learning Sense Embeddings for Word and Relational Similarity. ACL.
[^7]: Zhigang Chen, Wei Lin, Qian Chen, et al. 2015. Revisiting Word Embedding for Contrasting Meaning. ACL.
[^8]: Mohit Iyyer, Varun Manjunatha, Jordan Boyd-Graber, et al. 2015. Deep Unordered Composition Rivals Syntactic Methods for Text Classification. ACL.
[^9]: Angeliki Lazaridou, Georgiana Dinu and Marco Baroni. 2015. Hubness and Pollution: Delving into Cross-Space Mapping for Zero-Shot Learning. ACL. 
[^10]: Faruqui Manaal, Dodge Jesse, Jauhar Sujay K, et al. 2015. Retrofitting Word Vectors to Semantic Lexicons. NAACL.
[^11]: Sascha Rothe and Hinrich Schütze. 2015. AutoExtend: Extending Word Embeddings to Embeddings for Synsets and Lexemes. ACL.
[^12]: Ryan Kiros, Yukun Zhu, Ruslan Salakhutdinov, et al. 2015. Skip-Thought Vectors. arXiv pre-print.
[^13]: Antoine Bride, Tim Van de Cruys and Nicholas Asher. 2015. A Generalisation of Lexical Functions for Composition in Distributional Semantics. ACL.
[^14]: Yanran Li, Wenjie Li, Fei Sun, et al. 2015. Component- Enhanced Chinese Character Embeddings. EMNLP.
