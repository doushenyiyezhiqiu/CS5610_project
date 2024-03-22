import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/CartItem';

class CartService {

  constructor() {
    this.cartItems = [];
    this.totalPrice = new BehaviorSubject(0);
    this.totalQuantity = new BehaviorSubject(0);
  }

  addToCart(theCartItemData) {
    // Check if we already have the item in our cart
    let existingCartItem = this.cartItems.find(cartItem => cartItem.id === theCartItemData.id);

    if (existingCartItem) {
      // Increment the quantity
      existingCartItem.quantity++;
    } else {
      // Create a new CartItem instance and add it to the array
      const newCartItem = new CartItem(theCartItemData.id, theCartItemData.name, parseFloat(theCartItemData.price), theCartItemData.image_url, 1);
      this.cartItems.push(newCartItem);
    }

    // Compute cart total price and total quantity
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue = 0;
    let totalQuantityValue = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.price;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue, totalQuantityValue) {
    console.log(`Contents of the cart`);
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.price;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.price}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log(`----`);
  }

  decrementQuantity(theCartItem) {
    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem) {
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }
}

export const cartService = new CartService();