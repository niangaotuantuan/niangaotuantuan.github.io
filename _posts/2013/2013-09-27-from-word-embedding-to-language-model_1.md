---
layout: post
title: From Word Embedding to Language Model(1)

comments: true
share: true


category:
- naturallanguageprocessing
tags:
- word embedding
- deep learning
- language model
---


## Deep Learning Basement

There are some basic important concepts in deep learning. 
 
### Backpropagation Network

BP Network is a special case of **Feedforward networks**, constituted by **nonlinear continuous transformation** units, and adjusted by **error back propagation algorithm**. The BP algorithm can be divided into two phases: propagation and weight update.

Also, some techniques are used to improve BP algorithm. For instance, gentic algorithm (supervised) and RBM (unsupervised), Auto-decoder (Deep Learning) can be in order to search for good weights before training.


### Distributed Representations

In contrast to the "atomic" or "localist" representations employed in traditional cognitive science, a distributed representation is one in which **"each entity is represented by a pattern of activity distributed over many computing elements, and each computing element is involved in representing many different entities."**

Yoshua Bengio gave a vivid analogy between "local" and "distributed" in his given talk, *Learning to Represent Semantics*.

![](http://i.imgur.com/b8sEQFd.png)

## Deep Learning Motivation for Semantics

In Language Model, given a probability for a longer word sequence, 
$$ P(w_{1},...,w_{l})=\prod_{t}P(w_{t}|w{t-1},...,w_{t-n+1}) $$, 
we then predict P(next word|context). And in traditional n-gram Language Model, we use counts and smoothing to calculate the conditional probability. 

However, the traditional n-gram LM fails with *Curse of dimensionality*: a word sequence on which the model will be tested is likely to be different from all the word sequences seen during training.

For example, the training sentence:

	The cat is walking in the bedroom.

The Test sentence:
	
	A dog was running in a room.

Under the sparsity/curse of dim. problem, we seek for a **similar representations for semantically similar phrases**.

### Word Embedding for Representing Words

**Word Embedding** gives a low dimension (usually 50) distributed representation (Hinton, 1986) for each word. Thus similar words have similar representations. This distributed continuous-valued vector for each word can be learned from raw text (Colobert & Weston, 2008).

### Composing Words with NN

The Word Embedding is only the representation for each word, we should learn how to compose words into phrases and semantic relations. And Theorems on advantage of depth  (Hastad et al 86 & 91, Bengio et al 2007, Bengio &
Delalleau 2011, Braverman 2011) proves that deep architectures are more expressive and sharing components exponentially strengthens the advantage.

## Neural Network Language Model

Training the word embedding and the neural network at the same time, there are two types of system: Neural network language model and the others. The former type consists of (1)input: context; (2)output: distribution of next word, $$\vert V\vert$$ nodes. And the latter type (1)input: entire sequence; (2)output: score, 1 node.


### Probabilistic Neural Language Model

Back to the problem, predict P(next word|context). To calcute the conditional probability:

- Traiditional N-gram Languge Model uses counts and smoothing.
- Probabilistic Neural Language Model uses word embedding and neural network.

After building the language model, compute word vectors during this process:

$$ f(i,w_{t-1},...,w_{t-n+1})=g(i,C(w_{t-1}),...,C(w_{t-n+1})) $$ 

![](http://i.imgur.com/gLGi5vU.png)

This structure is Bengio's groundbreaking work.
It has a linear projection layer, a nonlinear hidden layer and a softmax output layer. The sparse history h is projected into some continuous low-dimensional space, where similar histories get clustered. Moreover, the model is more robust: less parameters have to be estimated from the training data.

But the model has limitation below:

- Complexity: $$ (n × m) × h + h × \vert V\vert $$
- New words fails
- Long term context ignored
- Lack priori knowledge, such as POS, semantic information (WordNet)


## Problems Remain

How to design a neural network? An art or a science? :P

## References

Yoshua Bengio. Learning to Represent Semantics. Words2Actions Workshop, NAACL HLT 2012, Montreal

Hinton, G. E., McClelland, J. L., and Rumelhart, D. E. (1986). Distributed representations. In Rumelhart, D. E. and McClelland, J. L., editors, Parallel Distributed Processing: Explorations in the Microstructure of Cognition. Volume 1: Foundations, MIT Press, Cambridge, MA.

R. Collobert and J. Weston. A Unified Architecture for Natural Language Processing: Deep Neural Networks with Multitask Learning. In International Conference on Machine Learning, ICML, 2008.

Morin and Bengio. Hierarchical Probabilistic Neural Network Language Model. AISTATS 2005.

Mnih and Hinton. A Scalable Hierarchical Distributed Language Model. NIPS 2008.
