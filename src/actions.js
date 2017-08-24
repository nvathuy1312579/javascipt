import './utils.js'
// //////////////////////////////////////////////////////////////////////////////
// actions
//
export default class Actions {
  constructor (present) {
    this.present = present
    this.intents = {
      // activeCard: 'activeCard',
      // editCard: 'editCard',
      selectCard: this.selectCard.bind(this)
    }
  }

  selectCard (data, present) {
    // TODO:
    // 1. Find contact by cardId
    // 2. set contact.isActive to true
    // 3. call this.present
    // console.log('dataselectCard', data)
    present = this.present
    present(data, this)
    // next step of the reactive loop: present values to the model
    return false
  }
}

