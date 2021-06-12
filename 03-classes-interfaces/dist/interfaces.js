"use strict";
class Person {
    constructor(name, nickname) {
        this.name = name;
        this.age = 32;
        this.instrument = "Drum set";
        if (nickname) {
            this.nickname = nickname;
        }
        else {
            this.nickname = this.name.charAt(0);
        }
    }
    greet(phrase) {
        console.log(phrase + ", " + this.name);
    }
    greetCasual() {
        if (this.nickname) {
            console.log("Hey " + this.nickname);
        }
        else {
            ("Hey!");
        }
    }
}
let user1;
user1 = new Person("Steven", "Steve");
const user2 = new Person("James");
user1.greet("Suuppp");
user1.greetCasual();
user2.greetCasual();
let add;
add = (n1, n2) => n1 + n2;
