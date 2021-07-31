

 //создаем злодеев
 
 class enemy {
     constructor(name, hp, damageMult, damage, buff, timeBuff, gold, img) {
         this.name = name;
         this.hp = hp;
         this.damageMult = damageMult;
         this.damage = damage;
         this.buff = buff;
         this.timeBuff = timeBuff;
         this.gold = gold;
         this.img = img;
     }
 }
 
let HumanEnemy = new enemy("HumanEnemy", 100, 1, [15, 0, 45], [], [], 50, "./assets/gifs/enemy.gif"); // временнаф гифка
let ArcherEnemy = new enemy("ArcherEnemy", 120, 1, [30, 30, 30], [], [], 50, "./assets/gifs/enemy.gif"); // временная гифка

//массив злодеев
let enemiesArray = [HumanEnemy, ArcherEnemy];
