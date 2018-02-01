(function () {
    var startButton = document.getElementById("startButton");
    var attackButton = document.getElementById("attackButton");
    var healButton = document.getElementById("healButton");
    var escapeButton = document.getElementById("escapeButton");
    var userHealthBar = document.getElementById("userHealth");
    var userHealBar = document.getElementById("userHeals");
    var userWinsBar = document.getElementById("userWins");
    var grantHealthBar = document.getElementById("grantHealth");
    var userName = document.getElementById("name");
    var messageEl = document.getElementById("message");
    var games = document.getElementsByClassName("game");
    var character = {
        name: " ",
        health: 40,
        healsRemaining: 2,
        wins: 0,
        generateAttackDamage: function () {
            return Math.floor(Math.random() * 5 + 1);
        },
        heal: function () {
            if (this.healsRemaining > 0) {
                this.health += Math.floor(Math.random() * 10 + 1);
                this.healsRemaining--;
            }
        },
    };
    var grant = {
        name: "Grant",
        health: 10,
        generateAttackDamage: function () {
            return Math.floor(Math.random() * 5 + 1);
        }
    }

    startButton.onclick = function () {
        character.name = prompt("What's your name?");
        userName.textContent = "Name: " + character.name;
        var i;
        for (var i = 0; i < games.length; i++) {
            games[i].style.display = "block";
        }
    }

    attackButton.onclick = function () {
        character.health -= grant.generateAttackDamage();
        grant.health -= character.generateAttackDamage();
        updateDisplay();
        updateMessage(grant.name + " has " + grant.health + " health left!" +
            character.name + " has " + character.health + " health left!");
        if (character.wins > 3) {
            updateMessage(character.name + " won!");
            return;
        }
        if (character.health < 1) {
            updateMessage(character.name + " lost!");
            return;
        }
        if (grant.health < 1) {
            updateMessage("Grant died!");
            character.wins++;
            grant.health = 10;
            UpdateDisplay();
        }
    }

    healButton.onclick = function () {
        character.heal();
        updateDisplay();
        updateMessage(character.name + " has " + character.health + " health now! " +
            character.healsRemaining + " heals remaining!");
    }

    escapeButton.onclick = function () {
        var x;
        for (x = 0; x < games.length; x++) {
            games[x].style.display = "none";
        }
    }

    function updateDisplay() {
        userHealthBar.value = character.health;
        userHealBar.value = character.healsRemaining;
        userWinsBar.value = character.wins;
        grantHealthBar.value = grant.health;
    }

    function updateMessage(newMessage) {
        messageEl.innerText = newMessage;
    }
})();