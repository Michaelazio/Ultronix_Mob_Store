import Order from "../../../models/order/index.js";

export const ordersStoringHandler = async(req, res) => {
    try {
        const {userId} = req.user;
        const { camera, memory,processor, model, cost, quantity, price} = req.body;
        const ordersCreated = await Order.create({
          camera,
          memory,
          processor,
          model,
          cost,
          quantity,
          price,
          userId,
        });
        if (ordersCreated) {
          return res.status(201).send({
            success: true,
            message: "Orders are stored to the Database",
          });
        } else {
          console.log(ordersCreated);
          return res.status(404).send({
            success: false,
            message:
              "Faild to store the orders, datas didn't match the Schema",
          });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "Server Problem!",
        });
      }
}