import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  contactId?: number;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: [''],
      address: [''],
    });
  }

  ngOnInit(): void {
    this.contactId = +(this.route.snapshot.paramMap.get('id') ?? 0);

    if (this.contactId) {
      const contact = this.contactService.getContactById(this.contactId);
      if (contact) {
        this.contactForm.patchValue(contact);
      }
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const contact: Contact = {
        id: this.contactId || Date.now(),
        ...this.contactForm.value,
      };

      if (this.contactId) {
        this.contactService.updateContact(contact);
      } else {
        this.contactService.addContact(contact);
      }

      this.router.navigate(['/contacts']);
    }
  }
}
