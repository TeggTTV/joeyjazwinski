import { useState, useEffect } from 'react';

interface Tutorial {
  id: string;
  title: string;
}

export default function TutorialsIndex() {
    const [loading, setLoading] = useState(true);
    const [tutorials, setTutorials] = useState<Tutorial[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/getTutorials');
                if (!response.ok) {
                    console.error('Failed to fetch tutorials');
                    return;
                }
                const data = await response.json();
                setTutorials(data);
            } catch (error) {
                console.error('Error fetching tutorials:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="loader" />
            </div>
        );
    }

    return (
        <div>
            <h1>Tutorials</h1>
            <ul>
                {tutorials.map((tutorial) => (
                    <li key={tutorial.id}>{tutorial.title}</li>
                ))}
            </ul>
        </div>
    );
}

