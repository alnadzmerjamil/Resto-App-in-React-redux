import { connect } from 'react-redux';
import React from 'react';
class AddItem extends React.Component {
  state = {
    name: '',
    price: '',
    image: '',
    category: '--Select Category--',
  };
  saveBtn = () => {
    const newItem = {
      ...this.state, //copying state of this class
    };
    this.props.addItem(newItem);
    this.setState({
      name: '',
      price: '',
      image: '',
      category: '--Select Category--',
    });
  };
  render() {
    return (
      <div className="add-item-container">
        <div className="add-item-text">
          <h4>Add Item Form</h4>
          <button
            onClick={() => {
              this.props.allowAddItem(false);
            }}
          >
            X
          </button>
        </div>
        <div>
          Item Name:{' '}
          <input
            type="text"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />{' '}
          <br />
          Price:{' '}
          <input
            type="number"
            value={this.state.price}
            onChange={(e) => this.setState({ price: e.target.value })}
          />
          <br />
          Category:
          <br />
          <select
            value={this.state.category}
            onChange={(e) => this.setState({ category: e.target.value })}
          >
            {' '}
            <option>--Select Category--</option>
            {this.props.categories.map((cat) => {
              return <option key={cat}>{cat}</option>;
            })}
          </select>{' '}
          <br />
          Image:{' '}
          <input
            type="text"
            value={this.state.image}
            onChange={(e) => this.setState({ image: e.target.value })}
          />{' '}
          <br />
          <button onClick={(event) => this.saveBtn(event)} id="save-btn">
            Save
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    categories: store.categories,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (newItem) => dispatch({ type: 'ADD_ITEM', payload: newItem }),
    allowAddItem: (req) => dispatch({ type: 'ALLOW_ADD_ITEM', payload: req }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
