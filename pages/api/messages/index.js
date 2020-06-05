import {messages} from "../../../store";

export default (req, res) => {
  res.statusCode = 200;
  res.json(messages);
}
