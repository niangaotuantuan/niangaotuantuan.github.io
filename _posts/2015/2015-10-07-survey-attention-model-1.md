---
layout: post
title: Survey on Attention-based Models Applied in NLP
description: Attention-based models are firstly proposed in the field of computer vision around mid 2014. And then they spread into Natural Language Processing. In this post, I will mainly focus on a list of attention-based models applied in natural language processing.


comments: true
share: true

category:
- peppypapers

tags:
- natural language processing
- attention
- paper
---

Attention-based models are firstly proposed in the field of computer vision around mid 2014 (thanks for the remindar from @archychu). And then they spread into Natural Language Processing. In this post, I will mainly focus on a list of attention-based models applied in natural language processing.

The first one should be the "guy" innovately and successfully bringing in attention mechanism from computer vision in to NLP. This is ICLR'15 paper [**Neural Machine Translation by Jointly Learning to Align and Translate**](http://arxiv.org/abs/1409.0473) from Dzmitry Bahdanau, Kyunghyun Cho, Yoshua Bengio. Although called *RNNsearch* by themselves in this paper, the model is in nature and inspired by the attention-based model as what they said in Section 3.1:

> Intuitively, this implements a mechanism of attention in the decoder. The decoder decides parts of the source sentence to pay attention to. By letting the decoder have an attention mechanism, we relieve the encoder from the burden of having to encode all information in the source sentence into a fixedlength vector. With this new approach the information can be spread throughout the sequence of annotations, which can be selectively retrieved by the decoder accordingly.

![Key Idea behind Attention Mechanism](/images/attention-1-1.png)
Such attention-based mechanism is motivated from that, instead of decoding based on the encoding of a whole and a *fixed-length* sentence during one pass of neural network-based machine translation, one can **attend** a specific part of the sentence. This specific part is what should currently be attended. These parts could be words or phrases. In this paper, when attention mechanism is adopted in machine translation framework, we can see, the attention mechanism builds attention pairs between source sentences and target sentences. Such pairs can be even transformed into heatmap-like matrix to demonstrate a kind of **soft alignment** between these two sentences. Attention-based mechanism, of course, brings several benefits. The most important is that it can handles long length sentence without merging or folding their semantics into a vague and incomplete representation. Besides, it can conquer the order variation and discrepency between sources and targets by soft alignment, which can be learned without any external knowledge.

The attention mechanism is easy to implement as well as to comprehend. Following the motivation, it alternates the context layer in RNN with a context vector $$c_i$$ for each target word $$y_i$$. Each $$c_i$$ associated with a softmax depicts a kind of expected annotation, which is analogous to expectation in statistics. Therefore, we no longer encodes a whole sentence into one holistic representation. We segment a sentence into several parts associated with an annotation. For each target $$y_i$$, we will align different weights of annotations. See Secion 3.1 and Eq.(6) in their paper for details.  
![Attention Mechanism](/images/attention-1-2.png)
![Soft Alignment Model](/images/attention-1-3.png)

My minor point for this paper is that their basis network is also the bi-directional RNN, which has been proved several times to be effective in machine translation tasks. 

---------------------------------------

