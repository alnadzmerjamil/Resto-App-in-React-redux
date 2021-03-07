import { connect } from 'react-redux';
import React from 'react';
import EditItem from './EditItem';
import MyCartDisplay from './MyCartDisplay';
class MyCartMap extends React.Component {
  render() {
    let total = 0;

    // console.log(this.props.myCart);
    return (
      <div className="main-container-cart">
        <div className="div-order-text">
          {this.props.myCart.length < 2 ? (
            <h4>My ORDER</h4>
          ) : (
            <h4>My ORDERS</h4>
          )}
          <button onClick={() => this.props.openCart(false)}>X</button>
        </div>
        {this.props.myCart.map((inMyCart) => {
          {
            total += inMyCart.price * inMyCart.quantity;
          }
          return <MyCartDisplay item={inMyCart} key={inMyCart.id} />;
        })}
        <h4 id="subtotal">SubTotal P{total}</h4>
      </div>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    myCart: store.myCart,
    items: store.items,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (myOrder) => dispatch({ type: 'ADD_TO_CART', payload: myOrder }),
    openCart: (req) => dispatch({ type: 'OPEN_CART', payload: req }),
    deleteItem: (itemToDelete) =>
      dispatch({ type: 'DELETE_ITEM', payload: itemToDelete }),
    dispatchToEdit: (itemToEdit) =>
      dispatch({ type: 'EDIT_ITEM', payload: itemToEdit }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyCartMap);
