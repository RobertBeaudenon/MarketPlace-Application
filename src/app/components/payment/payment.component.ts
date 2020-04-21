import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  payForm: FormGroup;
  months = [
    {value: 'January', viewValue: 'January'},
    {value: 'February ', viewValue: 'February'},
    {value: 'March', viewValue: 'March'},
    {value: 'April', viewValue: 'April'},
    {value: 'May', viewValue: 'May'},
    {value: 'June', viewValue: 'June'},
    {value: 'July', viewValue: 'July'},
    {value: 'August', viewValue: 'August'},
    {value: 'September', viewValue: 'September'},
    {value: 'October', viewValue: 'October'},
    {value: 'November', viewValue: 'November'},
    {value: 'December', viewValue: 'December'},
  ];
  year = [
    {value: 2020, viewValue: 2020},
    {value: 2021, viewValue: 2021},
    {value: 2022, viewValue: 2022},
    {value: 2023, viewValue: 2023},
    {value: 2024, viewValue: 2024},
    {value: 2025, viewValue: 2025},
    {value: 2026, viewValue: 2026},
    {value: 2027, viewValue: 2027},
    {value: 2028, viewValue: 2028},
    {value: 2029, viewValue: 2029},
  ]
  list = [];
  chosenItem = 0;
  show = "";

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.list = [
      {"name": "Credit Card", id: "cc"},
      {"name": "Paypal", id: "pp"},
      {"name": "Apple Pay", id: "ap"},
      {"name": "Cash", id: "cash"},
    ]
    this.chosenItem = this.list[0].name;
    this.show = "Credit Card"
  }

  radioChange(event: MatRadioChange) {
    if (event.value === "Credit Card") {
      this.show = "Credit Card"
    } else if (event.value === "Paypal") {
      this.show = "Paypal"
    } else if (event.value === "Cash") {
      this.show = "Cash"
    } else {
      this.show = "Apple Pay"
    }
  }

  goBack() {
    this.router.navigate(['streams']);
  }

}
