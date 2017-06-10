import {Injectable} from '@angular/core';
import {Hero} from './hero'
import {HEROES} from './mock-heroes'
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService{
  private headers = new Headers({'Content-Type': 'application.json'});
  private heroesUrl = 'api/heroes'; //url to web api
  constructor(private http: Http){}

  // getHeroes(): Promise<Hero[]>{
  //   return Promise.resolve(HEROES);
  // }

  getHeroes(): Promise<Hero[]>{
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);

  }

  // getHero(id: number):Promise<Hero>{
  //   return this.getHeroes()
  //   .then(heroes=>heroes.find(hero=>hero.id===id));
  // }

  getHero(id: number): Promise<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
    .toPromise()
    .then(response => response.json().data as Hero)
    .catch(this.handleError);

  }

  update(hero: Hero): Promise<Hero>{
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
               .put(url, JSON.stringify(hero), {headers: this.headers})
               .toPromise()
               .then(()=> hero)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.error('An error occured', error);
    return Promise.reject(error.message || error);

  }



  getHeroesSlowly(): Promise<Hero[]>{
    return new Promise(resolve => {
      setTimeout(()=>resolve(this.getHeroes()), 2000);
    });
  }
}
