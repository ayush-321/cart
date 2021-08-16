import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import firebase from 'firebase';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
        products: [],
        loading: true
    }
    this.db = firebase.firestore();
}

componentDidMount() {
  this.db
    .collection('products')
    .onSnapshot((snapshot) => {
      const products = snapshot.docs.map((doc) => {
        const data = doc.data();
        data['id'] = doc.id;
        return data;
      })

      this.setState({
        products,
        loading: false
      })

    })
}

handleIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    // products[index].qty += 1;
    // this.setState({
    //     products
    // })

    const docRef = this.db.collection('products').doc(products[index].id);
    
    docRef
      .update({
        qty: products[index].qty + 1
      })
      .then(() => {
        console.log('Updated Succesfully')
      })
      .catch((error) => {
        console.log('Error: ', error);
      })
}

handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    if(products[index].qty === 0){
        return;
    }
    // products[index].qty -= 1;
    // this.setState({
    //     products
    // })

    const docRef = this.db.collection('products').doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty - 1
      })
      .then(() => {
        console.log('Reduced')
      })
      .catch((error) => {
        console.log('Error: ', error);
      })
}

handleDeleteProduct = (id) => {
    const { products } = this.state;
    // const items = products.filter((item) => item.id !== id);
    // this.setState({
    //     products: items
    // })

    const docRef = this.db.collection('products').doc(id);

    docRef
      .delete()
      .then(() => {
        console.log('Deleted Successfully')
      })
      .catch((error) => {
        console.log('Error: ', error);
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
    if(product.qty > 0){
    cartTotal += product.qty * product.price;
    }
    return '';
  });

  return cartTotal;
}

addproduct = () => {
  this.db
    .collection('products')
    .add({
      title: 'Washing Machine',
      qty: 1,
      price: 49999,
      img: 'data:image/jpeg;base64,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'
    })
    .then((docRef) => {
      console.log('Product has been added', docRef);
    })
    .catch((error) => {
      console.log('Error: ', error);
    })
}

  render() {
    const { products, loading } = this.state;
  return (
    <div className="App">
      <Navbar count={this.getCount()} />
     {/* <button onClick={this.addproduct} style={{ padding:20, fontSize:20 }}>Add a Product</button> */}
      <Cart
        products={products}
        onIncreaseQuantity={this.handleIncreaseQuantity} 
        onDecreaseQuantity={this.handleDecreaseQuantity}
        onDeleteProduct={this.handleDeleteProduct}
      />
      {loading && <div><h1>Loading Products...</h1></div>}
      <div style={{padding:10, fontSize: 20}}>TOTAL: { this.getCartTotal() } </div>
    </div>
  );
  }
}

export default App;
