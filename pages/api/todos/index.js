import Todo from "../../../db/models/Todo";

export default async (req, res) => {
  if (req.method === "GET") {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  }

  // add search logic
  if (req.method === "POST") {
    const { title, dueDate } = req.body;
    const todo = await Todo.create({
      title,
      createdAt: Date.now(),
      dueDate,
      completed: false,
      isStarred: false,
    });
    res.status(201).json(todo);
  }
};
