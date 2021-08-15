import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
        products: [
            {
                price: 150000,
                title: 'Mobile',
                qty: 0,
                img: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bW9iaWxlJTIwcGhvbmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                id: 1
            },

            {
                price: 500000,
                title: 'Watch',
                qty: 0,
                img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2F0Y2h8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                id: 2
            },

            {
                price: 200000,
                title: 'Laptop',
                qty: 0,
                img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                id: 3
            }
        ]
    }
}

handleIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    products[index].qty += 1;
    this.setState({
        products
    })
}

handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    if(products[index].qty === 0){
        return;
    }
    products[index].qty -= 1;
    this.setState({
        products
    })
}

handleDeleteProduct = (id) => {
    const { products } = this.state;
    const items = products.filter((item) => item.id !== id);
    this.setState({
        products: items
    })
}

getCount = () => {

  const { products } = this.state;

  let count = 0;

  products.forEach((product) => {
    count += product.qty;
  })

  return count;
}

getCartTotal = () => {

  const { products } = this.state;

  let cartTotal = 0;

  products.map((product) => {
    cartTotal += product.qty * product.price;
  });

  return cartTotal;
}

  render() {
    const { products } = this.state;
  return (
    <div className="App">
      <Navbar count={this.getCount()} />
      <Cart
        products={products}
        onIncreaseQuantity={this.handleIncreaseQuantity} 
        onDecreaseQuantity={this.handleDecreaseQuantity}
        onDeleteProduct={this.handleDeleteProduct}
      />
      <div style={{padding:10, fontSize: 20, textAlign: 'center'}}>TOTAL: { this.getCartTotal() } </div>
    </div>
  );
  }
}

export default App;
