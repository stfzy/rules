r = require('../build/release/rules.node');
var cluster = require('cluster');
if (cluster.isMaster) {
    for (var j = 0; j < 32; j++) {
        cluster.fork();
    }

    cluster.on("exit", function (worker, code, signal) {
        cluster.fork();
    });
} else {
    handle = r.createRuleset('books' + cluster.worker.id,  
        JSON.stringify({
            ship: {
                when: { 
                    $and: [
                        { $lte: { amount: 1000 } },
                        { country: 'US' },
                        { currency: 'US' },
                        { seller: 'bookstore'} 
                    ]
                },
                run: 'ship'
            }
        })
    );

    r.bindRuleset(handle, '/tmp/redis0.sock');
    r.bindRuleset(handle, '/tmp/redis1.sock');
    r.bindRuleset(handle, '/tmp/redis2.sock');
    r.bindRuleset(handle, '/tmp/redis3.sock');
    r.bindRuleset(handle, '/tmp/redis4.sock');
    r.bindRuleset(handle, '/tmp/redis5.sock');
    r.bindRuleset(handle, '/tmp/redis6.sock');
    r.bindRuleset(handle, '/tmp/redis7.sock');
    r.bindRuleset(handle, '/tmp/redis8.sock');
    r.bindRuleset(handle, '/tmp/redis9.sock');
    r.bindRuleset(handle, '/tmp/redis10.sock');
    r.bindRuleset(handle, '/tmp/redis11.sock');
    r.bindRuleset(handle, '/tmp/redis12.sock');
    r.bindRuleset(handle, '/tmp/redis13.sock');
    r.bindRuleset(handle, '/tmp/redis14.sock');
    r.bindRuleset(handle, '/tmp/redis15.sock');

    var message = JSON.stringify({
        id: 1,
        sid: 1,
        name: 'John Smith',
        address: '1111 NE 22, Seattle, Wa',
        phone: '206678787',
        country: 'US',
        currency: 'US',
        seller: 'bookstore',
        item: 'book',
        reference: '75323',
        amount: 5000
    });

    console.log('Start books negative: ' + new Date());

    for (var m = 0; m < 1600000; ++m) {
        r.assertEvent(handle, message);
    }

    console.log('End books negative: ' + new Date());
}