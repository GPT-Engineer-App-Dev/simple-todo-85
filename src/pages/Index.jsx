import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash } from "lucide-react";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setEditingTask(index);
    setEditingText(tasks[index].text);
  };

  const saveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editingText;
    setTasks(updatedTasks);
    setEditingTask(null);
    setEditingText("");
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Todo App</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
            />
            <Button onClick={addTask}>Add Task</Button>
          </div>
          <ul className="space-y-2">
            {tasks.map((task, index) => (
              <li key={index} className="flex items-center gap-2">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleComplete(index)}
                />
                {editingTask === index ? (
                  <Input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-grow"
                  />
                ) : (
                  <span
                    className={`flex-grow ${
                      task.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {task.text}
                  </span>
                )}
                {editingTask === index ? (
                  <Button onClick={() => saveTask(index)}>Save</Button>
                ) : (
                  <>
                    <Button variant="outline" size="icon" onClick={() => editTask(index)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => deleteTask(index)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <span className="text-muted-foreground">You have {tasks.length} tasks</span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;