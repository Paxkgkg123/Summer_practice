

//создание карт

class card {
    constructor(name, cost, damage, armor, heal, buff, debuff, timeBuff, description, img) {
        this.name = name;
        this.cost = cost;
        this.damage = damage;
        this.armor = armor;
        this.heal = heal;
        this.buff = buff;   //на героя
        this.debuff = debuff;   //на злодея
        this.timeBuff = timeBuff;   //время действия buff/debuff
        this.description = description;
        this.img = img;
    }
}

let damageCard = new card("Удар", 1, 6, 0, 0, "", "", 0, "Наносит 6 ед. урона", "./assets/Attack.png");
let armorCard = new card("Блок", 1, 0, 8, 0, "", "", 0, "Блокирует 8 ед. урона", "./assets/Block.png");
let superDamageCard = new card("Мощный удар", 2, 15, 0, 0, "", "", 0, "Наносит 15 ед. урона", "./assets/Attack.png");
let evadeCard = new card("Кувырок", 1, 0, 5, 0, "", "", 0, "Блокирует 5 ед. урона и дает 1 карту", "./assets/Attack.png"); //временное img
let kickCard = new card("Пинок", 1, 5, 0 ,0 , "","ill",  1, "Наносит 5 ед. урона и ослабляет врага на 1 ход", "./assets/Attack.png"); //временное img
let barierCard = new card("Ледяная преграда", 2, 0, 20, 0, "", "", 0, "Блокирует 20 ед. урона", "./assets/Attack.png"); //временное img
let fireBallCard = new card("Огненный шар", 2, 12, 0, 0, "", "damage", 1, "Наносит 12 ед. урона и поджигает врага", "./assets/Attack.png"); //временное img
let healCard = new card("Лечение", 0, 0, 0, 3, "", "", 0, "Лечит 3 ед. здоровья", "./assets/Attack.png"); //временное img


//Создание колоды карт

let deckCard = [];

function createDeck(name) {
    for (let i = 0; i < 6; i++) {
        deckCard.push(damageCard);
        deckCard.push(armorCard);
    }
    if (name == "Warrior") {
        deckCard.push(superDamageCard);
        deckCard.push(evadeCard);
        deckCard.push(kickCard);
    }
    else {
        deckCard.push(barierCard);
        deckCard.push(fireBallCard);
        deckCard.push(healCard);
    }
}