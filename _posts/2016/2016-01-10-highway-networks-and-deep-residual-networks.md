---
layout: post
title: Highway Networks and Deep Residual Networks

description: Recently, a breakthrough news spread over social networks. In this post, I will explain this ResNet as a special case of Highway Networks, which has been proposed before. Both of the work is amazing and thought-provoking.

comments: true
share: true

category:
- peppypapers

tags:
- LSTM
- ICCV
- Deep Learning
- paper
---

Recently, a breakthrough news spread over social networks.

> In the ImageNet challenge, the Microsoft team won first place in all three categories it entered: classification, localization and detection. Its system was better than the other entrants by a large margin. In the Microsoft Common Objects in Context challenge, also known as MS COCO, the Microsoft team won first place for image detection and segmentation.[^1]

The MSRA author Kaiming He, named their model as **Deep Residual Network (ResNet)**[^2]. In this post, I will explain this ResNet as a special case of **Highway Networks**, which has been proposed before[^3]. Both of the work is amazing and thought-provoking.



-------------------

### Deep Residual Learning for Image Recognition[^2]

This work is in practice the first to implement 152-layer (deepest!) neural networks and succeeds in ILSVRC2015 competition as quoted before. Although their model's name **Deep Residual Network (ResNet)** seems fresh, I would like to treat it as a special case of **Highway Networks**, [which I has been introduced previously](http://yanran.li/peppypapers/2015/11/28/improving-information-flow-in-recurrent-networks.html). Nevertheless, MSRA's team explains their own ResNet model very convincingly.

![Training error comparison](/images/resnet_1.png)
Let me first introduce ResNet and then compare it with Highway Networks. The ResNet is also motivated by the difficult information flow in deep networks. This intuitive motivation is then proved in this paper with two perspectives: (1) As in their Introduction Section, when comparing the training errors of a deep network and of a corresponding shallower network, the former is unexpectedly and undesirably higher. This is unreasonable because the deeper network should be at least tie with the shallower optimized to the subspace of that of deep network. It is contradicted with our motivation. Deeper is not better? Such phenomeon is called *"degradation problem"* in this paper. (2) The second perspective is from Experiment Section. The authors （theoretically->quantitatively) quantitatively (thanks to @pluskid) proof that degradation is not due to greadient vanishing, but a true optimization difficulty. Therefore, ResNet is proposed to tackle the degradation problem with a optimization heuristic: if it is difficult to approximate a desired underlying mapping (function), it would be relatively easier to let be zero the residual between $$x$$ and the mapping (function). This is the intuition by the authors for their special case of Highway Networks.

![Deep Residual Network](/images/resnet_2.png)
Above is the residual network block illustrated, which is a special case of Highway network block. Due to such specialization, ResNet reduces the parameter sizes. But, is it a advantage? Why I insists that ResNet is a special case of Highway Networks? 

---------------------------- 

### Training Very Deep Networks (Highway Networks)[^3]

