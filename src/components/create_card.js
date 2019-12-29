import React from 'react'

class CreateCard extends React.Component {
  state = {
    input: ''
  }

  handleInput = (event) => {
    event.persist()
    this.setState(
      { input: event.target.value }
    )
  }

  handleNewCard = (event) => {
    event.preventDefault()
    this.props.createNewCard(this.state.input)
  }

  render(){
    return(
      <form onSubmit={this.handleNewCard} className="new-card-form">
        <h4>Create Card</h4>
        <input onChange={this.handleInput} className="new-card-input" value={this.state.input} />
        <input className="new-card-input" type="submit" value="create" />
      </form>
    )
  }
}

export default CreateCard;