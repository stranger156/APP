export const weeklySchedule = {
  week1: {
    weekNumber: "第1周",
    startDate: "2025/4/7",
    endDate: "2025/4/13",
    scheduleItems: [
      {
        id: 1,
        type: "lecture",
        name: "高等数学",
        location: "东101",
        teacher: "张教授",
        day: "周一",
        startTime: "08:00",
        endTime: "09:40"
      },
      {
        id: 2,
        type: "lecture",
        name: "大学英语",
        location: "西201",
        teacher: "王老师",
        day: "周一", // 同一天第二节课
        startTime: "10:00",
        endTime: "11:40"
      },
      // 更多课程...
    ]
  }
  // 其他周数据...
};

// 获取指定周的课程数据
export const getScheduleByWeek = (weekKey) => {
  return weeklySchedule[weekKey] || weeklySchedule.week1;
};

// 获取所有周次列表
export const getWeekList = () => {
  return Object.keys(weeklySchedule).map(key => ({
    key,
    label: weeklySchedule[key].weekNumber,
    dateRange: `${weeklySchedule[key].startDate} ~ ${weeklySchedule[key].endDate}`
  }));
};