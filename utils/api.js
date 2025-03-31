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

// 获取学院列表
export const getFaculties = async () => {
    try {
        // 使用 await 等待 getTokenFromLocalStorage 获取 token
        const token = await getTokenFromLocalStorage();  

        if (!token) {
            uni.showToast({
                title: '请先登录',
                icon: 'none'
            });
            return Promise.reject(new Error('Token 不存在'));
        }

        // 使用获取的 token 发送请求
        return request({
            url: "/getFaculties",
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (err) {
        console.error('获取 Token 失败:', err);
        uni.showToast({
            title: '获取 Token 失败',
            icon: 'none'
        });
        return Promise.reject(err);
    }
};

//获取学院班级信息
export const getClassesByFaculty = async (params) => {
	try {
	    // 使用 await 等待 getTokenFromLocalStorage 获取 token
	    const token = await getTokenFromLocalStorage();  
	
	    if (!token) {
	        uni.showToast({
	            title: '请先登录',
	            icon: 'none'
	        });
	        return Promise.reject(new Error('Token 不存在'));
	    }
	
	    // 使用获取的 token 发送请求
	    return request({
	        url: "/getClassesByFaculty",
	        method: 'POST',
	    	headers:{  'Content-Type': 'application/x-www-form-urlencoded',
	    	              'Authorization': `Bearer ${token}`
	    	            },
	    	data:params
	    });
	} catch (err) {
	    console.error('获取 Token 失败:', err);
	    uni.showToast({
	        title: '获取 Token 失败',
	        icon: 'none'
	    });
	    return Promise.reject(err);
	}
};
//获取用户信息
export const getUserInfo = async () => {
	try {
	    // 使用 await 等待 getTokenFromLocalStorage 获取 token
	    const token = await getTokenFromLocalStorage();  
	
	    if (!token) {
	        uni.showToast({
	            title: '请先登录',
	            icon: 'none'
	        });
	        return Promise.reject(new Error('Token 不存在'));
	    }
	
	    // 使用获取的 token 发送请求
	    return request({
	        url: "/getUserInfo",
	        method: 'GET',
	    	headers:{  'Content-Type': 'application/x-www-form-urlencoded',
	    	              'Authorization': `Bearer ${token}`
	    	            }
	    });
	} catch (err) {
	    console.error('获取 Token 失败:', err);
	    uni.showToast({
	        title: '获取 Token 失败',
	        icon: 'none'
	    });
	    return Promise.reject(err);
	}
};
//修改密码
export const revisePassword= async (params) => {
	try {
	    // 使用 await 等待 getTokenFromLocalStorage 获取 token
	    const token = await getTokenFromLocalStorage();  
	
	    if (!token) {
	        uni.showToast({
	            title: '请先登录',
	            icon: 'none'
	        });
	        return Promise.reject(new Error('Token 不存在'));
	    }
	
	    // 使用获取的 token 发送请求
	    return request({
	        url: "/revisePassword",
	        method: 'POST',
	    	headers:{  'Content-Type': 'application/x-www-form-urlencoded',
	    	              'Authorization': `Bearer ${token}`
	    	            },
			data:params
	    });
	} catch (err) {
	    console.error('获取 Token 失败:', err);
	    uni.showToast({
	        title: '获取 Token 失败',
	        icon: 'none'
	    });
	    return Promise.reject(err);
	}
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
