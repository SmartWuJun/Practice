// miniprogram/pages/demo/dbGudie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    users:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 获取数据库实例
    this.db = wx.cloud.database();
    this.search();


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  add(){
    // 增
    this.db.collection('user').add({
      data: {
        name:'lisi',
        age:'16',
        createTime: Date.now()
      } // 插入的数据
    }).then(res => {
      // 可以通过 res._id 获取创建的记录的 id
      console.log(res._id);
      this.search();

    })
  },
  delete(e) {
    const { id } = e.currentTarget.dataset;

    // 删
    this.db.collection('user').doc(id).remove().then(res => {
      // 可以通过 res._id 获取创建的记录的 id
      console.log(res,'remove')
      this.search();
    })
  },
  search() {
    // 查
    this.db.collection('user').get().then(res => {
      // 打印结果，res.data 即为记录的数据
      console.log(res)
      const {data}=res;
      this.setData({
        users:data
      })
    })
  }
})