export default (req, res) => {
  res.statusCode = 200;
  res.json([{ nick: "test", content: "test" }]);
}
