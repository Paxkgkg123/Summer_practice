
// выбор героя
function chooseHero() {
       
    let h1 = document.createElement("h1");
    let text = document.createTextNode("Выберите героя");
    h1.appendChild(text);
    
    let div = document.getElementById("chooseHero");
    div.appendChild(h1);
    
    for (let i = 0; i < heroesArray.length; i++) {
        let img = document.createElement("img");
        img.src = heroesArray[i].img;
        img.onclick = function() {
            alert("вы выбрали " + heroesArray[i].name);
            div.parentNode.removeChild(div);
            preparingForBattle(i);
        };
        div.appendChild(img);
    }
}


function preparingForBattle(heroIndex) {
    
    // создаем игровое поле
    let gameField = document.createElement("div");
    gameField.id = "gameField";
    
    let everything = document.getElementById("everything");
    everything.appendChild(gameField);
        
    
    // создаем героя
    
    let hero = heroesArray[heroIndex];
    
    let heroImg = document.createElement("img");
    heroImg.src = hero.img;
    
    let heroOnScreen = document.createElement("div");
    heroOnScreen.id = "heroOnScreen";
    
    heroOnScreen.appendChild(heroImg);
    gameField.appendChild(heroOnScreen);
    
    
    // создаем злодея
    
    let enemyIndex = Math.floor(Math.random() * (enemiesArray.length));
    let enemy = enemiesArray[enemyIndex];
    
    let enemyImg = document.createElement("img");
    enemyImg.src = enemy.img;
    
    let enemyOnScreen = document.createElement("div");
    enemyOnScreen.id = "enemyOnScreen";
    
    enemyOnScreen.appendChild(enemyImg);
    gameField.appendChild(enemyOnScreen);
    
    
    // параметры героя
    
    let heroParams = document.createElement("div");
    heroParams.id = "heroParams";
    let heroUl = document.createElement("ul");
    let heroLiMana = document.createElement("li");
    heroLiMana.id = "heroMana";
    let heroLiHp = document.createElement("li");
    heroLiHp.id = "heroHp";
    
    heroUl.appendChild(heroLiMana);
    heroUl.appendChild(heroLiHp);
    
    heroParams.appendChild(heroUl);
    
    gameField.appendChild(heroParams);
    
    heroLiHp.append(hero.hp);
    heroLiMana.append(hero.mana);
    
    
    // параметры злодея
    
    let enemyParams = document.createElement("div");
    enemyParams.id = "enemyParams";
    let enemyUl = document.createElement("ul");
    let enemyLiHp = document.createElement("li");
    enemyLiHp.id = "enemyHp";
    
    enemyUl.appendChild(enemyLiHp);
    
    enemyParams.appendChild(enemyUl); 
    
    gameField.appendChild(enemyParams);
    
    enemyLiHp.append(enemy.hp);
    
    // собираем деку в зависимости от героя
    createDeck(hero.name);
    
    
    let mana = hero.mana;
    let deckCardActive = deckCard; // колода
    let deckCardPassive = []; // бита
    let handCard = []; // в руке
    let numberRound = 0;
    
    
    round(hero, enemy, deckCardActive, deckCardPassive, handCard, numberRound, mana);
}


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


function round(hero, enemy, deckCardActive, deckCardPassive, handCard, numberRound, mana) {    
    
    changeHeroEnemyParams(hero, enemy);
    
    console.log(numberRound);
    
    // Берем карты в руку
    let threeDeck = takeCard(deckCardActive, deckCardPassive, hero.countCard);
    deckCardActive = threeDeck.resultActive;
    deckCardPassive = threeDeck.resultPassive;
    handCard = threeDeck.resultHand;
    
    
    // выводим карты в руке на экран
    let handCardOnScreen = document.createElement("div");
    handCardOnScreen.id = "handCardOnScreen";
    
    for (let i = 0; i < handCard.length; i++) {
        let cardImg = document.createElement("img");
        cardImg.src = handCard[i].img;
        cardImg.onclick = function() {
            //используем карту и удаляем если хватает маны
            useCard(handCard[i], hero, enemy);
            pushBuffHero(hero, deckCardActive, handCard);
            if (hero.mana != -1) {
                handCardOnScreen.removeChild(cardImg);
                deckCardPassive.push(handCard[i]);
                console.log("***" + hero.hp + " " + enemy.hp)
                changeHeroEnemyParams(hero, enemy);
            }
        };
        handCardOnScreen.appendChild(cardImg);
    }
    
    let gameField = document.getElementById("gameField");
    gameField.appendChild(handCardOnScreen);
    
    
    //добавляем кнопку перехода хода
    
    let endMove = document.createElement("button");
    endMove.id = "endMove";
    let btnText = "ход злодея";
    endMove.onclick = function() {
        gameField.removeChild(handCardOnScreen);
        console.log(mana);
        pushBuffEnemy(enemy);
        enemyMove(enemy, hero, numberRound);
        changeHeroEnemyParams(hero, enemy);
        updateParams(hero, handCard, deckCardPassive, mana);
        if (hero.hp > 0 && enemy.hp > 0) {
            round(hero, enemy, deckCardActive, deckCardPassive, handCard, ++numberRound, mana);
        } else {
            if (hero.hp > 0) {
                alert("Ты победил!!!!!!!!!!1, держи золото");
                hero.gold += enemy.gold;
            } else {
                alert("Ты проиграл. Пока(");
            }
        }
    };
    endMove.append(btnText);
    gameField.append(endMove);
    
}


