import AsyncStorage from "@react-native-async-storage/async-storage";



export const storeState = async (key,state)=>{
    try {
        await AsyncStorage.setItem(key, JSON.stringify(state))
        console.log(key,state)
    } catch (error) {
        console.log(error)
    }
}


export const getStateCage = async () => {
    try {
      const value = await AsyncStorage.getItem('isCageTempOn');
      console.log('retreive: ',value)
      return value;
    } catch (error) {
      console.log(error);
    }
  };


  export const getStateTank = async (key) => {
    try {
      const value = await AsyncStorage.getItem('isTankTempOn');
      console.log('retreive: ',value)
      return value;
    } catch (error) {
      console.log(error);
    }
  };


  export const getTimeState = async (key) => {
    try {
      const value = await AsyncStorage.getItem('isTimepickerEnabled');
      console.log('retreive: ',value)
      return value;
    } catch (error) {
      console.log(error);
    }
  };