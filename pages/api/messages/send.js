import {messages} from "../../../store";

export default (req, res) => {
  messages.push(JSON.parse(req.body));
  res.statusCode = 200;
  res.json(messages);
}
