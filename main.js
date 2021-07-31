
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
    heroImg.src = ./assets/hero.gif;
    
    let heroOnScreen = document.createElement("div");
    heroOnScreen.id = "heroOnScreen";
    
    heroOnScreen.appendChild(heroImg);
    gameField.appendChild(heroOnScreen);
    
    
    // создаем злодея
    
    let enemyIndex = Math.floor(Math.random() * (enemiesArray.length));
    let enemy = enemiesArray[enemyIndex];
    
    let enemyImg = document.createElement("img");
    enemyImg.src = ./assets/enemy.gif;
    
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
    
    
    heroRound(hero, enemy, deckCardActive, deckCardPassive, handCard, numberRound, mana);
}

function heroRound(hero, enemy, deckCardActive, deckCardPassive, handCard, numberRound, mana) {
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
    endMove.onclick = function(hero, enemy, deckCardActive, deckCardPassive, handCard, numberRound, mana) {
        pushBuffEnemy(enemy);
        enemyMove(enemy, hero, numberRound);
        changeHeroEnemyParams(hero, enemy);
        updateParams(hero, handCard, deckCardPassive, mana);
        if (hero.hp > 0 && enemy.hp > 0) {
            heroRound(hero, enemy, deckCardActive, deckCardPassive, handCard, numberRound++, mana);
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

function changeHeroEnemyParams(hero, enemy) {
    let heroMana = document.getElementById("heroMana");
    let heroHp = document.getElementById("heroHp");
    heroMana.replaceChildren(hero.mana);
    heroHp.replaceChildren(hero.hp);    
    
    let enemyHp = document.getElementById("enemyHp");
    enemyHp.replaceChildren(enemy.hp);
    
}

chooseHero();
