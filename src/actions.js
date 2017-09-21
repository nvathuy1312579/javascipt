import './utils.js'
// //////////////////////////////////////////////////////////////////////////////
// actions
//
export default class Actions {
  constructor (present) {
    this.present = present
    this.intents = {
      selectCard: this.selectCard.bind(this),
      deselectCard: this.deselectCard.bind(this),
      editCard: this.editCard.bind(this),
      insertSubCard: this.insertSubCard.bind(this),
      insertPeerCard: this.insertPeerCard.bind(this),
      removeCard: this.removeCard.bind(this),
      collapse: this.collapse.bind(this),
      changeRoot: this.changeRoot.bind(this)
    }
  }

  selectCard (data, present) {
    present = this.present
    present(data, this)
  }

  deselectCard (data, present) {
    present = this.present
    present(data, this)
  }

  editCard (data, present) {
    present = this.present
    present(data, this)
  }

  insertSubCard (data, present) {
    present = this.present
    present(data, this)
  }

  insertPeerCard (data, present) {
    present = this.present
    present(data, this)
  }

  removeCard (data, present) {
    present = this.present
    present(data, this)
  }

  collapse (data, present) {
    present = this.present
    present(data, this)
  }

  changeRoot (data, present) {
    present = this.present
    present(data, this)
  }
}

