import React from 'react'
import TodoForm from './components/TodoForm'
import Tabs from './components/Tabs'

const App = () => {
  return (
    <div className='mx-auto'>
      <h2> Todo App </h2>
      <TodoForm />
      <Tabs />
    </div>
  )
}

export default App