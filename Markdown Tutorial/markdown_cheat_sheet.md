# Headings

In markdown, headings (From h1 to h6) is defined by placing a series of Hash sign (#), where the hash sign count represents the header number, followed by a space and the text you want:

### Example:
```markdown
# Your text here...         (This is a h1)
#### Your text here         (This is a h4)
```

# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

---

<!---------------------------------------------------------->

# Basic Typography

Here is some basic typography:

* *Italic* is done by enclosing the text with a pair of asterisks (*) or a pair of underscores (_)
* __Strong__ is done by enclosing the text with a pair of **double** asterisks (**) or a pair of __double__ underscores (__)
* ~~Strikethrough~~ is done by enclosing the text with a pair of **double** tildes (~~)

### Example:
```markdown
*Italicized text* and also _Italicized text*
**Strong text** and also __Strong text__
~~Strikethrough~~
```

---

<!---------------------------------------------------------->

# Horizontal Rule

Horizontal rule `<hr />` is simply done with **3** dashes

### Example:
`---`

---

<!---------------------------------------------------------->

# Block Quotes

Block quotes are done easily by applying the greater than sign (>)

### Example:
`> Rome isn't built in a day`

> Rome isn't built in a day

---

<!---------------------------------------------------------->

# Links

Links is done with a square bracket showing the link text, followed by the link itself enclosed in a pair of brackets. Among the brackets can also have a hover tooltip enclosed in quotes

### Example:
```markdown
[Click me](https://www.google.com)              (Hovering will show url)
[Click me](https://www.google.com "Google")     (Shows google when hovered)
```

[Click me](https://www.google.com)

[Click me and Hover me](https://www.google.com "Google" )

---

<!---------------------------------------------------------->

# Images

Images have a similar syntax as the Links, but preceded with a Exclamation mark (!), and the text enclosed in the square bracket is the alt text

### Example:
```markdown
![Github Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)
```

![Github logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)

---

<!---------------------------------------------------------->

# Unordered Lists

Unordered lists is easy, just use asterisks (*) followed by your list items.

Note that you can nest list items by tabbing after one list item

### Example:
```markdown
* Unordered List item 1
* Unordered List item 2
* Unordered List item 3

* Unordered List item A
* Unordered List item B
    * Nested List item B-1
    * Nested List item B-2
        * Doubly Nested List item B-2-I
        * Double Nested List item B-2-II
```

* Unordered List item 1
* Unordered List item 2
    * Nested List item 2-A
    * Nested List item 2-B
        * Doubly Nested List item 2-B-I
        * Double Nested List item 2-B-II
        
---

<!---------------------------------------------------------->

# Ordered Lists

Ordered list, uses `1.` in front of each list item

### Example:
```markdown
1. Ordered List item 1
1. Ordered List item 2

1. Ordered List item 1
1. Ordered List item 2
    1. Nested Ordered List item 2-A
    1. Nested Ordered List item 2-B
        1. Doubly Nested Ordered List item 2-B-I
        1. Doubly Nested Ordered List item 2-B-II
```

1. Ordered List item 1
1. Ordered List item 2
    1. Nested Ordered List item 2-A
    1. Nested Ordered List item 2-B
        1. Nested Ordered List item 2-B-I
        1. Nested Ordered List item 2-B-II

---

# Inline codes

To display short codes, just enclose it in backticks (`)

### Example: 
```markdown
`<div class='container'>Hello World</div>`
```

`<div class='container'>Hello World</div>`

<!---------------------------------------------------------->

---
# BEYOND THIS POINT IS GITHUB FLAVORED MARKDOWN
---
---

# Code Blocks

For multilined, bigger codes, we enclose in triple backticks (```). We can specify the language after the initial triple backticks for syntax highlighting

### Example:
```markdown
    ```html
        <div class='container'>
            <h1>Hello World!</h1>
            <p>Hello world lorem ipsum</p>
        </div>
    ```

    ```javascript
        const add = (a,b) => {
            return a + b;
        }
    ```

    ```python
        def add(a: int, b: int) -> int:
            return a + b
    ```
```

```html
    <div class='container'>
        <h1>Hello World!</h1>
        <p>Hello world lorem ipsum</p>
    </div>
```

```javascript
    const add = (a,b) => {
        return a + b;
    }
```

```python
    def add(a: int, b: int) -> int:
        return a + b
```

---

# Tables

We creates tables using pipes (|) and dashes (-) for horizontal and vertical borders, like so:

```markdown
| Name  | Age   | Gender   |
| ----  | ---   | ------   |
| John  | 12    | Male     |
| Jenny | 23    | Female   |
```

| Name  | Age   | Gender    |
| ----  | ---   | ------    |
| John  | 12    | Male      |
| Jenny | 23    | Female    |

---

# Task Lists

Task lists are like unordered lists with checkbox as list-style-type. We first start with asterisk like in unordered list (*), then followed by a checked or unchecked checkbox ( [x] or [ ] ), then your task text

This is special markdown only viewable on Github website. Checkboxes are not rendered here

### Example:
```markdown
* [x] Done!
* [ ] Not Done yet!
```

* [x] Done!
* [ ] Not Done yet!