import React from 'react';
import { connect } from 'react-redux';
import EditItem from './EditItem';
class MyCartDisplay extends React.Component {
  state = {
    quantity: Number(this.props.item.quantity),
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.item.quantity !== this.state.quantity) {
      this.setState({ quantity: nextProps.item.quantity });
    }
  }
  inputQunatityHandler = (e, item) => {
    if (e.target.value < 0) {
      return;
    } else {
      this.setState({ quantity: e.target.value });
      let myCart = this.props.myCart.slice(0);
      myCart.forEach((inMyCart) => {
        if (inMyCart.id === item.id) {
          inMyCart.quantity = Number(e.target.value);
        }
      });

      this.props.addToCart(myCart);
    }
  };
  render() {
    // console.log(this.state.quantity);
    return (
      <div className="div-per-item-cart">
        <div className="left-side-cart">
          <img id="img-item-cart" src={this.props.item.image} />
        </div>
        <div className="right-side-cart">
          <p>{this.props.item.name}</p>
          <p>P{this.props.item.price}</p>
          <input
            type="number"
            value={this.state.quantity}
            onChange={(e) => this.inputQunatityHandler(e, this.props.item)}
          />
        </div>
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
    deleteItem: (itemToDelete) =>
      dispatch({ type: 'DELETE_ITEM', payload: itemToDelete }),
    dispatchToEdit: (itemToEdit) =>
      dispatch({ type: 'EDIT_ITEM', payload: itemToEdit }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyCartDisplay);