The second paper comes the ACL’15 paper, [**Encoding Source Language with Convolutional Neural Network for Machine Translation**](http://arxiv.org/abs/1503.01838) from Fandong Meng, Zhengdong Lu, Mingxuan Wang, Hang Li, Wenbin Jiang, Qun Liu。The paper is also tackling machine translation task. This paper motivates similarly with the abovementioned one, that is, such soft alignment in machine translation can be a beneficial "supervised" guiding. In this paper, they propose two models, **tagCNN* and **inCNN*. The latter is a specific attention model. The difference is that, the former one, tagCNN directly transforms the aligned signal into a binary bit (0 or 1), which is then concatenated on to word embeddings as an additional dimension. The latter one, inCNN, doesn't utilize this signal directly. See the following picture from their paper for details.
![tagCNN and inCNN](/images/attention-2.png)

---------------------------------------

The third paper is also from ACL'15, [**A Hierarchical Neural Autoencoder for Paragraphs and Documents**](https://web.stanford.edu/~jurafsky/pubs/P15-1107.pdf) from Jiwei Li, Minh-Thang Luong, Dan Jurafsky. In the second model they propose in this paper, they incorporate attention mechanism onto a hierarchical LSTM. By such design, they aim to capture compositions/structures over sentences, which can be seen as one step over sentence-level RNN. However, I have some concerns upon this paper. Although it is reasonable to incorporate attention mechanism onto LSTM, it is relatively unfair to build an autoencoder upon such mechanism. Attention mechanism will become a dramatic and undesirable *copy* mechanism companied by autoencoder, whose target is to re-generate the input with less loss of information. 
![Hierarchical LSTM with Attention](/images/attention-1-1.png)

---------------------------------------

The fourth paper is the newly EMNLP'15 paper, [**A Neural Attention Model for Sentence Summarization**](http://www.emnlp2015.org/proceedings/EMNLP/pdf/EMNLP044.pdf), from Alexander M. Rush, Sumit Chopra and Jason Weston. This is the first NLP paper adopting attention mechanism into summarization task.

![Key Idea behind Attention Mechanism](/images/attention-4-1.png)

This paper utilizes neural language models to generate sentence summarization word by word, which goes beyond previous sentence-based extractive methods and phrase-based abstractive approaches for sentence summarization. More specific, their Attention-Based Summarization (ABS) approach is modeled off the attention-based encoder and a beam-search decoder with extractive features, which can be seen as a tradeoff between abstractive and extractive methods.
For the encoder models, they deploy four step-by-step models of which two are only considering the input word information, and the other two combining the embedded current context information. Thus, the latter two encoders, which are simultaneously learning embeddings for the input with distributions based on the current context, are capable to show interpretable alignment between the summary and the input sentence. The author conducted extensive experiments on sevesal strong and well-known baseline models, achieving promising results. Especially, their tuned model ABS+, which leverages the advantage of fluency by extracive features, scores significantly the best on the tasks. While they introduced how to tune the weight vector alpha, they don't report the real value of the alpha in the final best performance. Such real values would be beneficial to examine the importance of the extractive features. Therefore, I'm weakly hesitated for the analysis of the degree of their attention-based neural models.
![Key Idea behind Attention Mechanism](/images/attention-4-2.png)

---------------------------------------

I want to put a simple but straightforward paper in the end of this post, the EMNLP'15 short paper, [**Not All Contexts Are Created Equal: Better Word Representations with Variable Attention**](http://www.cs.cmu.edu/~lingwang/papers/emnlp2015-2.pdf), from Wang Ling. Wang Ling is a smart guy whose paper contains lots of simple yet effective ideas. Another example is his NAACL'15 paper, which I've introduced before [in my previous post](http://yanran.li/peppypapers/2015/05/23/Adapations-and-Variations-of-Word2Vec.html). In his NAACL'15 paper, [**Two/Too Simple Adaptations of Word2Vec for Syntax Problems**](http://www.cs.cmu.edu/~lingwang/papers/naacl2015.pdf), he advocates to induce syntactically-motivated embeddings using word order information. The beauty is that they fulfill this by only keeping the parameter the position information in the averaging/concatenating function of the orginial word2vec models. Then, there goes the problem, which is tackled in his EMNLP'15 paper. The position parameters, which is propotional to the window size, though beneficial, enlarge the complexity of the model and drag the computation. 

![Attention CBOW](/images/attention-CBOW.png)

To this end and motivated by the attention mechanism, the author put forward the **Attention-Based CBOW** model such that as in the above figure, the central word *south* to predict, is more correlated with those context words in dark colors, the words that should be attended. What is left is to define what kinds of words should be more attended. The author utilizes the word type and the distance (relative position) information, which I considered as a simiplicy of depedency information. The last thing is to alternate the averaging function in CBOW with attention-based (weighted sum) function. Bingo! Simple again!

