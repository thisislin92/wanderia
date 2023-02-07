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

  static async findPreferencesUserIdAndPreferenceId(req, res, next) {
    try {
      const { id } = req.params;
      const dataUserPreferences = await userPreferences.findPreferencesByPk(id);
      if (!dataUserPreferences) {
        throw {
          name: "NotFound",
        };
      }

      const response = {
        ...dataUserPreferences,
        createdAt: dataUserPreferences.created_at || null,
        updatedAt: dataUserPreferences.updated_at || null,
      };
      res.status(200).json(response);
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
      const data = await userPreferences.deleteUserPreferences(id);
      res.status(200).json({ message: " Successfully Deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserPreferencesController;
