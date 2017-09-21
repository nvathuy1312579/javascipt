Element.prototype.hide = function () {
  this.setAttribute('style', 'display: none')
}

Element.prototype.show = function () {
  this.setAttribute('style', 'display: block')
}

class Util {
  createElement (tagName, props = {}) {
    const element = document.createElement(tagName)
    // TODO: Refactor code to have a function that bind props automatically (Advanced)
    element.addEventListener('click', props.click)
    if (props.class) element.setAttribute('class', props.class)
    if (props.id) element.setAttribute('id', props.id)
    if (props.style) element.setAttribute('style', props.style)
    if (props.ondrop) element.setAttribute('ondrop', props.ondrop)
    if (props.ondragover) element.setAttribute('ondragover', props.ondragover)
    if (props.draggable) element.setAttribute('draggable', true)
    if (props.ondragenter) element.setAttribute('ondragenter', props.ondragenter)
    return element
  }
}
export default new Util()
