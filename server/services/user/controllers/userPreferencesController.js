const Preferences = require("../models/preferences");
const userPreferences = require("../models/userPreferences");

class UserPreferencesController {
  // static async findAllUserPreferences(req, res, next) {
  //   try {
  //     const dataUserPreferences = await userPreferences.findAllPreferences();
  //     const response = dataUserPreferences.map((userPreference) => {
  //       return {
  //         ...userPreference,
  //         created_at: undefined,
  //         createdAt: userPreference.created_at || null,
  //         updatedAt: userPreference.updatedAt || null,
  //       };
  //     });

  //     res.status(200).json(response);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  static async registerUserPreferences(req, res, next) {
    try {
      const UserId = req.user._id;
      const { PreferenceId } = req.body;

      if(!PreferenceId) {
        throw {
          name: "PreferenceIdRequired",
        }
      }

      const data = await userPreferences.createUserPreferences(
        PreferenceId,
        UserId
      );

      const newPreference = await userPreferences.findUserPreferenceByPk(
        data.insertedId
      );

      res.status(201).json({
        _id: data.insertedId,
        UserId,
        PreferenceId,
        createdAt: newPreference.created_at || null,
        updatedAt: null,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findUserPreferencesByUserId(req, res, next) {
    try {
      const dataUserPreferences = await userPreferences.findUserPreferenceByUserId(req.user._id);

      const finalResponse = await Promise.all(dataUserPreferences.map(async (userPreference) => {
        const Preference = await Preferences.findPreferencesByPk(userPreference.PreferenceId);
        return {
          ...userPreference,
          Preference,
          PreferenceId: undefined,
          created_at: undefined,
          createdAt: userPreference.created_at || null,
          updatedAt: userPreference.updatedAt || null,
        }
      }))


      res.status(200).json(finalResponse);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUserPreferences(req, res, next) {
    try {
      const { id } = req.params;
      const dataUserPreferences = await userPreferences.findUserPreferenceByPk(
        id
      );
      if (!dataUserPreferences) {
        throw {
          name: "NotFound",
        };
      }
      await userPreferences.deleteUserPreferences(id);
      res.status(200).json({ message: " Successfully Deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserPreferencesController;
