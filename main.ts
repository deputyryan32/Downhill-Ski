namespace SpriteKind {
    export const Rock = SpriteKind.create()
    export const PGate = SpriteKind.create()
    export const BGate = SpriteKind.create()
    export const Cgate = SpriteKind.create()
    export const Tree = SpriteKind.create()
    export const RGate = SpriteKind.create()
}

let PurpleGate: Sprite = null;
let RedGate: Sprite = null
let BlueGate: Sprite = null;
let CheckGate: Sprite = null;
let myRock: Sprite = null;
let myTree: Sprite = null;
let gameActive = false;
let distance = 0;

scene.setBackgroundImage(assets.image`backG`)
scroller.scrollBackgroundWithSpeed(0, 10, 1)

let mySprite = sprites.create(assets.image`Skier`, SpriteKind.Player);
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true);
mySprite.setPosition(80, 20);
info.setLife(3)

let rockList = [assets.image`SnowRock2`, assets.image`myImage`, assets.image`SnowRock3`];
let treeList = [assets.image`Tree`, assets.image`Tree2`];
let skierSpeed = -75;
let rockSpawnTimer = 1000;
let treeSpawnTimer = 1200;
let PurpleGateTimer = 5000;
let RedGateTimer = 8000;
let BlueGateTimer = 8000;
let CgateTimer = 7000;
gameActive = true;

let statusbar = statusbars.create(60, 6, StatusBarKind.Health)
statusbar.positionDirection(CollisionDirection.Top);
statusbar.max = 1000;
statusbar.setLabel("  Dist ", 50);
statusbar.setOffsetPadding(-20, 0);

forever(function () {
    if (gameActive) {
        myRock = sprites.create(rockList._pickRandom(), SpriteKind.Rock);
        myRock.setPosition(randint(0, scene.screenWidth()), scene.screenHeight());
        myRock.setVelocity(0, skierSpeed);
        myRock.setFlag(SpriteFlag.AutoDestroy, true);
        pause(rockSpawnTimer);
    }
})

forever(function () {
    if (gameActive) {
        myTree = sprites.create(treeList._pickRandom(), SpriteKind.Tree);
        myTree.setPosition(randint(0, scene.screenWidth()), scene.screenHeight());
        myTree.setVelocity(0, skierSpeed);
        myTree.setFlag(SpriteFlag.AutoDestroy, true);
        pause(treeSpawnTimer);
    }
})

forever(function () {
    if (gameActive) {
        if (distance >= 1000) {
            CheckGate = sprites.create(assets.image`CheckGate`, SpriteKind.Cgate);
            CheckGate.setPosition(randint(0, scene.screenWidth()), scene.screenHeight());
            CheckGate.setVelocity(0, skierSpeed);
        }
        pause(CgateTimer)
    }
})

forever(function () {
    pause(100);
    distance += skierSpeed * -0.01;
    statusbar.value = Math.round(distance);
})

forever(function () {
    if (gameActive) {
        PurpleGate = sprites.create(assets.image`Purple Gate`, SpriteKind.PGate);
        PurpleGate.setPosition(randint(0, scene.screenWidth()), scene.screenHeight());
        PurpleGate.setVelocity(0, skierSpeed);
        pause(PurpleGateTimer);
    }
})

forever(function () {
    if (gameActive) {
        RedGate = sprites.create(assets.image`Red Gate`, SpriteKind.RGate);
        RedGate.setPosition(randint(0, scene.screenWidth()), scene.screenHeight());
        RedGate.setVelocity(0, skierSpeed);
        pause(RedGateTimer);
    }
})

forever(function () {
    if (gameActive) {
        BlueGate = sprites.create(assets.image`Blue Gate`, SpriteKind.BGate);
        BlueGate.setPosition(randint(0, scene.screenWidth()), scene.screenHeight());
        BlueGate.setVelocity(0, skierSpeed);
        pause(BlueGateTimer);
    }
})

