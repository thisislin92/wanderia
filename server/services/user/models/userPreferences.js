const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongodb");
const Preferences = require("./preferences");

class UserPreferences {
  static async dataPreferencesFromDb() {
    return new Promise((resolve) => {
      const db = getDatabase();
      const dataPreferencesFromDb = db.collection("User_Preferences");
      resolve(dataPreferencesFromDb);
    });
  }

  // static async findAllUserPreferences() {
  //   try {
  //     const db = getDatabase();
  //     const dataPreferencesFromDb = db.collection("User_Preferences");
  //     let dataPreferences = await dataPreferencesFromDb.find().toArray();
  //     return dataPreferences;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  static async createUserPreferences(PreferenceId, UserId) {
    try {
      const data = {
        PreferenceId: new ObjectId(PreferenceId),
        UserId,
        created_at: new Date(),
      };
      const preferenceFound = await Preferences.findPreferencesByPk(
        PreferenceId
      );
      if (!preferenceFound) {
        throw {
          name: "NotFound",
        };
      }
      const dataPreferencesFromDb =
        await UserPreferences.dataPreferencesFromDb();
      const result = await dataPreferencesFromDb.insertOne(data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async findUserPreferenceByUserId(userId) {
    try {
      const dataPreferencesFromDb =
        await UserPreferences.dataPreferencesFromDb();

      const dataPreferences = await dataPreferencesFromDb
        .find({
          UserId: new ObjectId(userId),
        })
        .toArray();
      return dataPreferences;
    } catch (error) {
      throw error;
    }
  }

  static async findUserPreferenceByPk(userPreferenceId) {
    try {
      const dataPreferencesFromDb =
        await UserPreferences.dataPreferencesFromDb();

      const dataPreferences = await dataPreferencesFromDb.findOne({
        _id: new ObjectId(userPreferenceId),
      });
      return dataPreferences;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUserPreferences(id) {
    try {
      const dataPreferencesFromDb =
        await UserPreferences.dataPreferencesFromDb();

      const data = await dataPreferencesFromDb.deleteOne({
        _id: new ObjectId(id),
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserPreferences;
