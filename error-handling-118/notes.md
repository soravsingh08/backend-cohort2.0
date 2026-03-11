stack : err.stack // batata hai error kaha hao
yaha pe ek problem thi jsi file main aap dotenv ko call akrte ho usi main aap env vairable ko use kr skte ho 
Validation hum perform krte hai controller se just pehelkyuki controller se to data sidhe hi database man chala jayeag na vo nahai hona chchaiye to hum usko theek krenege validation laga ak 

TO UUSE
npm i express validator

    [
   body("username").isString().withMessage("User name should be string"),
   body("email").isEmail().withMessage("Email should be valid email adress"),

    ]

    ye aise krkre chekc krea kiformat sai hai ya nahi express validator main yehi check akrna hai ki jo data bheja aur bhejna chchaiye tha same hai ya nahi jais eemai main @ hon ahchcaiyeye sab check hoga 


    body(is)=> isMongoid ye achi propery hai iski 
 