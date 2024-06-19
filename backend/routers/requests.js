const express = require('express');
const requests = require('../models/requests');

const requestRouter = express.Router();

requestRouter.get("/", async (req, res) => {
  try {
    const data = await requests.find();
    res.status(200).json({
      type: "Ok",
      requests: data
    });
  } catch (error) {
    res.status(400).send({ type: "Error", message: error.message });
  }
});

requestRouter.post("/", async (req, res) => {
  try {
    const { name, email, type, issue_description } = req.body;
    const existingRequest = await requests.findOne({ email, status: { $in: ["new", "in-progress"] } });

    if (existingRequest) {
      return res.status(403).json({
        type: "Forbidden",
        message: "You cannot raise multiple requests at a time"
      });
    }

    const newRequest = new requests({
      name,
      email,
      type,
      issue_description,
      status: "new",
      raised_on: new Date()
    });

    const savedRequest = await newRequest.save();
    res.status(201).json({
      type: "Created",
      message: `Request registered successfully with request id ${savedRequest._id}`
    });
  } catch (error) {
    res.status(400).send({ type: "Error", message: error.message });
  }
});

requestRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comment } = req.body;

    const request = await requests.findById(id);

    if (!request) {
      return res.status(404).json({
        type: "Not Found",
        message: "Request not found"
      });
    }

    if (["resolved", "rejected"].includes(request.status)) {
      return res.status(403).json({
        type: "Forbidden",
        message: "Cannot perform this operation on this request"
      });
    }

    request.status = status;
    request.comment = comment;
    await request.save();

    res.status(200).json({
      type: "Ok",
      message: "Request status updated successfully"
    });
  } catch (error) {
    res.status(400).send({ type: "Error", message: error.message });
  }
});

module.exports = requestRouter;
