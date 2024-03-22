export class CartItem {
    constructor(id, name, price, imageUrl, quantity = 1) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
    }
}