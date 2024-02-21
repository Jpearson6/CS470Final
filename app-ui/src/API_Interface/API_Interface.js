import axios from 'axios';

const params = {
  api_key: 'lsbtkmq13XtiD3eAfTGpbhJbJFUGwX8UToxafkaJ',
  dataType: ["Survey (FNDDS)"]
}

const AxiosConfigured = () => {
  // Indicate to the API that all requests for this app are AJAX
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

  // Set the baseURL for all requests to the API domain instead of the current domain
  // axios.defaults.baseURL = `http://localhost:8443/api/v1`;
  axios.defaults.baseURL = `http://localhost:8443/api/v1`;


  // Allow the browser to send cookies to the API domain (which include auth_token)
  axios.defaults.withCredentials = false;


  //    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

  return axios;
};


const axiosAgent = AxiosConfigured();

export default class APIInterface {


  async getUserInfo(Email, Password) {
    return axiosAgent.post(`login/${Email}/${Password}`)
      .then(userInfo => userInfo.data)
      .catch(error => (
        {
          error,
          user: undefined
        }));
  }


  async getUserById(id) {
    return axiosAgent.get(`user/${id}`)
  }



  async addUser(email, name, password) {
    try {
      const response = await axiosAgent.post('/user/sign-up', {
        Email: email,
        Name: name,
        Password: password
      });
      return response.data;
    } catch (error) {
      console.error(`Error adding user: ${error}`);
      throw error;
    }
  }


  async updateUser(id, profile) {
    console.log(`User profile in API: ${JSON.stringify(profile)}`);
    console.log(`User ID in API: ${id}`);

    return axiosAgent.post(`user/update/${id}`, {
      dob: profile.dob,
      sex: profile.sex,
      height: profile.height,
      weight: profile.weight,
      activityLevel: profile.activityLevel
    });
  }


  async allUsers() {
    return axiosAgent.get(`user/all-users`);
  }

  async todaysCaloriesByUser(userId) {
    try {
      const response = await axiosAgent.get(`/foodlog/Calories/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error adding user: ${error}`);
      throw error;
    }
  }

  async todaysFatByUser(userId) {
    try {
      const response = await axiosAgent.get(`/foodlog/Fat/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error adding user: ${error}`);
      throw error;
    }
  }

  async todaysCarbsByUser(userId) {
    try {
      const response = await axiosAgent.get(`/foodlog/Carbs/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error adding user: ${error}`);
      throw error;
    }
  }

  async todaysProteinByUser(userId) {
    try {
      const response = await axiosAgent.get(`/foodlog/Protein/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error adding user: ${error}`);
      throw error;
    }
  }

  async allFoodByUser(userId) {
    return axiosAgent.get(`foodlog/${userId}`);
  }
  async allFoodByUserTimeSpan(userId, NumDays) {
    return axiosAgent.get(`foodlog/range/${NumDays}/${userId}`);
  }
  async searchFood(food) {
    return axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(food)}&dataType=${encodeURIComponent(params.dataType)}&pageSize=10`)
  }

  async addFoodByUser(UserId, Date, FoodName, Calories, Protein, Carbohydrates, Fat) {
    return axiosAgent.post(`foodlog/${UserId}/${Date}/${FoodName}/${Calories}/${Protein}/${Carbohydrates}/${Fat}`)
  }

  async updateMacros(UserId, Fat, Carbs, Protein) {
    return axiosAgent.post(`user/macros/${UserId}/${Fat}/${Carbs}/${Protein}`)
  }

  async getMacros(UserId) {
    return axiosAgent.get(`user/macros/${UserId}`)
  }

  async updateActivityLevel(UserId, activityLevel) {
    return axiosAgent.post(`user/alevel/${UserId}/${activityLevel}`)
  }

  async updateWeeklyGoal(UserId, weeklyGoal) {
    return axiosAgent.post(`user/week-goal/${UserId}/${weeklyGoal}`)
  }

  async updateGoalWeight(UserId, goalWeight) {
    return axiosAgent.post(`user/weight-goal/${UserId}/${goalWeight}`)
  }

  async updateCurrWeight(UserId, currWeight) {
    return axiosAgent.post(`user/curr-weight/${UserId}/${currWeight}`)
  }

  async updateWeightGoals(UserId, currWeight, goalWeight, weeklyGoal, activityLevel) {
    return axiosAgent.post(`user/wgoal/${UserId}/${currWeight}/${goalWeight}/${weeklyGoal}/${activityLevel}`)
  }
}