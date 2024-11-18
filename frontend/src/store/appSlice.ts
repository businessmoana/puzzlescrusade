import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  ActivePage,
  DailyCheckIn,
  ExpandedTGUser,
  Game,
  User,
  UserCard,
  Referral,
} from "../types/types";
import axiosInterface from "../utils/axios";
import levelConfig from "../config/config.json";
import { userEnergySize, userLevel } from "../utils/service";
import { callTapApi } from "./apiCall";
import { Socket } from "socket.io-client";

// define variables for interval
var tapInterval: NodeJS.Timeout;

interface AppState {
  activePage: ActivePage;
  loading: boolean;
  game: Game | null;
  socket: any;
  cardProfitModalVisible: boolean;
  levelUpScreenVisible: boolean;
}

const initialState: AppState = {
  activePage: "mine",
  game: null,
  loading: false,
  socket: null,
  cardProfitModalVisible: true,
  levelUpScreenVisible: false,
};

// throttled synchroize call for backend data update
const throttleAPICall = (param: any) => {
  clearTimeout(tapInterval);
  tapInterval = setTimeout(() => {
    callTapApi(param);
  }, 500);
};

export const initializeUser = createAsyncThunk(
  "users/initialize",
  async (user: ExpandedTGUser) => {
    const response = await axiosInterface.post("users/initialize", {
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      username: user.username,
      startParam: user.startParam,
      isPremium: user.isPremium,
    });
    return response.data;
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCardProfitModalVisible: (state, action: PayloadAction<boolean>) => {
      state.cardProfitModalVisible = action.payload;
    },
    setSocket: (state, action: PayloadAction<Socket>) => {
      state.socket = action.payload;
    },
    changePage: (state, action: PayloadAction<ActivePage>) => {
      state.activePage = action.payload;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      if (state.game) {
        state.game.user = action.payload;
      }
    },
    introNext: (state) => {
      if (state.game) {
        if (state.game.introductionStep === 5) {
          state.game.user.isNew = false;
        } else {
          state.game.introductionStep = state.game.introductionStep + 1;
        }
      }
    },
    introSkip: (state) => {
      if (state.game) {
        state.game.user.isNew = false;
      }
    },
    tap: (state) => {
      if (state.game) {
        if (state.game.user.energy_point >= 1) {
          if (
            handleCheckLevelUpScreen(
              state.game.user.level_point,
              state.game.user.level_point +
                levelConfig.tapMultipler[state.game.user.tap_multipler_level].to
            )
          ) {
            state.levelUpScreenVisible = true;
          }
          state.game.user.coin_balance =
            state.game.user.coin_balance +
            levelConfig.tapMultipler[state.game.user.tap_multipler_level].to;
          state.game.user.level_point =
            state.game.user.level_point +
            levelConfig.tapMultipler[state.game.user.tap_multipler_level].to;
          state.game.user.energy_point =
            state.game.user.energy_point - 1 > 0
              ? state.game.user.energy_point - 1
              : 0;
          throttleAPICall({
            id: state.game.user.t_user_id,
            coin_balance: state.game.user.coin_balance,
            energy_point: state.game.user.energy_point,
            level_point: state.game.user.level_point,
          });
        }
      }
    },
    recoverEnergy: (state) => {
      if (state.game) {
        if (
          userEnergySize(state.game.user.energy_size_level) >
          state.game.user.energy_point
        )
          state.game.user.energy_point = state.game.user.energy_point + 1;
      }
    },
    increaseEnergySize: (state) => {
      if (state.game) {
        state.game.user.coin_balance =
          state.game.user.coin_balance -
          levelConfig.energySize[state.game.user.energy_size_level + 1].cost;
        state.game.user.energy_size_level =
          state.game.user.energy_size_level + 1;
      }
    },
    increaseRecovery: (state) => {
      if (state.game) {
        state.game.user.coin_balance =
          state.game.user.coin_balance -
          levelConfig.recovery[state.game.user.energy_recovery_level + 1].cost;
        state.game.user.energy_recovery_level =
          state.game.user.energy_recovery_level + 1;
      }
    },
    increaseTapMultiplier: (state) => {
      if (state.game) {
        state.game.user.coin_balance =
          state.game.user.coin_balance -
          levelConfig.tapMultipler[state.game.user.tap_multipler_level + 1]
            .cost;
        state.game.user.tap_multipler_level =
          state.game.user.tap_multipler_level + 1;
      }
    },
    claimBonus: (state, action: PayloadAction<DailyCheckIn>) => {
      if (state.game) {
        if (
          handleCheckLevelUpScreen(
            state.game.user.level_point,
            state.game.user.level_point +
              levelConfig.dailyCheckInAmount[
                state.game.user.DailyCheckIn.checkedin_count
              ]
          )
        ) {
          state.levelUpScreenVisible = true;
        }
        state.game.user.coin_balance =
          state.game.user.coin_balance +
          levelConfig.dailyCheckInAmount[
            state.game.user.DailyCheckIn.checkedin_count
          ];
        state.game.user.level_point =
          state.game.user.level_point +
          levelConfig.dailyCheckInAmount[
            state.game.user.DailyCheckIn.checkedin_count
          ];
        state.game.user.DailyCheckIn = action.payload;
        state.activePage = 'earn';
      }
    },
    updateHeroCards: (
      state,
      action: PayloadAction<{ card: UserCard[]; balance: number }>
    ) => {
      if (state.game) {
        state.game.user.Cards = action.payload.card;
        state.game.user.coin_balance = action.payload.balance;
      }
    },
    claimCardProfit: (
      state,
      action: PayloadAction<{ coin_balance: number; level_point: number }>
    ) => {
      if (state.game) {
        if (
          handleCheckLevelUpScreen(
            state.game.user.level_point,
            action.payload.level_point
          )
        ) {
          state.levelUpScreenVisible = true;
        }
        state.game.user.coin_balance = action.payload.coin_balance;
        state.game.user.level_point = action.payload.level_point;
      }
    },
    claimCardProfitSocket: (state, action: PayloadAction<number>) => {
      if (state.game) {
        if (
          handleCheckLevelUpScreen(
            state.game.user.level_point,
            state.game.user.level_point + action.payload
          )
        ) {
          state.levelUpScreenVisible = true;
        }
        state.game.user.coin_balance =
          state.game.user.coin_balance + action.payload;
        state.game.user.level_point =
          state.game.user.level_point + action.payload;
      }
    },
    showLevelUpScreen: (state) => {
      state.levelUpScreenVisible = true;
    },
    closeLevelUpScreen: (state) => {
      state.levelUpScreenVisible = false;
    },
    loadMoreReferrals: (state, action: PayloadAction<Referral[]>) => {
      if (state.game) {
        state.game.user.Referrals = [
          ...state.game.user.Referrals,
          ...action.payload,
        ];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeUser.fulfilled, (state, action) => {
      state.game = {
        user: action.payload,
        introductionStep: 0,
      };
    });
    builder.addCase(initializeUser.pending, (state, action) => {
      state.loading = true;
    });
  },
});

const handleCheckLevelUpScreen = (
  prevLevelPoint: number,
  levelPoint: number
): boolean => {
  return userLevel(prevLevelPoint).title !== userLevel(levelPoint).title;
};

export const {
  setLoading,
  setCardProfitModalVisible,
  setSocket,
  changePage,
  tap,
  recoverEnergy,
  increaseEnergySize,
  increaseRecovery,
  increaseTapMultiplier,
  claimBonus,
  updateUser,
  introNext,
  introSkip,
  updateHeroCards,
  claimCardProfit,
  claimCardProfitSocket,
  closeLevelUpScreen,
  loadMoreReferrals,
} = appSlice.actions;

export const getPage = (state: RootState) => state.app.activePage;

export default appSlice.reducer;
