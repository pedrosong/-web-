function guards(guards={
    isLogin:false,
    prevPath:""
},action) {
    switch (action.type) {
      case "GUARDS_LOGIN":
        return {
          isLogin:true,
          prevPath:guards.prevPath
        }
      case "GUARDS_PATH":
        return {
          isLogin:false,
          prevPath:action.path
        }
    }
    return guards;
}

export default guards;