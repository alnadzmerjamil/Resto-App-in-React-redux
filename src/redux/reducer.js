import { v4 } from 'uuid';
const initialState = {
  user: 'user',
  categories: ['Food', 'Drink', 'Dessert'],
  filterByCategory: 'All Categories',
  itemToEdit: null,
  allowAddItem: false,
  myCart: [],
  openCart: false,
  items: [
    {
      id: v4(),
      name: 'Burger',
      price: 50,
      category: 'Food',
      image: 'https://image.flaticon.com/icons/svg/1046/1046784.svg',
    },
    {
      id: v4(),
      name: 'Pizza',
      price: 100,
      category: 'Food',
      image: 'https://image.flaticon.com/icons/svg/1046/1046771.svg',
    },
    {
      id: v4(),
      name: 'Fries',
      price: 25,
      category: 'Food',
      image: 'https://image.flaticon.com/icons/svg/1046/1046786.svg',
    },
    {
      id: v4(),
      name: 'Coffee',
      price: 35,
      category: 'Drink',
      image: 'https://image.flaticon.com/icons/svg/1046/1046785.svg',
    },
    {
      id: v4(),
      name: 'Iced Tea',
      price: 45,
      category: 'Drink',
      image: 'https://image.flaticon.com/icons/svg/1046/1046782.svg',
    },
    {
      id: v4(),
      name: 'Hot Tea',
      price: 45,
      category: 'Drink',
      image: 'https://image.flaticon.com/icons/svg/1046/1046792.svg',
    },
    {
      id: v4(),
      name: 'Cake',
      price: 135,
      category: 'Dessert',
      image:
        'https://www.flaticon.com/svg/vstatic/svg/992/992717.svg?token=exp=1615113321~hmac=4e33c9a49d222746b0fcb1fef07e5288',
    },
    {
      id: v4(),
      name: 'Ice Cream',
      price: 45,
      category: 'Dessert',
      image:
        'https://www.flaticon.com/svg/vstatic/svg/938/938063.svg?token=exp=1615113111~hmac=c858434fbf5630622436e965ff8ea369',
    },
    {
      id: v4(),
      name: 'Donut',
      price: 45,
      category: 'Dessert',
      image:
        'https://www.flaticon.com/svg/vstatic/svg/3039/3039972.svg?token=exp=1615113227~hmac=eca666222f23154b33a2e91043a771bb',
    },
  ],
};
const reducer = (state = initialState, action) => {
  if (action.type === 'USER') {
    return {
      ...state,
      user: action.payload,
    };
  } else if (action.type === 'FILTER') {
    return {
      ...state,
      filterByCategory: action.payload,
    };
  } else if (action.type === 'ALLOW_ADD_ITEM') {
    return {
      ...state,
      allowAddItem: !state.allowAddItem,
    };
  } else if (action.type === 'ADD_ITEM') {
    // let itemsCopy = state.items.slice(0);
    let itemsCopy = [...state.items];
    let newItem = action.payload;
    newItem.id = v4();
    itemsCopy.unshift(newItem);
    return {
      ...state,
      items: itemsCopy,
    };
  } else if (action.type === 'DELETE_ITEM') {
    if (window.confirm('Are you sure?')) {
      let itemsCopy = [...state.items];
      let itemToDelete = action.payload;
      itemsCopy = itemsCopy.filter((item) => {
        return item.id !== itemToDelete;
      });
      return {
        ...state,
        items: itemsCopy,
      };
    }
  } else if (action.type === 'EDIT_ITEM') {
    return {
      ...state,
      itemToEdit: action.payload,
    };
  } else if (action.type === 'UPDATE_ITEM') {
    let itemsCopy = [...state.items];
    let updatedItem = action.payload;
    itemsCopy = itemsCopy.filter((item) => {
      return item.id !== updatedItem.id;
    });
    itemsCopy.push(updatedItem);
    return {
      ...state,
      items: itemsCopy,
    };
  } else if (action.type === 'ADD_TO_CART') {
    // let myCartCopy = [...state.myCart];
    // myCartCopy.push(action.payload);
    return {
      ...state,
      myCart: action.payload,
      openCart: true,
    };
  } else if (action.type === 'OPEN_CART') {
    return {
      ...state,
      openCart: action.payload,
    };
  }
  return state;
};
export default reducer;
