

class events {
    constructor(name, type, index, description) {
        this.name = name;
        this.type = type;
        this.index = index;
        this.description = description;
    }

    eventActive () {
        if (this.type == "shop") {
            alert("Вы нашли магзин");
        } else if (this.type == "fight") {
            alert("Готовься драться");
        } else if (this.type == "dialog") {
            alert("Перед вами стоит подозрательрный мужщина. Пого ворить с ним?");
        }
    }
}

let shop = new events("Магазин", shop, 1, "Странная лавка, неожиданно встретившаяся на вашем пути");
let fight1 = new events("Грабеж", fight, 1, "Двое мужщин грабят женщину. Вы хотите вступить бой и получить hp?");
let fight2 = new events("Вымогательство", fight, 2, "У вас требуют деньги, чтобы пройти дальше. Отдать ли их?");
let fight3 = new events("Спящее животное", fight, 3, "Животное спит на куче трупов. Оюыскать трупы? (50%, что животное проснется");
let dialog1 = new events("Мужщина в капюшоне", dialog, 1, "Странный мужщина предлагает истинный дар. Заменить все карты атаки на укус, вы потеряете 50 hp");
let dialog2 = new events("Хижина мага", dialog, 2, "Маг предлагает обучиться магии. Вы получите 1 ману за 200 золота");

