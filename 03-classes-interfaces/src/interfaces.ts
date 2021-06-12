interface Named {
  readonly name: string; // specifies that the name property should be immutable.
  nickname?: string; // optional property
}

interface Musician {
  readonly instrument: string;
}

// Unlike classes, interfaces can extend more than one interface.
interface Greetable extends Named, Musician {
  greet(phrase: string): void;
  greetCasual(): void;
}

// Use interfaces to define complex intentities and the types of their properties.
// Use them to implement classes and share implementation details across a range of classes.
// Abstract classes work similarly but abstract classes also permit logic implementation, whereas interfaces are for property type definitions only.

class Person implements Greetable {
  public age = 32;
  public instrument = "Drum set";
  public nickname;

  constructor(public name: string, nickname?: string) {
    if (nickname) {
      this.nickname = nickname;
    } else {
      this.nickname = this.name.charAt(0);
    }
  }

  greet(phrase: string) {
    console.log(phrase + ", " + this.name);
  }

  greetCasual() {
    if (this.nickname) {
      console.log("Hey " + this.nickname);
    } else {
      ("Hey!");
    }
  }
}

let user1: Greetable;

user1 = new Person("Steven", "Steve");
const user2: Greetable = new Person("James");

user1.greet("Suuppp");
user1.greetCasual();

user2.greetCasual();

// Interfaces as function types

interface AddFn {
  (a: number, b: number): void;
}

let add: AddFn;

add = (n1: number, n2: number) => n1 + n2;
