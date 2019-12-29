import React from 'react'
import ToDoCard from '../components/to_do_card'
import CreateCard from '../components/create_card'
import ToDoCardContainer from './to_do_card_container'

export default class MainContainer extends React.Component {
  state = {
    cards: []
  }

  componentDidMount() {
    fetch('http://localhost:4000/cards')
    .then(response => response.json())
    .then(cards => {
      this.setState(
        { cards: cards }
      )
    })
  }

  createNewCard = (input) => {
    fetch("http://localhost:4000/cards",
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(
        { title: input }
      )
    })
    .then(response => response.json())
    .then(newCard => {
      this.setState(
        { cards: [...this.state.cards, newCard] }
      )
    })
  }

  addList = (cardId, input) => {
    fetch('http://localhost:4000/lists',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        description: input,
        card_id: cardId,
        completed: false
      })
    })
    .then(response => response.json())
    .then(newList => {
      const foundCard = {...this.state.cards.find(card => card.id === cardId)}
      foundCard.lists = [...foundCard.lists, newList]

      const newCards = this.state.cards.map(card => {
        if (card.is === cardId){
          return foundCard
        } else {
          return card
        }
      })

      this.setState(
        { cards: newCards }
      )
    })
    
  }

  handleClickList = (cardId, listId) => {
    const foundCard = {...this.state.cards.find(card => card.id === cardId)}
    const foundList = foundCard.lists.find(list => list.id === listId)

    let newState = null

    if (foundList.completed){
      newState = false
    } else {
      newState = true
    }

    fetch('http://localhost:4000/lists/' + listId,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(
        { completed: newState }
      )
    })
    .then(response => response.json())
    .then(newList => {

      const newLists = foundCard.lists.map(list => {
        if (list.id === listId){
          return newList
        } else {
          return list
        }
      })

      foundCard.lists = newLists

      const newCards = this.state.cards.map(card => {
        if (card.id === cardId){
          return foundCard
        } else {
          return card
        }
      })

      this.setState(
        { cards: newCards }
      )
    })
  }

  render(){
    return (
      <div className="main-container">
        <ToDoCardContainer cards={this.state.cards} addList={this.addList} handleClickList={this.handleClickList} />
        <CreateCard createNewCard={this.createNewCard} />
      </div>
    )
  }
}