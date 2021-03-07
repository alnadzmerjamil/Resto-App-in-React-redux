import { connect } from 'react-redux';
import React from 'react';
class EditItem extends React.Component {
  state = {
    id: this.props.itemToEdit.id,
    name: this.props.itemToEdit.name,
    price: this.props.itemToEdit.price,
    image: this.props.itemToEdit.image,
    category: this.props.itemToEdit.category,
  };
  saveBtn = () => {
    const newItem = {
      ...this.state, //copying state of this class
    };
    this.props.updateItem(newItem);
    this.setState({
      name: '',
      price: '',
      image: '',
      category: '--Select Category--',
    });
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.itemToEdit !== this.props.itemToEdit) {
      this.setState({
        id: this.props.itemToEdit.id,
        name: this.props.itemToEdit.name,
        price: this.props.itemToEdit.price,
        image: this.props.itemToEdit.image,
        category: this.props.itemToEdit.category,
      });
    }
  };
  render() {
    return (
      <div className="add-item-container">
        <div className="add-item-text">
          <h4>Edit Item Form</h4>
          <button
            onClick={() => {
              this.props.dispatchToEdit(null);
            }}
          >
            X
          </button>
        </div>
        <div>
          Name:{' '}
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
          />{' '}
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
    itemToEdit: store.itemToEdit,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateItem: (editedItem) =>
      dispatch({ type: 'UPDATE_ITEM', payload: editedItem }),
    dispatchToEdit: (req) => dispatch({ type: 'EDIT_ITEM', payload: req }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditItem);
