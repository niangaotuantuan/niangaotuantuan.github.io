---
layout: post
title: NIPS 2015 Deep Learning Symposium Part I
description: This post introduces my notes and thoughts on NIPS 2015 Deep Learning Symposium. Due to page limit, it will be separated into two posts.

image:
  feature: nips15_dl_bg.jpeg

comments: true
share: true

category:
- peppypapers

tags:
- LSTM
- NIPS
- Deep Learning
- paper
---

This post introduces my notes and thoughts on NIPS 2015 Deep Learning Symposium. Due to page limit, it will be separated into two posts. This post includes the following papers:

1. **Character-aware Neural Language Models**[^1]
2. **Character-level Convolutional Networks for Text Classification**[^2]
3. **Skip-thought vectors**[^4]
4. **Teaching machines to read and comprehend**[^5]
5. **Towards AI-complete question answering: A set of prerequisite toy tasks**[^6]
6. **Visualizing and understanding recurrent networks**[^7]
7. **A Neural Algorithm Of Artistic Style**[^8]
8. **Spatial Transformer Networks**[^9]
9. **Deep Generative Image Models Using A Laplacian Pyramid Of Adversarial Networks**[^10]

-------------------------

### Character-level Language Models

#### Character-aware Neural Language Models

Let's get started with two papers about character-level language modeling. It is well known that the performance using word-level input for neural networks are often affected by rare and out-of-vocabulary (OOV) word problems as well as imperfect word segmentation. One way to address these problems is to adopt character-level input by leveraging sub-word information. Motivated by this, this Symposium selected two character-level language models. However, they differ in many aspects.

The first one, **Character-aware Neural Language Models**[^1], accepted by AAAI 2016, is highly recommended. It is a great combination of NLP and DL, informative and thought-provoking. Their model is composed by a character-level input for CNN whose output is then fed into RNNLM. What also worth mentioning here is that at final prediction, they still use word-level information. That means, they maintain word embeddings as output. It seems to some extent tricky. But with a second glance, I think it is meaningful as what they are really learning is the boundary of words.

> In this work, we propose a language model that leverages subword information through a character-level convolutional neural network (CNN), whose output is used as an input to a recurrent neural network language model (RNNLM). 

![](/images/nips15_dl_1.png)

Now, I will list several the thought-provoking findings in this paper. *First*, they argue that only one convolutional + max-over-time pooling is enough, which is contracted to the stacked CNN for sentence modeling. 

> Whereas a conventional NLM takes word embeddings as inputs, our model instead takes the output from a single-layer character-level CNN with max-over-time pooling. 

The *second* difference between theirs and stacked CNN is that, narrow convolution is choosed in this work instead of wide convolution.

The last and maybe the most important takeaway is that, they adopt **Highway Network (HW-Net)**[^3] between pooling output and LSTM. The authors find HW-Net is a crucial module for their character-aware neural language model, which acts as another nonlinear hidden layer enhancing the interactions between network features. On the contrary, this HW Net module is feckless for word-level language models. It is because that dimensions of word embeddings do not (a priori) encode features that benefit from nonlinear, hierarchical composition availed by highway layers.

My cent here is that, is their results demonstrating that the interactions introducing by stacted CNN are less powerful than those by HW-Net?

#### Character-level Convolutional Networks for Text Classification

Now move to the second character-level paper. This is very different from the above one.

This article is the first to apply ConvNets only on characters. They use very classical ConvNet settings, temporal convlutional and temporal max-pooling. They also truncate their model into simpler NLP settings, such as they neglect the variant length problems for convolutional networks. They just truncate them when exceeded. Another difference for classical NLP CNN is that they reverse the input sequence as what is often done in recurrent networks. The character quantization order is backward so that the latest reading on characters is always placed near the begin of the output, making it easy for fully connected layers to associate weights with the latest reading.
![](/images/nips15_dl_2.png)

The experimental details, findings in these two papers are to some extent mutually exclusive. In other words, character-level language models remain open for the research field. I expect to see more literature in this field.



------------------------

### Skip-Thought Vectors

It has already been a famous work. Skip-Thought Vectors are based on GRU-GRU encoder-decoder architecture, aiming at mimicing the performance of LSTMs. The key is the decoder incorporates two GRUs for the previous sentence and the next sentence. 

![Skip-Thought Vectors](/images/nips15_dl_3.png)
In this way, they can keep an encoding for each sentence, which is the so-called skip-thoughts vector. As the decoder is also RNN (GRU), the skip-thoughts vector can be seen as feature extractors to do generation.

Another important contribution in this work, I think, is the **vocabulary mapping** technique. In the aim of only learning word embeddings in training vocabulary and thus reducing the training time, they use a mapping from word embedding pre-trained from word2vec. By using this, they seccussfully expand a 20K-vocabulary to 930K. 

