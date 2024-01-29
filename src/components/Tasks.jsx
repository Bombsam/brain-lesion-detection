const Tasks = ({ }) => {
    const tasks = [
        {
            id: 1,
            name: 'Patient #21442',
            href: '#',
            imageSrc: '/images/brain-image.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            date: '2024/01/15'
        },
        {
            id: 2,
            name: 'Patient #21443',
            href: '#',
            imageSrc: '/images/brain-image.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            date: '2024/01/25'
        },
        // More products...
    ]

    return (
        <div>
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-200">Previous Tasks</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {tasks.map((task) => (
                        <div key={task.id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={task.imageSrc}
                                    alt={task.imageAlt}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href={task.href}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {task.name}
                                        </a>
                                    </h3>
                                    {/* <p className="mt-1 text-sm text-gray-500">{task.color}</p> */}
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