class Character {

    life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;


    constructor(name) {
        this.name = name;
    }

    getLife() {
        return this.life;
    }

    setLife(newLife) {  
        if (newLife < 0) {
            this.life = 0;
        } 
        else {
            this.life = newLife;
        }
    }
}


class Knight extends Character {
    constructor(name) {
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxLife = this.life;
    }
}

class Mage extends Character {
    constructor(name) {
        super(name);
        this.life = 80;
        this.attack = 15;
        this.defense = 4;
        this.maxLife = this.life;
    }
}


class LittleMonster extends Character {
    constructor() {
        super('Little Monster');
        this.life = 40;
        this.attack = 4;
        this.defense = 4;
        this.maxLife = this.life;
    }
}

class BigMonster extends Character {
    constructor() {
        super('Big Monster');
        this.life = 120;
        this.attack = 16;
        this.defense = 6;
        this.maxLife = this.life;
    }
}

class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.logObject = logObject;
    }

    start(){
        this.update();

        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }
    update(){
        //fighter1
        this.fighter1El.querySelector('.name').innerHTML = this.fighter1.name;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = f1Pct + '%';
        this.fighter1El.querySelector('.showHealth').innerHTML = this.fighter1.life.toFixed(1) + '/' + this.fighter1.maxLife;

        //fighter2
        this.fighter2El.querySelector('.name').innerHTML = this.fighter2.name;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = f2Pct + '%';
        this.fighter2El.querySelector('.showHealth').innerHTML = this.fighter2.life.toFixed(1) + '/' + this.fighter2.maxLife;
    }   

    doAttack(attacker, target) {
        if (attacker.life <= 0 || target.life <= 0) {
            alert('Game Over!');
            return;
        }

        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let attackValue = (attacker.attack * attackFactor);
        let defenseValue = (target.defense * defenseFactor);

        if (attackValue > defenseValue) {
            target.life -= (attackValue - defenseValue);
            if (target.life < 0) {
                target.life = 0;
            }
            this.logObject.addMessage(`${attacker.name} attacked ${target.name} for ${attackValue.toFixed(2)} damage!`);
        } else {
            this.logObject.addMessage('Attack was blocked!');
        }
        

        this.update();
    }

    
}

class Log {

    list = [];


     constructor(listEl){
        this.listEl = listEl;
    }

    addMessage(msg){
        this.list.push(msg);
        this.render();  
    }

    render(){
        this.listEl.innerHTML = '';
            
            for(let i in this.list){
                this.listEl.innerHTML += `<li>${this.list[i]}</li>`;
            }
    }
}
