const updateDate = (item) => {
    const date = new Date(item['LogDate']);

    const dayString = (date.getMonth() + 1).toString() + "/" + (date.getDate()).toString();

    return {...item, "Date":dayString}
}

const addMissingDates = (days, timeframe, foodData) => {
    const today = new Date()
    const yesterday = new Date(today)
    let dayString;


    for (let i = 0; i < timeframe; i++) {
        dayString = (yesterday.getMonth() + 1).toString() + "/" + yesterday.getDate()
        if (!days.hasOwnProperty(dayString)) {
            foodData.push({
                Calories: 0,
                Carbohydrates: 0,
                Fat: 0,
                FoodName: "",
                Protein: 0,
                Date:dayString
            })
        }
        yesterday.setDate(yesterday.getDate() - 1)
    }

    return foodData
}

export {updateDate, addMissingDates}