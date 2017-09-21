import Util from './utils.js'
export default class ContactCard {
  constructor (contact, intents) {
    this.contact = contact
    this.intents = intents
    this.input = {
      firstName: ' ',
      lastName: ' ',
      department: ' ',
      employeeId: ' ',
      image: 'avatar.png'
    }
    this._handleSelectCard = this._handleSelectCard.bind(this)
    this._handleOutsideClick = this._handleOutsideClick.bind(this)
    this._handleEditCard = this._handleEditCard.bind(this)
    this._handleInsertSubordinateCard = this._handleInsertSubordinateCard.bind(this)
    this._handleInsertPeerCard = this._handleInsertPeerCard.bind(this)
    this._handleRemove = this._handleRemove.bind(this)
    this._handleCollapse = this._handleCollapse.bind(this)
    this._handleDrop = this._handleDrop.bind(this)
    this._handleDrag = this._handleDrag.bind(this)
    this._handleEnter = this._handleEnter.bind(this)
    this._handleAllowDrop = this._handleAllowDrop.bind(this)
    this._handleChangeSuperiorCard = this._handleChangeSuperiorCard.bind(this)
    this._handleChangeRootCard = this._handleChangeRootCard.bind(this)

    // Register outside click
    document.addEventListener('click', (event) => {
      const closestParent = event.target.closest('.contact-card')
      if (!closestParent || closestParent === event.target) {
        this._handleOutsideClick(event)
      }
    })

    document.addEventListener('dblclick', (event) => {
      this._handleChangeRootCard(event)
    })
  }

  _handleSelectCard () {
    // invoke event selected card
    if (!this.contact.isActive) {
      this.intents['selectCard']({
        cardId: this.contact.id
      })
    }
  }

  _handleOutsideClick (e) {
    const isClickedOutside = true
    if (this.contact.isActive && isClickedOutside) {
      const employee = document.getElementById(this.contact.title + '-' + this.contact.id)
      for (const input of employee.getElementsByTagName('input')) {
        if (input.getAttribute('class') === 'title' && input.value) {
          let name = input.value.split(' ')
          if (name.length < 2) {
            this.input.firstName = name[0]
            this.input.lastName = ' '
          } else {
            this.input.firstName = name[0]
            this.input.lastName = name[1]
          }
        }
        if (input.getAttribute('class') === 'department' && input.value) {
          this.input.department = input.value
        }
        if (input.getAttribute('class') === 'employeeId' && input.value) {
          this.input.employeeId = input.value
        }
        if (input.getAttribute('src')) {
          this.input.image = input.src
        }
      }
      this.intents['deselectCard']({
        cardId: this.contact.id,
        newData: this.input
      })
      localStorage.setItem('newData', this.input)
    } else {
      this.contact.isActive = false
    }
  }

  _handleEditCard () {
    this.intents['editCard']({
      cardTitle: this.contact.title,
      cardId: this.contact.id,
      disabled: false
    })
  }

  _handleInsertSubordinateCard () {
    this.intents['insertSubCard']({
      cardId: this.contact.id,
      insertSub: true
    })
  }

  _handleInsertPeerCard () {
    this.intents['insertPeerCard']({
      cardId: this.contact.id,
      insertPeer: true
    })
  }

  _handleRemove () {
    if (window.confirm('Do you want to delete this card?') === true) {
      this.intents['removeCard']({
        cardId: this.contact.id,
        remove: true
      })
    } else {
      return
    }
  }

  _handleCollapse () {
    this.intents['collapse']({
      cardId: this.contact.id,
      collapse: true
    })
  }

  _handleDrop (e) {
    e.preventDefault()
    var data = e.dataTransfer.getData('text')
    e.stopPropagation()
    console.log(data)
    return false    
  }

  _handleAllowDrop (e) {
    e.preventDefault()
  }

  _handleDrag (e) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text', e.target.id)
    return true
  }
  _handleEnter (e) {
    e.preventDefault()
    return true
  }
  _handleChangeSuperiorCard () {
  }

  _handleChangeRootCard (e) {
    let isdbClicked = true
    if (this.contact.isActive && isdbClicked && !this.contact.Root) {
      console.log(this.contact.id)
      this.intents['changeRoot']({
        cardId: this.contact.id,
        Root: true
      })
      isdbClicked = false
    }
  }

  getChildrenElement () {
    const wrapperChild = Util.createElement('ul', {
      style: 'display: block',
      id: 'w-' + this.contact.id
    })
    return this._childElement = this._childElement || this.element.appendChild(wrapperChild)
  }

  render () {
    const wrapper = Util.createElement('li', {
    })
    const card = Util.createElement('a', {
      click: this._handleSelectCard,
      class: 'contact-card',
      draggable: true,
      ondragstart: this._handleDrag
    })
    const cardActionEdit = Util.createElement('a', {
      click: this._handleEditCard,
      class: 'action__edit'
    })
    const cardActionDown = Util.createElement('a', {
      click: this._handleInsertSubordinateCard,
      class: 'action__down'
    })
    const cardActionRight = Util.createElement('a', {
      click: this._handleInsertPeerCard,
      class: 'action__right'
    })
    const cardRemove = Util.createElement('a', {
      click: this._handleRemove,
      class: 'action__remove'
    })
    const cardAction = Util.createElement('div', {
      class: 'card__action'
    })
    const collapse = Util.createElement('div', {
      click: this._handleCollapse,
      class: 'card__collapse-button',
      style: 'display: block'
    })

    const children = Util.createElement('div', {
      id: this.contact.title + '-' + this.contact.id,
      class: 'card'
    })

    if (this.contact.collapse === true) {
      collapse.innerHTML = `<span class="icomoon-icon plus-circle-icon"></span>`
    } else {
      collapse.innerHTML = `<span class="icomoon-icon minus-circle-icon"></span>`
    }

    let temp = Util.createElement('br')
    cardActionEdit.innerHTML = `<span class="icomoon-icon edit-icon"></span>`
    cardAction.appendChild(cardActionEdit)
    cardAction.appendChild(temp)

    temp = Util.createElement('br')
    cardActionDown.innerHTML = `<span class="icomoon-icon arrow-down-icon"></span>`
    cardAction.appendChild(cardActionDown)
    cardAction.appendChild(temp)

    temp = Util.createElement('br')
    cardActionRight.innerHTML = `<span class="icomoon-icon arrow-right-icon"></span>`
    cardAction.appendChild(cardActionRight)
    cardAction.appendChild(temp)

    cardRemove.innerHTML = `<span class="icomoon-icon remove-icon"></span>`
    cardAction.appendChild(cardRemove)

    children.innerHTML = `<div class="card__image">
                        <input type="image"  src= "../images/${this.contact.avatar}" id="file${this.contact.id}" class="image__input">
                        <p class="card__title__id-number">
                          <span class="employee__title">${this.contact.title}</span>
                          <span class="employee__id-number">${this.contact.id}</span>
                        </p>
                      </div>
                      <form class="card__profile">
                        <input type="text" class="title" disabled value="${this.contact.firstName} ${this.contact.lastName}">
                        <input type="text" class="department" disabled value="${this.contact.department}">
                        <input type="text" class="employeeId" disabled value="${this.contact.employeeId}">
                        <p class="mail">@kms-technology.com</p>
                      </form>`
    children.appendChild(cardAction)
    // console.log(this.contact)
    children.appendChild(collapse)
    const title = wrapper.appendChild(card)
    title.appendChild(children)
    this.element = wrapper

    return this
  }
}
