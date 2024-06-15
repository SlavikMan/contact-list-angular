import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  searchTerm: string = '';

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.contacts = this.contactService.getContacts();
  }

  searchContacts() {
    this.contacts = this.contactService
      .getContacts()
      .filter(
        (contact) =>
          contact.firstName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          contact.lastName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          contact.phoneNumber.includes(this.searchTerm)
      );
  }

  editContact(contactId: number): void {
    this.router.navigate(['/contacts', contactId, 'edit']);
  }

  deleteContact(contactId: number): void {
    this.contactService.deleteContact(contactId);
    this.loadContacts(); // Refresh the contact list after deletion
  }
}
