export class Person{
    constructor(name){
        this.name = name
    }
    print(value){
        let p = new Person(value)
        return p
    }
}