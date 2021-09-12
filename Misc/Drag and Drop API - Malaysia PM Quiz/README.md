# Drag and Drop Basics

To implement a basic drag and drop in your website, you have to first define what is draggable and what is a valid drop zone.

> Note: At the time of writing, Drag and Drop API is still incompatible in mobile devices. 

---

A HTML element is draggable if it has the attribute `draggable` set to `true`. Eg:

```html
    <div draggable='true'></div>
```

Most of the HTML elements are by default not a valid drop targets. You will observe it when your cursor shows a STOP sign when you drag a draggable over it.

To make a HTML element a valid drop target, we have to call `e.preventDefault()` on the element's `dragenter` and `dragover` event listener. See:

---

<br>

## Event Listeners

### Events on Draggable

| Event | Fired when | Description |
|-|-|-|
| `drag` | Every milliseconds interval | As long as you are dragging a draggable |
| `dragend` | Once | When the draggable is released from dragging |
| `dragstart` | Once | When the dragging starts on the draggable |

### Events on Drop Target

| Event | Fired when | Description |
|-|-|-|
| `dragenter` | Once | When the draggable is dragged into the drop target |
| `dragend` | Once | When the draggable leaves the drop target |
| `dragover` | Every milliseconds interval | As long as the draggable is dragged over the drop target |
| `drop` | Once | When the draggable is released on the valid drop target |


### Note:
When giving event listeners, if we use regular function instead of arrow function, we have access to 'this', which is the draggable or drop target. Very convenient!
