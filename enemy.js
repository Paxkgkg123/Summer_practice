

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
 
let HumanEnemy = new enemy("HumanEnemy", 200, 1, [30, 0, 70], [], [], 50, "./assets/enemy.giv"); //временное img
let ArcherEnemy = new enemy("ArcherEnemy", 150, 1, [50, 50, 50], [], [], 50, "./assets/enemy.giv");

//массив злодеев
let enemiesArray = [HumanEnemy, ArcherEnemy];
