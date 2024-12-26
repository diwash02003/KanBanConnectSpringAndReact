import React, { useEffect, useState } from "react";
import { Task } from "../types/Task";
import { getTasks, updateTask } from "../api/api";
import KanbanColumn from "./KanbanColumn";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const KanbanBoard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Fetch tasks from the backend
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks();
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    // Function to handle moving tasks between columns
    const moveTask = async (task: Task, newStage: Task["stage"]) => {
        try {
            const updatedTask = { ...task, stage: newStage };
            await updateTask(updatedTask);
            setTasks((prevTasks) =>
                prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
            );
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="kanban-container grid grid-cols-5 gap-4">
                {["TO_DO", "IN_PROGRESS", "REVIEW", "TESTING", "COMPLETED"].map(
                    (stage) => (
                        <KanbanColumn
                            key={stage}
                            stage={stage as Task["stage"]}
                            tasks={tasks.filter((task) => task.stage === stage)}
                            moveTask={moveTask}
                        />
                    )
                )}
            </div>
        </DndProvider>
    );
};

export default KanbanBoard;
