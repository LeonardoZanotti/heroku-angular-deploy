import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interface/hero';
import { HeroCompanyService } from '../../services/heroCompany/hero-company.service';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[];

  constructor(
    private heroService: HeroCompanyService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.messageService.add('Dashboard says: Welcome to the hero dashboard');
    this.heroService.index().subscribe(heroes => {
      const i = Math.floor(Math.random() * 17);
      this.heroes = heroes.slice(i, i + 4);
    });
  }
}
