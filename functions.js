

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


//использование карты
function useCard(card, hero, enemy) {
    if (hero.mana < card.cost) {
        console.log("no mana");
        hero.mana = -1;
        return;
    }
    hero.mana -= card.cost;
    enemy.hp -= card.damage;
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