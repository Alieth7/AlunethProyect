import { Router } from "express";

export const testRouter = Router();

testRouter.get("/single-element", (req, res) => {
  const element = {
    id: 1,
    content: "Here's the content",
    array: [
      "this is the first element in the array",
      "this is the seccond element in the array",
      "this is the third element in the array",
    ],
  };
  res.json(element);
});

testRouter.get("/array-of-elements", (req, res) => {
  const arrayOfElements = [
    {
      id: 1,
      content: "Here's the content",
      array: [
        "this is the first element in the array",
        "this is the seccond element in the array",
        "this is the third element in the array",
      ],
    },
    {
      id: 2,
      content: "Here's the content",
      array: [
        "this is the first element in the array",
        "this is the seccond element in the array",
        "this is the third element in the array",
      ],
    },
    {
      id: 3,
      content: "Here's the content",
      array: [
        "this is the first element in the array",
        "this is the seccond element in the array",
        "this is the third element in the array",
      ],
    },
  ];
  res.json(arrayOfElements);
});
