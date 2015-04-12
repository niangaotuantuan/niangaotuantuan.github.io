---
layout: post
title: Github Pages Categories with Jekyll

comments: true
share: true

category:
- misc

tags:
- jekyll
- programming
- blog
- github
---

When Jekyll is friendly to tags in post, it is not that .


There are three questions that you'll encounter using categories: (1) Multiple word category name; (2) Multi categories; (3) Archive posts by a specific category.

##Multiple word category name

When we want to name a category using multiple words (more than 1 word, contains spaces), jekyll will defaulty generate a permalink with the form http://domain.com/category/year/month/title and result in urls with dashes. It is the case and not bugs. We cannot easily change the permalink settings for the way Jekyll generates urls for posts in the config form but this can be done with a plugin.

**But, Github Pages just forbid any plugins**. Thus, it will work on your own server other than blogs on Github Pages. Therefore, I suggest no spaces in category names.  


##Multi categories

The second question is we sometimes want to category one post into multiple categories, like tags. Here we need to be careful with the frontmatters. Jekyll requires that Markdown files have front-matter defined at the top of every file. And for categories, it provides two formats of frontmatters. In the Jekyll's [documentations](http://jekyllrb.com/docs/frontmatter/#predefined-global-variables), both *category* and *categories* are available.

Is there any differences? Sure. When we just need only one category, we can use both 

```
category: This is one category
```

and 

```
categories: This is one category
```

But, you've may got that when comes to multiple categories, we can **only** use *categories* and carefully using two formats below:
```
categories
  - This is one category
  - This is another category
```

or the square brackets way:
```
categories: ['The is a category', 'This is another category']
```

It makes sense.


So, the further question is, are *category* and *categories* really same when only one category? Actually, they don't have the same effect on post object. When declaring *category*, post.category (string) and post.categories (array) are set. When declaring **categories**, only post.categories is set. Be careful!



##Archive posts by a specific category

But problems still show up when we want to archive the posts by a specific category. We may first try something like this:


```  
{{ "{% for post in site.categories.'This is one category' "}}%}  
...  
{{ "{% endfor "}}%}     
```

or this:

```
{{ "{% for post in site.posts | where: 'category','This is one category' "}}%}    
...    
{{ "{% endfor "}}%}       
```

If you tried, you failed. It is because you cannot put a filter on a loop. You have to capture first, then loop:

```
{{ "{% capture myposts "}}%} { { site.posts where: 'category','This is one category' } }       
{{ "{% endcapture "}}%}         
{{ "{% for post in myposts "}}%}     
...        
{{ "{% endfor "}}%}       
```    