The paper of **Highway Network** has been accepted by NIPS 2015[^3], and its previous version was published  on ICML 2015 workshop. More implementation details can be found in their [project page](http://people.idsia.ch/~rupesh/very_deep_learning/).

As said [in my previous blog](http://yanran.li/peppypapers/2015/11/28/improving-information-flow-in-recurrent-networks.html), the motivation is to address the *"gradient vanishing"* problem, especially when exacerbated the information flow in deeper layers. In other words, the information is blocked in "traffic problem". And the intuition is to design mechanism, set up "special path" that rejuvenates the "traffic" in the deep networks, just like "Highway" in our real life. So, that's where the name comes. The Highway networks.

> To overcome this, we take inspiration from Long Short Term Memory (LSTM) recurrent networks. We propose to modify the architecture of very deep feedforward networks such that information flow across layers becomes much easier. This is accomplished through an LSTM-inspired **adaptive** gating mechanism that allows for paths along which information can flow across many layers without attenuation. We call such paths information highways. They yield highway networks, as opposed to traditional ‘plain’ networks.

I bolded the word **adaptive** in the quote as it is the key to their highway mechanism, and also the reason why ResNet is the special case of it. In this paper, the **adaptive gating mechanism** in the Equation (2) and (3) shows that each highway network block contains two corresponding gates, *T* for transform gate, *C* for carry gate. They together decides, for each current input in this layer, to what extent transporting it to tansformation by nonlinear layers, or allowing its passing through to deeper layers by keeping its unchanged. ![Highway Network Block](/images/resnet_3.png)

Now, if one seperate the Equation (3) above like the Residual block, one will get two components, $$H$$ and $$x$$. The $$x$$ corresponds to the skip connection of identity mapping in the residual block. Moreover, the ResNet authors claim two advantages over Highway Networks. The first, as mentioned before, is that they reduce the parameters. However, it might not be an advantage as it is no longer **adaptive**. In the Section 4.1 of the Highway Network paper, the authors has discussed the importance of adaptive mechanism for information flow learning. If Highway Network is data-dependent, then ResNet is data-independent, which is inflexible and more likely to be worse. In short, ResNet is a kind of *hard-wired shortcut connections* as pointed in Highway Network paper. Personally, I think ResNet is a special case when the expectation of a **Binomial Distribution** ($$np$$) and the $$p=0.5$$.

Second, the ResNet authors claim that their gate is never closed, which is an advantage over Highway Networks (thanks @Michael Oliver's comment). Unfortunately, it seems not true. Although in the Equation (3), the transform gate seems possible to be completely close. However, the the range of the transform function is (0,1). So, the second advantage does not exist.

Based on Equation (3), the authors of Highway Networks further extend the layerwise highway design to blockwise, applying for certain parts (e.g. dimensions) of the input. It is then interesting to see how many cells are being transformed? And how many cells are being carried? The analysis is shown in Figure 2 and the conclusion is that:

- most of the cells are kept, carried, without transformation. 

- Additonally, the last column of Figure 2 displays the block outputs and visualizes the concept of “information highways”. Most of the outputs stay constant over many layers forming a pattern of stripes. Most of the change in outputs happens in the early layers (≈ 15 for MNIST and ≈ 40 for CIFAR-100).
	![Figure 2](/images/infoflow_1.png)

-  Third, does blockwise mechanism matter? The answer is revealed by different performances of dimensions in the input, in Figure 3. In each of the columns we show how the average over all samples of one specific class differs from the total average shown in the second column of Figure 2. For MNIST digits 0 and 7 substantial differences can be seen within the first 15 layers, while for CIFAR class numbers 0 and 1 the differences are sparser and spread out over all layers. In both cases it is clear that the mean activity pattern differs between classes. The gating system acts not just as a mechanism to ease training, but also as an important part of the computation in a trained network.
	![Figure 3](/images/infoflow_2.png)

The highway networks has been used in many publications[^4][^5][^6].



### References
[^1]: **Microsoft researchers win ImageNet computer vision challenge**. http://blogs.microsoft.com/next/2015/12/10/microsoft-researchers-win-imagenet-computer-vision-challenge/.
[^2]: Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun. **Deep Residual Learning for Image Recognition**. 2015. arXiv preprint: 1512.03385. 
[^3]: R. K. Srivastava, K. Greff and J. Schmidhuber. **Training Very Deep Networks**. Neural Information Processing Systems (NIPS 2015 Spotlight) arXiv:1507.06228.
[^4]: Kim, Yoon, et al. **Character-Aware Neural Language Models**. 2015. arXiv preprint arXiv:1508.06615.
[^5]: Zhang et al. **Highway Long Short-Term Memory RNNs for Distant Speech Recognition**. 2015. arXiv preprint arXiV:1510.08983.
[^6]: Samuel R. Bowman, Luke Vilnis, Oriol Vinyals, et al. **Generating Sentences From a Continuous Spaces**. 2016. In submission to ICLR.

