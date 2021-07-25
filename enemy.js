

 //создаем злодеев
 
 class enemy {
     constructor(name, hp, damageMult, damage, buff, timeBuff, gold) {
         this.name = name;
         this.hp = hp;
         this.damageMult = damageMult;
         this.damage = damage;
         this.buff = buff;
         this.timeBuff = timeBuff;
         this.gold = gold;
     }
 }
 
let HumanEnemy = new enemy("HumanEnemy", 200, 1, [30, 0, 70], [], [], 50);
let ArcherEnemy = new enemy("ArcherEnemy", 150, 1, [50, 50, 50], [], [], 50);

//массив злодеев
let enemiesArray = [HumanEnemy, ArcherEnemy];
