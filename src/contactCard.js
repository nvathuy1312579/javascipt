export default class ContactCard {
  constructor (contact, intents) {
    this.contact = contact
    this.intents = intents
    this._handleSelectCard = this._handleSelectCard.bind(this)
    this._handleOutsideClick = this._handleOutsideClick.bind(this)

    // Register outside click
    window.addEventListener('click', this._handleOutsideClick)
  }

  _handleSelectCard () {
    // invoke event selected card
    if (!this.contact.isActived) {
      this.intents['selectCard']({
        cardId: this.contact.id
      })
    }
  }

  _handleOutsideClick (e) {
    // TODO: check if card is selected and mouse clicked is outside of card
    // THEN: invoke deselectCard to remove active status
    const isClickedOutside = true
    if (this.contact.isActived && isClickedOutside) {
      this.intents('deselectCard')({
        cardId: this.contact.id
      })
    }
  }

  _createElement (tagName, props) {
    const element = document.createElement(tagName)
    // TODO: Refactor code to have a function that bind props automatically (Advanced)
    element.addEventListener('click', props.click)
    element.setAttribute('class', props.class)
    return element
  }

  render () {
    const wrapper = this._createElement('li', {
      class: 'contact-card'
    })
    const card = this._createElement('a', {
      click: this._handleSelectCard,
      class: 'contact-card'
    })
    const children = `<div id="${this.contact.title}-${this.contact.id}" class = "card">
                        <div class="card__image">
                          <img src="images/avatar.png">
                          <p class="card__title__id-number">
                            <span class="employee__title">${this.contact.title}</span>
                            <span class="employee__id-number">${this.contact.id}</span>
                          </p>
                        </div>
                        <div class="card__profile">
                          <input type="text" class="card__profile__title" disabled value="${this.contact.firstName} ${this.contact.lastName}">
                          <input type="text" class="card__profile__department" disabled value="${this.contact.department}">
                          <input type="text" class="card__profile__employeeId" disabled value="${this.contact.employeeId}">
                          <p class="card__profile__mail">@kms-technology.com</p>
                        </div>
                        <div class="card__action">
                          <a class="card__action__edit"><span class="icomoon-icon edit-icon"></span></a><br>
                          <a class="card__action__arrow-down"><span class="icomoon-icon arrow-down-icon"></span></a><br>
                          <a class="card__action__arrow-right"><span class="icomoon-icon arrow-right-icon"></span></a><br>
                          <a class="card__action__remove"><span class="icomoon-icon remove-icon"></span></a>
                        </div>
                        <div class="card__collapse-button" style="display: none"><span class="icomoon-icon minus-circle-icon"></span></div>
                      </div>`
    const title = wrapper.appendChild(card)
    title.innerHTML = children
    this.element = wrapper
    return this
  }

  getChildrenElement () {
    return this._childElement = this._childElement || this.element.appendChild(document.createElement('ul'))
  }
}
