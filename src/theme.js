// ////////////////////////////////////////////////////////////////////
// Theme
//
import ContactCard from './contactCard.js'
import Util from './utils.js'

export default class Theme {
  breadcrumbs (contact, intents) {
    let currentContact = contact
    const link = []
    link.push({
      Name: contact.firstName + ' ' + contact.lastName,
      isActive: contact.isActive
    })
    while (currentContact.superiorId) {
      let contactSuper = {}
      this.contactsList.forEach((element) => {
        if (element.id === currentContact.superiorId) {
          contactSuper = element
        }
      }, this)
      currentContact = contactSuper
      link.push({
        Name: currentContact.firstName + ' ' + currentContact.lastName,
        isActive: currentContact.isActive
      })
    }
    link.reverse()
    const header = document.getElementById('header')
    const linkContact = Util.createElement('span')
    link.forEach((element) => {
      linkContact.appendChild(this.createBreadcrumbs(element))
      linkContact.append(' / ')
    }, this)
    header.innerHTML = `<span class="icomoon-icon site-map header__logo"> </span>/ `
    header.appendChild(linkContact)
  }

  createBreadcrumbs (contact, intents) {
    if (contact.isActive) {
      const link = Util.createElement('span', {
        class: 'header__text--active'
      })

      link.innerHTML = `${contact.Name}`
      return link
    } else {
      const link = Util.createElement('span', {
        class: 'header__text--link'
      })

      link.innerHTML = `${contact.Name}`
      return link
    }
  }

  contactCard (contact, intents) {
    const contactCard = new ContactCard(contact, intents)
    // console.log(contactCard.render())
    return contactCard.render()
  }

  tree (model, intents) {
    this.contactsList = model.contacts
    this.contactsList.forEach((contact) => {
      contact.children = []
      if (contact.superiorId) {
        this.contactsList.forEach((element) => {
          if (element.superiorId === contact.id) {
            let indexSuperior = this.contactsList.indexOf(contact)
            this.contactsList[indexSuperior].children.push(element.id)
          }
        }, this)
      }
    }, this)
    // convert all nodes to NodeItem instance
    const nodeCollection = this.contactsList.map((node) => {
      const obj = this.contactCard(node, intents)
      return obj
    })

    const header = document.getElementById('header')

    let nodesById = {}
    for (let i = 0; i < nodeCollection.length; i++) {
      nodesById[nodeCollection[i].contact.id] = nodeCollection[i]
    }

    const rootNodeItemsContainer = document.createElement('ul')
    for (let i = 0; i < nodeCollection.length; i++) {
      let node = nodeCollection[i]
      let parentElement = node.contact.superiorId ? nodesById[node.contact.superiorId].getChildrenElement() : rootNodeItemsContainer
      parentElement.appendChild(node.element)
    }

    const ItemsContainer = document.createElement('div')
    ItemsContainer.classList.add('tree')
    ItemsContainer.appendChild(rootNodeItemsContainer)
    // document.getElementById('tree').innerHTML = ItemsContainer
    const tree = document.getElementById('tree')
    tree.innerHTML = ''
    tree.appendChild(ItemsContainer)

    this.setRootCard()

    this.contactsList.forEach((contact) => {
      if (contact.isActive === true) {
        this.setActiveCard(contact.title + '-' + contact.id)
        this.breadcrumbs(contact, intents)

        if (contact.edit === true) {
          this.setInput(contact.title + '-' + contact.id)
        } else {
          this.resetInput(contact.title + '-' + contact.id)
        }
      }

      if (contact.collapse === true) {
        this.collapse('w-' + contact.id)
      } else {
        contact.collapse = false
      }
    }, this)
  }

  setRootCard () {
    const rootCard = document.getElementById(`${this.contactsList[0].title}-${this.contactsList[0].id}`)
    rootCard.getElementsByClassName('action__right')[0].remove()
    rootCard.getElementsByClassName('action__remove')[0].remove()
  }

  setActiveCard (cardId) {
    const card = document.getElementById(cardId)
    card.getElementsByClassName('card__action')[0].show()
    card.setAttribute('style', 'background: #EEEEEE')
    let contact = {}
    this.contactsList.forEach((element) => {
      if (element.title + '-' + element.id === cardId) {
        contact = element
      }
    }, this)
  }

  setInput (cardId) {
    const card = document.getElementById(cardId)
    for (const input of card.getElementsByTagName('input')) {
      input.disabled = false
      if (input.getAttribute('src')) {
        input.setAttribute('style', 'border: 2px dashed grey')
      } else {
        input.setAttribute('style', 'border-bottom: 2px dashed grey')
      }
    }
  }

  resetInput (cardId) {
    const card = document.getElementById(cardId)
    for (const input of card.getElementsByTagName('input')) {
      input.disabled = true
      if (input.getAttribute('src')) {
        input.setAttribute('style', ' ')
      } else {
        input.setAttribute('style', ' ')
      }
    }
  }

  collapse (cardId) {
    document.getElementById(cardId).style.display = 'none'
  }
}
