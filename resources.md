---
layout: page
permalink: /resources/
title: Publications of Deep Learning in NLP
tags: [papers]
image:
  feature: bg_friend.jpg
---


This page is to collect the publications and related resources of Deep Learning in NLP. Last updated on 16/07/2015.

It is inspired by the great resource on [*CSE 599 - Advanced in NLP*](http://homes.cs.washington.edu/~yejin/cse599.html).

Feel free to pull request on [Github](https://github.com/niangaotuantuan/Publications-of-Deep-Learning-in-NLP).



###Survey

#### Bengio et al's survey on representation learning
+ Yoshua Bengio, Aaron Courville and Pascal Vincent. "Representation Learning: A Review and New Perspectives." [pdf](http://arxiv.org/pdf/1206.5538v3.pdf) TPAMI 35:8(1798-1828)
#### Bengio, LeCun Yann, Yoshua Bengio and Geoffrey Hinton's survey on *Nature*
+ Yann LeCun, Yoshua Bengio	 and Geoffrey Hinton. "Deep Learning"
[pdf](http://download.csdn.net/detail/happytofly/8758755) Nature 521, 436–444

### Embeddings & Language Models

#### Skip-gram embeddings

+ Tomas Mikolov, Kai Chen, Greg Corrado, and Jeffrey Dean. "Efficient Estimation of Word Representations in Vector Space." [pdf](http://arxiv.org/pdf/1301.3781.pdf) ICLR, 2013. 
+ Tomas Mikolov, Ilya Sutskever, Kai Chen, Greg Corrado, and Jeffrey Dean. "Distributed Representations of Words and Phrases and their Compositionality." [pdf](http://arxiv.org/pdf/1310.4546.pdf) NIPS, 2013. 
+ [king-man+woman=queen] Tomas Mikolov, Wen-tau Yih, and Geoffrey Zweig. "Linguistic Regularities in Continuous Space Word Representations." [pdf](http://research.microsoft.com/pubs/189726/rvecs.pdf) NAACL, 2013. 
+ [technical note] Yoav Goldberg and Omer Levy "word2vec explained: deriving Mikolov et al.'s negative-sampling word-embedding method" [pdf](http://www.cs.bgu.ac.il/~yoavg/publications/negative-sampling.pdf) Tech-report 2013 
+ [buzz-busting] Omer Levy and Yoav Goldberg "Linguistic Regularities in Sparse and Explicit Word Representations" [pdf](http://www.cs.bgu.ac.il/~yoavg/publications/conll2014analogies.pdf) **CoNLL-2014 Best Paper Award** 
+ [lessons learned] Omer Levy, Yoav Goldberg, Ido Dagan "Improving Distributional Similarity with Lessons Learned from Word Embeddings" [pdf](https://levyomer.files.wordpress.com/2015/03/improving-distributional-similarity-tacl-2015.pdf), TACL 2015
+ [syntax-word order] Wang Liang, Chris Dyer, Alan Black, Isabel Trancoso. "Two/Too Simple Adaptations of Word2Vec for Syntax Problems" [pdf](http://www.cs.cmu.edu/~lingwang/papers/naacl2015.pdf) NAACL 2015 (Short)

#### Embedding enhancement: Syntax, Retrofitting, etc
+ [dependency embeddings] Omer Levy and Yoav Goldberg "Dependency Based Word Embeddings" [pdf](http://www.cs.bgu.ac.il/~yoavg/publications/acl2014syntemb.pdf) ACL 2014 (Short) 
+ [dependency embeddings] Mohit Bansal, Kevin Gimpel and Karen Livescu. "Tailoring Continuous Word Representations for Dependency Parsing" [pdf](http://www.aclweb.org/anthology/P14-2131.pdf) ACL 2014 (Short)
+ [retrofitting with lexical knowledge] Manaal Faruqui, Jesse Dodge, Sujay Kumar Jauhar, Chris Dyer, Eduard Hovy and Noah A. Smith. "Retrofitting Word Vectors to Semantic Lexicons" [pdf](http://arxiv.org/pdf/1411.4166v4.pdf), NAACL 2015 
+ [contrastive estimation] Mnih and Kavukcuoglu, "Learning Word Embeddings Efficiently with Noise-Contrastive Estimation." [pdf](https://www.cs.toronto.edu/~amnih/papers/wordreps.pdf) NIPS 2013 
+ [embedding documents] Quoc V Le, Tomas Mikolov. "Distributed representations of sentences and documents" [pdf](http://jmlr.csail.mit.edu/proceedings/papers/v32/le14.pdf) ICML 2014 
+ [synonymy relations] Mo Yu, Mark Dredze. "Improving Lexical Embeddings with Semantic Knowledge" [pdf](http://www.cs.jhu.edu/~mdredze/publications/2014_acl_embeddings.pdf) ACL 2014 (Short)
+ [embedding relations] Asli Celikyilmaz, Dilek Hakkani-Tur, Panupong Pasupat, Ruhi Sarikaya. "Enriching Word Embeddings Using Knowledge Graph for Semantic Tagging in Conversational Dialog Systems" [pdf](http://research.microsoft.com/pubs/238362/Celikyilmaz.pdf) AAAI 2015 (Short)
+ [multimodal] Angeliki Lazaridou, Nghia The Pham and Marco Baroni. "Combining Language and Vision with a Multimodal Skip-gram Model" [pdf](http://arxiv.org/pdf/1501.02598v3.pdf) NAACL 2015
+ [syntax-word order] Wang Liang, Chris Dyer, Alan Black, Isabel Trancoso. "Two/Too Simple Adaptations of Word2Vec for Syntax Problems" [pdf](http://www.cs.cmu.edu/~lingwang/papers/naacl2015.pdf) NAACL 2015 (Short)

#### Embedding enhancement: Word order, Morphological, etc
+ [syntax-word order] Wang Liang, Chris Dyer, Alan Black, Isabel Trancoso. "Two/Too Simple Adaptations of Word2Vec for Syntax Problems" [pdf](http://www.cs.cmu.edu/~lingwang/papers/naacl2015.pdf) NAACL 2015 (Short)
+ [word order] Rie Johnson and Tong Zhang. Effective use of word order for text categorization with convolutional neural networks. [pdf](http://aclweb.org/anthology/N/N15/N15-1011.pdf) NAACL 2015
+ [word order] Radu Soricut and Franz Och. "Unsupervised Morphology Induction Using Word Embeddings" [pdf](http://aclweb.org/anthology/N/N15/N15-1186.pdf) **NAACL 2015 Best Paper Awards**
+ [morphology] Minh-Thang Luong Richard Socher Christopher D. Manning. "Better Word Representations with Recursive Neural Networks for Morphology" [pdf](http://nlp.stanford.edu/~lmthang/data/papers/conll13_morpho.pdf) CoNLL 2013
+ [morpheme] Siyu Qiu, Qing Cui, Jiang Bian, Bin Gao, Tie-Yan Liu. "Co-learning of Word Representations and Morpheme Representations" [pdf](http://www.aclweb.org/anthology/C14-1015) COLING 2014 
+ [morphological] Ryan Cotterell and Hinrich Schütze. "Morphological Word-Embeddings" [pdf](http://www.aclweb.org/anthology/N/N15/N15-1140.pdf) NAACL 2015 (Short)
+ [regularization] Dani Yogatama, Manaal Faruqui, Chris Dyer, Noah Smith. "Learning Word Representations with Hierarchical Sparse Coding" [pdf](http://arxiv.org/pdf/1406.2035.pdf) ICML 2015


#### Embeddings as matrix factorization
+ [approximate interpretation] Levy and Goldberg, "Neural Word Embedding as Implicit Matrix Factorization." [pdf](https://levyomer.files.wordpress.com/2014/09/neural-word-embeddings-as-implicit-matrix-factorization.pdf) NIPS 2014 
+ Omer Levy, Steffen Remus, Chris Biemann, and Ido Dagan. "Do Supervised Distributional Methods Really Learn Lexical Inference Relations?" [pdf](https://levyomer.files.wordpress.com/2015/03/do-supervised-distributional-models-naacl-2015.pdf) NAACL 2015 (Short)
+ Tim Rocktaschel, Sameer Singh and Sebastian Riedel. "Injecting Logical Background Knowledge into Embeddings for Relation Extraction" [pdf](http://rockt.github.io/pdf/rocktaschel2015injecting.pdf) NAACL 2015
+ [exact interpretation] Yitan Li, Linli Xu, Fei Tian, Liang Jiang, Xiaowei Zhong and Enhong Chen. "Word Embedding Revisited: A New Representation Learning and Explicit Matrix Factorization Perspective" [pdf](http://home.ustc.edu.cn/~etali/papers/EMF-IJCAI2015.pdf) IJCAI 2015

#### Embedding obtained from other methods
+ [noise-contrasive estimation] Andriy Mnih and Koray Kavukcuoglu, "Learning word embeddings efficiently with noise-contrastive estimation" [pdf](https://www.cs.toronto.edu/~amnih/papers/wordreps.pdf) NIPS 2013
+ [logarithm of word-word co-occurrences] Jeffrey Pennington, Richard Socher, and Christopher D. Manning, "GloVe: Global Vectors for Word Representation" [pdf](http://llcao.net/cu-deeplearning15/presentation/nn-pres.pdf) EMNLP 2014
+ [explicitly encode co-occurrences] Levy Omer, Yoav Goldberg, and Israel Ramat-Gan, "Linguistic regularities in sparse and explicit word representations." [pdf](http://anthology.aclweb.org/W/W14/W14-16.pdf#page=181) CoNLL 2014.

#### Why and when embeddings are better
+ [comparison between pretrained embeddings] Yanqing Chen, Bryan Perozzi, Rami Al-Rfou, and Steven Skiena. "The expressive power of word embeddings" [pdf](http://arxiv.org/pdf/1301.3226.pdf)  ICML 2013
+ [prediction fashioned matters] Felix Hill, KyungHyun Cho, Sebastien Jean, et al., "Not all neural embeddings are born equal" [pdf](http://arxiv.org/abs/1410.0718) NIPS Workshop 2014
+ [multichannel as multi-embeddings input] Wenpeng Yin, Hinrich Schütze. "MultiGranCNN: An Architecture for General Matching of  Text Chunks on Multiple Levels of Granularity" ACL 2015

#### Word Representations via Distribution Embedding 
+ Katrin Erk, "Representing Words As Regions in Vector Space". [pdf](http://dl.acm.org/citation.cfm?id=1596374.1596387) In Proceedings of the Thirteenth Conference on Computational Natural Language Learning, Boulder, Colorado, 2009. 
+ [random walks, generative model] Sanjeev Arora, Yuanzhi Li, Yingyu Liang, Tengyu Ma, Andrej Risteski. "Random Walks on Context Spaces: Towards an Explanation of the Mysteries of Semantic Word Embeddings" [pdf](http://arxiv.org/abs/1412.6616). In CoRR, 2015.
+ [breadth, asymmetric] Luke Vilnis, Andrew McCallum. "Word Representations via Gaussian Embedding". [pdf](http://arxiv.org/abs/1412.6623) [slides](http://www.iclr.cc/lib/exe/fetch.php?media=iclr2015:vilnis-iclr2015.pdf) In ICLR, 2015.

#### Classic(!)
+ Brown et al., "Class-Based n-Gram Models of Natural Language." [pdf] Computational Linguistics 1992

## Phrase, Sentence and Document Modeling

### Phrase Modeling
+ Tomas Mikolov, Ilya Sutskever, Kai Chen, Greg Corrado, and Jeff Dean, "Distributed Representations of Words and Phrases and their Compositionality," [pdf](http://arxiv.org/pdf/1310.4546.pdf) NIPS 2013 
+ [socher's] 
+ [cutting RNN trees] Christian Scheible, Hinrich Schutze. "Cutting Recursive Autoencoder Trees" [pdf](http://arxiv.org/pdf/1301.2811v3.pdf) CoRR abs/1301.2811 (2013)
+ [composition operators, mental-related similarity] Gershman, S. J., & Tenenbaum, J. B. "Phrase similarity in humans and machines". [pdf](http://projects.iq.harvard.edu/files/ccnlab/files/gershmantenenbaum15.pdf) 2015 Proceedings of the 37th Annual Conference of the Cognitive Science Society, Proceedings of the 37th Annual Conference of the Cognitive Science Society.

### Sentence Modeling

#### CNNs: convolution neural networks for sentence modeling
+ [convnet for sentences, dynamic, k-max pooling, stacked] Nal Kalchbrenner, Edward Grefenstette and Phil Blunsom. "A Convolutional Neural Network for Modelling Sentences" [pdf](http://nal.co/papers/Kalchbrenner_DCNN_ACL14) ACL 2014. 
+ [2D convolutional] Misha Denil, Alban Demiraj, Nal Kalchbrenner, Phil Blunsom, Nando de Freitas. "Modelling, Visualising and Summarising Documents with a Single Convolutional Neural Network" [pdf](http://arxiv.org/abs/1406.3830) in CoRR 2014.
+ [unsupervised pretraining for CNN] Wenpeng Yin and Hinrich Schutze. "Convolutional Neural Network for Paraphrase Identification." [pdf](http://aclweb.org/anthology/N/N15/N15-1091.pdf) NAACL 2015 
+ [convolute better with word order, parallel-CNN, different region] Rie Johnson and Tong Zhang. "Effective Use of Word Order for Text Categorization with Convolutional Neural Networks" [pdf](http://arxiv.org/abs/1412.1058)
+ Hermann, Karl Moritz, and Phil Blunsom. "Multilingual Models for Compositional
Distributed Semantics." [pdf](http://arxiv.org/pdf/1404.4641v1.pdf) ACL 2014
+ Hermann, Karl Moritz, and Phil Blunsom. "Multilingual Distributed Representations
without Word Alignment." ACL 2014
+ Kim, Yoon. "Convolutional Neural Networks for Sentence Classification. “ arxiv : 2014
+ Le, Quoc V., and Tomas Mikolov. "Distributed Representations of Sentences and
Documents." ICML (2014).
+ [ARC-I, ARC-II, 2D convolutional, order perserving] Baotian Hu, Zhengdong Lu, Hang Li, etc. “Convolutional Neural Network Architectures for Matching Natural Language Sentences.” [pdf](http://www.hangli-hl.com/uploads/3/1/6/8/3168008/hu-etal-nips2014.pdf) NIPS 2014 

### Document Modeling
+ [2D convolutional] Misha Denil, Alban Demiraj, Nal Kalchbrenner, Phil Blunsom, Nando de Freitas. "Modelling, Visualising and Summarising Documents with a Single Convolutional Neural Network" [pdf](http://arxiv.org/abs/1406.3830) in CoRR 2014.
+ Hermann, Karl Moritz, and Phil Blunsom. "Multilingual Models for Compositional
Distributed Semantics." [pdf](http://arxiv.org/pdf/1404.4641v1.pdf) ACL 2014
+ [deep RBM] Nitish Srivastava, Ruslan R Salakhutdinov, Geoffrey E. Hinton. "Modeling documents with a deep boltzmann machine." [pdf](http://arxiv.org/abs/1309.6865) in Uncertainty in Artificial Intelligence, 2013
+ Chaochao Huang, Xipeng Qiu, Xuanjing Huang, "Text Classification with Document Embeddings" [pdf](http://link.springer.com/chapter/10.1007%2F978-3-319-12277-9_12) Springer 2014
+ Le, Quoc V., and Tomas Mikolov. "Distributed Representations of Sentences and
Documents." ICML (2014).


### Neural Language Models

#### Neural langauge models
+ [neural LM] Bengio et al., "A Neural Probabilistic Language Model." [pdf](http://jmlr.csail.mit.edu/papers/volume3/bengio03a/bengio03a.pdf) Journal of Machine Learning Research 2003 
+ [bi-loglinear LM] 
+ [discriminative LM] Brian Roark, Murat Saraclar, and Michael Collins. "Discriminative n-gram language modeling." [pdf](http://www.sciencedirect.com/science/article/pii/S0885230806000271) Computer Speech and Language, 21(2):373-392. 2007
 
#### Long short term memory (LSTMs)
+ [parsing] Oriol Vinyals, Lukasz Kaiser, Terry Koo, Slav Petrov, Ilya Sutskever, Geoffrey Hinton, "Grammar as Foreign Language" [pdf](http://arxiv.org/pdf/1412.7449.pdf) arXiv 2014 
+ [program] Wojciech Zaremba, Ilya Sutskever, "Learning to Execute" [pdf](http://arxiv.org/pdf/1410.4615v2.pdf) arXiv 2014 
+ [translation] Ilya Sutskever, Oriol Vinyals, Quoc Le, "Sequence to Sequence Learning with Neural Networks" [pdf](http://arxiv.org/pdf/1409.3215.pdf) NIPS 2014
+ [more stuff at naacl 2015]

#### CNNs: convolution neural networks for language
+ [convoluting from character-level to doc-level] Xiang Zhang, Yann LeCun. "Text Understanding from Scratch" [pdf](http://arxiv.org/pdf/1502.01710v1.pdf) 
+ [character LM for doc-level] Peng, F., Schuurmans, D., Keselj, V. and Wang, S. "Language independent authorship attribution using character level language models." [pdf](http://www.aclweb.org/anthology/E03-1053) EACL 2004. 
+ [convnet for sentences, dynamic, k-max pooling, stacked] Nal Kalchbrenner, Edward Grefenstette and Phil Blunsom. "A Convolutional Neural Network for Modelling Sentences" [pdf](http://nal.co/papers/Kalchbrenner_DCNN_ACL14) ACL 2014. 
+ [unsupervised pretraining for CNN] Wenpeng Yin and Hinrich Schutze. "Convolutional Neural Network for Paraphrase Identification." [pdf](http://aclweb.org/anthology/N/N15/N15-1091.pdf) NAACL 2015 
+ [convolute better with word order, parallel-CNN, different region] Rie Johnson and Tong Zhang. "Effective Use of Word Order for Text Categorization with Convolutional Neural Networks" [pdf](http://arxiv.org/abs/1412.1058)

#### QA with commonsense reasoning
+ [nlp for AI] Jason Weston, Antoine Bordes, Sumit Chopra, Tomas Mikolov. "Towards AI-Complete Question Answering:A Set of Prerequisite Toy Tasks" [pdf](http://arxiv.org/pdf/1502.05698v4.pdf) 2015 
+ [memory networks] Jason Weston, Sumit Chopra, Antoine Bordes "Memory Networks" [pdf](http://arxiv.org/pdf/1410.3916v8.pdf) ICLR 2015 
+ [winograd schema] Hector J. Levesque. "The Winograd Schema Challenge" [pdf](http://www.aaai.org/ocs/index.php/SSS/SSS11/paper/view/2502) AAAI Spring Symposium: Logical Formalizations of Commonsense Reasoning 2011 
+ [textual entailment] Ion Androutsopoulos, Prodromos Malakasiotis "A Survey of Paraphrasing and Textual Entailment Methods" [pdf](http://arxiv.org/pdf/0912.3747v3.pdf) Journal of Artificial Intelligence Research 38 (2010) 135-187

#### Compositional
+ Tomas Mikolov, Ilya Sutskever, Kai Chen, Greg Corrado, and Jeff Dean, "Distributed Representations of Words and Phrases and their Compositionality," [pdf](http://arxiv.org/pdf/1310.4546.pdf) NIPS 2013 
+ [socher's] 
+ [cutting RNN trees] Christian Scheible, Hinrich Schutze. "Cutting Recursive Autoencoder Trees" [pdf](http://arxiv.org/pdf/1301.2811v3.pdf) CoRR abs/1301.2811 (2013)



### Example Notes, Mini-Tutorials, Technical Reports

+ Yoav Goldberg. "A note on Latent Semantic Analysis" [pdf] Tech-report 
+ Yoav Goldberg and Omer Levy "word2vec explained: deriving Mikolov et al.'s negative-sampling word-embedding method" [pdf] Tech-report 2013
