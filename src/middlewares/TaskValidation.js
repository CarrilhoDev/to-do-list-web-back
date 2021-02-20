const TaskModel = require("../model/TaskModel");
const { isPast } = require("date-fns");
const TaskValidation = async (req, res, next) => {
	const { macaddress, type, title, description, when } = req.body;

	if (!macaddress)
		return res.status(400).json({ error: "macaddress is required" });
	else if (!type) return res.status(400).json({ error: "type is required" });
	else if (!title)
		return res.status(400).json({ error: "title is required" });
	else if (!description)
		return res.status(400).json({ error: "description is required" });
	else if (!when) return res.status(400).json({ error: "when is required" });
	else {
		let exists;

		if (req.params.id) {
			exists = await TaskModel.findOne({
				_id: { $ne: req.params.id },
				when: { $eq: new Date(when) },
				macaddress: { $in: macaddress },
			});
		} else {
			if (isPast(new Date(when))){
				return res
					.status(400)
					.json({ error: "You need to choose a future date" });
                } else{
                    exists = await TaskModel.findOne({
                        when: { $eq: new Date(when) },
                        macaddress: { $in: macaddress },
                    });
                }
            
              
		}
		if (exists) {
			return res
				.status(400)
				.json({ error: "A task in this day and time already exists" });
		}
		next();
	}
};

module.exports = TaskValidation;
