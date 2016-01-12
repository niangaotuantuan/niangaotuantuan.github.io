---
layout: post
title: NIPS 2015 Deep Learning Symposium Part II
description: The part II of my notes and thoughts on NIPS 2015 Deep Learning Symposium.

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

The part II of my notes and thoughts on NIPS 2015 Deep Learning Symposium. Followings are the papers included in this post:


1. **Early stopping is nonparametric variational inference**[^1]
2. **Natural neural networks**[^2]
3. **Dropout as a Bayesian approximation: Representing model uncertainty in deep learning**[^3]
4. **Neural Turing Machines**[^4]
5. **End-to-end memory networks**[^5]
6. **Grid long-short term memory**[^6]


-------------------

### Bayesian Deep Learning

#### Early stopping is nonparametric variational inference

A Highly recommendated optimization work. Instead of optimizing training loss as usually do, we could also optimize marginal likelihood, which has several advantages: First, we no longer need those validation set-related tricks, e.g., early stopping because we can directly utilize marginal likelihood estimator to evaluate performance. Then, how could this be realized? In this work, they aim at using Bayesian interpretation for optimization process: Every step in the process will "generate" a distribution. Hence, a sequence of distributions is produced after the whole optimization process has been done. From the Bayesian prospective, the sequence can be treated as $$N$$ samples drawn from a true posterior distribution, where $$N$$ is the iteration number as a variational parameter. With such interpretation, (1) **early stopping** is then a trick aiming at optimizing variational lower bound, and (2) ensembling random initializations equals to ensembling various independent variational samples. 

Besides the interpretation, this work contributes to constructing a marginal likelihood estimator to select training stop, model selection capacity and model hypermeters. 

Note that the optimization method proposed in this work may not beat those methods for training loss such as SGD. This work is recommended because: (1) It presents extensive thoughts on optimization. For example, which one is more trustable, training loss or marginal likelihood? Is a high variational lower bound always led to a high model accuracy? What if the bound indicates reversely against the validation error/test error? (2) The interpretation is quite powerful, which should be useful for variational sequence learning. 


-----------------------

#### Natural Neural Networks
This work motivates to optimize distribution gradient instead of point gradient as used by SGD. The authors argue that it is easy to capture distribution in complex NN architectures (also claimed in the above work[^1]).

To calculate distribution gradient, however, requires solving KL divergence measurement and Fisher matrix. The latter, Fisher matrix requires large computation cost due to the large matrix size and the inverse option. This is why existing work based on Fisher matrix is not scalable.

The key is to design a constrained Fisher matrix-based NN and its optimization algorithm therefore is similar with Mirror Descent Algorithm. The contribution of this work is to provide a Bayesian framework to incorporate NN tricks: batch normalization (before non-linearity), zero-mean activations and so on. 

------------------------------

#### Dropout as a Bayesian approximation: Representing model uncertainty in deep learning

Another Bayesian work explaining why dropout works. Beyond the sparse regualarization as an explaination, this work is more general and thought-provoking.

The authors prooved that in theory, dropout equals to Bayesian approximation of a Gaussian Process. This is very similar to dropout as noise regularization, but more mathematical. With this explaination, one can obtain model uncertainty from neural networks with dropout. The uncertainty matters, as always in Bayesian. Recall that existing NN often outputs a prediction with propability for a label using a softmat layer. However, it lacks a certainty for its prediction. If we train a NN with all dog pictures but ask it to predict a cat photo. What will this NN do? It will predicts with a high propability true but a higher uncertainty if could So, now, under the dropout as approximation, we could obtain such uncertainty by using moment-matching technique.

