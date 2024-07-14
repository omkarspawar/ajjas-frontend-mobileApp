import moment from 'moment';

let OnboardingDate = '2022/01/01'
export const getDateRange = (type, window) => {
    let startDate, endDate, dateRange;

    switch (type) {
      case 'Day':
        if (window === 'Today') {
          startDate = moment().startOf('day');
          endDate = moment().endOf('day');
          dateRange = startDate.format('dddd, MMMM D');

        } else if (window === 'Yesterday') {
          startDate = moment().subtract(1, 'days').startOf('day');
          endDate = moment().subtract(1, 'days').endOf('day');
          dateRange = startDate.format('dddd, MMMM D');

        } else if (window === "Day Before Yesterday") {
          startDate = moment().subtract(2, 'days').startOf('day');
          endDate = moment().subtract(2, 'days').endOf('day');
          dateRange = startDate.format('dddd, MMMM D');
        }
        break;

      case 'Week':
        if (window === "This Week") {
          startDate = moment().startOf('isoWeek');
          endDate = moment().endOf('isoWeek');
          dateRange = `${startDate.format('MMM D')} - ${endDate.format('MMM D')}`;

        } else if (window === "Last Week") {
          startDate = moment().subtract(1, 'weeks').startOf('isoWeek');
          endDate = moment().subtract(1, 'weeks').endOf('isoWeek');
          dateRange = `${startDate.format('MMM D')} - ${endDate.format('MMM D')}`;

        } else if (window === "Last 7 Days") {
          startDate = moment().subtract(7, 'days').startOf('day');
          endDate = moment().endOf('day');
          dateRange = `${startDate.format('MMM D')} - ${endDate.format('MMM D')}`;

        }
        break;

      case 'Month':
        if (window === "This Month") {
          startDate = moment().startOf('month');
          endDate = moment().endOf('month');
          dateRange = `${startDate.format('MMM D')} - ${endDate.format('MMM D')}`;

        } else if (window === "Last Month") {
          startDate = moment().subtract(1, 'months').startOf('month');
          endDate = moment().subtract(1, 'months').endOf('month');
          dateRange = `${startDate.format('MMM D')} - ${endDate.format('MMM D')}`;

        } else if (window === "Last 30 Days") {
          startDate = moment().subtract(30, 'days').startOf('day');
          endDate = moment().endOf('day');
          dateRange = `${startDate.format('MMM D')} - ${endDate.format('MMM D')}`;

        }
        break;

        case 'Other':
        if (window === "This Year") {
          startDate = moment().startOf('year');
          endDate = moment().endOf('day');
          dateRange = `${startDate.format('MMM D')} - ${endDate.format('MMM D')}`;

        } else if (window === "Previous Year") {
          startDate = moment().subtract(1, 'years').startOf('year');
          endDate = moment().subtract(1, 'years').endOf('year');
          dateRange = `${startDate.format(`MMM D' YYYY`)} - ${endDate.format(`MMM D' YYYY`)}`;

        } else if (window === "Lifetime") {
          startDate = moment(OnboardingDate, 'YYYY/MM/DD').startOf('day');
          endDate = moment().endOf('day');
          dateRange = `${startDate.format(`MMM D' YYYY`)} - ${endDate.format(`MMM D' YYYY`)}`;

        }

        break;

      default:
        break;
    }

   return {
    startDate,endDate,dateRange
   }
  };


