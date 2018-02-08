import EventEmitter from 'events';

class StoreAddress extends EventEmitter {

  constructor() {
    super();
    this.addressRoot = 'https://private-bf7f31-hummingbirdsimple.apiary-mock.com/';
  }

  getAddressRoot() {
    return this.addressRoot;
  }

}

export default new StoreAddress();
