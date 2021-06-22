import React, { useEffect, useState } from 'react'
import NotificationsSystem, {atalhoTheme, bootstrapTheme, POSITIONS, setUpNotifications, STATUSES, useNotifications } from 'reapop';
const App = () => {
  const [users, setUsers] = useState([])
  const {notify, notifications, dismissNotification} = useNotifications();
  const fetchUsers = async () => {
    try {
      const goodUrl = "https://60d23844858b410017b2d60b.mockapi.io/users"
      const malformedUrl = "https://40d23844858b410017b2d60b.mockapi.io/food"
      const response = await fetch(malformedUrl);
      setUsers(await response.json());
      notify("Loaded users", "info")
    } catch (error) {
      notify("failed to load users", STATUSES.error)
    }
    
  
  }
  useEffect(() => {
    setUpNotifications({
      defaultProps: {
        dismissible: true,
        position: POSITIONS.topRight
      }
    })
    fetchUsers();
  }, [])
  return (
    <div className="App">
      <NotificationsSystem
        notifications={notifications}
        dismissNotification={id => dismissNotification(id)}
        theme={bootstrapTheme}
      />
    </div>
  );
}

export default App;
