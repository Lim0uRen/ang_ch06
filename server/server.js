"use strict";
const express = require('express'); // 引入express模块
const app = express(); // 调用方法生成应用


app.all('*', function (req, res, next) {
    // console.log("xxxxxxxxxx");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", '3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();
});


const USERS = [
    { id: '01', userName: 'zime123', password: '123456' },
    { id: '02', userName: 'aaa', password: '456789' }
];

app.get('/users', function (req, resp) {
    resp.send(USERS);
    resp.end();
});
// app.get('/user/:id', function (req, resp) {
//     console.log(req.params);
//     const id = req.params.id;
//     for (let user of USERS) {
//         if (user.id === id) {
//             resp.send(user);
//             break;
//         }
//     }
//     resp.end();
// });
// app.post('/user/:id/:userName/:password', function (req, resp) {
//     console.log(req.params);
//     resp.end();
// });
// app.get('/hello', function (req, resp) {
//     resp.send('哈哈哈');
//     resp.end();
// });

//urlencoded()发送post
const bodyParser = require('body-parser');
app.use(bodyParser.json());   //使用json数据
// app.use(bodyParser.json());
// app.post('/user', function (req, resp) {
//     console.log(req.params);
//     console.log(req.body);
//     USERS.push(req.body);
//     resp.send({ succ: true });
//     resp.end();
// });
//发送登录信息
app.put('/user', function (req, resp) {
    let founded = false;
    for (let user of USERS) {
        // if (user.id === req.body.id) {
        //     user.userName = req.body.userName;
        //     user.password = req.body.password;
        //     founded = true;
        //     break;
        // }
        if (user.userName == req.body.userName && user.password == req.body.password) {
            founded = true;
            break;
        }
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到该用户' });
    }
    resp.end();
});

//删除用户
// app.delete('/user/:id', function (req, resp) {
//     let founded = false;
//     let index = 0;
//     for (let user of USERS) {
//         if (user.id === req.params.id) {
//             USERS.slice(index, 1);
//             founded = true;
//             break;
//         }
//         index++;
//     }
//     if (founded) {
//         resp.send({ succ: true });
//     }
//     else {
//         resp.send({ succ: false, msg: '没有找到该用户' });
//     }
//     resp.end();
// })


app.listen(8080, function () {
    console.log('服务器在8080端口启动！');
});