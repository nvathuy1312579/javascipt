// ////////////////////////////////////////////////////////////////////
//  Model
//
export default class Model {
  constructor (state) {
    this.state = state
    this.contacts = this.getData()
    this.getData = this.getData.bind(this)
    this.present = this.present.bind(this)
    this.saveData = this.saveData.bind(this)
    this.collapse = this.collapse.bind(this)
    this.changeRoot = this.changeRoot.bind(this)
  }

  loadJSON (callback) {
    // eslint-disable-next-line no-undef
    let dataJSON = new XMLHttpRequest()

    dataJSON.overrideMimeType('application/json')
    dataJSON.open('GET', 'data/contacts.json', true)
    dataJSON.onreadystatechange = function () {
      if (dataJSON.readyState === 4) {
        if (dataJSON.status === 200 || dataJSON.status === 0) {
          callback(dataJSON.responseText)
        }
      }
    }
    dataJSON.send(null)
  }

  getData () {
    let contacts = {}
    // eslint-disable-next-line no-undef
    if (localStorage.getItem('contacts') === null) {
      this.loadJSON((response) => {
        contacts = JSON.parse(response)
        // eslint-disable-next-line no-undef
        localStorage.setItem('contacts', JSON.stringify(contacts))
        return contacts
      })
    } else {
      // eslint-disable-next-line no-undef
      contacts = localStorage.getItem('contacts')
      // eslint-disable-next-line no-undef
      contacts = JSON.parse(contacts)
      return contacts
    }
  }

  updateData (data) {
    const list = this.contacts
    list.forEach((contact) => {
      if (contact.id === data.cardId) {
        contact.isActive = true

        if (data.disabled === false) {
          contact.edit = true
        }

        if (data.Root === true) {
          contact.superiorId = ''
          contact.Root = true
          this.changeRoot(contact)
        }

        if (data.insertSub === true) {
          const tmpContact = {
            firstName: '',
            lastName: '',
            title: '',
            department: '',
            avatar: 'avatar.png',
            employeeId: '',
            superiorId: data.cardId,
            id: list.length + 2,
            edit: true
          }
          list.push(tmpContact)
        } else if (data.insertPeer === true) {
          const tmpContact = {
            firstName: '',
            lastName: '',
            title: '',
            department: '',
            avatar: 'avatar.png',
            employeeId: '',
            superiorId: contact.superiorId,
            id: list.length + 2
          }
          list.push(tmpContact)
        } else if (data.remove === true) {
          console.log(contact)
          // let index = list.indexOf(contact)
          this.remove(contact)
        }
      } else {
        contact.isActive = false
        contact.edit = false
      }
    }, this)
    return list
  }

  changeRoot (contact) {
    const newListContacts = []
    newListContacts.push(contact)
    contact.children.forEach((id) => {
      this.contacts.forEach((element) => {
        if (element.id === id) {
          newListContacts.push(element)
        }
      }, this)
    }, this)
    this.contacts = []
    this.contacts = newListContacts
  }

  saveData (data) {
    const list = this.contacts
    if (data.newData) {
      list.forEach((contact) => {
        if (contact.id === data.cardId) {
          contact.firstName = data.newData.firstName
          contact.lastName = data.newData.lastName
          contact.department = data.newData.department
          contact.employeeId = data.newData.employeeId
          contact.edit = false
        }
      }, this)
    }
    return list
  }

  remove (contact) {
    let list = this.contacts
    if (contact.children.length === 0) {
      let index = list.indexOf(contact)
      list.splice(index, 1)
      return
    } else {
      contact.children.forEach((id) => {
        list.forEach((element) => {
          if (element.id === id) {
            this.remove(element)
          }
        }, this)
      }, this)
      let index = list.indexOf(contact)
      list.splice(index, 1)
    }
  }

  collapse (data) {
    const list = this.contacts
    if (data.collapse === true) {
      list.forEach((contact) => {
        if (contact.id === data.cardId && contact.collapse === false) {
          contact.collapse = true
        } else if (contact.id === data.cardId && contact.collapse === true) {
          contact.collapse = false
        }
      }, this)
    } else {
    }
  }

  present (data, actions) {
    data = data || {}

    this.updateData(data)

    this.saveData(data)

    this.collapse(data)
    console.log(this.contacts)

    this.state.render(this, actions)
  }
}
