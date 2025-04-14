export const scheduleData = {
  currentDate: new Date().getFullYear()+'/'+(new Date().getMonth()+1)+'/'+new Date().getDate(),
  currentWeek: "第8周 周日",
  month: "4月",
  weekDays: ["一", "二", "三", "四", "五", "六", "日"],
  
  scheduleItems: [
    {
      type: "time",
      time: "1:00",
      course: "08:45",
      index: "2",
      endTime: "08:55",
      duration: "09:40"
    },
    {
      type: "time",
      time: "3:10",
      course: "10:55",
      index: "4",
      endTime: "11:05",
      duration: "15:50"
    },
    {
      type: "course",
      name: "软件质量与测试",
      location: "东十二楼 111",
      teacher: "武剑洁"
    },
    // 其他课程数据...
  ]
}

// 获取当前周课程数据
export const getCurrentWeekSchedule = () => {
  return scheduleData.scheduleItems.filter(item => item.type !== 'notThisWeek');
}

// 获取所有课程数据
export const getAllSchedule = () => {
  return scheduleData;
}