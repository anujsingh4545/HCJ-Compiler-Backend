import Code from "../model/Code.js";
import User from "../model/User.js";

export const saveCode = async (req, res) => {
  const {fullCode} = req.body;

  const {html, css, javascript} = fullCode;

  const userId = req.body.dataSend.userId;

  try {
    const newCode = await Code.create({
      html: html,
      css: css,
      javascript: javascript,
    });

    if (userId) {
      const curruser = await User.findById(userId);

      curruser.currentcode = newCode._id;
      curruser.save();
    }

    return res.status(201).send({url: newCode._id, message: "Code Saved sucessfully !", success: true});
  } catch (error) {
    return res.status(500).send({message: "Error saving code", success: false});
  }
};

export const getCode = async (req, res) => {
  const id = req.params.id;

  const getCode = await Code.findById(id);
  if (getCode) {
    return res.status(201).send({
      code: getCode,
      message: "code Fetched Sucessfully!",
      success: true,
    });
  } else {
    return res.status(500).send({
      message: "error fetching code!",
      success: false,
    });
  }
};
