const { DriverFindStudent, StudentFindDriver } = require('./ticketModel')


class GetBusinessData {
  static async getData(ticketId, type){
    let businessData = null
    
    const finder = {
      where: {
        id: ticketId
      }
    }

    switch (type) {
      case 100: //
        businessData = await DriverFindStudent.findOne(finder)
        break;
      case 200: //
        businessData = await StudentFindDriver.findOne(finder)
        break;
      default:
        break;
    }

    return businessData
  }
}

module.exports = { 
  GetBusinessData
}