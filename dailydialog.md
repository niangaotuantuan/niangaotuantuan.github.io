---
layout: page
permalink: /dailydialog/
title: DailyDialog: A Manually Labelled Multi-turn Dialogue Dataset
tags: [dailydialog]
image:
  feature: bg_about.jpg
---

**DailyDialog: A Manually Labelled Multi-turn Dialogue Dataset**

We develop a high-quality multi-turn dialog dataset, **DailyDialog**, which is intriguing in several aspects. The language is human-written and less noisy. The dialogues in the dataset reflect our daily communication way and cover various topics about our daily life. We also manually label the developed dataset with communication intention and emotion information. Then, we evaluate existing approaches on DailyDialog dataset and hope it benefit the research field of dialog systems.

*[New!] The dataset file (.zip) has been updated on Nov 1, 2017 to fix a segmentation bug in train.zip. Thank Sanghoon from KAIST to report this bug!*

**Basic Statistics**

Th developed DailyDialog datasets contain 13,118 multi-turn dialogues. We also count the average speaker turns and tokens to give a brief view of the dataset. The resulting statistics are given in the table below. From the statistics we can see, the speaker turns are roughly 8, and the average tokens per utterance is about 15. 

| ---: | ---: |
| Total Dialogues | 13,118 |
| Average Speaker Turns Per Dialogue | 7.9 |
| Average Tokens Per Dialogue | 114.7 |
| Average Tokens Per Utterance | 14.6 |



**Example**

![](/images/dailydialog_example_smaller.jpg)

The words in Italic are speaker B's own ideas that are new for the other speaker A. The underlined words in purple explicitly indicate the emotions. In the fourth speaker turn, speaker B first expresses his/her feeling on what he/she has heared from speaker A, which reveals his/her understanding. Then, speaker B suggests by saying "Just breathe deeply when you feel yourself getting upset". Following the direct response towards A, B's suggestion is original yet context-dependent. It shows that B builds up a connection link by responding to forgoing context and proposing new suggestions. 

**Basic Features**

**Download**

- For downloading, please follow the copyright declaration and click: [DailyDialog.zip](/files/ijcnlp_dailydialog.zip)

- Latest update on Nov 1, 2017.

**Usage and Parser**

- Thank Sanghoon Kang from KAIST who provides a code to parse our dataset, and shares it with us: [https://github.com/Sanghoon94/DailyDialogue-Parser](https://github.com/Sanghoon94/DailyDialogue-Parser)



**Citation**

- We appreciate your citation if you find our dataset is beneficial.

- Yanran Li, Hui Su, Xiaoyu Shen, Wenjie Li, Ziqiang Cao, and Shuzi Niu. DailyDialog: A Manually Labelled Multi-turn Dialogue Dataset. IJCNLP 2017. [[pdf]](/files/ijcnlp2017dailydialog.pdf) [[arXiv]](https://arxiv.org/abs/1710.03957) [[dataset]](/files/ijcnlp_dailydialog.zip)

> @InProceedings{li2017dailydialog,  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;               author    = {Li, Yanran  and  Su, Hui and Shen, Xiaoyu and Li, Wenjie and Cao, Ziqiang and Niu, Shuzi},  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;               title     = {DailyDialog: A Manually Labelled Multi-turn Dialogue Dataset},  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;               booktitle = {Proceedings of The 8th International Joint Conference on Natural Language Processing (IJCNLP 2017)},  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;               year      = {2017}  
>                }  

**Copyright**

- The original copyright of all the conversations belongs to the source owner.

- The copyright of annotation belongs to our group, and they are free to the public.

- The dataset is only for research purposes. Without permission, it may not be used for any commercial purposes.