import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  user = {};

  setUser = (user) => {
    this.user = user;
  };
}

export default createContext(new Store());
