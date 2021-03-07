import './App.css';
import itembox from './components/cssfiles/itembox.css';
import mycart from './components/cssfiles/mycart.css';
import ItemBox from './components/ItemBox';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import React from 'react';
import { connect } from 'react-redux';
import MyCartMap from './components/MyCartMap';

class App extends React.Component {
  render() {
    // console.log(this.props.openCart);
    return (
      <div className="App">
        <h2 id="restoapp">Resto App</h2>
        <div className="div-for-user">
          <div className="div-for-admin-user">
            <select onChange={(e) => this.props.user(e.target.value)}>
              <option>user</option>
              <option>admin</option>
            </select>
          </div>
          <div className="div-for-categories">
            <select
              onChange={(e) => this.props.filterByCategory(e.target.value)}
            >
              <option>All Categories</option>
              {this.props.categories.map((cat) => {
                return <option key={cat}>{cat}</option>;
              })}
            </select>
          </div>
          {this.props.myCart.length !== 0 ? (
            this.props.user1 === 'user' ? (
              <button
                id="mypurchase-btn"
                onClick={() => this.props.openCartOpen(true)}
              >
                My Purchase
              </button>
            ) : (
              ''
            )
          ) : (
            ''
          )}
        </div>
        {this.props.allowAddItem ? (
          this.props.user1 === 'admin' ? (
            <AddItem />
          ) : (
            ''
          )
        ) : (
          ''
        )}

        {this.props.itemToEdit !== null ? (
          this.props.user1 === 'admin' ? (
            <EditItem />
          ) : (
            ''
          )
        ) : (
          ''
        )}
        <ItemBox />
        {this.props.user1 === 'user' ? (
          this.props.openCart ? (
            <MyCartMap className="myCartMap" />
          ) : (
            ''
          )
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    user1: store.user,
    items: store.items,
    categories: store.categories,
    allowAddItem: store.allowAddItem,
    itemToEdit: store.itemToEdit,
    myCart: store.myCart,
    openCart: store.openCart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    user: (user) => dispatch({ type: 'USER', payload: user }),
    openCartOpen: (req) => dispatch({ type: 'OPEN_CART', payload: req }),
    filterByCategory: (req) => dispatch({ type: 'FILTER', payload: req }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
