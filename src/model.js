// ////////////////////////////////////////////////////////////////////
//  Model
//
export default class Model {
  constructor (state) {
    this.state = state
    this.contacts = this.getData()
    this.getData = this.getData.bind(this)
    this.present = this.present.bind(this)
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
        // console.log(contacts)
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

  setData (data) {
    const list = this.contacts
    list.forEach((contact) => {
      if (contact.id === data.cardId) {
        contact.isActive = true
        // console.log(contact)
      }
    }, this)
    return list
  }

  present (data, actions) {
    data = data || {}

    this.setData(data)
    // console.log(this.setData(data))

    this.state.render(this, actions)
  }
}
