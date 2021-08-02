

//создаем героев
class hero{
    constructor(name, hp, armor, mana, countCard, buff, timeBuff, gold, img) {
        this.name = name;
        this.hp = hp;
        this.armor = armor;
        this.mana = mana;
        this.countCard = countCard;
        this.buff = buff;
        this.timeBuff = timeBuff;
        this.gold = gold;
        this.img = img;
    }
}
let Warrior = new hero("Warrior", 165, 0, 3, 4, [], 0, 100, "assets/gifs/hero.gif");
let Mage = new hero("Mage", 100, 0, 4, 4, [], 0, 100, "assets/gifs/hero2.gif"); 


//делаем массив героев
let heroesArray = [Warrior, Mage];
