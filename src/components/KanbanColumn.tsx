import React from "react";
import { Task } from "../types/Task";
import KanbanTask from "./KanbanTask";
import { useDrop } from "react-dnd";

interface KanbanColumnProps {
    stage: Task["stage"];
    tasks: Task[];
    moveTask: (task: Task, newStage: Task["stage"]) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ stage, tasks, moveTask }) => {
    const [, drop] = useDrop({
        accept: "TASK",
        drop: (item: { task: Task }) => moveTask(item.task, stage),
    });

    return (
        <div ref={drop} className="kanban-column bg-gray-100 p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">{stage}</h2>
            {tasks.map((task) => (
                <KanbanTask key={task.id} task={task} />
            ))}
        </div>
    );
};

export default KanbanColumn;
