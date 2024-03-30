import Order from "../../../models/order/index.js";

export const userSpecificOrdersHandler = async (req, res) => {
  try {
    const { userId } = req.user;
    const userSpecificOrders = await Order.find({ userId }).populate("userId", "firstNm LastNm");
    if (userSpecificOrders) {
      console.log(userSpecificOrders);
      return res.status(200).send({
        success: true,
        userSpecificOrders,
      });
    } else {
      console.log(userSpecificOrders);
      return res.stats(404).send({
        success: false,
        message: "No Orders Exist",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Server Encountered a Problem while fetching for the data",
    });
  }
};
