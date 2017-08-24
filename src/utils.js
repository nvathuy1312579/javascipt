Element.prototype.hide = function () {
  this.setAttribute('style', 'display: none')
}

Element.prototype.show = function () {
  this.setAttribute('style', 'display: block')
}