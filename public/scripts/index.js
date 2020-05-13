class Person{
    constructor(name,email){
        this.name = name
        this.email = email
    };
    print(){
        return this.name+this.email
    }
}
const p = new Person('Muhammad Minhaj','mdminhajctg24@gmail.com')
let result = p.print()
console.log(result)