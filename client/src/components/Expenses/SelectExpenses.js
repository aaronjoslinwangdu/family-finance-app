import { useSelector } from "react-redux";

const SelectExpenses = () => {

  const selectHandler = () => {
    console.log('hi from select');
  }

  return (
    <div onClick={selectHandler}>Select</div>
  )
}

export default SelectExpenses;