function changeHeroEnemyParams(hero, enemy) {
    let heroMana = document.getElementById("heroMana");
    let heroHp = document.getElementById("heroHp");
    heroMana.replaceChildren(hero.mana);
    heroHp.replaceChildren(hero.hp);    
    
    let enemyHp = document.getElementById("enemyHp");
    enemyHp.replaceChildren(enemy.hp);
    
}


//Добавление карт в руку
function takeCard(deckCardActive, deckCardPassive, heroCountCard) {
    let result = {
        resultActive: [],
        resultPassive: [],
        resultHand: []
    }
    
    if (deckCardActive.length < heroCountCard) {
        result.resultHand = deckCardActive;
        for (let i = 0; i < heroCountCard - deckCardActive.length;) {
            let numberRand = Math.floor(Math.random() * (deckCardPassive.length - 1));
            result.resultHand.push(deckCardPassive[numberRand]);
            deckCardPassive.splice(numberRand, 1);
        }
        result.resultActive = deckCardPassive;
        result.resultPassive = [];
    } else {
        for (let i = 0; i < heroCountCard; i++) {
            let numberRand = Math.floor(Math.random() * (deckCardActive.length - 1));
            result.resultHand.push(deckCardActive[numberRand]);
            deckCardActive.splice(numberRand, 1);
        }
        result.resultActive = deckCardActive;
        result.resultPassive = deckCardPassive;
    }
    
    return result;
}


function useCard(card, hero, enemy) {
    if (hero.mana < card.cost) {
        console.log("no mana");
        hero.mana = -1;
        return;
    }
    hero.mana -= card.cost;
    enemy.hp -= card.damage;
    if (enemy.hp < 0)
        enemy.hp = 0;
    hero.armor += card.armor;
    hero.hp += card.heal;
    if (card.buff) {
        hero.buff.push(card.buff);
        hero.timeBuff.push(card.timeBuff);
    }
    if (card.debuff) {
        enemy.buff.push(card.debuff);
        enemy.timeBuf;
    }
}


function pushBuffHero(hero, deckCardActive, handCard) {
    for (let i = 0; i < hero.buff.length; i++) {
        if (hero.buff[i] == "card") {
            
            // добавляем случайную карту в handCard
            let n = Math.floor(Math.random() * (deckCardActive.length - 1));
            handCard.push(deckCardActive[n]);
            deckCardActive.splice(n, 1);
            
            // выводим новую карту на экран
            let handCardOnScreen = document.getElementById("handCardOnScreen");
            let cardImg = document.createElement("img");
            cardImg.src = deckCardActive[n].img;
            handCardOnScreen.appendChild(cardImg);
            
            // удаляем бафф
            hero.buff[i] = "";
        }
    }
}


//изменяем баффы злодея
function pushBuffEnemy(enemy) {
    for (let i = 0; i < enemy.buff.length; i++){
        if (enemy.buff[i] == "ill") {
            if (enemy.timeBuff[i] == 0) {
                enemy.damageMult = 1;
                enemy.buff.splice(i, 1);
                enemy.timeBuff.splice(i, 1);
                i--;
            }
            enemy.damageMult = 0,5;
            enemy.timeBuff[i] -= 1;
        } else if (element == "damage") {
            if (enemy.timeBuff[i] == 0) {
                enemy.buff.splice(i, 1);
                enemy.timeBuff.splice(i, 1);
                i--;
            }
            enemy.hp -= 3;
            enemy.timeBuff[i] -= 1;
        }
    };
}


function enemyMove(enemy, hero, numberRound) {
      
     if (enemy.damage[numberRound % 3] > 0) {
        if (Math.floor(enemy.damage[numberRound % 3] * enemy.damageMult) - hero.armor > 0) {
            hero.hp -= Math.floor(enemy.damage[numberRound % 3] * enemy.damageMult) - hero.armor;
            hero.armor = 0;
        } else {
            hero.armor -= Math.floor(enemy.damage[numberRound % 3] * enemy.damageMult);
        }
    } 
}

function updateParams(hero, handCard, deckCardPassive, mana) {
    
    //сброс карт из руки в биту
    for (let i = 0; i < handCard.length; i++) {
        deckCardPassive.push(handCard[i]);
    }
    
    hero.armor = 0;
    hero.mana = mana;
}



chooseHero();