> In our experiments we consider 8 tasks: semantic-relatedness, paraphrase detection, image-sentence ranking and 5 standard classification benchmarks. In these experiments, we extract skip-thought vectors and train linear models to evaluate the representations directly, without any additional fine-tuning. As it turns out, skip-thoughts yield generic representations that perform robustly across all tasks considered.


-------------------------

### Datasets contributions

The followings are two datasets contributed papers in this Symposium. 

#### Teaching machines to read and comprehend

The first paper is seemingly inspired from DRAW[^11] and has two primary contributions, (1) they construct a supervised document-query based **dataset** for machine comprehension research. This dataset forms as ((document-query pair), entity-formed answer) triples. (2) They propose three models, of which two are attention-based. See as (a)(b) in the following figure in their paper.

![Attentive Reader and Impatient Reader](/images/attention-6.png)
For both of these two models, the input each round is a (document-query) pair. Specifically, one can either take seperated sentences in each document as input unit, forming (sentence-query) pair input; or one can input a whole document then a query. The latter one, however, is credited by the authors as a less meaningful way, where queries no longer serve as mentions. Let's delve into the two attention-based models. Model (a) is called **Attentive Reader**, which is straightforward. The left part in the model is the classical attention mechanism. 
![Attention Mechanism](/images/attention-1-2.png)

Let's move to model (b), **Impatient Reader**. This model is really interesting and intuitive, which emphasizes on the *reread* mechanism. That is to say, for each token in each query, a whole document is read once through. One token, one document. Next token, again this document. That's what the *reread* is. I interpret such *reread* mechanism as a *gradual comprehension procedure*. When a human being is reading a tough article, s/he will read again and again. We expect to comprehend deeplier as we reread once more. Such motivation, behind this reread mechanism, if any, will make larger impact when predicting beyond a token level output. Therefore, I think this mechanism is worthy of implementing in more tasks.

#### Towards AI-complete question answering: A set of prerequisite toy tasks

This paper is also famous, and has been well received and referenced. They construct an AI-related QA **dataset** including 20 types of toy questions, abbrevited as FB20.

