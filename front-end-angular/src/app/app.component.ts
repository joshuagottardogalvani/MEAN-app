import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Unit } from './unit.model';
import { Observable } from 'rxjs';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

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
    let headers =  {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    this.obsUnit = this.http.get<Unit[]>('https://3000-c5763292-a2b4-4069-932b-9defa321b2bc.ws-eu01.gitpod.io/api/list', headers);
    //Mi sottoscrivo all’observable e scrivo la arrow function che riceve i dati
    this.obsUnit.subscribe((list: Unit[]) => {this.list = list;});
  }

  addUnit(newUnit: HTMLInputElement, newCost: HTMLInputElement, newHitSpeed: HTMLInputElement, newSpeed: HTMLInputElement, newDeployTime: HTMLInputElement, newRange: HTMLInputElement, newTarget: HTMLInputElement, newCount: HTMLInputElement, newTransport: HTMLInputElement, newType: HTMLInputElement, newRarity: HTMLInputElement): boolean {
    let newData = new Unit(newUnit.value, newCost.value, newHitSpeed.value, newSpeed.value, newDeployTime.value, newRange.value, newTarget.value, newCount.value, newTransport.value, newType.value, newRarity.value);
    this.postObserver = this.http.post('https://3000-c5763292-a2b4-4069-932b-9defa321b2bc.ws-eu01.gitpod.io/api', newData);
    this.postObserver.subscribe(data => this.postData = data);
    return false;
  }

  deleteUnit(HTMLid: HTMLInputElement): boolean {
    let id = HTMLid.value;
    this.deleteObserver = this.http.delete('https://3000-c5763292-a2b4-4069-932b-9defa321b2bc.ws-eu01.gitpod.io/api/' + id)
    this.deleteObserver.subscribe(data => this.postData = data);
    return false;
  }

  ngOnInit() {
    this.obs = this.http.get<Unit[]>('https://3000-c5763292-a2b4-4069-932b-9defa321b2bc.ws-eu01.gitpod.io/api/list');
    this.obs.subscribe((list: Unit[]) => {this.list = list;});
  }

}
