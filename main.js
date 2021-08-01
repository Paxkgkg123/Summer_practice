

let generalHero;
let numberLevel = 0;
let generalMana;
let generalHp;


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
            generalHero = heroesArray[i];
            generalHp = generalHero.hp;
            generalMana = generalHero.mana;
            preparingForBattle();
        };
        div.appendChild(img);
    }
}


function preparingForBattle() {
    
    console.log(numberLevel);
    // создаем игровое поле
    let gameField = document.createElement("div");
    gameField.id = "gameField";
    
    let everything = document.getElementById("everything");
    everything.appendChild(gameField);
        
    
    // создаем героя
    //let hero generalHero;
    let hero = generalHero;
    hero.mana = generalMana;
    hero.hp = generalHp;
    
    let heroImg = document.createElement("img");
    heroImg.src = hero.img;
    
    let heroOnScreen = document.createElement("div");
    heroOnScreen.id = "heroOnScreen";
    heroOnScreen.classList.add('hero');
    
    heroOnScreen.appendChild(heroImg);
    gameField.appendChild(heroOnScreen);
    
    
    // создаем злодея
    
    let enemy = enemiesArray[numberLevel];
    
    let enemyImg = document.createElement("img");
    enemyImg.src = enemy.img;
    
    let enemyOnScreen = document.createElement("div");
    enemyOnScreen.id = "enemyOnScreen";
    enemyOnScreen.classList.add('enemy');
    
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
    let heroLiArmor = document.createElement("li");
    heroLiArmor.id = "heroArmor";
    let liMana = document.createElement("li");
    let liHp = document.createElement("li");
    let liArmor = document.createElement("li");
    
    liMana.append("mana:");
    liHp.append("hp:");
    liArmor.append("armor:");
    
    heroUl.appendChild(liMana);
    heroUl.appendChild(heroLiMana);
    heroUl.appendChild(liHp);
    heroUl.appendChild(heroLiHp);
    heroUl.appendChild(liArmor);
    heroUl.appendChild(heroLiArmor);
    
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
    let liHpText = document.createElement("li");
    
    liHpText.append("hp:")
    
    enemyUl.appendChild(liHpText);
    enemyUl.appendChild(enemyLiHp);
    
    enemyParams.appendChild(enemyUl); 
    
    gameField.appendChild(enemyParams);
    
    enemyLiHp.append(enemy.hp);
    
    // собираем деку в зависимости от героя
    if (createDeck) {
        createDeck(hero.name);
        createSpecial(hero.name);
    }
    
    let mana = hero.mana;
    let deckCardActive = deckCard; // колода
    let deckCardPassive = []; // бита
    let handCard = []; // в руке
    let numberRound = 0;
    
    
    round(hero, enemy, deckCardActive, deckCardPassive, handCard, numberRound, mana);
}


function round(hero, enemy, deckCardActive, deckCardPassive, handCard, numberRound, mana) {    
    
    changeHeroEnemyParams(hero, enemy);
    console.log(generalHero.hp + "    " + enemy.hp);
    
    console.log("numberRound = " + numberRound);
    
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
            cardOnclick(i, hero, enemy, handCard, deckCardActive, deckCardPassive, cardImg);
    };
        handCardOnScreen.appendChild(cardImg);
    }
    
    let gameField = document.getElementById("gameField");
    gameField.appendChild(handCardOnScreen);
    
    
    //добавляем кнопку перехода хода
    
    let endMove = document.createElement("button");
    endMove.id = "endMove";
    let btnText = " ";
    endMove.onclick = function() {
        gameField.removeChild(handCardOnScreen);
        pushBuffEnemy(enemy);
        enemyMove(enemy, hero, numberRound);
        changeHeroEnemyParams(hero, enemy);
        updateParams(hero, handCard, deckCardPassive, mana);
        if (hero.hp > 0 && enemy.hp > 0) {
            round(hero, enemy, deckCardActive, deckCardPassive, handCard, ++numberRound, mana);
        }
        if (hero.hp == 0) {
            
            let everything = document.getElementById("everything");
            let gameField = document.getElementById("gameField");
            everything.removeChild(gameField);
            
            let chooseDiv = document.createElement("div");
            chooseDiv.className = "chooseHappening";
            let leftButton = document.createElement("button");
            leftButton.className = "leftButton";
            leftButton.onclick = function() {
                window.location.replace("menu.html");
            }
            let rightButton = document.createElement("button");
            rightButton.className = "rightButton";
            rightButton.onclick = function() {
                window.location.replace("index.html");                
            }
            let text = document.createElement("div");
            text.className = "textHappening";
            
            
            leftButton.append("menu");
            rightButton.append("restart");
            text.append("Ты проиграл(");
            
            chooseDiv.appendChild(leftButton);
            chooseDiv.appendChild(rightButton);
            chooseDiv.appendChild(text);
            
            everything.appendChild(chooseDiv);
    
        }
    };
    endMove.append(btnText);
    gameField.append(endMove);
    
}


