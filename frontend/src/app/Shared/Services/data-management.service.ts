import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
// import { ConsoleReporter } from 'jasmine';

@Injectable({
  providedIn: 'root',
})
export class DataManagementService {
  public AllData: any = [];
  public SportData: any = [];
  public cartDataArray: any = [];
  public Url = 'http://localhost:4587/';

  // This is EventEmitter, I used it here to update cart items in header. EventEmitter must have
  // a subscriber and the subcriber of this event emitter is in header component
  public cartData = new EventEmitter<[]>();
  constructor(private HttpClient: HttpClient) {}

  cartDataEmitter(emitarray: any) {
    this.cartData.emit(emitarray);
  }

  UploadData(Payload: any) {
    return this.HttpClient.post(
      'http://localhost:4587/productManagement/UploadData',
      Payload
    );
  }
  GetData() {
    return this.HttpClient.get(
      'http://localhost:4587/productManagement/GetData'
    );
  }
  GetDataById(_id: any) {
    return this.HttpClient.get(
      `http://localhost:4587/productManagement/GetDataById/${_id}`
    );
  }
  UpdateById(Payload: any) {
    return this.HttpClient.post(
      'http://localhost:4587/productManagement/UpdateById',
      Payload
    );
    // console.log('hello');
  }
  updateImage(Payload: any) {
    return this.HttpClient.put(
      'http://localhost:4587/productManagement/UpdateImage',
      Payload
    );
  }
  softDeleteById(_id: any) {
    return this.HttpClient.delete(
      `http://localhost:4587/productManagement/DeleteById/${_id}`
    );
  }
  hardDelete(_id: any) {
    return this.HttpClient.delete(
      `http://localhost:4587/productManagement/HardDelete/${_id}`
    );
  }

  uploadMerchandisedata(Payload: any) {
    return this.HttpClient.post(
      'http://localhost:4587/productManagement/UploadMerchandiseData',
      Payload
    );
  }
  getMerchandiseData() {
    return this.HttpClient.get(
      'http://localhost:4587/productManagement/GetMerchandiseData'
    );
  }

  GetMerchandiseDataById(_id: any) {
    return this.HttpClient.get(
      `http://localhost:4587/productManagement/GetMerchandiseDataById/${_id}`
    );
  }

  AddToCart(Payload: any) {
    return this.HttpClient.post(
      'http://localhost:4587/productManagement/AddToCart',
      Payload
    );
  }

  GetCartDataById(_id: any) {
    let dbcart: [] | any = [];
    return this.HttpClient.get(
      `http://localhost:4587/productManagement/GetCartDataById/${_id}`
    );
  }

  DeleteCartDataById(_id: any) {
    return this.HttpClient.delete(
      `http://localhost:4587/productManagement/DeleteCartItemById/${_id}`
    );
  }

  DeleteAllCartsByUserId(_id: any) {
    return this.HttpClient.delete(
      `http://localhost:4587/productManagement/DeleteAllCartsByUserId/${_id}`
    );
  }

  AddToLocalCart(data: any) {
    let cartData = [];
    let localcart = localStorage.getItem('localcart');
    if (!localcart) {
      localStorage.setItem('localcart', JSON.stringify([data]));
    } else {
      cartData = JSON.parse(localcart);
      cartData.push(data);
      localStorage.setItem('localcart', JSON.stringify(cartData));
    }

    this.cartDataEmitter(cartData);
  }
  removeFromCart(productId: any) {
    let cartData = localStorage.getItem('localcart');
    if (cartData) {
      let items = JSON.parse(cartData);
      items = items.filter((item: any) => {
        return productId !== item._id;
      });
      console.log(items);
      localStorage.setItem('localcart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  orderNow(Payload: any) {
    return this.HttpClient.post(
      'http://localhost:4587/productManagement/CreateOrder',
      Payload
    );
  }

  GetOrdersById(userId: any) {
    return this.HttpClient.get(
      `http://localhost:4587/productManagement/GetOrdersById/${userId}`
    );
  }
  CancelOrderById(OrderId: any) {
    return this.HttpClient.delete(
      `http://localhost:4587/productManagement/CancelOrderById/${OrderId}`
    );
  }
}
