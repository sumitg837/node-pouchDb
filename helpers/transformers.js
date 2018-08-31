'use strict';

var users_transformer = async(data)=>{
  try{
    data = JSON.parse(data);
    let result=[];
    await data.map((item)=>{
      var res = {
        'id' : item.id ? item.id : '',
        'email' : item.email ? item.email : '',
        'name' : item.name ? item.name : '' 
      }
      result.splice(0, 0, res);
    })
    return result;
  }catch(error){
    throw error;
  }
}

module.exports = {
  users_transformer
}