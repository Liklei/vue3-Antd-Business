export default [
  {
    url: '/api/getAuth',
    method: 'get',
    response: (req) => {
      return {
        code: 0,
        data: {
          name: 'lance',
          phone: '157 **** 4520',
          address: '上海市宝山区大场镇1399弄'
        },
        msg: 'success'
      }
    }
  }
]
