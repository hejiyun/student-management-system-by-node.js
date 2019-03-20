//此模块负责读取数据以及提供方法给路由
var fs = require('fs')
var dbpath = './db.json'


//find方法负责查找所有数据,返回给路由
exports.find = function (callback) {
    fs.readFile(dbpath,'utf-8',function (err,data) {
        if (err) {
            return callback(err)
        }
        return callback(null,JSON.parse(data).students)
    })
}


//为db.json添加学生信息.
exports.save = function (student,callback) {
    //读取数据
    fs.readFile(dbpath,'utf-8',function (err,data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        if (students.length === 0) {
            student.id = 1
        }else{
            student.id = parseInt(students[students.length -1].id) +1  
        }
      
        students.push(student)
        var fileDate = JSON.stringify({
            students:students
        })
        fs.writeFile(dbpath,fileDate,function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
            
        }) 
    })
}

//找到对应id的数据,删除
exports.delete = function (id,callback) {
    fs.readFile(dbpath,'utf-8',function (err,data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        var deleteid = students.findIndex(function (item) {
            return item.id === parseInt(id)
        })
        students.splice(deleteid,1)
        var fileDate = JSON.stringify({
            students:students
        })
        fs.writeFile(dbpath,fileDate,function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}

//修改学生信息
exports.findById = function (id,callback) {
    fs.readFile(dbpath,'utf-8',function (err,data) {
        if (err) {
            return callback(err)
        }
        var students =JSON.parse(data).students
        var stu = students.find(function (item) {
            return item.id === parseInt(id)
        }) 
        return callback(null,stu)
    })
}

exports.edit = function (student,callback) {
    fs.readFile(dbpath,'utf-8',function (err,data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        student.id = parseInt(student.id)
        var stu = students.find(function (item) {
            return item.id === student.id
        })
        for( var key in student) {
            stu[key] = student[key]
        }
        var fileDate = JSON.stringify({
            students:students
        })
        fs.writeFile(dbpath,fileDate,function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}

 
