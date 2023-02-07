const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongodb");

class UserPreferences {
  static async findAllUserPreferences() {
    try {
      const db = getDatabase();
      const dataPreferencesFromDb = db.collection("User_Preferences");
      let dataPreferences = await dataPreferencesFromDb.find().toArray();
      return dataPreferences;
    } catch (error) {
      throw error;
    }
  }

  static async createUserPreferences(PreferenceId, UserId) {
    try {
      const data = {
        PreferenceId: new ObjectId(PreferenceId),
        UserId,
        created_at: new Date(),
      };
      const db = getDatabase();
      const dataPreferencesFromDb = db.collection("User_Preferences");
      const result = await dataPreferencesFromDb.insertOne(data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async findUserPreferenceByPk(userPreferenceId) {
    try {
      const db = getDatabase();
      const dataPreferencesFromDb = db.collection("User_Preferences");
      let dataPreferences = await dataPreferencesFromDb
        .findOne({
          _id: new ObjectId(userPreferenceId)
        })
      return dataPreferences;
    } catch (error) {
      throw error;
    }
  }

  static async findUserPreferenceByUserIDAndPreferenceId(UserId, PreferenceId) {
    try {
      const db = getDatabase();
      const dataPreferencesFromDb = db.collection("User_Preferences");
      let dataPreferences = await dataPreferencesFromDb
        .find({
          UserId,
          PreferenceId,
        })
      return dataPreferences;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUserPreferences(id) {
    try {
      const db = getDatabase();
      const dataPreferencesFromDb = db.collection("User_Preferences");
      const data = await dataPreferencesFromDb.deleteOne({
        _id: new ObjectId(id)
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserPreferences;
