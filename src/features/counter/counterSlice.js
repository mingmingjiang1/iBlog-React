import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    bgColor: '',
    bgImg: '',
    title: '',
    asideTitle: '',
    avstar: '',
    userName: '',
  },
  status: 'idle',
};


export const counterSlice = createSlice({
  name: 'counter',
  initialState,

  reducers: {
    modifyColor: (state, action) => {
      state.value.bgColor = action.payload;
    },
    modifyName: (state, action) => {
      state.value.userName = action.payload;
    },
    modifybgImg: (state, action) => {
      state.value.bgImg = action.payload;
    },
    modifyTitle: (state, action) => {
      state.value.title = action.payload;
    },
    modifyAsideTitle: (state, action) => {
      state.value.asideTitle = action.payload;
    },
    modifyAvstar: (state, action) => {
      state.value.avstar = action.payload;
    },
  },

});

export const { modifyColor, modifyName, modifyAsideTitle, modifybgImg, modifyTitle, modifyAvstar } = counterSlice.actions;
export const selectavstar = (state) => state.counter.value.avstar;
export const selectbgColor = (state) => state.counter.value.bgColor;
export const selectname = (state) => state.counter.value.userName;
export const selectbgImg = (state) => state.counter.value.bgImg;
export const selecttitle = (state) => state.counter.value.title;
export const selectasideTitle = (state) => state.counter.value.asideTitle;

export default counterSlice.reducer;

/*
redux应该包含的信息：
背景色
用户名
主页背景
主页标题
主页副标题
用户头像
*/
