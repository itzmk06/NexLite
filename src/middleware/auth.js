//* dummy auth for admin route 
const authAdmin=(req,res,next)=>{
        const admin_token="xyz";
        const user_token="xyz";
        if(admin_token===user_token){
            next();
        }else{
            res.send("Unauthorized access!");
        }
};



module.exports={
    authAdmin
};
















