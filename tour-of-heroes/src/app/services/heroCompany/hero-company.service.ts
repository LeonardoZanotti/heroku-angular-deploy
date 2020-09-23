import { Injectable } from '@angular/core';
import { Hero } from '../../interface/hero';
import { Heroes } from '../../model/heroes-list';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroCompanyService {

  constructor(private messageService: MessageService) { }

  index(): Observable<Hero[]> {
    const heroes = of(Heroes);

    // await Heroes be found to send the message and return the array
    if (heroes) {
      this.messageService.add('HeroService: Fetched heroes!');
      return heroes;
    }
  }

  show(id: number): Observable<Hero> {
    const theHero = of(Heroes.find(hero => hero.id === id));

    if (theHero) {
      this.messageService.add(`HeroService: Fetched hero with id ${id}!`);
      return theHero;
    }
  }
}
