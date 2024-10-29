import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

testRouter.get("/test-image", (req, res) => {
  const imagePath = path.join(__dirname, "../public/images/img.png");
  res.sendFile(imagePath);
});
