# Tid Test:memo:

This is a rerendering demo of **[tid](https://github.com/simonmysun/tid)** software at version 0.0.7. This page may be out of date. With locally installed you can experience creating, updating files and faster loading, etc. Tested under Chrome 55 for Linux. 

<!-- advertisement -->
<p><a href="https://github.com/simonmysun/tid" style="font-size:120%;font-weight:bold;background-image:-webkit-gradient(linear,left top,right top,color-stop(0,#f22),color-stop(0.15,#f2f),color-stop(0.3,#22f),color-stop(0.45,#2ff),color-stop(0.6,#2f2),color-stop(0.75,#2f2),color-stop(0.9,#ff2),color-stop(1,#f22));background-image:gradient(linear,left top,right top,color-stop(0,#f22),color-stop(0.15,#f2f),color-stop(0.3,#22f),color-stop(0.45,#2ff),color-stop(0.6,#2f2),color-stop(0.75,#2f2),color-stop(0.9,#ff2),color-stop(1,#f22));color:transparent!important;-webkit-background-clip:text;background-clip:text">CLICK FOR MORE DETAILS</a></p>

Let's try some real time $\mathrm{\LaTeX}$ rerendering: 

When $a\ne 0$, there are two solutions to $ax^2 + bx + c = 0$ and they are $$x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$$

Modify them and see what happens! 

## Useful Features

### Markdown
[Syntax introduction](https://daringfireball.net/projects/markdown/syntax)

### Typographic replacements
(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'

### Code
We can write `inline code` or codeblocks:

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

## Tables
Table with alignment support: 

Feature                    | Current status
:-----:                    | :------------:
Markdown and extensions    | Fully supported by [markdown-it](https://github.com/markdown-it/markdown-it) and its extensions
$\mathrm{\LaTeX}$ formulas | Supported by [MathJax](https://www.mathjax.org)
Code highlighting          | Supported by [Highlight.js](https://highlightjs.org/). Now it supports 168 languages.
BibTex renference          | To be supported! 

| Key | Item |
| --: | :--- |
| Name | Sun, Maoyin |
| Gender | Male |
| Birthdate | 09. Aug 1993 |
| Academic Interests | Theory of Computation, Combinatorics, Programming Languages, Algorithm Trading. |

### Emojies
Classic markup: :wink: :cry: :laughing: :yum:

Shortcuts (emoticons): :-) :-( 8-) ;)

Unicode: 😀😂😱❤

### Table of content
@[TOC]

### Subscript / Superscrip
- 19^th^
- H~2~O

### Footnotes
Footnote 1 link[^first]. Footnote 2 link[^second]. Inline footnote^[Text of inline footnote] definition. Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.
[^second]: Footnote text.

## Support this project and its author
* [Report issues](https://github.com/simonmysun/tid/issues)
* [Fork the Github Repo](https://github.com/simonmysun/tid) and pull request
* [Buy me a coffee](https://paypal.me/simonmysun/5)