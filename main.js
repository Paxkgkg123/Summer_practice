

//создаем героев

let Warrior = {
    name: "Warrior",
    hp: 65,
    armor: 0,
    mana: 3,
    countCard: 4,
    gold: 100,
    image: "./assets/Warrior.png"
}
let Mage = {
    name: "Mage",
    hp: 50,
    armor: 0,
    mana: 4,
    countCard: 4,
    gold: 100,
    image: "./assets/Mage.png"
 }
 
 
 //создаем злодеев
 
 let HumanEnemy = {
     name: "HumanEnemy",
     hp: 200,
     damage1: 30,
     damage2: 0,
     damage3: 70,
     gold: 50, 
     image: "./assets/HumanEnemy.png"
 }
 let ArcherEnemy = {
    name: "ArcherEnemy",
    hp: 150,
    damage1: 50,
    damage2: 50,
    damage3: 50,
    gold: 50, 
    image: "./assets/ArcherEnemy.png"
}


//создание карт
let damageCard = {
    name: "Удар",
    cost: 1,
    damage: 6,
    description: "Наносит 6 единиц урона"
}
let armorCard = {
    name: "Блок",
    cost: 1,
    armor: 8,
    description: "Блокирует 8 единиц урона"
}
let superDamageCard = {
    name: "Мощный удар мечом",
    cost: 2,
    damage: 15,
    dasrciption: "Наносит 15 единиц урона"
}
let evadeCard = {
    name: "Кувырок",
    cost: 1,
    drowCard: 1,
    armor: 5,
    description: "Дает 5 брони и 1 карту"
}
let kickCard = {
    name: "Пинок ногой",
    cost: 0,
    damage: 3,
    debuff: "ill",
    description: "Наносит 3 ед. урона и накладывает слабость"
}
let barierCard = {
    name: "Ледяная преграда",
    cost: 2,
    armor: 20,
    description: "Дает 20 брони"
}
let fireBallCard = {
    name: "Fire ball",
    cost: 2,
    damage: 12,
    debuff: "damage"
}
let healCard = {
    name: "Лечение",
    cost: 0,
    hp: 3,
    description: "Восстанавливает 3 ед. здоровья"
}

let deckCard = [];


//Создание колоды карт

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


//делаем массив героев и массив злодеев

let heroesArray = [Warrior, Mage];
let enemiesArray = [HumanEnemy, ArcherEnemy];


//выбираем героя и злодея, создаем колоду для определенного героя

function start() {
    let heroIndex = prompt("Выберите героя 1 - Warrior, 2 - Mage");
    let hero = heroesArray[heroIndex - 1];
    let enemy = enemiesArray[0];
    createDeck(hero.name);
    //alert(deckCard.length);
    fight(hero, enemy);
}


//Добавление карт в руку

function takeCard(deckCardActive, deckCardPassive, heroCountCard) {
    let result = {
        resultActive: [],
        resultPassive: [],
        resultHand: []
    }
    if (deckCardActive.length < heroCountCard) {
        let result = {
            resultActive: [],
            resultPassive: [],
            resultHand: []
        }
        result.resultHand = deckCardActive;
        for (let i = 0; i < heroCountCard - deckCardActive.length; i++) {
            let numberRand = Math.floor(Math.random() * deckCardPassive.length);
            //console.log(numberRand);
            result.resultHand.push(deckCardPassive[numberRand]);
            delete deckCardPassive[numberRand];
        }
        result.resultActive = deckCardPassive;
        result.resultPassive = [];
    } else {
        for (let i = 0; i < heroCountCard; i++) {
            let numberRand = Math.floor(Math.random() * (deckCardActive.length - 1));
            //console.log(numberRand);
            result.resultHand.push(deckCardActive[numberRand]);
            delete deckCardActive[numberRand];
        }
        result.resultPassive = deckCardPassive;
    }
    return result;
}


// процесс боя

function fight(hero, enemy) {
    //let mana = hero.mana;
    let deckCardActive = deckCard;
    let deckCardPassive = [];
    let handCard = [];
    while (hero.hp > 0 && enemy.hp > 0) {
        // Берем карты в руку
        let threeDeck = takeCard(deckCardActive, deckCardPassive, hero.countCard);
        deckCardActive = threeDeck.resultActive;
        deckCardPassive = threeDeck.resultPassive;
        handCard = threeDeck.resultHand;
        //выводим колоду в руке
        console.log(handCard);
        let cardIndex = prompt("выберете карту");
        alert(handCard[cardIndex].description);
    }
}

