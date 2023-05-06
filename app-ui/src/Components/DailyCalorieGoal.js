/*
Male	BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
Female	BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
Little/no exercise: Calorie-Calculation = BMR x 1.2
Light exercise/sports 1-3 days/week: Calorie- Calculation = BMR x 1.375
Moderate exercise/sports 3-5 days/week: Calorie-Calculation = BMR x 1.55
Hard exercise/sports 6-7 days/week: Calorie-Calculation = BMR x 1.725
1lb = 3500 calories a week or 500 a day
*/
import API from '../API_Interface/API_Interface';

export default async function getDailyCalories(userId) {
    let activityLevel = "",
        sex = "",
        weeklyWeightGoal = 0,
        height = 0,
        weight = 0,
        age = 0;
    let DailyCalorieGoal = 0, BMR = 0;

    const api = new API();
    const user = (await api.getUserById(userId)).data;
    activityLevel = user[0]['ActivityLevel'];
    sex = user[0]['Sex'];
    weeklyWeightGoal = user[0]['LbsPerWeek'];
    height = user[0]['Height'];
    weight = user[0]['Weight'];
    age = user[0]['age'];

    if (sex == "Male") {

        BMR = (10 * weight) + (6.25 * height) - (5 * age) + 5
    } else {
        BMR = (10 * weight) + (6.25 * height) - (5 * age) - 161
    }
    if (activityLevel === 'Sedentary') {

        DailyCalorieGoal = BMR * 1.2;
    }
    else if (activityLevel === 'Lightly Active') {
        DailyCalorieGoal = BMR * 1.375;
    }
    else if (activityLevel === 'Moderately Active') {

        DailyCalorieGoal = BMR * 1.55;
    }
    else if (activityLevel === 'Very Active') {

        DailyCalorieGoal = BMR * 1.725;
    }
    if (weeklyWeightGoal === 0)
        return (DailyCalorieGoal);  
    else if (weeklyWeightGoal === 0.5)
        return (DailyCalorieGoal + 250);
    else if (weeklyWeightGoal == 1)
        return (DailyCalorieGoal + 500);
    else if (weeklyWeightGoal === -0.5)
        return (DailyCalorieGoal - 250);
    else if (weeklyWeightGoal === -1)
        return (DailyCalorieGoal - 500);
}