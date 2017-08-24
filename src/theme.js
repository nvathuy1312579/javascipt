// ////////////////////////////////////////////////////////////////////
// Theme
//
import ContactCard from './contactCard.js'
export default class Theme {
  header () {
    document.getElementById('header').innerHTML = 'Organization Chart'
  }

  contactCard (contact, intents) {
    const contactCard = new ContactCard(contact, intents)
    // console.log(contactCard.render())
    return contactCard.render()
  }

  tree (model, intents) {
    this.contactsList = model.contacts
    let nodeList = document.querySelectorAll('div')
    // convert all nodes to NodeItem instance
    const nodeCollection = this.contactsList.map((node) => {
      const obj = this.contactCard(node, intents)
      // console.log(obj)
      return obj
    })

    let nodesById = {}
    for (let i = 0; i < nodeCollection.length; i++) {
      nodesById[nodeCollection[i].contact.id] = nodeCollection[i]
    }
    const tree = document.getElementById('tree')
    let count = nodeList
    console.log(nodeList)
    // if (count === 1) {
    const rootNodeItemsContainer = document.createElement('ul')
    for (let i = 0; i < nodeCollection.length; i++) {
      let node = nodeCollection[i]
      let parentElement = node.contact.superiorId ? nodesById[node.contact.superiorId].getChildrenElement() : rootNodeItemsContainer
      parentElement.appendChild(node.element)
    }

    const ItemsContainer = document.createElement('div')
    ItemsContainer.classList.add('tree')
    ItemsContainer.appendChild(rootNodeItemsContainer)
    document.getElementById('tree').appendChild(ItemsContainer)
    console.log(count)

      // this.setRootCard()

    this.contactsList.forEach((contact) => {
      if (contact.isActive === true) {
          this.setActiveCard(contact.title + '-' + contact.id)
        }
    }, this)
    //   count = 1
    // }
  }

  setRootCard () {
    const rootCard = document.getElementById(`${this.contactsList[0].title}-${this.contactsList[0].id}`)
    rootCard.getElementsByClassName('card__action__arrow-right')[0].remove()
    rootCard.getElementsByClassName('card__action__remove')[0].remove()
  }

  setActiveCard (cardId) {
    const card = document.getElementById(cardId)
    card.getElementsByClassName('card__action')[0].show()
    card.setAttribute('style', 'background: #EEEEEE')
  }
}
