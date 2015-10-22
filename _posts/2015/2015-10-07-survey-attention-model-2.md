---
layout: post
title: Survey on Advanced Attention-based Models
description: In the previous post, I briefly introduce a list of paper applying attention-based models in natural language processing. Though slight different, they are all soft alignment models. However, there actually exits two class of alignment models, the soft one, and also the hard one. In fact, the soft and hard alignment models are concurred in computer vision around late 2014[^1]. Due to differences between CV and NLP (more precisely, image vs. language), hard alignment models are more difficult to transfer into NLP. In this post, I aim at introducing some advanced attention-based models especially hard ones, which have not been yet but will be popular.


comments: true
share: true

category:
- peppypapers

tags:
- natural language processing
- attention
- paper
---

In [the previous post](http://yanran.li/peppypapers/2015/10/07/survey-attention-model-1.html), I briefly introduced a list of paper applying attention-based models in natural language processing. Though slight different, they are all soft alignment models. However, there actually exits two classes of alignment models, the soft one, and also the hard one. In fact, the soft and hard alignment models are concurred in computer vision in late 2014 [^1]. In this work, the authors explore and compare two variants of this model: a deterministic version trainable using standard backpropagation techniques (soft alignment model) and a stochastic variant trainable by maximizing a variational lower bound (hard one). Due to the differences between CV and NLP (more precisely, image vs. language), hard alignment models are more difficult to transfer into NLP. In this post, I aim at introducing some advanced attention-based models especially hard ones, which have not been yet but will be popular.

The first one, highly-recommended (by me), is arXiv pre-print, [**DRAW：A Recurrent Neural Network For Image**](http://arxiv.org/pdf/1502.04623.pdf)[^2], from Google DeepMind. I cannot better summarize their motivation than they've already done in their preprint:

> A person asked to draw, paint or otherwise recreate a visual scene will naturally do so in a sequential, iterative fashion, reassessing their handiwork after each modification. Rough outlines are gradually replaced by precise forms, lines are sharpened, darkened or erased, shapes are altered, and the final picture emerges.

It means that, when we human beings are drawing, we are not required and even not possible to finish it without any modification. What is true is that we're gradually drawing them, replacing the old and rough lines with new and more precise ones. So, why should neural network finish outputing in one round? Isn't it too strict and fastidious for us to require neural network to generate an entire picture once a round? 

Holding this motivation, the authors pursue a mechanism, **DRAW**, that can mimic such gradual drawing procedure during which the network attend a fraction/patch of a picture every timestamp. Sounds familiar, aha? It will be exactly same as attention mechanism if so, however, it's different in which phase the attention is used. In the widely-used attention mechanism, the attention is introduced in the decoding phase which can not influence or propagate back to the encoding phase and thus the parameters in the encoding phase. The mechanism DRAW, forces the network to attend small patches of the pictures from the very beginning, and consequently, as what they say,

> The main challenge faced by sequential attention models is learning where to look, which can be addressed with reinforcement learning techniques such as policy gradients (Mnih et al. , 2014 ). The attention model in DRAW, however, is fully differentiable, making it possible to train with standard backpropagation. In this sense it resembles the selective read and write operations developed for the Neural Turing Machine.

![DRAW](/images/attention-5-1.png)

Therefore, they propose this model, DRAW. Its name is not simply following the drawing procedure, but a short of *Deep Recurrent Attentive Writer*. For recurrent, they are saying that this is a gradual learning network; for attentive, they are saying the attention mechanism from the very beginning. Also, I could not help even recommending their demo video along with this paper. From [their video](https://www.youtube.com/watch?v=Zt-7MI9eKEo), we can see how DRAW is drawing/writing every digit stroke by stroke.

![Draw digits stroke by stroke](/images/attention-5-2.png)

---------------------------------------

The second one also comes from Google DeepMind, the newly accepted NIPS'15 paper, [**Teaching Machines to Read and Comprehend**](http://arxiv.org/abs/1506.03340)[^3]. It is seemingly inspired from the abovementioned one. This paper has two primary contributions, (1) they construct a supervised document-query based dataset for machine comprehension research. This dataset forms as ((document-query pair), entity-formed answer) triples. (2) They propose three models, of which two are attention-based. See as (a)(b) in the following figure in their paper.

![Attentive Reader and Impatient Reader](/images/attention-6.png)
For both of these two models, the input each round is a (document-query) pair. Specifically, one can either take seperated sentences in each document as input unit, forming (sentence-query) pair input; or one can input a whole document then a query. The latter one, however, is credited by the authors as a less meaningful way, where queries no longer serve as mentions. Let's delve into the two attention-based models. Model (a) is called **Attentive Reader**, which is straightforward. The left part in the model is the classical attention mechanism. 
![Attention Mechanism](/images/attention-1-2.png)

Let's move to model (b), **Impatient Reader**. This model is really interesting and intuitive, which emphasizes on the *reread* mechanism. That is to say, for each token in each query, a whole document is read once through. One token, one document. Next token, again this document. That's what the *reread* is. I interpret such *reread* mechanism as a *gradual comprehension procedure*. When a human being is reading a tough article, s/he will read again and again. We expect to comprehend deeplier as we reread once more. Such motivation, behind this reread mechanism, if any, will make larger impact when predicting beyond a token level output. Therefore, I think this mechanism is worthy of implementing in more tasks.

---------------------------------------

The third one I want to recommend is a newly accepted NIPS'15 paper, [**Learning Wake-Sleep Recurrent Attention Models**](http://arxiv.org/abs/1509.06812)[^4], from Jimmy Ba, Roger Grosse, Ruslan Salakhutdinov, Brendan Frey. Some results of this work has been previously introduced in the [Deep Learning Tutorial](http://machinelearning2015.ru/ru/node/76) given by Professor Ruslan Salakhutdinov in the Machine Learning and Intelligence School 2015. 

![Hard Attention Mechanism](/images/attention-7-1.png)
The model in this paper is the most distinguished one among others introduced here as its attention mechanism is the so-called **hard attention mechanism**, compared to the soft attention mechanism, where the other models introduced above belong. In fact, hard attention mechanism are born concurrently with soft attention mechanism, but is only prospered in computer vision field so far. Although both of these two mechanisms are designed to attend (more) a small region of the input instead of the whole, they are different in several aspects. The key is that, the hard mechanism, attend one and only one region while the soft is attending one more and others less. To this end, the hard mechanism is stochastic and sampling-based, whereas the soft mechanism is deterministic and can be seen as an expectation over all regions. Consequently, there are both sides for these brothers. The hard mechanism, sampling-based, is more computationally efficient as they only and actually need to process a small patch of the input. But it requires some definition and intuition on the form of the sampling, because they must make discrete choices. On the contrary, the soft mechanism costs more computation because they have to examine every location of the image, which will be drastic for large image datasets. The good side is that it can be trained by backpropation and thus easily to embed in a whole network.
![Wake-Sleep Recurrent Attention Model](/images/attention-7-2.png)

Back to this paper, they indeed mix these two mechanisms into different layers of a network, which is obviously a combination of both good sides. We should postively look forward to hard mechanism or its variant successfully applied in NLP.



###References
[^1]: Kelvin Xu, Jimmy Ba, Ryan Kiros, et al. **Show, Attend and Tell: Neural Image Caption Generation with Visual Attention**. 2015. In Proceedings of ICML.
[^2]: Karol Gregor, Ivo Danihelka, Alex Graves, et al. **DRAW: A Recurrent Neural Network For Image Generation**. 2015. arXiv pre-print.
[^3]: Karl Moritz Hermann, Tomáš Kočiský, Edward Grefenstette, et al. **Teaching Machines to Read and Comprehend**. 2015. In Proceedings of NIPS.
[^4]: Lei Jimmy Ba, Roger Grosse, Ruslan Salakhutdinov, Brendan Frey. **Learning Wake-Sleep Recurrent Attention Models**. 2015. In Proceedings of NIPS.
