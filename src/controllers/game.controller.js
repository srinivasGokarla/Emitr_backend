import User from "../models/User.js";


 export const updateScores = async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const pointsToAdd = req.body.score || 1;
      user.score += pointsToAdd;
      await user.save();
      res.json(user);
    } catch (error) {
      return res.status(400).json({ message: "Error in Updating points", error });
    }


};


export const leaderBoard = async (req, res) => {
    try {
        const users = await User.find().sort({ points: -1 }).limit(10);
        if (!users || users.length === 0) {
          return res.status(404).json({ message: "No users found with non-zero points" });
        }
        return res.status(200).json({ message: "User Best Score", users });
      } catch (error) {
        console.error("Error in Getting Best Score:", error);
        return res.status(500).json({ message: "Error in Getting Best Score", error: error.message });
      }
}

