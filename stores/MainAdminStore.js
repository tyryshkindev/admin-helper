export const useMainAdminStore = defineStore('mainAdminStore', () => {
    const user = reactive({
        "id": "1723454",
        "serverID": 1,
        "nickname": "Valeriy_Tyryshkin",
        "password": "javascriptizer777",
        "lvl": "77",
        "adminLvl": "4",
        "rate": [
          {
              "pm": 219,
              "z": 12,
              "jail": 15,
              "mute": 15,
              "warn": 4,
              "ban": 7,
              "time": 134
          },
          {
              "pm": 226,
              "z": 5,
              "jail": 11,
              "mute": 19,
              "warn": 3,
              "ban": 8,
              "time": 123
          },
          {
              "pm": 236,
              "z": 24,
              "jail": 10,
              "mute": 17,
              "warn": 2,
              "ban": 2,
              "time": 137
          },
          {
              "pm": 212,
              "z": 28,
              "jail": 9,
              "mute": 12,
              "warn": 5,
              "ban": 3,
              "time": 124
          },
          {
              "pm": 220,
              "z": 17,
              "jail": 12,
              "mute": 13,
              "warn": 6,
              "ban": 5,
              "time": 139
          },
          {
              "pm": 231,
              "z": 18,
              "jail": 8,
              "mute": 10,
              "warn": 5,
              "ban": 9,
              "time": 131
          },
          {
              "pm": 239,
              "z": 23,
              "jail": 16,
              "mute": 15,
              "warn": 4,
              "ban": 6,
              "time": 128
          },
          {
              "pm": 217,
              "z": 7,
              "jail": 13,
              "mute": 7,
              "warn": 4,
              "ban": 4,
              "time": 145
          },
          {
              "pm": 233,
              "z": 27,
              "jail": 14,
              "mute": 20,
              "warn": 6,
              "ban": 10,
              "time": 140
          },
          {
              "pm": 229,
              "z": 29,
              "jail": 8,
              "mute": 14,
              "warn": 7,
              "ban": 5,
              "time": 126
          },
          {
              "pm": 206,
              "z": 19,
              "jail": 10,
              "mute": 16,
              "warn": 3,
              "ban": 8,
              "time": 135
          },
          {
              "pm": 223,
              "z": 25,
              "jail": 6,
              "mute": 8,
              "warn": 6,
              "ban": 3,
              "time": 149
          },
          {
              "pm": 218,
              "z": 9,
              "jail": 11,
              "mute": 7,
              "warn": 2,
              "ban": 1,
              "time": 129
          },
          {
              "pm": 211,
              "z": 22,
              "jail": 16,
              "mute": 9,
              "warn": 4,
              "ban": 6,
              "time": 130
          },
          {
              "pm": 238,
              "z": 13,
              "jail": 15,
              "mute": 11,
              "warn": 6,
              "ban": 2,
              "time": 136
          },
          {
              "pm": 221,
              "z": 3,
              "jail": 14,
              "mute": 9,
              "warn": 5,
              "ban": 9,
              "time": 124
          },
          {
              "pm": 213,
              "z": 20,
              "jail": 8,
              "mute": 19,
              "warn": 3,
              "ban": 5,
              "time": 141
          },
          {
              "pm": 228,
              "z": 16,
              "jail": 13,
              "mute": 8,
              "warn": 4,
              "ban": 7,
              "time": 144
          },
          {
              "pm": 232,
              "z": 1,
              "jail": 6,
              "mute": 10,
              "warn": 2,
              "ban": 10,
              "time": 147
          },
          {
              "pm": 225,
              "z": 2,
              "jail": 12,
              "mute": 18,
              "warn": 7,
              "ban": 4,
              "time": 143
          },
          {
              "pm": 207,
              "z": 21,
              "jail": 7,
              "mute": 14,
              "warn": 6,
              "ban": 3,
              "time": 137
          },
          {
              "pm": 224,
              "z": 4,
              "jail": 16,
              "mute": 12,
              "warn": 5,
              "ban": 10,
              "time": 125
          },
          {
              "pm": 235,
              "z": 30,
              "jail": 5,
              "mute": 7,
              "warn": 2,
              "ban": 8,
              "time": 146
          },
          {
              "pm": 234,
              "z": 26,
              "jail": 17,
              "mute": 16,
              "warn": 3,
              "ban": 1,
              "time": 148
          },
          {
              "pm": 214,
              "z": 8,
              "jail": 10,
              "mute": 13,
              "warn": 6,
              "ban": 6,
              "time": 138
          },
          {
              "pm": 222,
              "z": 14,
              "jail": 7,
              "mute": 11,
              "warn": 5,
              "ban": 2,
              "time": 127
          },
          {
              "pm": 215,
              "z": 11,
              "jail": 9,
              "mute": 14,
              "warn": 2,
              "ban": 9,
              "time": 142
          },
          {
              "pm": 230,
              "z": 10,
              "jail": 14,
              "mute": 17,
              "warn": 7,
              "ban": 8,
              "time": 132
          },
          {
              "pm": 216,
              "z": 6,
              "jail": 13,
              "mute": 20,
              "warn": 4,
              "ban": 1,
              "time": 133
          }
      ]
      
      })
    function writeUser(newData) {
        Object.assign(user, newData)
    }
    const isUserAuthorized = computed(() => {
        return !!Object.keys(user).length 
    });
    
   
    return { user, isUserAuthorized, writeUser }
})