As stated and introduced in [my previous post](http://yanran.li/peppypapers/2015/11/30/iclr-2016-submission-highlights.html), the most difficult tasks among these 20 are *positional reasoning* and *path finding*.

If anyone interested in the related work on FB20, I will recommend the following three papers:
a. **Learning Answer-Entailing Structures for Machine Comprehension** by Mrinmaya Sachan, Kumar Dubey, Eric Xing, Matthew Richardson from CMU. ACL 2015. They assume intermediate hypothesis between question and answer and combine mult-task techniques to improve performances.
b. **Machine Comprehension with Discourse Relations** by Karthik Narasimhan and Regina Barzilay from MIT. ACL 2015. It is a really neat paper, nothing to do with neural networks. They use discourse information + less human annotation to enhance machine comprehension.
c. **Reasoning in Vector Space: An Exploratory Study of Question Answering** by Microsoft Research. In submission to ICLR 2016. As claimed in the paper, existing work on FB20 is end-to-end which is deficient in analyzing the error-case and thus finding direction to improve. It is ambiguous whether the error is caused by semantic modeling or by reasoning process. To this end, this work "dimantles" the process of end-to-end reasoning by using tensor product representation (TPR) associated with common-sense inference, resulting in a almost perfect performance on FB20.


------------------------------

### Visualizing and Understanding Recurrent Networks

This work is an exntension of the famous blog, [<<**The Unreasonable Effectiveness Of RNN**>>](http://karpathy.github.io/2015/05/21/rnn-effectiveness/) from Andrej Karpathy.

Through controlled experiments, the work is aimed at quantatively why char-LSTM is powerful and basically, is it really able to model the often cited long term dependency? Like what is revealed in the [the post by Yoav Goldberg](http://nbviewer.ipython.org/gist/yoavg/d76121dfde2618422139), this work claims, the astonishing cability of char-LSTM is, yes, the log term memory, which is presented by the pairing of *brackets, quotes* in this work.

![](/images/infoflow_3.png)
Additionally, by using visulization techniques, this work analizes the gate activation statistics and error types. The authors conclude that certain cells in char-LSTM are in charge of certain character position, demonstrating its long term memory modeling capacity in the mechanism level. The error case analysis, also proves it by reducing the errors in handling long distance information, e.g. bracket and quote.
![](/images/infoflow_4.png)


---------------------

### Generating Images and Recognizing Images

#### A Neural Algorithm Of Artistic Style

Is there anybody not aware of this work? This series of work comes from Google DeepMind, inception, neural art and etc. See this below:
![neural artworks](/images/nips15_dl_4.png)
The neural art work is a special kind of *photorealistic rendering* using deep neural networks. It can render some landscape photographs with the Van Gogh's style in <Starry Night>.

![](/images/nips15_dl_5.png)
The key is the representation modeling for content and the style. The latter is more important. As they two are complicated interacted, they should not be modeled seperatedly. Therefore, the authors add to each layer in CNN a style representation. Based on this, they utlize the correlation between filters in each layer for style representation, in the pursuit of invariant features.


#### Spatial Transformer Networks

This is another intersting work I like very much, also from Google DeepMind. It aims at extracting **real** invariant features in CNNs. The max-pooling in CNN can only focus on a rigid and small region (2*2 pixels) and thus it requires deep architectures for larger region-based invariant features. Although the attention mechanism is claimed to be useful for relevant feature extraction, what we need is general and canonical invariant features. In this work, a self-containted transformation module is proposed, which is flexible to be added into arbitrary place in networks and effective to extract invariant image features.

![Spatial Transformers](/images/nips15_dl_6.png)
The module is called **Spatial Transformers**, composed by three parts: Localization Network, Grid generator, and Sampler. Localization Network is very flexible and general, used as generating feature maps and their corresponding parameters. It does not restrain specific types of networks. The only requirement is a regression in the final layer to output parameters. The parameters are fed into the next part: Grid generator, the key of Spatial Transformers. It generates special templates (like Photoshop's) for invariant feature extractions through **Transformer function**. This function decides the quality of the invariant features. The function is associated with only a set of 6 parameters, but powerful to achieve cropping, translation, rotation, scale and skew. 
![Grid Generator](/images/nips15_dl_7.png)

There are various advantages: (1) It is self-contained module, with no effort to change the original networks; (2) It is differentiable, which means it can be incorporated into any end-to-end training; (3) Its differentiable computation is simple and fast; (4) It extracts more general invariant features.

See [another great post here](http://torch.ch/blog/2015/09/07/spatial_transformers.html) on this work.


#### Deep Generative Image Models Using A Laplacian Pyramid Of Adversarial Networks

This is another work very closed to DRAW[^12]. They shares the similar motivation that, instead of generating images through only one thread, we can let them generate parts of images at each timestep.

![Laplacian Generative Adversarial Networks](/images/nips15_dl_8.png)
The model in this work is **Laplacian Generative Adversarial Networks (LAPGAN)**, a combination of conditional GAN and Laplacian pyramid structure. The conditional GAN is based on GAN containing a generative model (G) for generating samples and a discriminative model (D) for comparing between generated samples and training data. Additional information such as sample class or label is added to conditional GAN. For Laplacian pyramid, it is a kind of hierarchical image representation focusing on the differences between multi-scales of images. Therefore, LAPGAN is a hierarchical framework which can generate and discriminate images on multi-scales.

The advantages are obvious: (1) It is unsupervised by using Adversial Network training technique. (2) Breaking the generation into successive refinements is the key idea in this work. Note that we give up any “global” notion of fidelity; we never make any attempt to train a network to discriminate between the output of a cascade and a real image and instead focus on making each step plausible. Furthermore, the independent training of each pyramid level has the advantage that it is far more difficult for the model to memorize training examples – a hazard when high capacity deep networks are used.




###References

[^1]: **Character-aware Neural Language Models**. Yoon Kim, Yacine Jernite, David Sontag, Alexander M. Rush. 2016. To appear in AAAI. 
[^2]: Xiang Zhang, Junbo Zhao, Yann LeCun. **Character-level Convolutional Networks for Text Classification**. 2015. In Proceedings of NIPS. 
[^3]: R. K. Srivastava, K. Greff and J. Schmidhuber. **Training Very Deep Networks**. 2015. Neural Information Processing Systems (NIPS 2015 Spotlight).
[^4]: Ryan Kiros, Yukun Zhu, Ruslan Salakhutdinov, et al. **Skip-thought vectors**. 2015. In Proceedings of NIPS.
[^5]: Karl Moritz Hermann, Tomáš Kočiský, Edward Grefenstette, et al. **Teaching machines to read and comprehend**. 2015. In Proceedings of NIPS. 
[^6]: JasonWeston, Antoine Bordes, Sumit Chopra, et al. **Towards AI-complete question answering: A set of prerequisite toy tasks**. 2015. arXiv preprint: 1502.05698.
[^7]: Andrej Karpathy, Justin Johnson, Li Fei-Fei. **Visualizing and understanding recurrent networks**. In submission to ICLR 2016.
[^8]: Leon A. Gatys, Alexander S. Ecker, Matthias Bethge. **A Neural Algorithm Of Artistic Style**. 2015. arXiv preprint: 1508.06576.
[^9]: Max Jaderberg, Karen Simonyan, Andrew Zisserman, and Koray Kavukcuoglu. **Spatial Transformer Networks**. 2015. arXiv preprint arXiv:1506.02025.
[^10]: Emily Denton, Soumith Chintala, Arthur Szlam, Rob Fergus. **Deep Generative Image Models Using A Laplacian Pyramid Of Adversarial Networks**. 2015. In Proceedings of NIPS.
[^11]: Karol Gregor, Ivo Danihelka, Alex Graves, et al. **DRAW: A Recurrent Neural Network For Image Generation**. 2015. arXiv pre-print:1502.04623.



