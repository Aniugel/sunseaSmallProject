// pages/smile/text/text.js
var initData = 'this is first line \n this is second line'
var extraLine = [];
Page({
  data: {
    text:initData
  },
  add:function(e){
    extraLine.push('other line');
    this.setData({
      text:initData+'\n'+extraLine.join('\n')
    })
  },
  remove: function (e) {
    if(extraLine>0){
      extraLine.pop();
      this.setData({
        text: initData + '\n' + extraLine.join('\n')
      })

    }
  },
})