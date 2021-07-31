

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

// обычные карты
let damageCard = new card("Удар", 1, 6, 0, 0, "", "", 0, "Наносит 6 ед. урона", "./assets/Attack.png");
let armorCard = new card("Блок", 1, 0, 8, 0, "", "", 0, "Блокирует 8 ед. урона", "./assets/Block.png");

// обычные карты воина
let superDamageCard = new card("Мощный удар", 2, 15, 0, 0, "", "", 0, "Наносит 15 ед. урона", "./assets/SuperAttack1.png");
let evadeCard = new card("Кувырок", 1, 0, 5, 0, "card", "", 1, "Блокирует 5 ед. урона и дает 1 карту", "./assets/evade.png"); 
let kickCard = new card("Пинок", 0, 3, 0, 0 , "","ill",  1, "Наносит 5 ед. урона и ослабляет врага на 1 ход", "./assets/Kick.png");

// обычнае карты мага
let barierCard = new card("Ледяная преграда", 2, 0, 20, 0, "", "", 0, "Блокирует 20 ед. урона", "./assets/barier.png");
let fireBallCard = new card("Огненный шар", 2, 12, 0, 0, "", "damage", 1, "Наносит 12 ед. урона и поджигает врага", "./assets/fireball.png"); //временное img
let healCard = new card("Лечение", 0, 0, 0, 3, "", "", 0, "Лечит 3 ед. здоровья", "./assets/Heal.png"); 

//карты мага специальные
let flash = new card("Вспышка", 0, 6, 0, 0, "", "", 0, "Наносит 6 ед. урона", "./assets/mage/flash.png");
let intellect = new card("Интеллект чародея", 0, 0, 0, 0, "card", "", 2, "Вы берете 2 карты", "./assets/mage/intellect.png");
let invisibility = new card("Невидимость", 1, 0, 7, 0, "card", "", 1, "Блокирует 7 ед. урона и дает 1 карту", "./assets/mage/invisibility.png");
let manapush = new card("Толчок маны", 1, 6, 0, 0, "", "ill", 1, "Наносит 6 ед. урона и ослабляет врага на 1 ход", "./assets/mage/manapush.png");

// карты воина специальные
let biteCard = new card("Укус", 1, 7, 0, 3, "", "", 0, "Наносит 7 ед. урона и лечит 3 ед. здоровья", "./assets/warrior/bite.png");
let efesCard = new card("Удар эфесом", 1, 9, 0, 0, "card", "", 1, "Наносит 9 ед. урона и дает 1 карту", "./assets/warrior/efes.png");
let everythingCard = new card("Все что угодно!", 1, 5, 5, 0, "", "", 0, "Наносит 5 ед. урона и блокирует 5 ед. урона", "./assets/warrior/everything.png");
let sacrificeCard = new card("Жертвоприношение", -2, 0, 0, -3, "card", "", 1, "Вы жертвуете 3 здоровья, берете 1 карту и 2 ед. маны ", "./assets/warrior/sacrifice.png");


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


//создание массива специальных карт
let deckSpecial = [];

function createSpecial(name) {
    if (name == "Warrior") {
        deckSpecial.push(biteCard);
        deckSpecial.push(efesCard);
        deckSpecial.push(everythingCard);
        deckSpecial.push(sacrificeCard);
    }
    else {
        deckSpecial.push(flash);
        deckSpecial.push(intellect);
        deckSpecial.push(invisibility);
        deckSpecial.push(manapush);
    }
}