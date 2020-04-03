import { Component, OnInit } from '@angular/core';
import { from, fromEvent, interval, Observable, Subscription } from 'rxjs';
import { map, delay, filter, tap, take } from 'rxjs/operators';

@Component({
  selector: 'operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {
  
  constructor() { }
  
  ngOnInit() {
  }
  
  mapClick(){
    from([1,2,3,4,5,6,7])
    .pipe(
      map(i => i * 2),
      map(i => i * 10),
      delay(2000)
      )
      .subscribe(i => console.log(i));
      
      fromEvent(document, 'click')
      .pipe(
        //para retornar um objeto colocar entre parenteses, se não o javascript acredita ser uma função
        map((e: MouseEvent) => ({x:e.screenX, y: e.screenY}))
        )
        .subscribe((pos) => console.log(pos));
      }
      
      filterClick(){
        from([1,2,3,4,5,6,7])
        .pipe(
          filter(i => i % 2 == 1),
          map(i=> "Impar: " + i)
          )
          .subscribe(i => console.log(i));
        }
        
        tapClick(){
          interval(5000)
          .pipe(
            tap(i => console.log('')),
            tap(i => console.warn('Before filtering: ', i)),
            filter(i => i % 2 == 1),
            tap(i => console.warn('After filtering: ', i)),
            map(i => "Value: " + i),
            tap(i => console.warn('After map: ', i)),
            delay(1000)
          )
          .subscribe(i => console.log(i));
        }

        takeClick(){
          const observable = new Observable((observer) => {
            let i;
            for(i = 0; i < 20; i++)
              //a cada 100ms será dado um settimeout de 0 até 19
              setTimeout(() => observer.next(Math.floor(Math.random()* 100)), i *100);
             // setTimeout(() => observer.complete(), i * 100)
          });
          const s: Subscription = observable
            .pipe(
              tap(i => console.log(i)),
              //pega os 10 primeiros 10 elementos, mas ainda faltaram 10 elementos. Diferente do filter o take depois de 
              //uma quantidade exata de elementos, ele completa o observable não precisando dar unsubscribe
              take(10) 
              //first() 
              //last()
            )
            .subscribe(
              v => console.log('Output: ', v),
              (error) => console.error(error),
              () => console.log('Complete!')
            );

            const interv = setInterval(() => {
              console.log('Cheking...');
              if(s.closed){
                console.warn('Subscription CLOSED')
                clearInterval(interv);
              }
            },200)
        }
      }
      