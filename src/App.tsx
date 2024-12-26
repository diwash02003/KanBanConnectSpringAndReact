import React from "react";
import KanbanBoard from "./components/KanbanBoard";

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>Kanban Task Manager</h1>
            <KanbanBoard />
        </div>
    );
};

export default App;
