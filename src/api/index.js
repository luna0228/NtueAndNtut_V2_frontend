import axios from "axios";
// yarn add axios
// 用axios js 接json api資料 
// const url =
//    "https://script.google.com/macros/s/AKfycbzUvJmNkD6ho5dgCKL5gTLE9pcZc8wXhuxsAE5Uy17OxOBSxoZuPDC2tgdcShzRFr1g7w/exec";

// const url =
//    "http://localhost:5001/worklist";
const url =
   "https://ntue-and-ntut-v2-backend.vercel.app/worklist";

export const getWorksList = async () => {
   try {
      const response = await axios.get(url);
      console.log('response in api', response.data)
      return response.data;
   } catch (err) {
      console.log(err);
   }

}

//for WorksList，使用時代入school, semester
export const getWorksListBySchoolSemester = async (school, semester) => {
   try {
      const response = await axios.get(`${url}/${school}/${semester}`);
      console.log('response in api', response.data)
      //使用api：http://localhost:5001/worklist/{school}/{semester}
      return response.data;
   } catch (err) {
      console.log(err);
   }
}


// GPT建議使用"&"來製作獨立
export const filterWorksListBySkillmultiple = async (school, semester, skill1, skill2, skill3) => {
   try {

      let response
      if (skill1 != null & skill2 != null & skill3 != null) {
         response = await axios.get(`${url}/${school}/${semester}/multiple_skill_filter?skill1=${skill1}&skill2=${skill2}&skill3=${skill3}`);
      }
      else if (skill1 != null & skill2 != null & skill3 == null) {
         response = await axios.get(`${url}/${school}/${semester}/multiple_skill_filter?skill1=${skill1}&skill2=${skill2}`);
      }
      else if (skill1 != null & skill2 == null & skill3 == null) {
         response = await axios.get(`${url}/${school}/${semester}/multiple_skill_filter?skill1=${skill1}`);
      }
      // let response = await axios.get(`${url}/${school}/${semester}/multiple_skill_filter?skill1=${skill1}&skill2=${skill2}&skill3=${skill3}`);

      return response.data;
   } catch (err) {
      console.log(err);
   }
}

//for 點擊數
export const updateClkCnt = async (id) => {
   try {
      const response = await axios.put(`${url}/update/clkcnt/${id}`);
      return response.data;
   } catch (err) {
      console.log(err);
   }
}