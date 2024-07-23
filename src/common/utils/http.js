const axios = require("axios");

const getAddressDetails =async (lat , lng) =>{
    const result = await axios.get(`${process.env.MAP_IR_URL}?lat=${lat}&lon=${lng}` , 
        {headers : {
            "x-api-key" : process.env.MAP_IR_APIKEY
        }
    }).then(res => res.data)
    return {
        address : result.address,
        province : result.province,
        district : result.district,
        city : result.county

    }
}
module.exports = {
    getAddressDetails
}