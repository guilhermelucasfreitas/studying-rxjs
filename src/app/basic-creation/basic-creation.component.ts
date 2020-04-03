import { Component, OnInit } from '@angular/core';
import { Observable, Observer, from, of, interval, timer, Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'basic-creation',
  templateUrl: './basic-creation.component.html',
  styleUrls: ['./basic-creation.component.css']
})
export class BasicCreationComponent implements OnInit {

  constructor() { }

  inscricao: Subscription = new Subscription();

  ngOnInit() {
  }

  observableCreate(){
    const hello = Observable.create((observer: Observer<string>) => {
      observer.next("hello");
      observer.next("from");
      observer.next("observable");
      observer.complete();
    })

    hello.subscribe(val => console.log(val));
  }

  //cria um observable e imprime cada posição no array, 1 por 1
  fromClick(){
    from([1,2,3,4,5,{x:10, y:20}])
      .subscribe((v) => console.log(v));
  }

  //cria um observable e imprime em um objeto só
  ofClick() {
    of([1,2,3,4,5,{x:10, y:20}])
      .subscribe((v) => console.log(v));
  }

  //cria um observable que chama o método a cada 1 segundo
  intervalClick(){
    const source = interval(1000);
    //desinscrevendo
    const subscription = source.subscribe((v) => console.log(v));
    this.inscricao.add(subscription)
  }

  timerClick(){
    //parecido com o interval, possivel que ele funcione apenas depois de 1 segundo e depois disso ele para
    const source = timer(1000)
    //começa esperando 3 segundos e depois continua a cada 1 segundo
    //const source = timer(3000,1000)
    const subscription = source.subscribe((v) => console.log(v));
    this.inscricao.add(subscription)
  }

  unsubscripeClick(){
    //para todos os observables
    this.inscricao.unsubscribe();
    this.inscricao = new Subscription();
  }

  //Atrelar um evento ao algum componente ou até mesmo o o html inteiro
  fromEventClick(){
    const subscription = fromEvent(document, 'click')
      .subscribe((e) => console.log(e));
      this.inscricao.add(subscription)
  }
}
