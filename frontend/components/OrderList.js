import React from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { toggleSize } from '../state/pizzaSlice'
import { useGetPizzaQuery  } from '../state/pizzaApi'

export default function OrderList() {

    const { data : orders = [] } = useGetPizzaQuery()
    const dispatch = useDispatch()
    const sizeFilter = useSelector(st => st.pizzaState.size)
    
    const handleToggleSize = async (size) => {
      dispatch(toggleSize({size}))
    }


    const filteredOrders = orders.filter((order) => {
      if (sizeFilter === 'All') {
        return true
      }
      return order.size === sizeFilter
    })
  
  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          filteredOrders.map((order) => {
            return (
              <li key={order.id}>
                <div>
                  {  `${order.customer} ordered a size ${order.size} with ${
                      !order.toppings || order.toppings.length === 0
                      ? 'no toppings'
                      : order.toppings.length === 1
                      ? '1 topping'
                      : `${order.toppings.length} toppings`
                  }`}
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === sizeFilter ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick = {() => handleToggleSize(size)}
              >{size}</button>
          })
        }
      </div>
    </div>
  )
}


