---
layout: post
title: Relation Extraction with Matrix Factorization


comments: true
share: true


category:
- NaturalLanguageProcessing
tags:
- matrix factorization
- relation extraction
---


This post is about the NAACL'13 Accepted Paper, **Relation Extraction with Matrix Factorization and Universal Schemas**. The talk is available on [techtalks](http://techtalks.tv/talks/relation-extraction-with-matrix-factorization-and-universal-schemas/58435/).

And then present some basic knowledge of **Matrix Factorization**. 

## Abstract

The paper studies techniques for inferring a model of entities and relations capable of performing basic types of semantic inference (e.g., predicting if a specific relation holds for a given pair of entities). The models exploit different types of embeddings of entities and relations.  

This problem is usually tackled either via distant weak supervision from a knowledge base (providing structure and relational schemas) or in a totally unsupervised fashion (without any pre-defined schemas). The present approach aims at combining both trends with the introduction of universal schemas that can blend pre-defined ones from knowledge bases and uncertain ones extracted from free text.  This paper is very ambitious and interesting. 

## Related Work

### relation extraction

There has been a lot of previous research on learning entailment (aka inference) rules (e.g., Chkolvsky and Pantel 2004; Berant et al, ACL 2011; Nakashole et al, ACL 2012). 
Also, there has been some of the very related work on embedding relations, e.g., Bordes et al (AAAI 2011), or, very closely related, Jenatton et al (NIPS 2012).

### Matrix Factorization

**Matrix factorization** as a technique of *Collaborative filtering* has been the
preferred choice for recommendation systems ever since Netflix million competition was held a few years back. Further, with the advent of news personalization, advanced search and user analytics, the concept has gained
prominence.

In this paper, columns correspond to relations, and rows correspond to entity tuples. By contrast, in (Murphy et al., 2012) columns are words, and rows
are contextual features such as “words in a local window.” Consequently, this paper's objective is to complete the matrix, whereas their objective is to learn better latent embeddings of words (which by themselves again cannot capture any sense of asymmetry).

## Save Storage 

Although the paper doesn't explicit point out how common is it that a tuple shares many relations, it remains concern. The experiments seem to show that mixing data sources is beneficial. 

## Trends

The researchers are ambitious to bridge knowledges bases and text for information extraction, and this paper seems to go along this trend.
However, the paper's scheme is limited before complex named entity disambiguation is solved, since it relies on the fact that entities constituting tuples from the Freebase and tuples extracted from the text have been exactly matched beforehand.

## Generalized Matrix Factorization

It has been a general machine learning problem formulated as:

### Training data
* **V**: m x n input matrix (e.g., rating matrix)
* Z: training set of indexes in **V** (e.g., subset of known ratings)

### Parameter space
* **W**: row factors (e.g., m x r latent customer factors)
* **H**: column factors (e.g., r x n latent movie factors)

### Model
* $$ L_{ij}(W_{i*},H_{*j}) $$: loss at element (*i*,*j*)
* Includes prediction error, regularization, auxiliary information, . . .
* Constraints (e.g., non-negativity)

### Find best model

$$ \arg\min_{W,H}\sum_{(i,j)\in Z}L_{i,j}(W_{i*},H_{*j}) $$

## Stochastic Gradient Descent for Matrix Factorization

Among the various algorithmic techniques available, the following are more
popular: **Alternating Least Squares (ALS)**， **Non-Negative Matrix Factorization** and **Stochastic Gradient Descent (SGD)**. Here I only presents SGD for MF.

**SDG** is a well know technique which tends to compute direction of steepest descent and then takes a step in that direction. Among the variants include:

(a)Partitioned SGD: distribute without using stratification and run independently and in parallel on partitions (b)Pipelined SGD: based on ‘delayed update’ scheme (c)Decentralized SGD: computation in decentralized and distributed fashion

The main solution is as follows:

* Set $$ \theta = (W,H) $$ and use
  
	$$ L(\theta)=\sum_{(i,j)\in Z}L_{ij}(W_{i*},H_{*j}) $$,    
	$$ {L}'(\theta)=\sum_{(i,j)\in Z}{L}'_{ij}(W_{i*},H_{*j}) $$,    
	$$ {\hat{L}}'(\theta,z)=N{L}'_{i_{z}j_{z}}(W_{i_{z}*},H_{*j_{z}}) $$, where $$N=\vert Z\vert$$

* SGD epoch
	* Pick a random entry $$ z \in Z $$
	* Compute approximate gradient $$ {\hat{L}}'(\theta,z) $$
	* Update parameters $$ \theta_{n+1}=\theta_{n}-\epsilon_{n}{\hat{L}}'(\theta,z) $$
	* Repeat $$N$$ times

## SVM V.S. FM

**FM** is short for [**Factorization Machine**](http://www.libfm.org/). Indeed, it can be interpreted as **Factorization** Methods and Support Vector **Machine**. It is firstly published by Steffen Rendle. 

Factorization machines (FM) are a generic approach that allows to mimic most factorization models by feature engineering. This way, factorization machines combine the generality of feature engineering with the superiority of factorization models in estimating interactions between categorical variables of large domain. libFM is a software implementation for factorization machines that features stochastic gradient descent (SGD) and alternating least squares (ALS) optimization as well as Bayesian inference using Markov Chain Monte Carlo (MCMC).

![](http://i.imgur.com/Kc7q9Pl.png)
 
in SVM mode, $$ y(x)=w\cdot x+b=w_{u}+w_{i}+...+b=\sum w_{i}x_{i}+b $$, but original SVM fails with 2 main problems using here: *Real Value V.S. Classification*, and *Sparsity*.

in Factorization Machine mode, it is solved as: $$ y(x)=\sum w_{i}x_{i}+\sum\sum(v_{i}\cdot v_{j})x_{i}x_{j} +b $$. The second part in the formula is **Factorization**, where the transformation from original SVM to FM lies.

![](http://i.imgur.com/bgOUxWh.png)
![](http://i.imgur.com/eHhxEsb.png)

## FM V.S. MF

- FM: $$ y(x)=\sum w_{i}x_{i}+\sum\sum(v_{i}\cdot v_{j})x_{i}x_{j} +b $$
- MF: $$ y(x)=w_{u}+w_{i}+v_{u}\cdot v_{i} + b $$

