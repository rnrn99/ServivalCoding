import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
//$ npm i -S date-fns
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
//데이트피커 커스텀 헤더
//원본 DatePicker의 기능을 셋팅해둠. 
//인자로 selected, onChange 를 가져옴.

//<Datepicker selected={when_date} onChange={setWhen_date} />
// 이와 같이 두개의 인자만 전달해줌. 


//소스 출처 https://reactdatepicker.com/#example-custom-header

const Datepicker = ({selected, onChange}) => {

  const years = range(1990, getYear(new Date()) + 1);
  const months = 
    ["1월", "2월", "3월","4월","5월", "6월", "7월","8월", "9월", "10월", "11월","12월"];
    
  return (
    <DatePicker
        locale={ko}
        dateFormat="yyyy-MM-dd"
        selected = {selected}

      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )}
      
      onChange={(date) => onChange(date)}
    />
  );
};

//range 함수가 없어서 만들어줌
function range(start, end) {
    let arr = [];
    let length = end - start; 
 
    for (let i = 0; i <= length; i++) { 
        arr[i] = start;
        start++;
    }
    return arr;
}

export default Datepicker;
