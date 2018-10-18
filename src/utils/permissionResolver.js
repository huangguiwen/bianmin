function match(menuPerm,userPerm) {
  let userParts = userPerm.split(":");
  let menuParts = menuPerm.split(":");

  for(let k=0;k<menuParts.length;k++) {
    let menuPart = menuParts[k];
    if(userParts.length-1<k) {
      return true;
    }else{
      let userPart=userParts[k];
      if(userPart!=='*'&&userPart!==menuPart) {
        return false;
      }
    }
  }
  return true;
}

function resolve(menuPerm,userPerms) {
  for(let i=0;i<userPerms.length;i++) {
    let userPerm = userPerms[i];
    if(match(menuPerm,userPerm)){
      return true;
    }
  }
  return false;
}


export default {
  resolve
}
