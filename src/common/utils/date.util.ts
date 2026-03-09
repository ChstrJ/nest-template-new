import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

export const getCurrentUTCDatetime = () => {
  return dayjs().utc().toDate();
}

export const getDaysUTCDatetime = (days: number = 7) => {
  return dayjs().utc().add(days, 'day').toDate();
};

export const getMinutesUTCDatetime = (minutes: number = 7) => {
  return dayjs().utc().add(minutes, 'minute').toDate();
};

export const convertUnixToUTCDatetime = (timestamp: number) => {
  return dayjs.unix(timestamp).utc().toDate();
}

export const isTokenExpired = (expiresAt: Date) => {
  return dayjs.utc().isAfter(dayjs.utc(expiresAt));
};

// TODO: Change all dates to UTC
export const getLastMonthRange = () => {
  const startOfLastMonth = dayjs().subtract(1, 'month').startOf('month').toDate();
  const endOfLastMonth = dayjs().subtract(1, 'month').endOf('month').toDate();

  return { startOfLastMonth, endOfLastMonth };
};

export const getCurrentMonthRange = () => {
  const startOfMonth = dayjs().startOf('month').toDate();
  const endOfMonth = dayjs().endOf('month').toDate();

  return { startOfMonth, endOfMonth };
};

export const getSixMonthsAgo = () => {
  const startOfMonth = dayjs().subtract(6, 'month').startOf('month').toDate();
  const endOfMonth = dayjs().endOf('month').toDate();

  return { startOfMonth, endOfMonth };
};

export const getMonthRange = (month: number) => {
  const index = month - 1; // Adjust for zero-based index
  const startOfMonth = dayjs().month(index).startOf('month').toDate();
  const endOfMonth = dayjs().month(index).endOf('month').toDate();

  return { startOfMonth, endOfMonth };
};

export const getCurrentDayRange = () => {
  const startOfDay = dayjs().startOf('day').toDate();
  const endOfDay = dayjs().endOf('day').toDate();

  return { startOfDay, endOfDay };
};

export const getLastWeekRange = () => {
  const now = dayjs();

  // Last week's Monday 12AM
  const start = now.subtract(1, 'week').startOf('week').add(1, 'day')

  // Last week's Sunday 11:59:59 PM
  const end = start.add(6, 'day').endOf('day')

  const startOfLastWeek = start.toDate();
  const endOfLastWeek = end.toDate();

  return { startOfLastWeek, endOfLastWeek };
}

export const getCurrentFormattedDate = () => {
  return dayjs().format("MMMM, DD, YYYY")
}