game.onUpdateInterval(3000, function () {
    if (gameActive= false){
        skierSpeed += -25;
        skierSpeed = Math.max(skierSpeed, -150);
        rockSpawnTimer += -200;
        rockSpawnTimer = Math.max(treeSpawnTimer, 500);
        treeSpawnTimer += -200;
        treeSpawnTimer = Math.max(treeSpawnTimer, 500);
    }else {
        skierSpeed += -5;
        skierSpeed = Math.max(skierSpeed, -150);
        rockSpawnTimer += -200;
        rockSpawnTimer = Math.max(treeSpawnTimer, 500);
        treeSpawnTimer += -200;
        treeSpawnTimer = Math.max(treeSpawnTimer, 500);
    }
})

forever(function () {
    if (skierSpeed > -75) {
        gameActive = false

    } else {
        gameActive = true
    }
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.PGate, function (sprite, otherSprite) {
    otherSprite.destroy(effects.warmRadial, 100);
    skierSpeed += -10;
    info.changeScoreBy(3);
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.RGate, function (sprite, otherSprite) {
    otherSprite.destroy(effects.warmRadial, 100);
    info.changeLifeBy(1);
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.RGate, function (sprite, otherSprite) {
    otherSprite.destroy(effects.warmRadial, 100);
    info.changeLifeBy(1);
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.BGate, function (sprite, otherSprite) {
    otherSprite.destroy(effects.warmRadial, 100);
    skierSpeed += 40
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Rock, function (sprite, otherSprite) {
    otherSprite.destroy(effects.spray, 100);
    info.changeLifeBy(-1)
    skierSpeed += 15;
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Tree, function (sprite, otherSprite) {
    otherSprite.destroy(effects.spray, 100);
    info.changeLifeBy(-1)
    skierSpeed += 15;
})


// No Overlap
sprites.onOverlap(SpriteKind.Tree, SpriteKind.Rock, function (sprite, otherSprite){
    let destroyRandomSprite1 = [sprite, otherSprite]
    sprites.destroy(destroyRandomSprite1._pickRandom())
})

// PGate
sprites.onOverlap(SpriteKind.PGate, SpriteKind.BGate, function (sprite, otherSprite) {
    let destroyRandomSprite1 = [sprite, otherSprite]
    sprites.destroy(destroyRandomSprite1._pickRandom())
})

sprites.onOverlap(SpriteKind.PGate, SpriteKind.Cgate, function (sprite, otherSprite) {
    let destroyRandomSprite1 = [sprite, otherSprite]
    sprites.destroy(destroyRandomSprite1._pickRandom())
})

sprites.onOverlap(SpriteKind.PGate, SpriteKind.RGate, function (sprite, otherSprite) {
    let destroyRandomSprite1 = [sprite, otherSprite]
    sprites.destroy(destroyRandomSprite1._pickRandom())
})

//Cgate
sprites.onOverlap(SpriteKind.Cgate, SpriteKind.PGate, function (sprite, otherSprite) {
    let destroyRandomSprite1 = [sprite, otherSprite]
    sprites.destroy(destroyRandomSprite1._pickRandom())
})

sprites.onOverlap(SpriteKind.Cgate, SpriteKind.BGate, function (sprite, otherSprite) {
    let destroyRandomSprite1 = [sprite, otherSprite]
    sprites.destroy(destroyRandomSprite1._pickRandom())
})

sprites.onOverlap(SpriteKind.Cgate, SpriteKind.RGate, function (sprite, otherSprite) {
    let destroyRandomSprite1 = [sprite, otherSprite]
    sprites.destroy(destroyRandomSprite1._pickRandom())
})

//BGate
sprites.onOverlap(SpriteKind.BGate, SpriteKind.PGate, function (sprite, otherSprite) {
    let destroyRandomSprite1 = [sprite, otherSprite]
    sprites.destroy(destroyRandomSprite1._pickRandom())
})

sprites.onOverlap(SpriteKind.BGate, SpriteKind.RGate, function (sprite, otherSprite) {
    let destroyRandomSprite1 = [sprite, otherSprite]
    sprites.destroy(destroyRandomSprite1._pickRandom())
})

sprites.onOverlap(SpriteKind.BGate, SpriteKind.Cgate, function (sprite, otherSprite) {
    let destroyRandomSprite1 = [sprite, otherSprite]
    sprites.destroy(destroyRandomSprite1._pickRandom())
})

//No Gate vs Tree/Rock
sprites.onOverlap(SpriteKind.BGate, SpriteKind.Tree, function (sprite, otherSprite) {
    let destroyRandomSprite1 = [sprite, otherSprite]
    sprites.destroy(destroyRandomSprite1._pickRandom())
})

sprites.onOverlap(SpriteKind.RGate, SpriteKind.Tree, function (sprite, otherSprite) {
    let destroyRandomSprite1 = [sprite, otherSprite]
    sprites.destroy(destroyRandomSprite1._pickRandom())
})

sprites.onOverlap(SpriteKind.PGate, SpriteKind.Tree, function (sprite, otherSprite) {
    let destroyRandomSprite1 = [sprite, otherSprite]
    sprites.destroy(destroyRandomSprite1._pickRandom())
})

sprites.onOverlap(SpriteKind.Cgate, SpriteKind.Tree, function (sprite, otherSprite) {
    let destroyRandomSprite1 = [sprite, otherSprite]
    sprites.destroy(destroyRandomSprite1._pickRandom())
})

sprites.onOverlap(SpriteKind.BGate, SpriteKind.Rock, function (sprite, otherSprite) {
    let destroyRandomSprite1 = [sprite, otherSprite]
    sprites.destroy(destroyRandomSprite1._pickRandom())
})

sprites.onOverlap(SpriteKind.RGate, SpriteKind.Rock, function (sprite, otherSprite) {
    let destroyRandomSprite1 = [sprite, otherSprite]
    sprites.destroy(destroyRandomSprite1._pickRandom())
})

sprites.onOverlap(SpriteKind.PGate, SpriteKind.Rock, function (sprite, otherSprite) {
    let destroyRandomSprite1 = [sprite, otherSprite]
    sprites.destroy(destroyRandomSprite1._pickRandom())
})

sprites.onOverlap(SpriteKind.Cgate, SpriteKind.Rock, function (sprite, otherSprite) {
    let destroyRandomSprite1 = [sprite, otherSprite]
    sprites.destroy(destroyRandomSprite1._pickRandom())
})


sprites.onDestroyed(SpriteKind.Rock, function (sprite) {
    info.changeScoreBy(1)
})

sprites.onDestroyed(SpriteKind.Tree, function (sprite) {
    info.changeScoreBy(1)
})

info.onLifeZero(function () {
    gameActive = false;
    game.showLongText("You went " + Math.round(distance) + " Feet!", DialogLayout.Center);
    info.changeScoreBy(Math.round(distance) / 10);
    game.over(false, effects.dissolve);
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Cgate, function (sprite, otherSprite) {
    game.showLongText("You went " + Math.round(distance) + " Feet!", DialogLayout.Center);
    info.changeScoreBy(Math.round(distance) / 10);
    game.over(false, effects.confetti);
})

let iski = true

forever(function(){
    if (distance >= 929 && iski) {
        iski = false;
        
        sprites.destroy(mySprite);
        let mySprite2 = sprites.create(assets.image`SkierSpeed`, SpriteKind.Player);
        controller.moveSprite(mySprite2)
        mySprite2.setStayInScreen(true);
        mySprite2.startEffect(effects.fire);
        mySprite2.startEffect(effects.fire);
        mySprite2.startEffect(effects.fire);
        mySprite2.setPosition(80, 20);
        game.showLongText("need to last 100 more!", DialogLayout.Bottom);
        skierSpeed += -90;
        info.setLife(5);
    }
})

forever(function () {
    scroller.scrollBackgroundWithSpeed(0, skierSpeed + 3, 1)
})