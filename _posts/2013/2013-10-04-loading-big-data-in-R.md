---
layout: post
title: Loading Big Data in R

comments: true
share: true

category:
- R
tags:
- data
- R
---



Although parallel techniques in R has been prevailing, I will only focus on Loading the complete data into RAM in R, that is to say, no Hadoop or similar. What other more I *won't* mention in this post is about [manipulating and saving big data in R](http://www.r-bloggers.com/big-data-analysis-for-free-in-r-or-how-i-learned-to-load-manipulate-and-save-data-using-the-ff-package/), and parallel computing.

Just start with different implementations:

* load **csv** file and using **ff** package (Rtools)
	
		bigdata <- read.csv.ffdf(file = ”bigdata.csv”, first.rows=5000, colClasses = NA)
	
	*Notice* that ff package should be in Rtools on Windows.
* using **sqldf()** from **SQLite** 
	
	this is a method from [StackOverflow](http://stackoverflow.com/a/1820610/1849063): using sqldf() to import the data into SQLite as a staging area, and then sucking it from SQLite into R

		library(sqldf)
		f <- file("bigdf.csv")
		system.time(bigdf <- sqldf("select * from f", dbname = tempfile(), file.format = list(header = T, row.names = F)))

* magic **data.table** and **fread**
	
	it includes data.frame, but some of the syntax is different. Luckily, the [documentation](http://cran.r-project.org/web/packages/data.table/vignettes/datatable-intro.pdf) (and the FAQ) are excellent.

	Read csv-files with the fread function instead of read.csv (read.table). It is faster in reading a file in table format and gives you feedback on progress.
	
	*Notice* that fread() cannot directly read gzipped files and it comes with a big warning sign "not for production use yet". One trick it uses is to read the first, middle, and last 5 rows to determine column types.

* optimized **read.table()* with **colClasses**

	This option takes a vector whose length is equal to the number of columns in year table. Specifying this option instead of using the default can make ‘read.table’ run MUCH faster, often twice as fast. In order to use this option, you have to know the of each column in your data frame. - See more at [hear](http://simplystatistics.tumblr.com/post/11142408176/r-workshop-reading-in-large-data-frames#sthash.IpNe4GfP.dpuf).

		read.table("test.csv",header=TRUE,sep=",",quote="",  
                          stringsAsFactors=FALSE,comment.char="",nrows=n,                   
                          colClasses=c("integer","integer","numeric",                        
                                       "character","numeric","integer"))
	
* load a **portion** using **nrows**

	Also you can read in only a portion of your file, to get a feel of the dataset.

		data_first_100 <- read.table("file", header=T, sep="\t", stringsAsFactors=F, nrows=100)

* in summary

	[Here](http://stackoverflow.com/a/15058684/1849063) is a great comparison summary for the method above with their system time. I just copy the summary table below:

		##    user  system elapsed  Method
		##   24.71    0.15   25.42  read.csv (first time)
		##   17.85    0.07   17.98  read.csv (second time)
		##   10.20    0.03   10.32  Optimized read.table
		##    3.12    0.01    3.22  fread
		##   12.49    0.09   12.69  sqldf
		##   10.21    0.47   10.73  sqldf on SO
		##   10.85    0.10   10.99  ffdf



See more in [11 Tips on How to Handle Big Data in ](http://www.theodi.org/blog/fig-data-11-tips-how-handle-big-data-r-and-1-bad-pun).