const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongodb");

class Preferences {
  static async dataPreferencesFromDb() {
    return new Promise((resolve) => {
      const db = getDatabase();
      const dataPreferencesFromDb = db.collection("Preferences");
      resolve(dataPreferencesFromDb);
    });
  }

  static async findAllPreferences() {
    try {
      const dataPreferencesFromDb = await Preferences.dataPreferencesFromDb();

      const dataPreferences = await dataPreferencesFromDb.find().toArray();

      return dataPreferences;
    } catch (error) {
      throw error;
    }
  }

  static async createPreferences(dataPreferences) {
    try {
      const data = {
        ...dataPreferences,
        created_at: new Date(),
      };
      const dataPreferencesFromDb = await Preferences.dataPreferencesFromDb();

      const result = await dataPreferencesFromDb.insertOne(data);
      return result;
    } catch (error) {
      throw error
    }
  }

  static async findPreferencesByPk(id) {
    try {
      const dataPreferencesFromDb = await Preferences.dataPreferencesFromDb();

      const data = await dataPreferencesFromDb.findOne({
        _id: new ObjectId(id),
      });

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async deletePreferences(id) {
    try {
      const data = await Preferences.dataPreferencesFromDb();

      await data.deleteOne({
        _id: new ObjectId(id),
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Preferences;
