


//выбираем героя и злодея, создаем колоду для определенного героя
function start() {
    let heroIndex = prompt("Выберите героя 1 - Warrior, 2 - Mage");
    let hero = heroesArray[heroIndex - 1];
    let enemy = enemiesArray[0];
    createDeck(hero.name);
    //alert(deckCard.length);
    fight(hero, enemy);
}


function fight(hero, enemy) {
    let mana = hero.mana;
    let deckCardActive = deckCard;
    let deckCardPassive = [];
    let handCard = [];
    let numberRound = 0;
    
    // цикл всего боя
    while (hero.hp > 0 && enemy.hp > 0) {
        
        // Берем карты в руку
        let threeDeck = takeCard(deckCardActive, deckCardPassive, hero.countCard);
        deckCardActive = threeDeck.resultActive;
        deckCardPassive = threeDeck.resultPassive;
        handCard = threeDeck.resultHand;
        
        // цикл раунда
        while (hero.countCard > 0) {
            
            //выводим колоду в руке
            for (let i = 0; i < handCard.length; i++) {
                console.log(handCard[i].description);
            }
            
            let cardIndex = prompt("выберете карту или закончите ход(5)");
            if (cardIndex == 5)
                break;
            alert(handCard[cardIndex].description);
            
            //используем карту и удаляем если хватает маны
            let flag = useCard(handCard[cardIndex], hero, enemy);
            if (flag == 0) {
                deckCardPassive.push(handCard[cardIndex]);
                handCard.splice(cardIndex, 1);
            }
            console.log(enemy.hp + "    " + hero.hp);
        }
        
        // добавляем/убираем бафф злодею
        pushBuffEnemy(enemy);
        
        //ход злодея
        if (enemy.damage[numberRound % 3] > 0) {
            if (Math.floor(enemy.damage[numberRound % 3] * enemy.damageMult) - hero.armor > 0) {
                hero.hp -= Math.floor(enemy.damage[numberRound % 3] * enemy.damageMult) - hero.armor;
                hero.armor = 0;
            } else {
                hero.armor -= Math.floor(enemy.damage[numberRound % 3] * enemy.damageMult);
            }
        } 
        
        //сброс карт из руки в биту
        for (let i = 0; i < handCard.length; i++) {
            deckCardPassive.push(handCard[i]);
        }
        
        hero.armor = 0;
        
        //обновляем ману
        hero.mana = mana;
        numberRound++;
    }
    if (hero.hp > 0) {
        alert("Ты победил!!!!!!!!!!1, держи золото");
        hero.gold += enemy.gold;
    } else {
        alert("Ты проиграл. Пока(");
    }
}


