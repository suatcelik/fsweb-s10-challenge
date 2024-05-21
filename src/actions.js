import axios from "axios";
import { localStorageStateYaz } from "./reducers";

export const NOT_EKLE = "NOT_EKLE";
export const NOT_SIL = "NOT_SIL";

export const notEkle = (not) => ({
  type: NOT_EKLE,
  payload: not,
});

export const notSil = (notId) => ({
  type: NOT_SIL,
  payload: notId,
});

export const notEkleAPI = (yeniNot) => (dispatch) => {
  axios
    .post("https://httpbin.org/anything", yeniNot)
    .then((res) => {
      if (res.status === 200) {
        const key = localStorage.getItem("notlar");
        const local = key ? JSON.parse(key) : [];
        local.push(res.data.data);
        localStorageStateYaz("notlar", local);
      }
    })
    .catch((error) => console.log(error));
};

export const notSilAPI = (id) => (dispatch) => {
  console.log(id);
  axios
    .delete("https://httpbin.org/anything", { data: id })
    .then((res) => {
      if (res.status === 200) {
        dispatch(notSil(id));

        const localStorageVeri =
          JSON.parse(localStorage.getItem("notlar")) || [];
        const yeniLocalStorageVeri = localStorageVeri.filter(
          (not) => not.id !== id
        );
        localStorage.setItem("notlar", JSON.stringify(yeniLocalStorageVeri));
      }
    })
    .catch((error) => console.log(error));
};
