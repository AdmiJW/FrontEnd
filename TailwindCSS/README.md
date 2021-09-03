
# Tailwind CSS <img src="https://seeklogo.com/images/T/tailwind-css-logo-5AD4175897-seeklogo.com.png" alt="drawing" width="50"/>

__Tailwind CSS__ is a CSS framework much like others (Bootstrap, Materialize etc). However, TailwindCSS is a CSS framework made up of utility classes rather than components, thus:

* It is much lower level than Component based CSS framework like Bootstrap. 

* Due to this, you need a better understanding in CSS to use TailwindCSS properly

* One upside is that the website that we created with TailwindCSS preserves its custom styling rather than looking outright like a Bootstrap or Materialize website.

We can use TailwindCSS  through CDN, but that restricts a lot of its true power. The real deal of TailwindCSS shows when we use it in NodeJS environment, since it utilizes PostCSS.

---
<br>

## Usage

To start using, install TailwindCSS

```
npm install tailwindcss
```

How the TailwindCSS works is, we write a `src` css file first, which will be processed by Tailwind to produce a `style.css` file. It is that `style.css` file that will be linked to in our HTML documents.

```
source css -> TAILWIND -> style.css -> HTML documents
```

This means everytime we made changes to our source css file, we have to call Tailwind script to process the source file again.

However, remember that we are using a CSS framework - We won't have to oftenly change our css file, as we will mostly be using HTML classes to style instead.

Then, a common convention is to have a `src` folder containing source codes, and `public` folder containing files that we will serve

```
    root
    |- public
        |- style.css        <- This will be serve to HTML docs
    |- src
        |- style.css        <- This will be process by Tailwind
```

Inside source css, use `@tailwind` directive to inject Tailwind's `base`, `components` and `utilities` styles into our CSS

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Finally, everytime we want to compile the source css into processed css, we can use NodeJS script to make our process easier

```js
"scripts": {
    "build-css": "tailwind -i src/style.css -o public/style.css"
}
// First specify the source css location, then the output location
```

---
<br>

## Tailwind Configuration File

Tailwind allows us to make custom configurations on the styles. By default, Tailwind uses its default configuration if we didn't give our own config file.

What's a config file? It is simply a file that maps classes to the actual value. For example, `xs` is mapped to value of `0.75rem`, and `gray-100` is mapped to `#f7fafc`.

We might want to __extend__ (preferred) or __overwrite__ the configuration file to better match our needs. We can do:

* Overwrite - `npx tailwindcss init --full` - Gives you full, default configuration file
* Extend - `npx tailwindcss init` - Gives you a template to start extending

Once executed, you will notice a `tailwind.config.js` has been added in your project directory. Next time when you compile the source css, Tailwind is going to look into it. Therefore, __don't change the name of `tailwind.config.js`__

```javascript
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        //  Extend your classes HERE. See docs for reference
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```