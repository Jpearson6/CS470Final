import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker(props) {
    const { logDate , setLogDate } = props;
    let tempDate = "";

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Log Date"
            onChange={(newValue) =>  {
                tempDate += newValue['$y'];
                tempDate += "-";
                tempDate += newValue['$M'];
                tempDate += "-";
                tempDate += newValue['$D'];
                setLogDate(tempDate);
            }}
            />
      </LocalizationProvider>
    );
  }