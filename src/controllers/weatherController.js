let axios = require("axios")

// let getTempSortedCities= async function (req, res) {
//     try {
//      let cities= ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"];
//      let cityArrayWithKey=[];
//      cities.forEach((item)  =>  { 
//         let obj={city:item}
//         console.log(obj  );
//         var options = {
//             method: "get",
//             url: `http://api.openweathermap.org/data/2.5/weather?q=${item}&appid=d090185f828e324c2ab5943950bd34d1`
//         }
//         let resp =  axios(options);
//         console.log(resp.data.main.temp);
//         // console.log(resp);
//          let tempValue=resp.data.main.temp

//          // add temp keys in obj object
//           obj.temp=tempValue
//          cityArrayWithKey.push(obj);
//         });
//       console.log(cityArrayWithKey)

//       let sorted=cityArrayWithKey.sort( function(a,b) { return a.temp-b.temp});
//       console.log(sorted);
//       res.status(200).send({satus:true,data:sorted});

//     //   res.send({msg:cityArrayWithKey})
     
//     }
//     catch (err) {
//       console.log(err)
//       res.status(500).send({ msg: err.message })
  
//   }

// }

let getsortcity= async function (req, res) {
    try {
     let cities= ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"];
     let cityArrayWithKey=[];
        for (i=0;i<cities.length;i++)
            {
                let obj={city:cities[i]}
                let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=d090185f828e324c2ab5943950bd34d1`)
                obj.temp=resp.data.main.temp
                cityArrayWithKey.push(obj);
            };
        let sorted=cityArrayWithKey.sort( function(a,b) { return a.temp - b.temp});
        res.status(200).send({satus:true,data:sorted});
        }
    catch (err) {res.status(500).send({ msg: err.message })}}

//module.exports.getTempSortedCities = getTempSortedCities

module.exports.getsortcity = getsortcity