function cardOnclick(cardNumber, hero, enemy, handCard, deckCardActive, deckCardPassive, cardImg) {
        //используем карту и удаляем если хватает маны
        useCard(handCard[cardNumber], hero, enemy);
        pushBuffHero(hero, enemy, handCard, deckCardActive, deckCardPassive);
        if (hero.mana != -1) {
            let handCardOnScreen = document.getElementById("handCardOnScreen");
            handCardOnScreen.removeChild(cardImg);
            deckCardPassive.push(handCard[cardNumber]);
            changeHeroEnemyParams(hero, enemy);
        }
        if (enemy.hp == 0) {
                            
            // удаляем игровое поле 
            let everything = document.getElementById("everything");
            let gameField = document.getElementById("gameField"); 
            everything.removeChild(gameField);
                                    
            
            // предлагаем выбор новых карт
            
            let chooseCard = [];
            for (let i = 0; i < 2; i++) {
                let n = Math.floor(Math.random() * (deckSpecial.length - 1));
                            
                chooseCard.push(deckSpecial[n]);
                deckSpecial.splice(n, 1);
            }
            
            let h1 = document.createElement("h1");                
            let chooseCardOnScreen = document.createElement("div");
            chooseCardOnScreen.id = "chooseCardOnScreen";
            
            h1.append("Вы победили! Выберите новую карту");
            chooseCardOnScreen.appendChild(h1);
            
            for (let i = 0; i < 2; i++) {
                let chooseCardImg = document.createElement("img");
                chooseCardImg.src = deckSpecial[i].img;
                // при нажатии на карту она добавляется в основную колоду
                chooseCardImg.onclick = function() {
                    alert("вы выбрали " + deckSpecial[i].name);
                    deckCard.push(chooseCard[i]);
                    chooseCard.splice(i, 1);
                    deckSpecial.push(chooseCard[0]);
                    
                    everything.removeChild(chooseCardOnScreen);
                    
                    // выбор дальнейшых действий
                    let chooseDiv = document.createElement("div");
                    chooseDiv.className = "chooseHappening";
                    let leftButton = document.createElement("button");
                    leftButton.className = "leftButton";
                    leftButton.onclick = function() {
                        window.location.replace("menu.html");
                    }
                    let rightButton = document.createElement("button");
                    rightButton.className = "rightButton";
                    rightButton.onclick = function() {
                        numberLevel++;
                        everything.removeChild(chooseDiv);
                        preparingForBattle();                        
                    }
                    let text = document.createElement("div");
                    text.className = "textHappening";
                    
                    
                    leftButton.append("menu");
                    rightButton.append("next");
                    text.append("Ты получаешь " + enemy.gold + " золота");
                    hero.gold += enemy.gold;
                    
                    chooseDiv.appendChild(leftButton);
                    chooseDiv.appendChild(rightButton);
                    chooseDiv.appendChild(text);
                    
                    everything.appendChild(chooseDiv);
                    
                };
                chooseCardOnScreen.appendChild(chooseCardImg);
            }
            
            everything.appendChild(chooseCardOnScreen);
                            
        
    }
    
}
function changeHeroEnemyParams(hero, enemy) {
    let heroMana = document.getElementById("heroMana");
    let heroHp = document.getElementById("heroHp");
    let heroArmor = document.getElementById("heroArmor");
    heroMana.replaceChildren(hero.mana);
    heroHp.replaceChildren(hero.hp);  
    heroArmor.replaceChildren(hero.armor);  
    
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
        enemy.timeBuff.push(card.timeBuff);
    }
}


function pushBuffHero(hero, enemy, handCard, deckCardActive, deckCardPassive) {
    for (let i = 0; i < hero.buff.length; i++) {
        if (hero.buff[i] == "card") {
            
            for (let i = 0; i < hero.timeBuff; i++) {
                
                // добавляем случайную карту в handCard
                let n = Math.floor(Math.random() * (deckCardActive.length - 1));
                handCard.push(deckCardActive[n]);
                deckCardActive.splice(n, 1);
                
                // выводим новую карту на экран
                let handCardOnScreen = document.getElementById("handCardOnScreen");
                let cardImg = document.createElement("img");
                cardImg.src = deckCardActive[n].img;
                cardImg.onclick = function() {
                    cardOnclick(handCard.length - 1, hero, enemy, handCard, deckCardActive, deckCardPassive, cardImg);
                }
                handCardOnScreen.appendChild(cardImg);
                
            }
        
            // удаляем бафф
            hero.buff[i] = "";
            hero.timeBuff = 0;
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
        } else if (enemy.buff[i] == "damage") {
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
            if (hero.hp < 0) {
                hero.hp = 0;
            }
            hero.armor = 0;
        } else {
            hero.armor -= Math.floor(enemy.damage[numberRound % 3] * enemy.damageMult);
        }
    }
        else {
        enemy.hp-=enemy.damage[numberRound % 3];
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

function restart() {
    
}

chooseHero();

