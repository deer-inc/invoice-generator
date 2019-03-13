import { Injectable } from '@angular/core';

export interface Client {
  name: string;
  zipCode: string;
  streetName1: string;
  streetName2: string;
}

export interface TransferAccount {
  bank: string;
  name: string;
  number: number;
}

export interface Menu {
  title: string;
  count: number;
  unit: string;
  unitCost: number;
}

export interface Company {
  name: string;
  zipCode: string;
  streetName1: string;
  streetName2: string;
  logo: string;
  tel: string;
  seal: string;
}

export interface Invoice {
  id: string;
  date: number;
  client: Client;
  transferAccount: TransferAccount;
  company: Company;
  menues: Menu[];
  note: string;
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor() { }
}
