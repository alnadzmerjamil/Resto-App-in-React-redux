import { connect } from 'react-redux';
import React from 'react';
import DisplayItem from './DisplayItem';
class ItemBox extends React.Component {
  state = {
    inputQuantity: 1,
  };

  render() {
    return (
      <div className="items-container">
        {this.props.filterByCategory === 'All Categories'
          ? this.props.items.map((item) => {
              return <DisplayItem items={item} key={item.id} />;
            })
          : this.props.items
              .filter((item) => item.category === this.props.filterByCategory)
              .map((filterdItem) => {
                return <DisplayItem items={filterdItem} key={filterdItem.id} />;
              })}
      </div>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    user: store.user,
    items: store.items,
    filterByCategory: store.filterByCategory,
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
export default connect(mapStateToProps, mapDispatchToProps)(ItemBox);
