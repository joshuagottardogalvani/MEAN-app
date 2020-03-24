import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Unit } from './unit.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  obs: Observable<Unit[]>;
  list: Unit[];

  obsUnit: Observable<Unit[]>; //L’observable che sta in attesa dei dati
  data: Unit[];

  postObserver : Observable<Object>;
  postData : Object;

  deleteObserver : Observable<Object>;
  deleteData : Object;

  constructor(private http: HttpClient) { }

  getUnitList(): void {
    this.obsUnit = this.http.get<Unit[]>('https://3000-c5763292-a2b4-4069-932b-9defa321b2bc.ws-eu01.gitpod.io/api/list');
    //Mi sottoscrivo all’observable e scrivo la arrow function che riceve i dati
    this.obsUnit.subscribe((data: Unit[]) => {this.data = data;});
  }

  addUnit(newUnit: HTMLInputElement, newCost: HTMLInputElement, newHitSpeed: HTMLInputElement): boolean {
    let newData: Unit = new Unit();
    newData.Unit = newUnit.value;
    newData.Cost = newCost.value;
    newData.Hit_Speed = newHitSpeed.value;
    let headers =  {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    this.postObserver = this.http.post('https://3000-c5763292-a2b4-4069-932b-9defa321b2bc.ws-eu01.gitpod.io/api', JSON.stringify(newData),headers)
    this.postObserver.subscribe(data => this.postData = data);
    return false;
  }

  deleteUnit(HTMLid: HTMLInputElement): boolean {
    let id = HTMLid.value;
    let headers =  {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    this.deleteObserver = this.http.delete('https://3000-c5763292-a2b4-4069-932b-9defa321b2bc.ws-eu01.gitpod.io/api/' + id, headers)
    this.deleteObserver.subscribe(data => this.postData = data);
    return false;
  }

  ngOnInit() {
    this.obs = this.http.get<Unit[]>('https://3000-c5763292-a2b4-4069-932b-9defa321b2bc.ws-eu01.gitpod.io/api/list');
    this.obs.subscribe((list: Unit[]) => {this.list = list;});
  }

}
