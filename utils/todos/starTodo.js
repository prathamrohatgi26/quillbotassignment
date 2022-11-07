const starTodo = async (id, currentStarStatus) => {
  const response = await fetch(`/api/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isStarred: currentStarStatus,
    }),
  });
  return await response.json();
};

export default starTodo;
