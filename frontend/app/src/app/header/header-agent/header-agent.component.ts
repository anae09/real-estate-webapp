import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-agent',
  templateUrl: './header-agent.component.html',
  styleUrls: ['./header-agent.component.css']
})
export class HeaderAgentComponent implements OnInit {

  constructor(private ruter: Router) { }

  ngOnInit(): void {
  }

  odjava() {
    localStorage.clear();
    this.ruter.navigateByUrl('');
  }

}
