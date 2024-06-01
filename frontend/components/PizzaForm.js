import React, { useReducer , useState , useEffect } from 'react'
import { useCreateCustomerMutation } from '../state/pizzaApi'

const CHANGE_INPUT = 'CHANGE_INPUT'
const TOGGLE_TOPPING = 'TOGGLE_TOPPING'
const RESET_FORM = 'RESET_FORM'

const initialState = {
  fullName: '',
  size: '',
  toppings: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT: {
      const { name , value } = action.payload
      
      return { ...state, [name] : value }

    }
    case TOGGLE_TOPPING: {
      const { toppingId } = action.payload
      const toppings = state.toppings.includes(toppingId)
      ? state.toppings.filter(id => id !== toppingId)
      : [...state.toppings , toppingId]
      return {...state, toppings }
    }
    case RESET_FORM:
      return {
        fullName: '',
        size: '',
        toppings: [],
      }
    default:
      return state
  }
}

export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer , initialState)
  const [createCustomer , {error : creationError , response: creationResponse }] = useCreateCustomerMutation()
  const [orderInProgress , setOrder] = useState(false)

  useEffect(() => {
    if (creationResponse) {
      resetForm()
    }
  }, [creationResponse])

  const onChange = (evt) => {
    const { name , value , type , checked } = evt.target
    if (type === 'checkbox'){
      const toppingId = name
      dispatch({type: TOGGLE_TOPPING , payload: {toppingId}})
    } else {
      dispatch({type: CHANGE_INPUT , payload: { name , value  } })
    }
  }

  const resetForm = () => {
    dispatch({ type: RESET_FORM })
  }

  const onNewCustomer = async evt => {
    evt.preventDefault()
    const { fullName, size, toppings } = state
    setOrder(true)
    try  {
    const response =  await createCustomer({ fullName, size, toppings })
    .unwrap()
    console.log(response)
      resetForm()
    } catch (error){
      console.error(error)
    } finally {
      setOrder(false)
    }
  }
  

  return (
    <form onSubmit={onNewCustomer}>
      <h2>Pizza Form</h2>
      {orderInProgress && <div className='pending'>Order in progress</div>}
      {creationError && <div className='failure'>{creationError?.data?.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value = {state.fullName}
            onChange ={onChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" value = {state.size} onChange={onChange}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" value = 'Pepperoni' onChange={onChange} type="checkbox" />
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" onChange={onChange} type="checkbox" />
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" onChange={onChange} type="checkbox" />
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" onChange={onChange} type="checkbox" />
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" onChange={onChange} type="checkbox" />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
