import React from "react";
import { Task } from "../types/Task";
import { useDrag } from "react-dnd";

interface KanbanTaskProps {
    task: Task;
}

const KanbanTask: React.FC<KanbanTaskProps> = ({ task }) => {
    const [, drag] = useDrag({
        type: "TASK",
        item: { task },
    });

    return (
        <div ref={drag} className="kanban-task">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <small>Deadline: {new Date(task.deadline).toLocaleDateString()}</small>
        </div>
    );
};

export default KanbanTask;
