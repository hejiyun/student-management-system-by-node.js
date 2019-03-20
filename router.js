//此模块负责对请求路径的分配以及调用方法返回数据,.
var express = require('express')
var fs = require('fs')
var router = express.Router()

var Student = require('./students')

//请求首页
router.get('/students',function (req,res) {
    Student.find(function (err, students) {
        if (err) {
            return res.send('false')
        }
        res.render('index.html',{
            fruits:[
                'pingguo',
                'xiangjiao',
                'juzi'
            ],
            students:students
        })
    })
})

//先跳转到添加学生页面
router.get('/students/new',function (req,res) {
    res.render('new.html')
})

//处理post请求参数
router.post('/students/new',function (req,res) {
    Student.save(req.body, function (err) {
        if (err) {
            return res.send('false')
        }
        res.redirect('/students')
    }) 
})

//删除学生
router.get('/students/delete',function (req,res) {
    Student.delete(req.query.id,function (err) {
        if (err) {
            return res.send('false')
        }
        res.redirect('/students')
    })
})


//修改数据
router.get('/students/edit',function (req,res) {
    Student.findById(parseInt(req.query.id),function (err,student) {
        if (err) {
            return res.send('false')
        }
        res.render('edit.html',{
            student:student
        })
    })
    
})

router.post('/students/edit',function (req,res) {
    Student.edit(req.body,function (err) {
        if (err) {
            return res.send('false')
        }
        res.redirect('/students')
    })
})






module.exports = router