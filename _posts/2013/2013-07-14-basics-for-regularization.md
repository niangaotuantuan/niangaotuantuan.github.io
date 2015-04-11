---
layout: post
title: Basics for Regularization

comments: true
share: true

category:
- MachineLearning
tags:
- sparse
- regularization
---

## 为什么会有overfitting，为什么regularization有效
对于某一个给定的 $$\mathcal{F}$$ ，根据大数定理，当 n 趋向于无穷时，经验风险泛函是（依概率）收敛于风险泛函的。
但是机器学习是在一个给定的函数空间 $$\mathcal{H}$$ 中搜索一个最优的（使得风险泛函最小的）函数，因此为了保证这个搜索过程是合理的，需要保证对于整个空间 $$\mathcal{H}$$ 中的所有函数能一致收敛。
于是，当n趋于无穷时表现好并不是就代表 n 有限的时候同样好，即在 n 有限时，直接去最小化经验风险泛函并不一定是最优的，会造成 overfitting 等问题。所以，要分析在n 有限时，给出一个 $$\mathcal{R_{P_n}}$$ 和 $$\mathcal{R_P}$$ 之间的差别的 bound ，这个 bound 不仅依赖于 n 的大小，还依赖于我们所用的目标函数空间的“大小”——比如用 VC 维之类的东西来刻画。因此，在最小化经验风险泛函的同时，通过正则化的方法同时去最小化目标函数空间的“大小”——即“结构风险最小化”。

## Regularization带来什么
这部分是看《Learning From Data》的slides里讲到的。

Regularization 其实是 constrain 了搜索空间，比如 constrain 了最小二乘的 weight 大小。
带来的结果是 bias 有可能增加（side-effect），但 variance 降低（这是期望带来的）。

## L0, L1, L2都带来什么
L0应该就是SRM，结构风险最小化。据说可以用来筛掉指数级别的不相关feature，但是不可求解。

(1) $$ \min_{w} 1/n \sum_{i=1}^{n}l(y,f_{w}(x))+\lambda count\left \{ {w_{j}\neq 0} \right \} $$

L1也是NP-hard问题（本质因为可以和L0对等），是个菱形，最初用于所谓的compressed sensing。


(2) $$ \min_{w} 1/n \sum_{i=1}^{n}l(y,f_{w}(x))+\lambda \left \| w \right \|_{1} $$

L2是个球形，保持旋转不变性。


(3) $$ \min_{w} 1/n \sum_{i=1}^{n}l(y,f_{w}(x))+\lambda \left \| w \right \|_{2} $$

L1和L2的话，L1可以作为特征选择（本质也是因为对等到L0，而L0中是非零分量个数的正则），但是比较难求解（难是说需要用优化算法求解，比如Bregman Iteration）；L2求解方便，不会引入很高的复杂度。

关于L1和L0优化的等价问题可以参考 Candes，Donoho 等人的 Compressed sensing 理论。

当然还有什么L1/2之类的，是 non-convex 的。先不说了。