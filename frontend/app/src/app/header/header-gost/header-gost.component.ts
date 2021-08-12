import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-gost',
  templateUrl: './header-gost.component.html',
  styleUrls: ['./header-gost.component.css']
})
export class HeaderGostComponent implements OnInit {

  constructor(private ruter: Router) { }

  ngOnInit(): void {
  }

  odjava() {
    localStorage.clear();
    this.ruter.navigateByUrl('');
  }

}
