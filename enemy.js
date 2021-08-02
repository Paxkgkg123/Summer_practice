

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
let ArcherEnemy = new enemy("ArcherEnemy", 120, 1, [30, 30, 30], [], [], 55, "./assets/gifs/archerenemy.gif"); // временная гифка
let SmallEnemy = new enemy("SmallEnemy", 80, 1, [25, 30, 20], [], [], 40, "./assets/gifs/smallenemy.gif");
let TankEnemy = new enemy("TankEnemy", 200, 1, [30, 30, -10], [], [], 70, "./assets/gifs/tankenemy.gif");
let BossEnemy = new enemy("BossEnemy", 300, 1, [30, 40, -20], [], [], 200, "./assets/gifs/boss.gif");
//массив злодеев
let enemiesArray = [HumanEnemy, ArcherEnemy, SmallEnemy, TankEnemy,BossEnemy];
