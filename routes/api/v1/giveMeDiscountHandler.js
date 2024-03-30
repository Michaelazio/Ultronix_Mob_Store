

export const giveMeDiscountHandler = async(req, res) =>{
    try {
        const discount = 20;
        if(!discount){
            return res.status(404).json({
                message: 'No Discount'
            })
        }
        return res.status(200).json({discount})

    } catch (error) {
        return res.status(500).json({error})
    }
}