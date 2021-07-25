

//создаем героев
class hero{
    constructor(name, hp, armor, mana, countCard, buff, timeBuff, gold) {
        this.name = name;
        this.hp = hp;
        this.armor = armor;
        this.mana = mana;
        this.countCard = countCard;
        this.buff = buff;
        this.timeBuff = timeBuff;
        this.gold = gold;
    }
}
let Warrior = new hero("Warrior", 165, 0, 3, 4, [], [], 100);
let Mage = new hero("Mage", 50, 0, 4, 4, [], [], 100)


//делаем массив героев
let heroesArray = [Warrior, Mage];