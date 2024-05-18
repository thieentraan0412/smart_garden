const Device = require('../models/device.model')
const Record = require('../models/record.model')
function Factory(garden_id, type) {
    // factory method
    this.produce = function (garden_id, type) {
        var device
        if (type == 'light sensor')
            device = new LightSensor(garden_id, type)
        else if (type == 'temperature sensor')
            device = new TemperatureSensor(garden_id, type)
        else if (type == 'air humidity sensor')
            device = new AirHumiditySensor(garden_id, type)
        else if (type == 'soil moisture sensor')
            device = new SoilMoistureSensor(garden_id, type)
        else if (type == 'light')
            device = new Light(garden_id, type)
        else if (type == 'pump')
            device = new Pump(garden_id, type)
        else
            throw new Error("Device does not exist")

        // core logic 
        device.getLatestValue = function () {
            const data = Record.find({ "owner": device.id, "type": type })
            device.curValue = data.curValue
        }
    }

}

class LightSensor {
    id = []
    coordinate = []
    price = []
    status = []
    startDate = []
    time = []
    isEmpty = false
    constructor(garden_id, type) {
        const data = Device.find({ "owner": garden_id, "type": type })
        if (data.length < 1) {
            this.isEmpty = true
        }
        else {
            this.type = data[0].type
            this.owner = data[0].owner
            this.sensorType = data[0].sensorType
            this.name = data[0].name
            for (const elem in data) {
                this.id.push(elem.id)
                this.name.push(elem.name)
                this.coordinate.push(elem.coord)
                this.price.push(elem.price)
                this.time.push(elem.time)
                this.startDate(elem.startDate)
            }
        }
    }
}

module.exports = Factory