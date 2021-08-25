import store from '@/store';

export function verifyRole(roleRequest) {
    const Roles = store.state.appAuth.roles;
    if(Roles != null && Array.isArray(roleRequest)){
        for (var i = 0; i < roleRequest.length; i++){
            if(Roles.includes(roleRequest[i])){
               return true;
            }
        }
        return false;
    } else{
        return false;
    }
};
