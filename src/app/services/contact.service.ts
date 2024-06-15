import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private storageKey = 'contacts';

  constructor() {
    if (
      this.isLocalStorageAvailable() &&
      localStorage.getItem(this.storageKey)
    ) {
      const initialContacts: Contact[] = [
        {
          id: 1,
          firstName: 'Olya',
          lastName: 'Kravets',
          phoneNumber: '1234567890',
          email: 'olya@gmail.com',
          birthDate: this.convertToDate('2000-09-01'),
          address: 'Bandery 5/1',
        },
        {
          id: 2,
          firstName: 'Ivan',
          lastName: 'Makalo',
          phoneNumber: '1737577797',
          email: 'ivan@gmail.com',
          birthDate: this.convertToDate('2003-02-17'),
          address: 'Shukhevycha 11/4a',
        },
        {
          id: 3,
          firstName: 'Oleg',
          lastName: 'Ivanov',
          phoneNumber: '0987654321',
          email: 'oleg@gmail.com',
          birthDate: this.convertToDate('1997-05-12'),
          address: 'Kotyka 3/2',
        },
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(initialContacts));
    }
  }

  getContacts(): Contact[] {
    if (this.isLocalStorageAvailable()) {
      const contactsString = localStorage.getItem(this.storageKey);
      return contactsString ? JSON.parse(contactsString, this.dateReviver) : [];
    }
    return [];
  }

  getContactById(id: number): Contact | undefined {
    return this.getContacts().find((contact) => contact.id === id);
  }

  addContact(contact: Contact): void {
    if (this.isLocalStorageAvailable()) {
      const contacts = this.getContacts();
      contacts.push(contact);
      localStorage.setItem(this.storageKey, JSON.stringify(contacts));
    }
  }

  updateContact(contact: Contact): void {
    if (this.isLocalStorageAvailable()) {
      const contacts = this.getContacts();
      const index = contacts.findIndex((c) => c.id === contact.id);
      if (index !== -1) {
        contacts[index] = contact;
        localStorage.setItem(this.storageKey, JSON.stringify(contacts));
      }
    }
  }

  deleteContact(id: number): void {
    if (this.isLocalStorageAvailable()) {
      const contacts = this.getContacts();
      const updatedContacts = contacts.filter((contact) => contact.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(updatedContacts));
    }
  }

  // Helper function to check if localStorage is available
  private isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Helper function to convert date string to Date object
  private convertToDate(dateString: string): Date {
    const dateParts = dateString.split('-').map(Number);
    return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  }

  // Reviver function to convert 'birthDate' string to Date object during JSON.parse
  private dateReviver(key: string, value: any): any {
    if (key === 'birthDate') {
      return new Date(value);
    }
    return value;
  }
}
