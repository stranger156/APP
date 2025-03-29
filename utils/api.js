import {getTokenFromLocalStorage}from "../store/user.js"
import  request from "./request";

// 登录接口
export const login = (params) => {
    return request({
        url: "/login",
        method: 'POST',
		  data:params
    });
};
//注册接口
export const register = (params) => {
    return request({
        url: "/signUp",
        method: 'POST',
		  data:params
    });
};

//获取学院信息
export const getFaculties= () => {
	const token = getTokenFromLocalStorage();
    return request({
        url: "/getFaculties",
        method: 'GET',
		headers:{  'Content-Type': 'application/x-www-form-urlencoded',
		                'Authorization': `Bearer ${token}`
		            }
    });
};

//获取学院班级信息
export const getClassesByFaculty = (params) => {
	const token = getTokenFromLocalStorage();
    return request({
        url: "/getClassesByFaculty",
        method: 'POST',
		headers:{  'Content-Type': 'application/x-www-form-urlencoded',
		              'Authorization': `Bearer ${token}`
		            },
		  data:params
    });
};
//获取用户信息
export const getUserInfo= () => {
	const token = getTokenFromLocalStorage();
    return request({
        url: "/getUserInfo",
        method: 'GET',
		headers:{  'Content-Type': 'application/x-www-form-urlencoded',
		             'Authorization': `Bearer ${token}`
		            }
    });
};
//修改密码
export const revisePassword= (params) => {
	const token = getTokenFromLocalStorage();
    return request({
        url: "/revisePassword",
        method: 'POST',
		headers:{ 
			'Content-Type': 'application/x-www-form-urlencoded',
		           'Authorization': `Bearer ${token}`
		            },
		  data:params
    });
};

// export  getUser =()=>
//     $http(
//         {
//             url:"/user/userinfo",
//             method:"get",
//             headers:{
//                 "Authorization":localStorage.getItem('token')
//             }
//         })
