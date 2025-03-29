
const baseUrl = 'http://106.55.177.226:5000'; // 替换为实际的 API 根路径

// 封装请求方法
const request = (options) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + options.url,
            method: options.method || 'GET',
            data: options.data || {},
            header: options.header||
			{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                if (res.statusCode === 200) {
                    resolve(res.data);
                } else {
                    reject(new Error(`请求失败，状态码: ${res.statusCode}`));
                }
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
};

export default request