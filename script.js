let char = new Mage('Thiago - O feiticeiro');
let monster = new BigMonster();
let log = new Log(document.querySelector('.log'));

const stage = new Stage(
    char,
    monster,
    document.querySelector('.player1'),
    document.querySelector('.monster'),
    log
);

stage.start();
