import { useContext } from "react";
import TasksContext from "../contexts/TasksContext ";

const Tasks = ({ }) => {
    const { tasks, setCurrentTask } = useContext(TasksContext);

    // Function to handle task click
    const handleTaskClick = (task) => {
        setCurrentTask(task);
        // Additional logic you want to perform when a task is clicked
    };
    return (
        <div>
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-200">Previous Tasks</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {tasks.map((task) => (
                        <div key={task.id} className="group relative" onClick={() => handleTaskClick(task)}>
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src="/images/brain-image.jpg"
                                    alt={task.imageAlt}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        {/* <a href={task.href}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                        </a> */}
                                        {task.name}

                                    </h3>
                                </div>
                                <p className="text-sm font-medium text-gray-200">{task.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tasks;