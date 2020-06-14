const ONEHUNDRED_PERCENT = 100;
function Fighter(fighter) {
    const fighterStats = {
        name: fighter.name,
        damage: fighter.damage,
        maxHp: fighter.hp,
        currentHp: fighter.hp,
        strength: fighter.strength,
        agility: fighter.agility,
        wins: 0,
        losses: 0
    }
    return {
        getName: function() {
            return fighterStats.name;
        },
        getDamage: function() {
            return fighterStats.damage;
        },
        getHealth: function(hpLoss = 0) {
            fighterStats.currentHp -= hpLoss;
            return fighterStats.currentHp;
        },
        getStrength: function() {
            return fighterStats.strength;
        },
        getAgility: function() {
            return fighterStats.agility;
        },
        attack: function(defender) {
            const CHANCE_TO_HIT = ONEHUNDRED_PERCENT - (defender.getStrength() + defender.getAgility());
            if (Math.random() * ONEHUNDRED_PERCENT <= CHANCE_TO_HIT) {
                defender.getHealth(fighterStats.damage);
                if (defender.getHealth() <= 0) {
               console.log(`${fighterStats.name} deals ${fighterStats.damage} damage and kills ${defender.getName()}!`);
                    defender.heal(Math.abs(defender.getHealth()));
                } else {
                    console.log(`${fighterStats.name} makes ${fighterStats.damage} damage to ${defender.getName()}`);
                }
            } else {
                console.log(`${fighterStats.name} attack missed`)
            }
        },
        logCombatHistory: function() {
            console.log(`Name: ${fighterStats.name}, Wins: ${fighterStats.wins}, Losses: ${fighterStats.losses}`)
        },
        heal: function(healthAmount) {
            if (fighterStats.currentHp + healthAmount >= fighterStats.maxHp) {
                fighterStats.currentHp = fighterStats.maxHp
            } else {
                fighterStats.currentHp += healthAmount;
            }
        },
        dealDamage: function(healthAmount) {
            if (fighterStats.currentHp - healthAmount <= 0) {
                fighterStats.currentHp = 0;
            } else {
                fighterStats.currentHp -= healthAmount;
            }
        },
        addWin: function() {
            fighterStats.wins ++;
        },
        addLoss: function() {
            fighterStats.losses ++;
        }
    }
}
function battle(fighter1, fighter2) {
    if (fighter1.getHealth() === 0 || fighter2.getHealth() === 0) {
        if (fighter1.getHealth() === 0) {
            return console.log(`${fighter1.getName()} is dead and can't fight`);
        } else {
            return console.log(`${fighter2.getName()} is dead and can't fight`);
        }
    }
    while (fighter1.getHealth() > 0 && fighter2.getHealth() > 0) {
        fighter1.attack(fighter2);
        if (fighter2.getHealth() <= 0) {
            break;
        }
        fighter2.attack(fighter1);
    }
    if (fighter1.getHealth() === 0) {
        fighter1.addWin();
        fighter2.addLoss();
        console.log(`${fighter2.getName()} has won!`);
    } else {
        fighter2.addWin();
        fighter1.addLoss();
        console.log(`${fighter1.getName()} has won!`);
    }
}