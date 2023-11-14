import {    
            Observable, interval,
            timer, fromEvent,
            of, from, reduce, tap,
        } from "rxjs"
import { 
            map, pluck, filter, switchMap,
            reduce, take, scan, mergeMap
        } from "rxjs";
import { ajax } from "rxjs/ajax"

let observable = "";

// OBSERVABLE WITH STATIC DATA
/* const observable = new Observable(subcriber => {
    subcriber.next("Hello World");
    subcriber.next("helo guys");
    subcriber.complete()
})

observable.subscribe(
    {
        next: (value) => {
            console.log(value)
        },
        complete: () => {
            console.log("Observable completed")
        }
    }
) */

// OBSERVABLE WITH ASYNCHRONOUS DATA 
/** 
const observable = new Observable(subcriber => {
    let interval = 0;
     setInterval(()=>{
        subcriber.next(`interval ${interval}`);
        console.log("leaked...")
        interval++;
    }, 1000);

})

const subcription = observable.subscribe({
    next(value) {
        console.log(value);
    },
    complete() {
        console.log("complete");
    }
})

// UNSUBCRIBING TO AN OBSERVABLE
setTimeout(() => subcription.unsubscribe(), 4000);
**/

// CREATION OBSERVABLE //

// Timer Operator
// observable = interval(1000);
//  observable = timer(1000, 4000)

// Dom Event Operator
// observable = fromEvent(document, "click");


// list Operator
// observable = of(1,2,3);
// observable = from([1,2,3,4])


// PIPEABLE OPERATOR

// MAP OPERATOR //
// observable = of(1,2,3,4);
// const numberWithSymbol = observable;
// numberWithSymbol.pipe(
//     map(value => `$${value}`)
// ).subscribe(console.log);

// PLuck Operator
// observable = fromEvent(document, "keydown").pipe(
//     pluck("code"),
//     filter(code => code == "KeyB")
// )

// Reduce Operator
// observable = of(1, 2, 3, 4).pipe(
//     reduce((acc, val) => acc + val, 0)
// )


// Take & Scan
// observable = interval().pipe(
//     tab(),
//     take(6),
//     scan((acc, val) => acc + val, 0)

// )

/*** FLATTERN OPERATOR USE TO HANDLE NEXTED OBSERVABLE ***/
const Button = document.querySelector("#btn")
// observable = fromEvent(Button, "click").pipe(
//     map(() => {
//         return ajax.getJSON("http://localhost:3000/user")
//     })
// )


// MergeMap Operator For Handling Inner Observable Subcription
// observable = fromEvent(Button, "click").pipe(
//     mergeMap(() => {
//         return interval(100).pipe(
//             take(10)
//         )
//     })
// )

// SwitchMap Operator: they design to memory effient they handle on inner observable at a time.
observable = fromEvent(Button, "click").pipe(
    switchMap(() => {
        return ajax.getJSON("http://localhost:3000/user").pipe(
            take(5),
            tap({
                complete() {
                    console.log("inner observable completed");
                },
                error() {
                    console.log("Request failed")
                }
            })
        )
    })
)
observable.subscribe(console.log);