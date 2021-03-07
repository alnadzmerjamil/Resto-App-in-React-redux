import { connect } from 'react-redux';
import React from 'react';
class DisplayItem extends React.Component {
  state = {
    inputQuantity: 1,
  };
  orderBtn = (item) => {
    let quantity = Number(this.state.inputQuantity);
    let myCart = this.props.myCart.slice(0);
    let myOrder;
    let existing;
    if (myCart.length === 0) {
      myOrder = [
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: quantity,
          category: item.category,
          image: item.image,
        },
      ];
    } else {
      existing = myCart.filter((inMyCart) => inMyCart.id === item.id);
      if (existing.length === 1) {
        existing[0].quantity += quantity;
        myCart = myCart.filter((inMyCart) => inMyCart.id !== item.id);
        myCart.push(existing[0]);
      } else {
        item.quantity = quantity;
        myCart.push(item);
      }
      myOrder = myCart;
    }
    // console.log(myOrder);
    this.props.addToCart(myOrder);
  };
  editBtn = (item) => {
    let itemToEdit = {
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image,
    };
    // return console.log(itemToEdit);
    this.props.dispatchToEdit(itemToEdit);
  };
  render() {
    return (
      <div className="div-per-item">
        <div className="div-img">
          <img
            className="img"
            src={this.props.items.image}
            alt={this.props.items.id}
          />
        </div>
        <div className="div-name-price">
          <strong>{this.props.items.name}</strong>
          <small>Php {this.props.items.price}</small>

          {this.props.user === 'admin' ? (
            <>
              <button
                value="submit"
                onClick={() => {
                  this.props.allowAddItem(true);
                }}
              >
                ADD ITEM
              </button>
              <button
                value="submit"
                onClick={() => this.editBtn(this.props.items)}
              >
                EDIT
              </button>
              <button
                value="submit"
                onClick={() => {
                  this.props.deleteItem(this.props.items.id);
                }}
              >
                DELETE
              </button>
            </>
          ) : (
            <>
              <input
                className="input-quantity"
                type="number"
                value={this.state.inputQuantity}
                onChange={(e) =>
                  this.setState({ inputQuantity: e.target.value })
                }
              />
              <button
                value="submit"
                onClick={() => this.orderBtn(this.props.items)}
              >
                ORDER
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    user: store.user,
    myCart: store.myCart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (myOrder) => dispatch({ type: 'ADD_TO_CART', payload: myOrder }),
    deleteItem: (itemToDelete) =>
      dispatch({ type: 'DELETE_ITEM', payload: itemToDelete }),
    dispatchToEdit: (itemToEdit) =>
      dispatch({ type: 'EDIT_ITEM', payload: itemToEdit }),
    allowAddItem: (req) => dispatch({ type: 'ALLOW_ADD_ITEM', payload: req }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DisplayItem);