Equipped with this uncertainty, perfomance of lots of tasks, including regression, classification and reinforcement learning, has been improved. Additionally, such Bayesian prospective also benefits the model interpretation. For more additional resources, one can find their related blog [here](http://mlg.eng.cam.ac.uk/yarin/blog_3d801aa532c1ce.html).

BTW, the other two work in this Syposium, <<Stochastic backpropagation and approximate inference in deep generative models>> and <<Scalable Bayesian optimization using deep neural networks>> are similar with this work.


----------------------------------

### Utilizing External Memory

#### Neural Turing Machines

Neural Turing Machine (NTM) might be the most famous work in this Symposium. Its motivations are: (1) to utilize **and interact** with external memory beyond the internal memory modeled by hidden units in NN; (2) RNN is proved turing-complete and the natural question is: can we design a turing machine based on RNN?

![Neural Turing Machine](/images/nips15_dl_9.png)
As the figure above, a NTM contains a **Controller, a Read+Write Heads and an External Memory**, where Controller is NN. In other words, NTM is added with read+write heads to fulfill interaction with external memory. If we treat the Controller in NTM as the CPU in computer, the memory is RAM and the hidden states are the registers in CPU. Note that the most important are the Read+Write Heads. First of all, they can implement content-based/location-based options, and thus can mimic the focus/attention mechanism. This allows to find similar data (content-based) by using content addressing. And after content addressing, interpolation provides gate mechanism, and convolutional shift provides location-based addressing. Based on the above-mentioned modules, NTM is able to mimic turing machine and implement certain algorithms. Moreover, NTM is end-to-end **differentiable**.

![Neural Turing Machine](/images/nips15_dl_10.png)
From the two motivations, we can approach to its two goals: (1) NTM is aimed at improving RNN and thus it should be at least able to solve problems like RNN. (2) NTM is designed to mimic turing machine and thus is expected to learn internal algorithms. These two goals lead to the experiments in this work, such as copy task, priority sort task, in comparison with three architectures: NTM with LSTM, NTM with feedforward and standard LSTM.


----------------------------

#### End-to-end memory networks

Similar with NTM[^4], this work motivates to utilize large body external memory into neural networks. Different with NTM[^4], this work only utilizes external memory but *lacks in interaction*.

![End-to-end Memory Networks](/images/nips15_dl_11.png)
And the authors attempt several ways in this paper to fulfill their goal. First, the single-layer or multi-layer, and then the transformation of feature space. If one separate the output of the end-to-end memory networks, they can be parallized with typical RNN. The output comprises of two parts, internal ouptut and external output, which can be parallized to RNN's memory and predicted label, respectively.


-----------------------------

#### Grid Long Short-Term Memory

This work, based on LSTM, proposes a higher framework, which is more flexible and has better computation capability, compared to LSTM. 

The fundamental concepts in this work are grid/block, stacked and depth. Grid/block, is a component in the new framework deciding the directions to progagate the information in the networks associated with flexible dimensions. Each dimension has its memory and hidden cells. And the 1-dimensional Grid LSTM, under their framework, seems very similar to the highway networks. The stacked concept is exactly the same as in other neural networks, except the dimension of the input remains unchanged. Stacked 2D Grid LSTM is still 2D, not 3D. What changes the dimension is the depth, which functions inside a block. The number of layers in a block is the depth of the Grid LSTM.

So, how can this framework deal with the "gradient vanishing" problem? In classical LSTM, gradient descent errors from each dimension are calculated together in each layer. Differently, Grid LSTM separate the calculation by dimensions. For each grid, there are N incoming memory cells and hidden cells, as well as N outgoings (N = size of dimension). By sharing the large H hidden layer information, the Grid LSTM holds both the interaction and information flow. 

The application of their Grid LSTM is interesting, for example, Machine Translation can be transformed as a 3D Grid LSTM problem. When two dimensions are bi-LSTMs, the third dimension depth, the performance is outstanding.



----------------------------
Click [here](http://yanran.li/peppypapers/2015/12/11/nips-2015-deep-learning-symposium-part-i.html) to see the part I.


###References

[^1]: Dougal Maclaurin, David Duvenaud, Ryan P. Adams. **Early stopping is nonparametric variational inference**. 2015. arXiv preprint: 1504.01344.
[^2]: Guillaume Desjardins, Karen Simonyan, Razvan Pascanu, Koray Kavukcuoglu. **Natural neural networks**. 2015. In Proceedings of NIPS.
[^3]: Yarin Gal, Zoubin Ghahramani. **Dropout as a Bayesian approximation: Representing model uncertainty in deep learning**. 2015. arXiv preprint: 1506.02142.
[^4]: Alex Graves, Greg Wayne, Ivo Danihelka. **Neural Turing Machines**. 2014. arXiv preprint: 1410.5401.
[^5]: **End-to-end memory networks**. Sainbayar Sukhbaatar, Arthur Szlam, Jason Weston, Rob Fergus. 2015. In Proceedings of NIPS.
[^6]: Nal Kalchbrenner, Ivo Danihelka, Alex Graves. **Grid Long Short-Term Memory**. 2015. arXiv preprint arXiV:1507.01526.

