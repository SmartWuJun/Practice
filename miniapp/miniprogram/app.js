//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env:'smartwj-81025b'
      })
      // // 获取数据库实例
      // const db = wx.cloud.database()
      // // 增
      // db.collection('user').add({
      //   data: {
      //     name:'张三',
      //     age:'28',
      //     sex:'female'
      //   } // 插入的数据
      // }).then(res => {
      //   // 可以通过 res._id 获取创建的记录的 id
      //   console.log(res._id)
      // })
      // 删
      // db.collection('集合名称').doc('文档 ID').remove().then(res => {
      //   console.log('removed')
      // })
      // // 改
      // db.collection('集合名称').doc('文档 ID').update({
      //   data: {
      //     title: '我的第 1 篇文章', // 只更新 title 字段，其他不更新
      //   }
      // }).then(res => {
      //   // 可以通过 res._id 获取创建的记录的 id
      //   console.log(res._id)
      // })
      // // 查
      // db.collection('集合名称').doc('文档 ID').get().then(res => {
      //   // 打印结果，res.data 即为记录的数据
      //   console.log(res)
      // })
      // const _ = db.command // 取指令
      // db.collection('集合名称').where({
      //   // 查找条件
      //   category: 'computer',
      //   properties: {
      //     memory: _.gt(8), // 表示大于 8
      //   }
      // })
    }

    this.globalData = {}
  }
})
