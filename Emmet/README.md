# Small Emmet Cheat Sheet

For a more comprehensive one, go to [__HERE__](https://docs.emmet.io/cheat-sheet/)

---

<br>

## 1.0 - Getting Started

Get simple elements by typing the name of the element directly

__Eg:__

`div`

```html
<div></div>
```

`header`

```html
<header></header>
```

`Abbrevations include hdr, bq, ftr, btn `

```html
<header></header>
<blockquote></blockquote>
<footer></footer>
<button></button>
```

---

<br>

## 2.0 - Class and ID

Involve classes and IDs via `.` and `#`
For div, you can simply ignore typing out `div`

__Eg:__

`h1.myclass`
```html
<h1 class="myclass"></h1>
```

`myclass`
```html
<div class="myclass"></div>
```


`h1#myid"`
```html
<h1 id="myid"></h1>
```

`#myid`
```html
<div id="myid"></div>
```

Involve multiple classes and id by chaining

`h1.myclass1.myclass2#myid1`
```html
<h1 class="myclass1 myclass2" id="myid1"></h1>
```


---

<br>

## 3.0 - Content

Include contents by using curly brackets `{}`

__Eg:__

`h1{Hello World!}`
```html
<h1>Hello World!</h1>
```

`h1.myclass1.myclass2#myid1{Hello World!}`
```html
<h1 class="myclass1 myclass2" id="myid1">Hello World!</h1>
```

---

<br>

## 4.0 - Attributes

Include attributes by square brackets `[]`

__Eg:__

`a[href='#' target='_blank']`
```html
<a href="#" target="blank"></a>
```

---

<br>

## 5.0 - Nesting Elements

Nest elements easily by greater than operator! (>)

__Eg:__

`hdr>div>h1`
```html
<header>
    <div>
        <h1></h1>
    </div>
</header>
```

`nav>ul>li.logo#nav-logo{Logo}`
```html
<nav>
    <ul>
        <li class="logo" id="nav-logo">Logo</li>
    </ul>
</nav>
```

---

<br>

## 6.0 - Repetitions

Multiplication of HTML elements using `*` sign

__Eg:__

`ul>li*5`
```html
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
```


Edit contents with >{} or {} after multiplication

`ul>li*5{List Item}`
```html
<ul>
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
    <li>List Item</li>
</ul>
```


Use Dollar sign $ to indicate index

`ul>li*5{List Item $}`
```html
<ul>
    <li>List Item 1</li>
    <li>List Item 2</li>
    <li>List Item 3</li>
    <li>List Item 4</li>
    <li>List Item 5</li>
</ul>
```

---

<br>

## 7.0 - Adjacent Elements

Create adjacent HTML elements using `+` sign

__Eg:__

`nav+main+ftr`
```html
<nav></nav>
<main></main>
<footer></footer>
```

`main>h1.header+p.text`
```html
<main>
    <h1 class="header"></h1>
    <p class="text"></p>
</main>
```

---

<br>

## 8.0 - Returning to Upper Level

Climb up one level using `^` sign. Repeat `^` to climb up multi levels

__Eg:__

`nav>ul>li*5^h1`
```html
<nav>
    <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
    <h1></h1>
</nav>
```



`main>div>div^^ftr`
```html
<main>
    <div>
        <div></div>
    </div>
</main>
<footer></footer>
```

---

<br>

## 9.0 - Grouping

Grouping using `()` brackets

__Eg:__

`(nav>ul>li)+main+ftr`
```html
<nav>
    <ul>
        <li></li>
    </ul>
</nav>
<main></main>
<footer></footer>
```