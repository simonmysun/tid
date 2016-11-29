# Markdown Test
This document is forked from https://github.com/markdown-it/markdown-it.github.io
## Headings
# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading
```markdown
# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading
```
## Horizontal Rules
___
---
***
```markdown
___
---
***
```

## Typographic replacements
(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


```markdown
(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'
```

## Emphasis
This is **bold** and this is *italic*.
This is __bold__ and this is _italic_.
~~Strikethrough~~
```markdown
This is **bold** and this is *italic*.
This is __bold__ and this is _italic_.
~~Strikethrough~~
```
## Blockquotes
> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.

```markdown
> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.
```

## Lists
### Unordered
+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!
```markdown
+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!
```
### Ordered
1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa
1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`

Start numbering with offset:

57. foo
1. bar

```markdown
1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa
1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`

Start numbering with offset:

57. foo
1. bar
```

## Code
Inline `code`. 
Syntax highlighting with the help of [Highlight.js](https://highlightjs.org/). 
Now it supports 168 languages. 
```c++
#include <iostream>
int main() {
	std::cout << "Hello, world!\n";
}
```
```haskell
primes = filterPrime [2..] 
  where filterPrime (p:xs) = 
          p : filterPrime [x | x <- xs, x `mod` p /= 0]
```
<pre class="hljs">
Inline `code`. 
Syntax highlighting with the help of [Highlight.js](https://highlightjs.org/). 
ow support 168 languages. 

```c++
#include <iostream>
int main() {
	std::cout << "Hello, world!\n";
}
```

```haskell
primes = filterPrime [2..] 
  where filterPrime (p:xs) = 
          p : filterPrime [x | x <- xs, x `mod` p /= 0]
```
</pre>

## Tables
Table with alignment support: 
Option | Description 
:----: | :---------:
data   | path to data files to supply the data that will be passed into templates. 
engine | engine to be used for processing templates. Handlebars is the default. 
ext    | extension to be used for dest files.

| Option | Description |
| -----: | :---------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

```markdown
Table with alignment support: 
Option | Description 
:----: | :---------:
data   | path to data files to supply the data that will be passed into templates. 
engine | engine to be used for processing templates. Handlebars is the default. 
ext    | extension to be used for dest files.

| Option | Description |
| -----: | :---------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |
```

## Links
[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

This is [an example][link id] reference-style link.

[link id]: http://example.com/  "Optional Title Here"

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)

```markdown
[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

This is [an example][link id] reference-style link.

[link id]: http://example.com/  "Optional Title Here"

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)
```

## Images
![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][pic id]

With a reference later in the document defining the URL location:

[pic id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"

```markdown
![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][pic id]

With a reference later in the document defining the URL location:

[pic id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"
```

## Plugins
### MathJax
Write $\LaTeX$ formulas as inline, $x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$, or as block: $$f:X\rightarrow Y\text{ is continuous}\iff\forall\mathcal{O}\in\mathcal{O}_Y:f^{-1}\left(\mathcal{O}\right)\in\mathcal{O}_X$$

```TeX
Write $\LaTeX$ formulas as inline, $x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$, or as block: $$f:X\rightarrow Y\text{ is continuous}\iff\forall\mathcal{O}\in\mathcal{O}_Y:f^{-1}\left(\mathcal{O}\right)\in\mathcal{O}_X$$
```

### Emojies
> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)
>
> Unicode: 😀😂😱❤

### Table of content
[[TOC]]
```markdown
[[TOC]]
```

### Subscript / Superscrip
- 19^th^
- H~2~O
```makrdown
19^th^
- H~2~O
```

### Footnotes
Footnote 1 link[^first]. Footnote 2 link[^second]. Inline footnote^[Text of inline footnote] definition. Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.
[^second]: Footnote text.

```
Footnote 1 link[^first]. Footnote 2 link[^second]. Inline footnote^[Text of inline footnote] definition. Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.
[^second]: Footnote text.
```
