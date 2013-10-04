---
layout: post
title: Loading Data in R
categories:
- R
tags:
- data, R
---

There are several types of problems one may meet when loading data in R. I solved some of them and taken down the notes below.

####  tough garbage CN characters in R
中文乱码的问题在很多情况下都遇到了。内因是R是用本地码（通常是GBK）来解释unicode。 
目测整体解决办法有几种： 

* Encodings 
这个办法我只成功解决过一次。 
source(file,encoding="utf-8") 
* 改R的环境 
	
	很奇怪的是在英文环境下都反而有时候不乱码。 
* 操作系统的系统编码问题 

	Windows是gbk编码，且不可改！（所以只能Encodings改了）；Linux是utf-8。可以用sessioninfo()来查看locale的编码，然后改掉。 
	一般有时候比如mysql也乱码的时候这个方法很好用，应该是个通用性很高的方法。 
	
	*Windows* 
	一般是gbk的编码，读取utf-8的文件时，需要声明读取编码就OK了。 source(file,encoding="utf-8") 
	
	*Linux*的情况复杂一些 
	* locale要设置成zh_CN 
	* 要安装中文字符集，或者从window下复制过去 
	* R读取，统一用utf-8的。 
	
	最复杂的情况是*DB连接* 
	* 有时候DB的字符集是gb2312, gbk, utf8等 
	* 在DB读取的时候，DBI包，要设置DB的字符编码 
	* 当把数据读到R中时，要跟R的环境的编码要统一 
	* linux/win两套环境，编码部分要是区别写的。 
	
	[Ref](http://f.dataguru.cn/thread-20496-1-1.html) 
* 强大的iconv() 
	
	[*Usage*](http://stat.ethz.ch/R-manual/R-patched/library/base/html/iconv.html)
	 
	iconv(x, from = "", to = "", sub = NA, mark = TRUE) 
	iconvlist()  
	
	除此以外还可以用于除掉一些乱码，比如Removing non-ASCII characters  [Ref](http://stackoverflow.com/questions/9934856/removing-non-ascii-characters-from-data-files) 

* 强大的iconv()也失效时 
	* 更多更好的去理解网页编码 
	
	url= htmlParse(url,encoding="UTF-8")  [Ref](http://yishuo.org/r/2012/09/13/junk-code-again.html)
	
	* embedded null characters ('\0') in strings 
	
	这个似乎也是个 devils 在 inferno 的书里有写，下次再开坑吧。 [Ref](http://biostatmatt.com/archives/456) 

####  missing values

大概是 missing value 要仔细处理。 

和missing value有关的大概有4件事： 

* 如何填充missing value 
* misquote等等会引起missing value 
* whitespace可能丧失 
* extraneous fields用fill解决或者用count.fields诊断（可以见read.table那篇帖子）
	
		x <- count.fields("UserProfile.tsv", sep = '\t') 
		table(x) 
		which(x != legal.length) // check where the illegal lines are 
		
		
		userlist <- read.table("UserProfile.tsv", sep = '\t', header = FALSE, stringAsFactors = FALSE, fill = TRUE) // "file" matters. 

其中1. 
na.strings() 
这里牵扯到如果一个 string value 真的是 NA，要注意加quote。 [Ref](https://science.nature.nps.gov/im/datamgmt/statistics/r/fundamentals/manipulation.cfm) 

再之， 对 NA 的问题又牵扯出 [na.action](http://www.ats.ucla.edu/stat/r/faq/missing.htm)

####  group to summary

* The ddply() function. It is the easiest to use, though it requires the plyr package. This is probably what you want to use. 
* The summarizeBy() function. It is easier to use, though it requires the doBy package. 
* The aggregate() function. It is more difficult to use but is included in the base install of R. 