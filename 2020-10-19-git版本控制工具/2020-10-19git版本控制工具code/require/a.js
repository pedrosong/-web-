console.log("a.js");
define(["c"],function(res){
    console.log(res);
   return {
        myname:"张三",
        age:20,
        fn:function(){
            console.log("fn")
        }
    }
})