import { IUser } from '@/interfaces';
import React from 'react';

function UserInfo({user} : {user: IUser}){
    return (
        <div className='flex flex-col gap-5 mt-5 border p-5 w-max'>
           <h1> User Id : {user.id}</h1>
           <h1> User Name : {user.username}</h1>
           <h1> User Email : {user.email}</h1>
           <h1> User Role : {user.role}</h1>
            </div>
    )
}

export default UserInfo;