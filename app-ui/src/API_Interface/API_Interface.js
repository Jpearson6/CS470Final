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

    
    async getUserInfo(Email,Password) {
        return axiosAgent.get(`login/${Email}/${Password}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                 }));
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


    async allUsers() {
        return axiosAgent.get(`user/all-users`);
    }

    async getUserById(userId) {
        try {
            const response = await axiosAgent.get(`/user/${userId}`);
            return response.data;
          } catch (error) {
            console.error(`Error adding user: ${error}`);
            throw error;
          }
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
    async allFoodByUserTimeSpan(userId , NumDays) {
        return axiosAgent.get(`foodlog/range/${NumDays}/${userId}`);
    }
    async searchFood(food) {
        return axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(food)}&dataType=${encodeURIComponent(params.dataType)}&pageSize=10`)
    }

    async addFoodByUser(UserId, Date, FoodName, Calories, Protein, Carbohydrates, Fat){
        return axiosAgent.post(`foodlog/${UserId}/${Date}/${FoodName}/${Calories}/${Protein}/${Carbohydrates}/${Fat}`)
    }

    async updateMacros(UserId, Fat, Carbs, Protein){
        return axiosAgent.post(`user/macros/${UserId}/${Fat}/${Carbs}/${Protein}`)
    }

    async getMacros(UserId){
        return axiosAgent.get(`user/macros/${UserId}`)
    }

}