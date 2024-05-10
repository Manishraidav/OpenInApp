import React, { useState, useEffect } from 'react';

function App() {
    const [greeting, setGreeting] = useState('');
    const [chartData, setChartData] = useState([]);
    const [links, setLinks] = useState([]);
    const [activeTab, setActiveTab] = useState('topLinks');

    useEffect(() => {
        // Fetch data from API
        fetch('https://api.inopenapp.com/api/v1/dashboardNew', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjU5MjcsImlhdCI6MTY3NDU1MDQ1MH0.dCkW0ox8tbjJA2GgUx2UEwNlbTZ7Rr38PVFJevYcXF'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Parse data and update state
            setGreeting(`Greetings from ${data.localTime}`);
            setChartData(data.chartData);
            setLinks(data.topLinks); // Assuming 'topLinks' is an array of links
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        // Fetch and update links based on tab selection
        if (tab === 'topLinks') {
            setLinks(data.topLinks);
        } else {
            setLinks(data.recentLinks);
        }
    };

    return (
        <div>
            <div>{greeting}</div>
            {/* Display chart using chartData */}
            <div>
                <button onClick={() => handleTabChange('topLinks')}>Top links</button>
                <button onClick={() => handleTabChange('recentLinks')}>Recent links</button>
            </div>
            <div>
                <h2>{activeTab === 'topLinks' ? 'Top Links' : 'Recent Links'}</h2>
                <ul>
                    {links.map((link, index) => (
                        <li key={index}>{link}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
